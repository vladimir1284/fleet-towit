<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
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
		Select
	} from 'flowbite-svelte';

	export let data: PageData;

	let customFormSelected = '';
	let vehicleSelected = '';
	let openModal = false;
</script>

<section class="flex flex-col w-full sm:w-2/3 p-4 gap-4">
	<div class="flex justify-end gap-4">
		<Button color="blue" on:click={() => (openModal = true)}>Create inspection</Button>
		<Button color="blue" href={`${$page.url.pathname}/forms`}>Forms</Button>
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
			{#each data.inspections as inspection}
				<TableBodyRow>
					<TableBodyCell>{inspection.id}</TableBodyCell>
					<TableBodyCell>{inspection.customForm.name}</TableBodyCell>
					<TableBodyCell>
						{inspection.createdAt.getDate() + 1} /
						{inspection.createdAt.getMonth() + 1} /
						{inspection.createdAt.getFullYear() + 1}
					</TableBodyCell>
					<TableBodyCell
						><a href={`${$page.url.pathname.replace('register', `make/${inspection.id}`)}/`}>Read</a
						></TableBodyCell
					>
				</TableBodyRow>
			{/each}
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
