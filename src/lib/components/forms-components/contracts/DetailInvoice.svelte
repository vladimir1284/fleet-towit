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
	import { getKillBillData } from '@killbill/temp-api-rq';

	export let data: any;
	export let currentInvoice: any = undefined;
	const totalAmount = currentInvoice.items.reduce((total, item) => total + item.amount, 0);
	let loading = false;

	const editInvoiceDate = () => {};
	const openInvoiceHtml = () => {
		getKillBillData(`/invoices/${currentInvoice.invoiceId}/html`, 0, 'txt')
			.then((html) => {
				const newWindow = window.open('', '_blank');
				newWindow.document.write(html);
				newWindow.document.title = `Invoice for client #${currentInvoice.invoiceNumber}`;

				// Agregar un logo
				// const logo = newWindow.document.createElement('img');
				// logo.src = 'url_de_tu_logo';
				// logo.style.width = '100px';
				// logo.style.height = 'auto';
				// newWindow.document.body.insertBefore(logo, newWindow.document.body.firstChild);

				newWindow.document.close();
			})
			.catch((error) => {
				console.error('Error al obtener la factura:', error);
			});
	};
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Card size="xl" padding="md" class="flex w-full max-h-[33rem] md:w-auto mt-5">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				Invoice Date: {currentInvoice.invoiceDate}<br />
				Target Date: {currentInvoice.targetDate}<br />
				<GradientButton shadow color="green" on:click={openInvoiceHtml}>
					View Customer Invoice HTML
				</GradientButton>
				<GradientButton shadow color="blue" on:click={editInvoiceDate}>
					Adjust Invoice Item
				</GradientButton>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">DESCRIPTION</TableHeadCell>
				<TableHeadCell class="text-center">START DATE</TableHeadCell>
				<TableHeadCell class="text-center">END DATE</TableHeadCell>
				<TableHeadCell class="text-center">SUBSCRIPTION ID</TableHeadCell>
				<TableHeadCell class="text-center">AMOUNT</TableHeadCell>
				<TableHeadCell class="text-center">COMMENTS</TableHeadCell>
				<!-- <TableHeadCell class="text-center"></TableHeadCell> -->
			</TableHead>
			<TableBody class="divide-y">
				{#each currentInvoice?.items as item}
					<TableBodyRow>
						<TableBodyCell class="text-center">{item.description}</TableBodyCell>
						<TableBodyCell class="text-center">{item.startDate}</TableBodyCell>
						<TableBodyCell class="text-center">{item.endDate}</TableBodyCell>
						<TableBodyCell class="text-center">{item.subscriptionId}</TableBodyCell>
						<TableBodyCell class="text-center">
							<Badge color="green" rounded class="px-2.5 py-0.5">${item.amount}</Badge>
						</TableBodyCell>
						<TableBodyCell class="text-center">????</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>

			<div class="p-5 text-end text-md text-gray-900 bg-white dark:text-white dark:bg-gray-800">
				<!-- INVOICE TOTAL: ${currentInvoice.amount} ({currentInvoice.currency})<br /> -->
				<strong>INVOICE TOTAL:</strong> ${totalAmount} ({currentInvoice.currency})<br />
				<strong>RESULTING AVAILABLE CREDITS:</strong> ${currentInvoice.refundAdj} ({currentInvoice.currency})<br
				/>
				<strong>REFUNDED:</strong> ${currentInvoice.refundAdj} ({currentInvoice.currency})<br />
				<strong>BALANCE:</strong> ${currentInvoice.balance} ({currentInvoice.currency})<br />
			</div>
		</Table>
	</Card>
	<!-- {#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if} -->
{/if}
