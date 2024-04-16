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
		Modal,
		Alert,
		Badge,
		Indicator
	} from 'flowbite-svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { PageData } from '../$types';
	import { getContractRemainderStatus } from '$lib/actions/contracts_notes_status';
	import UpdateStage from '$lib/components/forms-components/contracts/UpdateStage.svelte';
	import ContractForm from '$lib/components/forms-components/contracts/ContractForm.svelte';
	import DetailContract from '$lib/components/forms-components/contracts/DetailContract.svelte';
	import ViewContractNotes from '$lib/components/forms-components/notes/ViewContractNotes.svelte';
	import DeleteContractForm from '$lib/components/forms-components/contracts/DeleteContractForm.svelte';
	import UpdateStage from '$lib/components/forms-components/contracts/UpdateStage.svelte';
	import ViewContractNotes from '$lib/components/forms-components/notes/ViewContractNotes.svelte';
	import PaymentInvoiceForm from '$lib/components/forms-components/payments/PaymentInvoiceForm.svelte';
	import { getContractRemainderStatus } from '$lib/actions/contracts_notes_status';
	import {
		TrashBinSolid,
		FileEditSolid,
		RotateOutline,
		EyeOutline,
		AnnotationSolid
	} from 'flowbite-svelte-icons';

	export let data: PageData;
	let message = '';
	let selectedId = '';
	let clients = [];
	let vehicles = [];
	let contracts = [];
	let rentalPlans = [];
	let loading = false;
	let showAlert = false;
	let editModal = false;
	let createModal = false;
	let deleteModal = false;
	let updateModal = false;
	let makingPaymentModal: boolean = false;
	let showNotesModal = false;
	let selectedContract = undefined;

	$: {
		contracts.forEach((c) => {
			if (c.notes) c.RemStatus = getContractRemainderStatus(c.notes);
		});
	}

	const currentTenant = getContext('currentTenant');

	async function loadData() {
		loading = true;
		await axios
			.all([
				axios.get(`/api/tenants/${$currentTenant.id}/client`),
				axios.get(`/api/tenants/${$currentTenant.id}/contracts`),
				axios.get(`/api/tenants/${$currentTenant.id}/vehicles`),
				axios.get(`/api/tenants/${$currentTenant.id}/rentalPlan`)
			])
			.then(
				axios.spread(
					(clientsResponse, contractsResponse, vehiclesResponse, rentalPlansResponse) => {
						clients = [...clientsResponse.data];
						vehicles = [...vehiclesResponse.data];
						contracts = [...contractsResponse.data];
						rentalPlans = [...rentalPlansResponse.data];

						loading = false;
					}
				)
			)
			.catch((error) => {
				console.error('Error:', error);
				loading = false;
			});
	}

	onMount(async () => {
		loadData();
	});

	function handleAlert(text) {
		showAlert = true;
		message = text;
		setTimeout(() => {
			showAlert = false;
		}, 4000);
	}

	async function handleCloseModal(event) {
		createModal = event.detail;
		handleAlert('Contract created succesfully!');

		loadData();
	}

	async function handleEdit(contract) {
		selectedContract = contract;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('Contract edited succesfully!');

		loadData();
	}

	async function handleUpdateStage(contract) {
		selectedContract = contract;
		updateModal = true;
	}

	async function handleCloseUpdateModal(event) {
		updateModal = event.detail;
		handleAlert('Contract updated succesfully!');

		loadData();
	}

	async function handleDelete(contractId) {
		selectedId = contractId;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('Contract deleted succesfully!');

		loadData();
	}

	async function handleShowNotes(contract) {
		selectedContract = contract;
		showNotesModal = true;
	}

	async function handleShowMakePaymentModal(contract) {
		selectedContract = contract;
		makingPaymentModal = true;
	}

	$: {
		contracts.forEach((contract) => {
			contract.RemStatus = getContractRemainderStatus(contract.notes);
		});
	}

	async function handleShowNotes(contract) {
		selectedContract = contract;
		showNotesModal = true;
	}

	async function handleCloseMakePaymentModal(event) {
		makingPaymentModal = false;
		handleAlert('');
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	{#if selectedContract}
		<ViewContractNotes {data} bind:open={showNotesModal} bind:selectedContract />
	{/if}

	<Modal bind:open={createModal} size="xs">
		<ContractForm {data} {clients} {vehicles} {rentalPlans} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal bind:open={editModal} size="xs">
		<ContractForm
			{data}
			{selectedContract}
			{clients}
			{vehicles}
			{rentalPlans}
			on:formvalid={handleCloseEditModal}
		/>
	</Modal>

	<Modal size="xs" padding="md" bind:open={deleteModal}>
		<DeleteContractForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={updateModal}>
		<UpdateStage {data} {selectedContract} on:formvalid={handleCloseUpdateModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={makingPaymentModal}>
		<PaymentInvoiceForm
			data={data?.PaymentInvoiceForm}
			on:formvalid={handleCloseMakePaymentModal}
		/>
	</Modal>

	<!-- Notes Modal -->
	{#if selectedContract}
		<ViewContractNotes bind:open={showNotesModal} bind:selectedContract {data} />
	{/if}

	<Card size="xl" padding="md" class="flex w-full mt-5">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (createModal = true)}>
					Create Contract
				</GradientButton>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">VEHICLE</TableHeadCell>
				<TableHeadCell class="text-center">CLIENT</TableHeadCell>
				<TableHeadCell class="text-center">RENTAL PLAN</TableHeadCell>
				<TableHeadCell class="text-center">STATUS</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each contracts as contract}
					<TableBodyRow>
						<TableBodyCell class="text-center relative">
							{#if contract.RemStatus && contract.RemStatus.status > -1}
								<Indicator
									placement="center-left"
									size="lg"
									class="ml-2 p-2"
									color={contract.RemStatus.color}
								>
									<span class="text-white text-xs">
										{#if contract.RemStatus.count < 10}
											{contract.RemStatus.count}
										{:else}
											9+
										{/if}
									</span>
								</Indicator>
							{/if}
							{contract.vehicle.type + '-' + contract.vehicle.make + '-' + contract.vehicle.model}
						</TableBodyCell>
						<TableBodyCell class="text-center">
							{contract.client.name ?? contract.client.email}
						</TableBodyCell>
						<TableBodyCell class="text-center">{contract.rentalPlan.name}</TableBodyCell>
						<TableBodyCell class="text-center">
							<Badge color="blue" rounded class="px-2.5 py-0.5">{contract.stage.stage}</Badge>
						</TableBodyCell>
						<TableBodyCell class="flex w-40 justify-between">
							<a href={`/contracts/${contract.id}`}>
								<EyeOutline class="mx-1 text-gray-400" />
							</a>
							<CashOutline
								class="mx-1 text-gray-400"
								on:click={() => handleShowMakePaymentModal(contract)}
							/>
							<AnnotationSolid
								class="mx-1 text-gray-400"
								on:click={() => handleShowNotes(contract)}
							/>
							<FileEditSolid class="mx-1 text-gray-400" on:click={() => handleEdit(contract)} />
							<RotateOutline
								class="mx-1 text-gray-400"
								on:click={() => handleUpdateStage(contract)}
							/>
							<TrashBinSolid
								title="asd"
								class="mx-1 text-red-500"
								on:click={() => handleDelete(contract.id)}
							/>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</Card>

	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if}
{/if}
