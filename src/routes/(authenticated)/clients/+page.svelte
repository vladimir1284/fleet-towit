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
	import { TrashBinSolid, FileEditSolid } from 'flowbite-svelte-icons';
	import ClientForm from '$lib/components/forms-components/clients/ClientForm.svelte';
	import DeleteClientForm from '$lib/components/forms-components/clients/DeleteClientForm.svelte';
	import type { PageData } from '../$types';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';

	export let data: PageData;
	let clients = [];
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let loading = false;
	let selectedId = '';
	let selectedClient = undefined;
	let message = '';

	const currentTenant = getContext('currentTenant');
	const headers = { 'X-User-Tenant': $currentTenant.currentUserTenant.id };
	onMount(async () => {
		try {
			const response = await fetch(`/api/tenants/${$currentTenant.id}/client`, { headers });
			clients = [...(await response.json())];
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

	async function handleCloseModal(event) {
		createModal = event.detail;
		handleAlert('Client created succesfully!');

		const response = await fetch(`/api/tenants/${$currentTenant.id}/client`, { headers });
		clients = [...(await response.json())];
	}

	async function handleEdit(client) {
		selectedClient = client;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('Client edited succesfully!');

		const response = await fetch(`/api/tenants/${$currentTenant.id}/client`, { headers });
		clients = [...(await response.json())];
	}

	async function handleDelete(clientId) {
		selectedId = clientId;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('Client deleted succesfully!');

		const response = await fetch(`/api/tenants/${$currentTenant.id}/client`, { headers });
		clients = [...(await response.json())];
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Modal bind:open={createModal} size="xs">
		<ClientForm data={data.form} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal bind:open={editModal} size="xs">
		<ClientForm data={data.form} {selectedClient} on:formvalid={handleCloseEditModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={deleteModal}>
		<DeleteClientForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
	</Modal>

	<Card size="xl" padding="md" class="flex w-full max-h-[33rem] md:w-auto mt-5">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (createModal = true)}>
					Add Client
				</GradientButton>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">NAME</TableHeadCell>
				<TableHeadCell class="text-center">EMAIL</TableHeadCell>
				<TableHeadCell class="text-center">PHONE NUMBER</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each clients as client}
					<TableBodyRow>
						<TableBodyCell class="text-center">{client.name}</TableBodyCell>
						<TableBodyCell class="text-center">{client.email}</TableBodyCell>
						<TableBodyCell class="text-center">{client.phoneNumber}</TableBodyCell>
						<TableBodyCell class="flex w-32 justify-between">
							<FileEditSolid class="text-gray-400" on:click={() => handleEdit(client)} />
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(client.id)} />
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
