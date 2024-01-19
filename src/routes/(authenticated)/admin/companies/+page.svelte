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
	import { TrashBinSolid, FileEditSolid, InfoCircleSolid,CheckSolid  } from 'flowbite-svelte-icons';
	import CreateCompanyForm from '$lib/components/forms-components/companies/CreateCompanyForm.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let showAlert = false;
	let popupModal = false;

	function handleCloseModal(event) {
		popupModal = event.detail;
		showAlert = true;

		setTimeout(() => {
			showAlert = false;
		}, 4000);
	}
</script>

<Modal bind:open={popupModal} size="xs">
	<CreateCompanyForm data={data} on:formvalid={handleCloseModal} />
</Modal>

<div>
	<Card size="9xl">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton shadow color="blue" on:click={() => (popupModal = true)}
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
				{#each data.companies as company}	
				<TableBodyRow>
					<TableBodyCell class="text-center">{company.name}</TableBodyCell>
					<TableBodyCell class="text-center">{company.email}</TableBodyCell>
					<TableBodyCell class="text-center">{company.owner?.email || "-"}</TableBodyCell>
					<TableBodyCell class="text-center"><a class="cursor-pointer">See users</a></TableBodyCell>
					<TableBodyCell class=" flex w-32 justify-between">
						<FileEditSolid class="text-gray-400" />
						<TrashBinSolid class="text-red-500" />
					</TableBodyCell>
				</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</Card>


	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4" color="green" dismissable>
			<CheckSolid slot="icon" class="w-4 h-4" />
			Company succesfully created!
		</Alert>
	{/if}
</div>
