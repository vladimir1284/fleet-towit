<script async lang="ts">
	//@ts-nocheck
	import { Timeline, TimelineItem, Button } from 'flowbite-svelte';
	import { reqInvoiceApi, reqPaymentApi } from '@killbill/requests';
	import { Modal } from 'flowbite-svelte';
	import {
		FileInvoiceSolid,
		ReceiptSolid,
		EyeOutline,
		ArrowRightOutline
	} from 'flowbite-svelte-icons';
	import DetailInvoice from '$lib/components/forms-components/invoices/DetailInvoice.svelte';
	import DetailPayment from '$lib/components/forms-components/payments/DetailPayment.svelte';
	import { formatTimelineDate } from '$lib/helpers/dates';
	import { Badge } from 'flowbite-svelte';

	export let TimelineData: any = [];
	let detailInvoiceModal = false;
	let detailPaymentModal = false;
	let selectedInvoice = undefined;
	let selectedPayment = undefined;
	let loading = false;

	async function handleInvoiceDetail(invoice) {
		selectedInvoice = await reqInvoiceApi.getInvoice({
			invoiceId: invoice.invoice_id,
			withChildrenItems: true
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
	<DetailInvoice currentInvoice={selectedInvoice} />
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
	<Timeline>
		{#each TimelineData as data}
			<TimelineItem title={data.stage} date={formatTimelineDate(data.date)}>
				<p class="relative text-base font-normal text-gray-500 dark:text-gray-400">
					{#if data.invoice_id}
						<Badge color="green" rounded class="absolute px-2.5 py-0.5">invoice</Badge><br />
						<EyeOutline
							class="absolute -top-6 right-0 text-gray-400 inline"
							on:click={() => handleInvoiceDetail(data)}
						/>
						Amount: <strong> ${data.amount || '0'}</strong><br />
						Balance: <strong> ${data.balance || '0'}</strong><br />
					{:else if data.payment_id}
						<Badge color="green" rounded class="absolute px-2.5 py-0.5">payment</Badge><br />
						<EyeOutline
							class="absolute -top-6 right-0 text-gray-400 inline"
							on:click={() => handlePaymentDetail(data)}
						/>
						Auth Amount : <strong> ${data.auth_amount || '0'}</strong><br />
						Capture Balance : <strong> ${data.capture_balance || '0'}</strong><br />
						Refund Balance : <strong> ${data.refund_balance || '0'}</strong><br />
					{:else}{/if}
					Reason: {data.reason || 'No reason provided'} <br />
					Comment: {data.comments || 'No comment provided'}
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
