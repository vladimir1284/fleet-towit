<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Modal,
		Label,
		Select,
		PaginationItem,
		Badge
	} from 'flowbite-svelte';
	import { ArrowLeftSolid, ArrowRightSolid } from 'flowbite-svelte-icons';

	export let data: PageData;

	const previous = () => goto(`/inspections?page=${data.pagination.prev_page}`);
	const next = () => goto(`/inspections?page=${data.pagination.next_page}`);

	let customFormSelected = '';
	let vehicleSelected = '';
	let openModal = false;
</script>

<section class="flex flex-col w-full sm:w-2/3 p-4 gap-4">
	<div class="flex justify-end gap-4">
		<Button color="blue" on:click={() => (openModal = true)}>Create inspection</Button>
		<Button color="blue" href={`${$page.url.pathname}/forms`}>Forms</Button>
	</div>
	<!-- pagination buttons -->
	<div class="flex space-x-3 rtl:space-x-reverse">
		{#if data.pagination.has_prev_page}
			<PaginationItem class="flex items-center" on:click={previous}>
				<ArrowLeftSolid class="me-2 w-3.5 h-3.5" />
				Previous
			</PaginationItem>
		{/if}

		{#if data.pagination.has_next_page}
			<PaginationItem class="flex items-center" on:click={next}>
				Next
				<ArrowRightSolid class="ms-2 w-3.5 h-3.5" />
			</PaginationItem>
		{/if}
	</div>
	<!-- list inspections -->
	<Table>
		<TableHead>
			<TableHeadCell>Id</TableHeadCell>
			<TableHeadCell>Form</TableHeadCell>
			<TableHeadCell>Created</TableHeadCell>
			<TableHeadCell>Action</TableHeadCell>
		</TableHead>
		<TableBody>
			{#if data.inspections}
				{#each data.inspections as inspection}
					<TableBodyRow>
						<TableBodyCell>{inspection.id}</TableBodyCell>
						<TableBodyCell
							>{inspection.customForm.name}

							{#if !inspection.responses.length}
								<Badge color="red">Incomplete</Badge>
							{/if}
						</TableBodyCell>
						<TableBodyCell>
							{inspection.createdAt.getDate()} /
							{inspection.createdAt.getMonth() + 1} /
							{inspection.createdAt.getFullYear()}
						</TableBodyCell>
						<TableBodyCell>
							{#if !inspection.responses.length}
								<a href={`${$page.url.pathname}/create/${inspection.id}`}>Complete</a>
							{:else}
								<a href={`${$page.url.pathname}/exception-report/${inspection.id}`}>Read</a>
							{/if}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{:else}
				No data
			{/if}
		</TableBody>
	</Table>
	<!-- modal -->
	<Modal title="Create inspection" bind:open={openModal}>
		<form class="space-y-6" method="post">
			<input type="hidden" name="form_id" bind:value={customFormSelected} />
			<input type="hidden" name="vehicle_id" bind:value={vehicleSelected} />

			<Label class="block mb-2"
				>Select form
				<Select items={data.listCustomForm} bind:value={customFormSelected} required />
			</Label>

			<Label class="block mb-2"
				>Select vehicle
				<Select items={data.listVehicles} bind:value={vehicleSelected} required />
			</Label>

			<Button type="submit">Create</Button>
			<Button on:click={() => (openModal = false)} color="alternative">Cancel</Button>
		</form>
	</Modal>
</section>