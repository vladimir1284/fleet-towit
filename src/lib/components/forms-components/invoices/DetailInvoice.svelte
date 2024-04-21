<script lang="ts">
	// @ts-nocheck
	import {
		Card,
		GradientButton,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Badge
	} from 'flowbite-svelte';
	import InvoiceForm from './InvoiceForm.svelte';
	import PaymentInvoiceForm from '../payments/PaymentInvoiceForm.svelte';
	import { reqInvoiceApi } from '$lib/killbill/requests';
	import { formatStringDate } from '$lib/helpers/dates';
	import html2pdf from 'html2pdf.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let data: any;
	export let currentInvoice: any = undefined;
	let selectedInvoiceItem;
	// const totalAmount = currentInvoice.items.reduce((total, item) => total + item.amount, 0);
	let loading: boolean = false;
	let editModal: boolean = false;
	let makePaymentModal: boolean = false;

	const openInvoiceHTML = () => {
		reqInvoiceApi
			.getInvoiceAsHTML({ invoiceId: currentInvoice.invoiceId })
			.then((html) => {
				const newWindow = window.open('', '_blank');
				newWindow.document.write(html);
				newWindow.document.title = `Invoice #${currentInvoice.invoiceNumber}`;

				// Agregar un logo
				// const logo = newWindow.document.createElement('img');
				// logo.src = 'url_de_tu_logo';
				// logo.style.width = '100px';
				// logo.style.height = 'auto';
				// newWindow.document.body.insertBefore(logo, newWindow.document.body.firstChild);

				newWindow.document.close();
			})
			.catch((error) => {
				console.error('Error getting the invoice:', error);
			});
	};

	const openInvoicePDF = () => {
		reqInvoiceApi
			.getInvoiceAsHTML({ invoiceId: currentInvoice.invoiceId })
			.then((html) => {
				const element = document.createElement('div');
				element.innerHTML = html;

				const options = {
					margin: 10,
					filename: `Invoice #${currentInvoice.invoiceNumber}.pdf`,
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { scale: 2 },
					jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
				};

				// Conversión HTML a PDF
				html2pdf().set(options).from(element).save();
			})
			.catch((error) => {
				console.error('Error getting the invoice:', error);
			});
	};

	async function getThisInvoice(event: any) {
		currentInvoice = await reqInvoiceApi.getInvoice({
			invoiceId: currentInvoice.invoiceId,
			withChildrenItems: true,
			audit: 'MINIMAL'
		});
	}

	async function handleCloseMakePaymentModal(event: any) {
		makePaymentModal = false; //event.detail
		dispatch('reListTimeline');
	}
	async function handleCloseEditModal(event: any) {
		editModal = false; //event.detail
		await getThisInvoice();
	}

	function getComments(item) {
		const auditLogItem = item.auditLogs.length > 0 ? item.auditLogs[item.auditLogs.length - 1] : {};
		return auditLogItem.comment ? auditLogItem.comment : '-';
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else if editModal}
	<InvoiceForm
		data={data?.InvoiceForm}
		{selectedInvoiceItem}
		maxAmount={currentInvoice.balance}
		on:formvalid={handleCloseEditModal}
	/>
{:else if makePaymentModal && currentInvoice.balance > 0}
	<PaymentInvoiceForm
		data={data?.PaymentInvoiceForm}
		selectedInvoice={currentInvoice}
		maxAmount={currentInvoice.balance}
		on:formvalid={handleCloseMakePaymentModal}
	/>
{:else}
	<Card size="xl" padding="md" class="flex w-full max-h-[33rem] md:w-auto mt-5">
		<Table>
			<caption
				class="p-5 text-lg text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<div class="pb-4">
					<strong>INVOICE DATE:</strong>
					<span class="px-3">{formatStringDate(currentInvoice.invoiceDate)}</span><br />
					<strong>TARGET DATE:</strong>
					<span class="px-3">{formatStringDate(currentInvoice.targetDate)}</span><br />
				</div>
				<div class="flex justify-between">
					<div>
						<GradientButton
							color="purple"
							disabled={true}
							on:click={() => {
								makePaymentModal = true;
							}}>Make Payment</GradientButton
						>
						<!--  disabled  ==> currentInvoice.balance > 0 ? '' : 'disabled' -->
					</div>
					<div>
						<GradientButton color="green" on:click={openInvoiceHTML}>
							View Customer Invoice HTML
						</GradientButton>
						<GradientButton color="blue" on:click={openInvoicePDF}>
							Download Customer Invoice PDF
						</GradientButton>
					</div>
				</div>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">DESCRIPTION</TableHeadCell>
				<TableHeadCell class="text-center">START DATE</TableHeadCell>
				<TableHeadCell class="text-center">END DATE</TableHeadCell>
				<TableHeadCell class="text-center">AMOUNT</TableHeadCell>
				<TableHeadCell class="text-center">COMMENTS</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each currentInvoice?.items as item, index}
					<TableBodyRow>
						<TableBodyCell class="text-center"
							>{item.itemType === 'RECURRING'
								? item.description
								: 'Invoice item adjustment'}</TableBodyCell
						>
						<TableBodyCell class="text-center">{formatStringDate(item.startDate)}</TableBodyCell>
						<TableBodyCell class="text-center">{formatStringDate(item.endDate)}</TableBodyCell>
						<TableBodyCell class="text-center">
							<Badge color={item.amount >= 0 ? 'green' : 'red'} rounded class="px-2.5 py-0.5"
								>${item.amount} ({currentInvoice.currency})</Badge
							>
						</TableBodyCell>
						<TableBodyCell class="text-center">{getComments(item)}</TableBodyCell>
						<TableBodyCell class="text-center">
							{#if currentInvoice.amount != 0 && item.itemType === 'RECURRING'}
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<Badge color="purple" rounded class="px-3 py-1">
									<span
										class="cursor-pointer font-semibold underline"
										on:click={() => {
											selectedInvoiceItem = item;
											// editModal = true;
										}}
										>Adjust<span />
									</span>
								</Badge>
							{/if}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<div class="pt-8 text-end text-md text-gray-900 bg-white dark:text-white dark:bg-gray-800">
			<!-- INVOICE TOTAL: ${currentInvoice.amount} ({currentInvoice.currency})<br /> -->
			<strong>INVOICE TOTAL:</strong>
			<span class="px-3 inline-block w-40 text-start"
				>${currentInvoice.amount} ({currentInvoice.currency})</span
			><br />
			<strong>RESULTING AVAILABLE CREDITS:</strong>
			<span class="px-3 inline-block w-40 text-start"
				>${currentInvoice.refundAdj} ({currentInvoice.currency})</span
			><br />
			<strong>REFUNDED:</strong>
			<span class="px-3 inline-block w-40 text-start"
				>${currentInvoice.refundAdj} ({currentInvoice.currency})</span
			><br />
			<strong>BALANCE:</strong>
			<span class="px-3 inline-block w-40 text-start"
				>${currentInvoice.balance} ({currentInvoice.currency})</span
			><br />
		</div>
	</Card>
	<!-- {#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if} -->
{/if}
