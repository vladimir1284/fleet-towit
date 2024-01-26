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
	import CreateCompanyForm from '$lib/components/forms-components/companies/CreateCompanyForm.svelte';
	import DeleteCompanyForm from '$lib/components/forms-components/companies/DeleteCompanyForm.svelte';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: PageData;
	let companies = [];
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let loading = false;
	let selectedId = '';
	let message = '';

	onMount(async () => {
		try {
			console.log('cargando');
			const response = await fetch('/api/companies');
			companies = [...(await response.json())];
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
		handleAlert('Company created succesfully!');
		location.reload();
	}

	async function handleEdit(companyId) {
		await goto('/admin/companies/' + companyId);
		selectedId = companyId;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('Company edited succesfully!');
		location.reload();
	}

	async function handleDelete(companyId) {
		await goto('/admin/companies/' + companyId);
		selectedId = companyId;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('Company deleted succesfully!');
		location.reload();
	}
</script>



{#if loading}
	<p>Loading...</p>
{:else}

<Modal bind:open={createModal} size="xs">
	<CreateCompanyForm {data} on:formvalid={handleCloseModal} />
</Modal>

<Modal bind:open={editModal} size="xs">
	<CreateCompanyForm {data} on:formvalid={handleCloseEditModal} />
</Modal>

<Modal size="xs" padding="md" bind:open={deleteModal}>
	<DeleteCompanyForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
</Modal>

<div>
	<Card size="9xl">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (createModal = true)}
					>Create Company</GradientButton
				>
			</caption>
			<TableHead>
				<TableHeadCell class="text-center">COMPANY NAME</TableHeadCell>
				<TableHeadCell class="text-center">COMPANY EMAIL</TableHeadCell>
				<TableHeadCell class="text-center">COMPANY OWNER</TableHeadCell>
				<TableHeadCell class="text-center">COMPANY USERS</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each companies as company}
					<TableBodyRow>
						<TableBodyCell class="text-center">{company.name}</TableBodyCell>
						<TableBodyCell class="text-center">{company.email}</TableBodyCell>
						<TableBodyCell class="text-center">{company.owner?.email || '-'}</TableBodyCell>
						<TableBodyCell class="text-center"
							><a class="cursor-pointer" href="./companies">See users</a></TableBodyCell
						>
						<TableBodyCell class=" flex w-32 justify-between">
							<FileEditSolid class="text-gray-400" on:click={() => handleEdit(company.id)} />
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(company.id)} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</Card>

	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4" color="green" dismissable>
			{message}
		</Alert>
	{/if}
</div>

{/if}
