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
	import PaymentRefundForm from './PaymentRefundForm.svelte';
	import { formatStringDate } from '$lib/helpers/dates';

	export let data: any;
	export let currentPayment: any = undefined;
	let invoiceId =
		currentPayment &&
		currentPayment.paymentAttempts &&
		currentPayment.paymentAttempts[0] &&
		currentPayment.paymentAttempts[0].pluginProperties &&
		currentPayment.paymentAttempts[0].pluginProperties[0]
			? currentPayment.paymentAttempts[0].pluginProperties[0].value
			: 'error fetching invoice id';
	let loading: boolean = false;
	let refundModal: boolean = false;

	async function handleCloseRefundModal(event: any) {
		console.log(event.detail);
		refundModal = event.detail;
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else if refundModal}
	<PaymentRefundForm
		data={data?.PaymentRefundForm}
		selectedPayment={currentPayment}
		on:formvalid={handleCloseRefundModal}
	/>
{:else}
	<Card size="xl" padding="md" class="flex w-full max-h-[33rem] md:w-auto mt-5">
		<Table>
			<caption
				class="p-5 text-lg text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<div class="pb-4">
					<strong>INVOICE ID:</strong>
					<span class="px-3">
						{invoiceId}
					</span><br />
					<strong>EXTERNAL KEY:</strong>
					<span class="px-3">{currentPayment.paymentExternalKey}</span><br />
				</div>
				<div class="flex justify-between">
					<div>
						<GradientButton
							color="purple"
							on:click={() => {
								refundModal = true;
							}}
						>
							Make Refund
						</GradientButton>
					</div>
					<div></div>
				</div>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">DATE</TableHeadCell>
				<TableHeadCell class="text-center">TYPE</TableHeadCell>
				<TableHeadCell class="text-center">AMOUNT</TableHeadCell>
				<TableHeadCell class="text-center">TRANSACTION EXTERNAL KEY</TableHeadCell>
				<TableHeadCell class="text-center">FIRST ID</TableHeadCell>
				<TableHeadCell class="text-center">SECOND ID</TableHeadCell>
				<TableHeadCell class="text-center">GATEWAY CODE</TableHeadCell>
				<TableHeadCell class="text-center">GATEWAY MESSAGE</TableHeadCell>
				<TableHeadCell class="text-center">STATUS</TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each currentPayment?.transactions as transaction, index}
					<TableBodyRow>
						<TableBodyCell class="text-center"
							>{formatStringDate(transaction.effectiveDate)}</TableBodyCell
						>
						<TableBodyCell class="text-center">
							<Badge color="blue" rounded class="px-2.5 py-0.5">
								{transaction.transactionType}
							</Badge>
						</TableBodyCell>
						<TableBodyCell class="text-center"
							>${transaction.processedAmount} ({transaction.processedCurrency})</TableBodyCell
						>
						<TableBodyCell class="text-center"
							>{transaction.paymentExternalKey || '-'}</TableBodyCell
						>

						<TableBodyCell class="text-center"
							>{transaction.firstPaymentReferenceId || '-'}</TableBodyCell
						>
						<TableBodyCell class="text-center"
							>{transaction.secondPaymentReferenceId || '-'}</TableBodyCell
						>
						<TableBodyCell class="text-center">{transaction.gatewayErrorCode || '-'}</TableBodyCell>
						<TableBodyCell class="text-center">{transaction.gatewayErrorMsg || '-'}</TableBodyCell>
						<TableBodyCell class="text-center">
							<Badge
								color={transaction.status === 'SUCCESS'
									? 'green'
									: transaction.status === 'PENDING'
										? 'yellow'
										: transaction.status === 'PAYMENT_FAILED' ||
											  transaction.status === 'PLUGIN_FAILED'
											? 'red'
											: 'gray'}
								rounded
								class="px-2.5 py-0.5">{transaction.status}</Badge
							>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<div class="pt-8 text-end text-md text-gray-900 bg-white dark:text-white dark:bg-gray-800">
			<!-- ... Payment Method Details here ... -->
		</div>
	</Card>
	<!-- {#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if} -->
{/if}
