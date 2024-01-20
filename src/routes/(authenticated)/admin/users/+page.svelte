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
	import type { PageData } from './$types';

	export let data: PageData;

	let showAlert = false;
	let popupModal = false;
	let deleteModal = false;
	let selectedId = '';

	function handleCloseModal(event) {
		popupModal = event.detail;
		showAlert = true;

		setTimeout(() => {
			showAlert = false;
		}, 4000);
	};

	function handleDelete(userId) {
		deleteModal = true;
		selectedId = userId
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		location.reload();
    
	};

    
</script>

<Modal size="xs" padding="md" bind:open={popupModal}>
	<CreateUserForm data={data} on:formvalid={handleCloseModal} />
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
				<GradientButton shadow color="blue" on:click={() => (popupModal = true)}
					>Create user</GradientButton
				>
			</caption>
			<TableHead>
				<TableHeadCell>EMAIL</TableHeadCell>
				<TableHeadCell>NAME</TableHeadCell>
				<TableHeadCell>ROLE</TableHeadCell>
				<TableHeadCell></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each data.users as user}
				<TableBodyRow>
					<TableBodyCell>{user.user.email}</TableBodyCell>
					<TableBodyCell>{user.user.name || '-'}</TableBodyCell>
					<TableBodyCell>{user.role}</TableBodyCell>
					<TableBodyCell class=" flex w-32 justify-between">
						<a href={'./users/update/'+user.id}>
							<FileEditSolid class="text-gray-400" />
						</a>
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(user.id)}/>
					</TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</Card>


	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4" color="green" dismissable>
			<CheckSolid slot="icon" class="w-4 h-4" />
			User succesfully created!
		</Alert>
	{/if}
</div>
