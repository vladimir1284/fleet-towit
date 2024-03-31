<script async lang="ts">
	//@ts-nocheck
	import { Timeline, TimelineItem } from 'flowbite-svelte';
	import { getKillBillData } from '@killbill/temp-api-rq';
	import { Modal } from 'flowbite-svelte';
	import { FileEditSolid, EyeOutline } from 'flowbite-svelte-icons';
	import DetailInvoice from '$lib/components/forms-components/contracts/DetailInvoice.svelte';

	export let TimelineData: any = [];
	let detailModal = false;
	let editModal = false;
	let selectedInvoice = undefined;
	let loading = false;

	const formatDate = (date: Date | string) => {
		if (!date) {
			return undefined;
		}
		return new Date(date).toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	async function handleDetail(invoice) {
		selectedInvoice = await getKillBillData(`/invoices/${invoice.invoice_id}`);
		detailModal = true;
	}

	async function handleEdit(invoice) {
		selectedInvoice = invoice;
		editModal = true;
	}

	$: if (!detailModal) {
		handleCloseDetailModal();
	}
	$: if (!editModal) {
		handleCloseDetailModal();
	}
	async function handleCloseDetailModal() {}
	async function handleCloseEditModal() {}
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
			<TimelineItem title={data.stage} date={formatDate(data.date)}>
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
					{#if data.invoice_id}
						Amount: {typeof data.amount == 'number' && data.amount == 0
							? '$' + data.amount
							: 'No amount provided'} <br />
						Balance: {typeof data.balance == 'number' && data.balance == 0
							? '$' + data.balance
							: 'No balance provided'} <br />
						<EyeOutline class="text-gray-400 inline" on:click={() => handleDetail(data)} />
						<FileEditSolid class="text-gray-400 inline" on:click={() => handleEdit(data)} />
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
