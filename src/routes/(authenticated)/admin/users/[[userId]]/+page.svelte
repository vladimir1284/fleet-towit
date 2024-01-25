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
	import CreateUserForm from '$lib/components/forms-components/users/CreateUserForm.svelte';
	import DeleteUserForm from '$lib/components/forms-components/users/DeleteUserForm.svelte';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: PageData;
	let companies = [];
	let users = [];
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let selectedId = '';
	let message = '';

	let loading = true;

	onMount(async () => {
		try {
			console.log('cargando');
			const response = await fetch('/api/companies');
			companies = [...(await response.json())];
			let usersList = await Promise.all(
				companies.map(async (company) => {
					let tempList = await fetch(`/api/companies/${company.id}/users`);
					let companyUsersList = await tempList.json();
					let augmentedCompanyUser = await Promise.all(
						companyUsersList.map(async (_user) => {
							return {..._user, company}
						})
					);
					return augmentedCompanyUser;
				})
			);
			users = [...usersList.flat()];
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
		handleAlert('User created succesfully!');
		location.reload();
	}

	async function handleEdit(userId) {
		await goto('/admin/users/' + userId);
		selectedId = userId;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('User edited succesfully!');
		location.reload();
		
	}

	async function handleDelete(userId) {
		await goto('/admin/users/' + userId);
		selectedId = userId;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('User deleted succesfully!');
		location.reload();
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Modal size="xs" padding="md" bind:open={createModal}>
		<CreateUserForm data={data} companiesList={companies} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={editModal} on:close={handleCloseEditModal}>
		<CreateUserForm data={data} companiesList={companies} on:formvalid={handleCloseEditModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={deleteModal}>
		<DeleteUserForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
	</Modal>

	<div>
		<Card size="9xl">
			<Table>
				<caption
					class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
				>
					<GradientButton shadow color="blue" on:click={() => (createModal = true)}
						>Create user</GradientButton
					>
				</caption>
				<TableHead>
					<TableHeadCell class="text-center">EMAIL</TableHeadCell>
					<TableHeadCell class="text-center">NAME</TableHeadCell>
					<TableHeadCell class="text-center">COMPANY</TableHeadCell>
					<TableHeadCell class="text-center">ROLE</TableHeadCell>
					<TableHeadCell class="text-center"></TableHeadCell>
				</TableHead>
				<TableBody class="divide-y">
					{#each users as user}
						<TableBodyRow>
							<TableBodyCell class="text-center">{user.user.email}</TableBodyCell>
							<TableBodyCell class="text-center">{user.user.name || '-'}</TableBodyCell>
							<TableBodyCell class="text-center">{user.company?.name}</TableBodyCell>
							<TableBodyCell class="text-center">{user.role}</TableBodyCell>
							<TableBodyCell class=" flex w-32 justify-between">
								<FileEditSolid class="text-gray-400" on:click={() => handleEdit(user.id)} />
								<TrashBinSolid class="text-red-500" on:click={() => handleDelete(user.id)} />
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
