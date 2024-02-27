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
	import RentalPlanForm from '$lib/components/forms-components/plans/RentalPlanForm.svelte';
	import DeleteTenantForm from '$lib/components/forms-components/tenants/DeleteTenantForm.svelte';
	import type { PageData } from '../$types';
	import { onMount } from 'svelte';
	import { tenantActor } from '$lib/store/context-store';
	import DeletePlanForm from '$lib/components/forms-components/plans/DeletePlanForm.svelte';

	export let data: PageData;
	let plans = [];
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let loading = false;
	let selectedId = '';
	let selectedPlan = undefined;
	let message = '';

	const currentTenant = tenantActor.getSnapshot().context.currentTenant;
	const headers = { 'X-User-Tenant': currentTenant.currentUserTenant.id };
	onMount(async () => {
		try {
			const response = await fetch(`/api/tenants/${currentTenant.id}/rentalPlan`, { headers });
			plans = [...(await response.json())];
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
		handleAlert('Plan created succesfully!');
		location.reload();
	}

	async function handleEdit(rentalPlan) {
		selectedPlan = rentalPlan;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('Plan edited succesfully!');
		location.reload();
	}

	async function handleDelete(rentalPlanId) {
		selectedId = rentalPlanId;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('Plan deleted succesfully!');
		location.reload();
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Modal bind:open={createModal} size="xs">
		<RentalPlanForm {data} on:formvalid={handleCloseModal} />
	</Modal>

	<Modal bind:open={editModal} size="xs">
		<RentalPlanForm {data} {selectedPlan} on:formvalid={handleCloseEditModal} />
	</Modal>

	<Modal size="xs" padding="md" bind:open={deleteModal}>
		<DeletePlanForm data={selectedId} on:formvalid={handleCloseDeleteModal} />
	</Modal>

	<Card size="xl" padding="md" class="fixed w-full md:w-auto h-auto z-0">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (createModal = true)}>
					Create Plan
				</GradientButton>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">PLAN NAME</TableHeadCell>
				<TableHeadCell class="text-center">PLAN AMOUNT</TableHeadCell>
				<TableHeadCell class="text-center">PLAN PERIODICITY</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each plans as plan}
					<TableBodyRow>
						<TableBodyCell class="text-center">{plan.name}</TableBodyCell>
						<TableBodyCell class="text-center">{plan.amount}</TableBodyCell>
						<TableBodyCell class="text-center">{plan.periodicity}</TableBodyCell>
						<TableBodyCell class="flex w-32 justify-between">
							<FileEditSolid class="text-gray-400" on:click={() => handleEdit(plan)} />
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(plan.id)} />
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
