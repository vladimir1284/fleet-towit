<script async lang="ts">
	//@ts-nocheck
	import { Timeline, TimelineItem, Button } from 'flowbite-svelte';
	import { reqInvoiceApi, reqPaymentApi } from '@killbill/requests';
	import { Modal } from 'flowbite-svelte';
	import {
		FileInvoiceSolid,
		DotsHorizontalOutline,
		EyeOutline,
		CalendarWeekSolid,
		AnnotationSolid,
		CashOutline
	} from 'flowbite-svelte-icons';
	import DetailInvoice from '$lib/components/forms-components/invoices/DetailInvoice.svelte';
	import DetailPayment from '$lib/components/forms-components/payments/DetailPayment.svelte';
	import { formatTimelineDate } from '$lib/helpers/dates';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let TimelineData: any = [];
	let detailInvoiceModal = false;
	let detailPaymentModal = false;
	let selectedInvoice = undefined;
	let selectedPayment = undefined;
	let selectedPayment = undefined;
	let loading = false;

	async function handleInvoiceDetail(invoice) {
		selectedInvoice = await reqInvoiceApi.getInvoice({
			invoiceId: invoice.invoice_id,
			withChildrenItems: true,
			audit: 'MINIMAL'
		});
		detailInvoiceModal = true;
	}
	async function handlePaymentDetail(payment) {
		selectedPayment = await reqPaymentApi.getPayment({
			paymentId: payment.payment_id,
			withAttempts: true,
			withPluginInfo: true
		});
		detailPaymentModal = true;
	async function handleInvoiceDetail(invoice) {
		selectedInvoice = await reqInvoiceApi.getInvoice({
			invoiceId: invoice.invoice_id,
			withChildrenItems: true,
			audit: 'MINIMAL'
		});
		detailInvoiceModal = true;
	}
	async function handlePaymentDetail(payment) {
		selectedPayment = await reqPaymentApi.getPayment({
			paymentId: payment.payment_id,
			withAttempts: true,
			withPluginInfo: true
		});
		detailPaymentModal = true;
	}

	$: if (!detailInvoiceModal) {
		handleCloseDetailInvoiceModal();
	$: if (!detailInvoiceModal) {
		handleCloseDetailInvoiceModal();
	}
	$: if (!detailPaymentModal) {
		handleCloseDetailPaymentModal();
	$: if (!detailPaymentModal) {
		handleCloseDetailPaymentModal();
	}

	async function handleCloseDetailInvoiceModal() {}
	async function handleCloseDetailPaymentModal() {}

	async function handleCloseDetailInvoiceModal() {}
	async function handleCloseDetailPaymentModal() {}
</script>

<Modal
	title={'Invoice #' + selectedInvoice?.invoiceNumber}
	size="xl"
	padding="md"
	bind:open={detailInvoiceModal}
	bind:open={detailInvoiceModal}
>
	<DetailInvoice
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
	<DetailPayment currentPayment={selectedPayment} />
	<DetailInvoice
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
	<DetailPayment currentPayment={selectedPayment} />
</Modal>

{#if loading}
	<p>Loading...</p>
{:else}
	<Timeline order="vertical">
		{#each TimelineData as data}
			<TimelineItem title={data.stage} date={formatTimelineDate(data.date)}>
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
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<AnnotationSolid color="green" class="w-3 h-3" />
						</span>
					{:else}
						<span
							class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-purple-200 rounded-full ring-2 ring-white dark:ring-gray-900 dark:bg-gray-600"
						>
							<CalendarWeekSolid color="purple" class="w-3 h-3" />
						</span>
					{/if}
				</p>
			</TimelineItem>
		{/each}
	</Timeline>

	<!-- {#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if} -->
{/if}
