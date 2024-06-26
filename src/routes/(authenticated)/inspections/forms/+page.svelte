<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
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
		PaginationItem,
		Tooltip,
		Badge
	} from 'flowbite-svelte';
	import CheckBoxItem from '$lib/components/checkboxs/CheckBoxItem.svelte';
	import {
		ArrowLeftSolid,
		ArrowRightSolid,
		EditOutline,
		FileExportOutline
	} from 'flowbite-svelte-icons';

	let createFormModal = false;

	const previous = () => {
		goto(`/inspections/forms?page=${data.pagination.prev_page}`);
	};
	const next = () => {
		goto(`/inspections/forms?page=${data.pagination.next_page}`);
	};

	function removeData(obj: any) {
		if (!obj || typeof obj !== 'object') {
			return obj;
		}

		const newObj = Array.isArray(obj) ? [] : {};

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				if (['id', 'createdAt', 'formId', 'isActive', 'tenantId', 'cardId'].includes(key)) {
					continue;
				}
				newObj[key] = typeof obj[key] === 'object' ? removeData(obj[key]) : obj[key];
			}
		}

		return newObj;
	}

	const exportForm = (form: any) => {
		const content = removeData(form);

		const url = URL.createObjectURL(new Blob([JSON.stringify(content)], { type: 'text/plain' }));

		const element = document.createElement('a');
		element.href = url;
		element.setAttribute('download', `form.ladatec.json`);

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	let isSelectExportForms = false;
	let formsToExport: any = [];

	const toggleForm = (form: any) => {
		if (formsToExport.find((el: any) => el.id === form.id)) {
			formsToExport = formsToExport.filter((el: any) => el.id !== form.id);
		} else {
			formsToExport = [...formsToExport, form];
		}
	};
</script>

<section class="flex flex-col w-full sm:w-2/3 p-4 gap-4">
	<div class="flex gap-4 justify-end">
		<Button color="blue" on:click={() => (createFormModal = true)}>Create new form</Button>
	</div>

	<div class="flex justify-end gap-4">
		<Button color="light">Import Form</Button>

		<Button
			size="sm"
			color="light"
			on:click={() => {
				isSelectExportForms = !isSelectExportForms;

				if (!isSelectExportForms) formsToExport.length = 0;
			}}>{isSelectExportForms ? 'Cancel' : 'Export forms'}</Button
		>

		{#if isSelectExportForms}
			<Button size="sm" color="blue" on:click={() => exportForm(formsToExport)}>
				Export
				<Badge class="ml-2">{formsToExport.length}</Badge>
			</Button>
		{/if}
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
			{#if isSelectExportForms}
				<TableHeadCell>Select</TableHeadCell>
			{/if}
		</TableHead>
		<TableBody>
			{#each data.customForms as form}
				<TableBodyRow>
					<TableBodyCell>{form.name}</TableBodyCell>
					<TableBodyCell>{form.cards.length}</TableBodyCell>
					<TableBodyCell>
						{form.createdAt.getDate()} /
						{form.createdAt.getMonth() + 1} /
						{form.createdAt.getFullYear()}
					</TableBodyCell>
					<TableBodyCell>
						<div class="flex gap-4">
							<!-- edit form -->
							<Button size="xs" href={`forms/${form.id}`} color="alternative">
								<EditOutline />
							</Button>
							<Tooltip>Edit form</Tooltip>
							<!-- export form as json -->
							<Button size="xs" color="alternative" on:click={() => exportForm(form)}
								><FileExportOutline /></Button
							>
							<Tooltip>Export form as file</Tooltip>
						</div>
					</TableBodyCell>
					{#if isSelectExportForms}
						<TableBodyCell>
							<CheckBoxItem {formsToExport} {form} {toggleForm} />
						</TableBodyCell>
					{/if}
				</TableBodyRow>
			{/each}
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