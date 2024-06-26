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
	import axios from 'axios';
	import { TrashBinSolid, FileEditSolid } from 'flowbite-svelte-icons';
	import TenantForm from '$lib/components/forms-components/tenants/TenantForm.svelte';
	import DeleteTenantForm from '$lib/components/forms-components/tenants/DeleteTenantForm.svelte';
	import type { PageData } from '../$types';
	import { onMount } from 'svelte';
	import UsersTable from '$lib/components/forms-components/users/UsersTable.svelte';
	import { getContext } from 'svelte';

	export let data: PageData;
	let tenants = [];
	let users = [];
	let showAlert = false;
	let showUsers = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let loading = false;
	let selectedId = '';
	let selectedTenant = undefined;
	let selectedTenantUsersList = undefined;
	let message = '';

	const currentTenant = getContext('currentTenant');

	async function loadData() {
		loading = true;
		await axios
			.get('/api/tenants')
			.then(async (response) => {
				tenants = [...response.data];
				return axios.get('/api/tenants/users');
			})
			.then((usersResponse) => {
				users = [...usersResponse.data];
				loading = false;
			})
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

	async function handleUsers(tenant) {
		await axios
			.get(`/api/tenants/${tenant.id}/users`)
			.then(async (response) => {
				selectedTenantUsersList = response.data;
			})
			.catch((error) => {
				console.error('Error:', error);
			})
			.finally(() => {
				showUsers = true;
			})
	}

	async function handleCloseModal(event) {
		createModal = event.detail;
		handleAlert('Tenant created succesfully!');

		loadData();
	}

	async function handleEdit(tenant) {
		selectedTenant = tenant;
		console.log('tenant ', selectedTenant);
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('Tenant edited succesfully!');

		loadData();
	}

	async function handleDelete(tenantId) {
		selectedId = tenantId;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('Tenant deleted succesfully!');

		loadData();
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Modal bind:open={createModal} size="xs">
		<TenantForm {data} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal bind:open={editModal} size="xs">
		<TenantForm {data} {selectedTenant} usersList={users} on:formvalid={handleCloseEditModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={deleteModal}>
		<DeleteTenantForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
	</Modal>

	<Modal size="md" padding="md" bind:open={showUsers}>
		<Table>
			<UsersTable users={selectedTenantUsersList} />
		</Table>
	</Modal>

	<Card size="xl" padding="md" class="flex w-full max-h-[33rem] md:w-auto mt-5">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (createModal = true)}
					>Create Tenant</GradientButton
				>
			</caption>
			<TableHead>
				<TableHeadCell class="text-center">TENANT NAME</TableHeadCell>
				<TableHeadCell class="text-center">TENANT EMAIL</TableHeadCell>
				<TableHeadCell class="text-center">TENANT OWNER</TableHeadCell>
				<TableHeadCell class="text-center">TENANT USERS</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each tenants as tenant}
					<TableBodyRow>
						<TableBodyCell class="text-center">{tenant.name}</TableBodyCell>
						<TableBodyCell class="text-center">{tenant.email}</TableBodyCell>
						<TableBodyCell class="text-center">
							{tenant.owner ? tenant.owner?.user.name ?? tenant.owner.user.email : '-'}
						</TableBodyCell>
						<TableBodyCell
							class="text-center text-blue-500 cursor-pointer"
							on:click={() => handleUsers(tenant)}
						>
							See users
						</TableBodyCell>
						<TableBodyCell class="flex w-32 justify-between">
							<FileEditSolid class="text-gray-400" on:click={() => handleEdit(tenant)} />
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(tenant.id)} />
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
