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
	import { onMount } from 'svelte';

	import { tenantActor } from '$lib/store/context-store';
	import UsersTable from '$lib/components/forms-components/users/UsersTable.svelte';

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
			const response = await fetch('/api/tenants', { headers });
			tenants = [...(await response.json())];
			let usersList = await Promise.all(
				tenants.map(async (tenant) => {
					let tempList = await fetch(`/api/tenants/${tenant.id}/users`, { headers });
					let tenantUsersList = await tempList.json();
					let augmentedTenantUser = await Promise.all(
						tenantUsersList.map(async (_user) => {
							return { ..._user, tenant };
						})
					);
					return augmentedTenantUser;
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

	async function handleEdit(event) {
		selectedUser = event.detail;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('User edited succesfully!');
		location.reload();
	}

	async function handleDelete(event) {
		selectedId = event.detail;
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
		<CreateUserForm {data} tenantsList={tenants} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={editModal} on:close={handleCloseEditModal}>
		<CreateUserForm {data} tenantsList={tenants} selectedUser={selectedUser} on:formvalid={handleCloseEditModal} />
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
			<UsersTable users={users} showOptions on:editUser={handleEdit} on:deleteUser={handleDelete}/>
		</Table>
	</Card>

	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if}
{/if}
