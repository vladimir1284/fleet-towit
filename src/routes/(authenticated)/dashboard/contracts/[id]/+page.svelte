<script async lang="ts">
	//@ts-nocheck
	import { Card, Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import { tenantActor } from '$lib/store/context-store';
	import DetailContract from '$lib/components/forms-components/contracts/DetailContract.svelte';
	import { reqInvoiceApi, reqPaymentApi, reqAccountApi } from '@killbill/requests';
	import { customReqInvoiceApi, customReqPaymentApi } from '@killbill/custom-requests';
	const currentTenant = tenantActor.getSnapshot().context.currentTenant;
	const headers = { 'X-User-Tenant': currentTenant.currentUserTenant.id };

	export let data: PageData;
	export let selectedContract: object = data.contract;

	let loading: boolean = true;
	let showAlert: boolean = false;
	let message: string;

	let contractStagesList: Array<object> = [];
	let contractInvoicesList: Array<object> = [];
	let contractPaymentsList: Array<object> = [];
	let contractNotesList: Array<object> = [];

	onMount(async () => {
		try {
			await getStagesList(selectedContract, 25);
			await getNotesList(selectedContract, 25);
			await getInvoicesList(selectedContract, 25);
			await getPaymentsList(selectedContract, 25);

			loading = false;
		} catch (error) {
			console.error('Error:', error);
			loading = false;
		}
	});

	async function getInvoicesList(contract, limit = 100) {
		try {
			// let res = await reqAccountApi.getInvoicesForAccount({ accountId: '20b5a43d-246b-42c3-949f-f4f6dba392f0' }); // TODO listar los invoices del account de la suscription
			const invoices = await customReqInvoiceApi.getLatestInvoices({
				limit: limit,
				audit: 'MINIMAL'
			});

			contractInvoicesList = invoices.map(
				({ invoiceId, invoiceDate, targetDate, status, amount, balance, auditLogs, ...rest }) => {
					let dirtyDate = new Date(targetDate);
					let cleanDate = new Date(
						dirtyDate.getFullYear(),
						dirtyDate.getMonth(),
						dirtyDate.getDate()
					);
					const auditLog = auditLogs.length > 0 ? auditLogs[auditLogs.length - 1] : {};

					return {
						...rest,
						type: 'invoice',
						comments: auditLog.comments || null,
						reason: '', // auditLog.reasonCode || null
						invoice_id: invoiceId,
						date: cleanDate,
						stage: status,
						// TODO el amount y el balance siempre es 0 (no se porq) ??
						amount,
						balance
					};
				}
			);
		} catch (error) {
			console.error('Error getting invoices:', error);
		}
	}

	async function getPaymentsList(contract, limit = 100) {
		try {
			// await reqAccountApi.getPaymentsForAccount({ accountId: '20b5a43d-246b-42c3-949f-f4f6dba392f0' });  // TODO listar los payments del account de la suscription
			const payments = await customReqPaymentApi.getLatestPayments({
				limit: limit,
				audit: 'MINIMAL'
			});
			contractPaymentsList = await payments.map(
				({
					paymentId,
					authAmount,
					purchasedAmount,
					refundedAmount,
					creditedAmount,
					transactions,
					auditLogs,
					...rest
				}) => {
					const lastTransaction =
						transactions.length > 0 ? transactions[transactions.length - 1] : {};
					const auditLog = auditLogs.length > 0 ? auditLogs[auditLogs.length - 1] : {};

					let dirtyDate = new Date(lastTransaction.effectiveDate);
					let cleanDate = new Date(
						dirtyDate.getFullYear(),
						dirtyDate.getMonth(),
						dirtyDate.getDate()
					);

					return {
						// ...rest,
						payment_id: paymentId,
						type: 'payment',
						comments: auditLog.comments || null,
						reason: '', // auditLog.reasonCode || null
						date: cleanDate,
						stage: lastTransaction.status || null,
						// TODO los amount siempre son 0 (no se porq) ??
						auth_amount: authAmount,
						purchased_amount: purchasedAmount,
						refunded_amount: refundedAmount
					};
				}
			);
		} catch (error) {
			console.error('Error getting payments:', error);
		}
	}

	async function getStagesList(contract, limit = 100) {
		try {
			const stages = await fetch(
				`/api/tenants/${currentTenant.id}/contracts/${contract.id}/stage?limit=${limit}`
			);
			contractStagesList = await stages.json();

			if (limit && contractStagesList.length > limit) {
				contractStagesList = contractStagesList.slice(0, limit);
			}
		} catch (error) {
			console.error('Error getting stage changes:', error);
		}
	}

	async function getNotesList(contract, limit = 100) {
		try {
			contractNotesList = [];
		} catch (error) {
			console.error('Error getting notes:', error);
		}
	}

	function handleAlert(text) {
		showAlert = true;
		message = text;
		setTimeout(() => {
			showAlert = false;
		}, 4000);
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Card size="xl" padding="md" class="flex w-full mt-5">
		<DetailContract
			{data}
			{selectedContract}
			{contractStagesList}
			{contractInvoicesList}
			{contractPaymentsList}
			{contractNotesList}
		/>
	</Card>
	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if}
{/if}
