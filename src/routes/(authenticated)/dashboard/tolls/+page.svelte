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
		Alert
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { PageData } from '../$types';
	import { TrashBinSolid, FileEditSolid } from 'flowbite-svelte-icons';
	import TollForm from '$lib/components/forms-components/tolls/TollForm.svelte';
	import DeleteTollForm from '$lib/components/forms-components/tolls/DeleteTollForm.svelte';

	export let data: PageData;
	let tolls = [];
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let loading = false;
	let selectedId = '';
	let selectedToll = undefined;
	let message = '';

	const currentTenant = getContext('currentTenant');
	const headers = { 'X-User-Tenant': $currentTenant.currentUserTenant.id };

	onMount(async () => {
		try {
			const response = await fetch(`/api/tenants/${$currentTenant.id}/contracts/tolls`, {
				headers
			});
			tolls = [...(await response.json())];
			console.log(tolls);
			loading = false;
		} catch (error) {
			console.error('Error:', error);
			loading = false;
		}
	});

	function handleAlert(text) {
		showAlert = true;
		message = text;
		setTimeout(() => {
			showAlert = false;
		}, 4000);
	}

	function handleCloseModal(event) {
		createModal = event.detail;
		handleAlert('Toll created succesfully!');
		location.reload();
	}

	async function handleEdit(toll) {
		selectedToll = toll;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('Toll edited succesfully!');
		location.reload();
	}

	async function handleDelete(tollId) {
		selectedId = tollId;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('Toll deleted succesfully!');
		location.reload();
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Modal bind:open={createModal} size="xs">
		<TollForm {data} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal bind:open={editModal} size="xs">
		<TollForm {data} {selectedToll} on:formvalid={handleCloseEditModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={deleteModal}>
		<DeleteTollForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
	</Modal>

	<Card size="xl" padding="md" class="flex w-full max-h-[33rem] md:w-auto mt-5">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (createModal = true)}>
					Create Toll
				</GradientButton>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">VEHICLE PLATE</TableHeadCell>
				<TableHeadCell class="text-center">CONTRACT ID</TableHeadCell>
				<TableHeadCell class="text-center">INVOICE NUMBER</TableHeadCell>
				<TableHeadCell class="text-center">CREATED DATE</TableHeadCell>
				<TableHeadCell class="text-center">STAGE</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each tolls as toll}
					<TableBodyRow>
						<TableBodyCell class="text-center">{toll.name}</TableBodyCell>
						<TableBodyCell class="text-center">{toll.amount}</TableBodyCell>
						<TableBodyCell class="text-center">{toll.periodicity}</TableBodyCell>
						<TableBodyCell class="flex w-32 justify-between">
							<FileEditSolid class="text-gray-400" on:click={() => handleEdit(toll)} />
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(toll.id)} />
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
