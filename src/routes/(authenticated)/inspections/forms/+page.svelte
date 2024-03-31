<script lang="ts">
	import type { PageData } from './$types';
	import type { CustomForm } from '@prisma/client';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';

	export let data: PageData;

	const { form, constraints } = superForm(data.form);

	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Button,
		Modal,
		Label,
		Input
	} from 'flowbite-svelte';

	let searchTerm = '';
	let createFormModal = false;
	let customForms: CustomForm[] = data.customForms;

	$: filteredForms = customForms.filter(
		(item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

<section class="flex flex-col w-full sm:w-2/3 p-4">
	<div class="flex justify-end">
		<Button color="blue" on:click={() => (createFormModal = true)}>Create new form</Button>
	</div>
	<TableSearch classInput="w-64" placeholder="Search" bind:inputValue={searchTerm}>
		<TableHead>
			<TableHeadCell>Form Name</TableHeadCell>
			<TableHeadCell>Cards</TableHeadCell>
			<TableHeadCell>Created</TableHeadCell>
			<TableHeadCell>Action</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each filteredForms as form}
				<TableBodyRow>
					<TableBodyCell>{form.name}</TableBodyCell>
					<TableBodyCell>{form.cards.length}</TableBodyCell>
					<TableBodyCell>
						{form.createdAt.getDate() + 1} /
						{form.createdAt.getMonth() + 1} /
						{form.createdAt.getFullYear()}
					</TableBodyCell>
					<TableBodyCell><a href={`${$page.url.href}/${form.id}`}>Edit</a></TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
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
