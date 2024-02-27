<script lang="ts">
	// @ts-nocheck
	import { Card, GradientButton, Table, Modal, Alert } from 'flowbite-svelte';
	import DeleteUserForm from '$lib/components/forms-components/users/DeleteUserForm.svelte';
	import UsersTable from '$lib/components/forms-components/users/UsersTable.svelte';
	import UserForm from '$lib/components/forms-components/users/UserForm.svelte';
	import { tenantActor } from '$lib/store/context-store';
	import type { PageData } from '../$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let tenants = [];
	let users = [];
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let selectedUser = undefined;
	let selectedId = '';
	let message = '';

	let loading = true;

	const currentTenant = tenantActor.getSnapshot().context.currentTenant;
	const headers = { 'X-User-Tenant': currentTenant.currentUserTenant.id };

	onMount(async () => {
		try {
			const response = await fetch(`/api/tenants/${currentTenant.id}/users`, { headers });
			users = await response.json();
			const tenantsResponse = await fetch('/api/tenants', { headers });
			tenants = await tenantsResponse.json();
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
		handleAlert('User created succesfully!');

		const response = await fetch(`/api/tenants/${currentTenant.id}/users`, { headers });
		users = await response.json();
		const tenantsResponse = await fetch('/api/tenants', { headers });
		tenants = await tenantsResponse.json();
	}

	async function handleEdit(event) {
		selectedUser = event.detail;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('User edited succesfully!');

		const response = await fetch(`/api/tenants/${currentTenant.id}/users`, { headers });
		users = await response.json();
		const tenantsResponse = await fetch('/api/tenants', { headers });
		tenants = await tenantsResponse.json();
	}

	async function handleDelete(event) {
		selectedId = event.detail;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('User deleted succesfully!');

		const response = await fetch(`/api/tenants/${currentTenant.id}/users`, { headers });
		users = await response.json();
		const tenantsResponse = await fetch('/api/tenants', { headers });
		tenants = await tenantsResponse.json();
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Modal size="xs" padding="md" bind:open={createModal}>
		<UserForm {data} tenantsList={tenants} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={editModal} on:close={handleCloseEditModal}>
		<UserForm {data} tenantsList={tenants} {selectedUser} on:formvalid={handleCloseEditModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={deleteModal}>
		<DeleteUserForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
	</Modal>

	<Card size="xl" padding="lg" class="fixed w-full md:w-auto h-auto z-0">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (createModal = true)}
					>Create user</GradientButton
				>
			</caption>
			<UsersTable {users} showOptions on:editUser={handleEdit} on:deleteUser={handleDelete} />
		</Table>
	</Card>

	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if}
{/if}
