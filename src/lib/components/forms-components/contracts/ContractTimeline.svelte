<script async lang="ts">
	//@ts-nocheck
	import { Timeline, TimelineItem } from 'flowbite-svelte';
	import { reqInvoiceApi, reqPaymentApi } from '@killbill/requests';
	import { Modal } from 'flowbite-svelte';
	import {
		FileInvoiceSolid,
		CalendarWeekSolid,
		AnnotationSolid,
		CashOutline,
		EyeOutline,
		DotsHorizontalOutline
	} from 'flowbite-svelte-icons';
	import DetailPayment from '$lib/components/forms-components/payments/DetailPayment.svelte';
	import { formatTimelineDate } from '$lib/helpers/dates';
	import { createEventDispatcher } from 'svelte';
	import DetailInvoice from '$lib/components/forms-components/invoices/DetailInvoice.svelte';
	import NoteCard from '../notes/NoteCard.svelte';
	import type { Invoice, Payment } from '@killbill/api/models';

	const dispatch = createEventDispatcher();
	export let timelineData: any = [];
	export let sessionData: any | undefined = undefined;
	let detailInvoiceModal = false;
	let detailPaymentModal = false;
	let selectedInvoice: Invoice | undefined = undefined;
	let selectedPayment: Payment | undefined = undefined;
	let loading = false;

	async function handleInvoiceDetail(invoice: { invoice_id: string }) {
		selectedInvoice = await reqInvoiceApi.getInvoice({
			invoiceId: invoice.invoice_id,
			withChildrenItems: true,
			audit: 'MINIMAL'
		});
		detailInvoiceModal = true;
	}

	async function handlePaymentDetail(payment: { payment_id: string }) {
		selectedPayment = await reqPaymentApi.getPayment({
			paymentId: payment.payment_id,
			withAttempts: true,
			withPluginInfo: true
		});
		detailPaymentModal = true;
	}

	$: if (!detailPaymentModal) {
		handleCloseDetailPaymentModal();
	}

	$: if (!detailPaymentModal) {
		handleCloseDetailPaymentModal();
	}

	async function handleCloseDetailInvoiceModal() {}

	async function handleCloseDetailPaymentModal() {}
</script>

<Modal
	title={'Invoice #' + selectedInvoice?.invoiceNumber}
	size="xl"
	padding="md"
	bind:open={detailInvoiceModal}
>
	<DetailInvoice
		data={sessionData}
		on:reListTimeline={() => {
			dispatch('reListTimeline');
		}}
		currentInvoice={selectedInvoice}
	/>
</Modal>

<Modal
	title={'Payment #' + selectedPayment?.paymentNumber}
	size="xl"
	padding="md"
	bind:open={detailPaymentModal}
>
	<DetailPayment
		data={sessionData}
		on:reListTimeline={() => {
			dispatch('reListTimeline');
		}}
		currentPayment={selectedPayment}
	/>
</Modal>

{#if loading}
	<p>Loading...</p>
{:else}
	<Timeline order="vertical">
		{#each timelineData as data}
			<TimelineItem title={data.stage} date={formatTimelineDate(data.date || data.createdDate)}>
				<svelte:fragment slot="icon">
					{#if data.invoice_id}
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<FileInvoiceSolid color="blue" class="w-3 h-3" />
						</span>
					{:else if data.payment_id}
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-red-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<CashOutline color="red" class="w-3 h-3" />
						</span>
					{:else if data.note_id}
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<AnnotationSolid color="green" class="w-3 h-3" />
						</span>
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<FileInvoiceSolid color="blue" class="w-3 h-3" />
						</span>
					{:else if data.payment_id}
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-red-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<CashOutline color="red" class="w-3 h-3" />
						</span>
					{:else if data.Subject}
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-red-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<AnnotationSolid color="red" class="w-3 h-3" />
						</span>
					{:else}
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-purple-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<CalendarWeekSolid color="purple" class="w-3 h-3" />
						</span>
					{/if}
				</svelte:fragment>
				{#if data.Subject}
					<NoteCard data={sessionData} note={data} />
				{/if}
				<p class="relative text-base font-normal text-gray-500 dark:text-gray-400">
					{#if data.invoice_id}
						<EyeOutline
							class="absolute -top-12 right-0.5 text-gray-400 inline"
							on:click={() => handleInvoiceDetail(data)}
						/>
						{#if data.amount}
							Amount: <strong> ${data.amount}</strong><br />
						{/if}
						{#if data.balance}
							Balance: <strong> ${data.balance}</strong><br />
						{/if}
					{:else if data.payment_id}
						<EyeOutline
							class="absolute -top-12 right-0.5  text-gray-400 inline"
							on:click={() => handlePaymentDetail(data)}
						/>
						{#if data.auth_amount}
							Auth Amount : <strong> ${data.auth_amount}</strong><br />
						{/if}
						{#if data.capture_balance}
							Capture Balance : <strong> ${data.capture_balance}</strong><br />
						{/if}
						{#if data.refund_balance}
							Refund Balance : <strong> ${data.refund_balance}</strong><br />
						{/if}
					{/if}
				</p>
			</TimelineItem>
		{:else}
			<TimelineItem title="Empty list">
				<svelte:fragment slot="icon">
					<span
						class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
					>
						<DotsHorizontalOutline color="blue" class="w-3 h-3" />
					</span>
				</svelte:fragment>
				<p class="relative text-base font-normal text-gray-500 dark:text-gray-400">
					Nothing to show here ...
				</p>
			</TimelineItem>
		{/each}
	</Timeline>
{/if}
