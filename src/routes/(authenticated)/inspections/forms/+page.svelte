<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { CustomForm } from '@prisma/client';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, constraints } = superForm(data.form);

	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Table,
		Button,
		Modal,
		Label,
		Input,
		PaginationItem
	} from 'flowbite-svelte';
	import { ArrowLeftSolid, ArrowRightSolid } from 'flowbite-svelte-icons';

	let searchTerm = '';
	let createFormModal = false;

	const previous = () => goto(`/inspections/forms?page=${data.pagination.prev_page}`);
	const next = () => goto(`/inspections/forms?page=${data.pagination.next_page}`);
</script>

<section class="flex flex-col w-full sm:w-2/3 p-4 gap-4">
	<div class="flex justify-end">
		<Button color="blue" on:click={() => (createFormModal = true)}>Create new form</Button>
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

	<Table>
		<TableHead>
			<TableHeadCell>Form Name</TableHeadCell>
			<TableHeadCell>Cards</TableHeadCell>
			<TableHeadCell>Created</TableHeadCell>
			<TableHeadCell>Action</TableHeadCell>
		</TableHead>
		<TableBody>
			{#if data.customForms}
				{#each data.customForms as form}
					<TableBodyRow>
						<TableBodyCell>{form.name}</TableBodyCell>
						<TableBodyCell>{form.cards.length}</TableBodyCell>
						<TableBodyCell>
							{form.createdAt.getDate()} /
							{form.createdAt.getMonth() + 1} /
							{form.createdAt.getFullYear()}
						</TableBodyCell>
						<TableBodyCell><a href={`forms/${form.id}`}>Edit</a></TableBodyCell>
					</TableBodyRow>
				{/each}
			{:else}
				No data
			{/if}
		</TableBody>
	</Table>
	<Modal title="Create new form" bind:open={createFormModal} autoclose={false}>
		<form class="space-y-6" method="post">
			<Label for="form_name" class="block mb-2">Form name</Label>
			<Input
				id="form_name"
				name="form_name"
				placeholder="Type here"
				required
				bind:value={$form.form_name}
				{...$constraints.form_name}
			/>

			<Button type="submit">Save</Button>
			<Button on:click={() => (createFormModal = false)} color="alternative">Cancel</Button>
		</form>
	</Modal>
</section>
