<script async lang="ts">
	//@ts-nocheck
	import { Timeline, TimelineItem } from 'flowbite-svelte';
	import { reqInvoiceApi } from '@killbill/requests';
	import { Modal } from 'flowbite-svelte';
	import { FileEditSolid, EyeOutline } from 'flowbite-svelte-icons';
	import DetailInvoice from '$lib/components/forms-components/contracts/DetailInvoice.svelte';
	import { formatTimelineDate } from '$lib/helpers/dates';

	export let TimelineData: any = [];
	let detailModal = false;
	let selectedInvoice = undefined;
	let loading = false;

	async function handleDetail(invoice) {
		selectedInvoice = await reqInvoiceApi.getInvoice({
			invoiceId: invoice.invoice_id,
			withChildrenItems: true
		});
		detailModal = true;
	}

	$: if (!detailModal) {
		handleCloseDetailModal();
	}

	async function handleCloseDetailModal() {}
</script>

<Modal
	title={'Invoice #' + selectedInvoice?.invoiceNumber}
	size="xl"
	padding="md"
	bind:open={detailModal}
>
	<DetailInvoice currentInvoice={selectedInvoice} />
</Modal>

{#if loading}
	<p>Loading...</p>
{:else}
	<Timeline>
		{#each TimelineData as data}
			<TimelineItem title={data.stage} date={formatTimelineDate(data.date)}>
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
					{#if data.invoice_id}
						Amount: {typeof data.amount == 'number' && data.amount == 0
							? '$' + data.amount
							: 'No amount provided'} <br />
						Balance: {typeof data.balance == 'number' && data.balance == 0
							? '$' + data.balance
							: 'No balance provided'} <br />
						<EyeOutline class="text-gray-400 inline" on:click={() => handleDetail(data)} />
					{:else}
						Reason: {data.reason || 'No reason provided'} <br />
						Comment: {data.comments || 'No comment provided'}
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
