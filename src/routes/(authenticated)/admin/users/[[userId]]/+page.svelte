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
	import { TrashBinSolid, FileEditSolid, CheckSolid } from 'flowbite-svelte-icons';
	import CreateUserForm from '$lib/components/forms-components/users/CreateUserForm.svelte';
	import DeleteUserForm from '$lib/components/forms-components/users/DeleteUserForm.svelte';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
    
	export let data: PageData;
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let selectedId = '';
	let message = '';

	
	function handleAlert(text){
		showAlert = true;
		message = text;
		setTimeout(() => {
			showAlert = false;
		}, 4000);
	}

	function handleCloseModal(event) {
		createModal = event.detail;
		handleAlert("User created succesfully!");
	}
	
	async function handleEdit(userId) {
		await goto('/admin/users/'+userId)
		selectedId = userId;
		editModal = true;
	}
	
	async function handleCloseEditModal(event) {
		editModal = event.detail;
		await goto('/admin/users');
		handleAlert("User edited succesfully!");
    }
	
	
	async function handleDelete(userId) {
		await goto('/admin/users/'+userId)
		selectedId = userId;
		deleteModal = true;
	}
	
	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		await goto('/admin/users');
		handleAlert("User deleted succesfully!");
	}
</script>

<Modal size="xs" padding="md" bind:open={createModal}>
	<CreateUserForm {data} on:formvalid={handleCloseModal} /> 
</Modal>

<Modal size="xs" padding="md" bind:open={editModal} on:close={handleCloseEditModal}>
	<CreateUserForm {data} on:formvalid={handleCloseEditModal} />
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
				{#each data.users as user}
					<TableBodyRow>
						<TableBodyCell class="text-center">{user.user.email}</TableBodyCell>
						<TableBodyCell class="text-center">{user.user.name || '-'}</TableBodyCell>
						<TableBodyCell class="text-center">{user.company?.name}</TableBodyCell>
						<TableBodyCell class="text-center">{user.role}</TableBodyCell>
						<TableBodyCell class=" flex w-32 justify-between">
							<FileEditSolid class="text-gray-400" on:click={() => handleEdit(user.id)}/>
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(user.id)}/>
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
