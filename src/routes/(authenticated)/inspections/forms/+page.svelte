<script lang="ts">
	import type { PageData } from './$types';
	import { goto, invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import axios from 'axios';
	import type { CustomForm } from '@prisma/client';

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
		Badge,
		Spinner
	} from 'flowbite-svelte';
	import {
		ArrowLeftSolid,
		ArrowRightSolid,
		EditOutline,
		FileExportOutline,
		FileImportOutline
	} from 'flowbite-svelte-icons';
	import CheckBoxItem from '$lib/components/checkboxs/CheckBoxItem.svelte';

	let createFormModal = false;

	const previous = () => {
		goto(`/inspections/forms?page=${data.pagination.prev_page}`);
	};
	const next = () => {
		goto(`/inspections/forms?page=${data.pagination.next_page}`);
	};

	function removeData(obj) {
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

	const exportForm = (form) => {
		const content = removeData(form);

		const url = URL.createObjectURL(new Blob([JSON.stringify(content)], { type: 'text/plain' }));

		const element = document.createElement('a');
		element.href = url;
		element.setAttribute('download', `${Math.floor(Date.now() / 1000)}.ladatec-forms.json`);

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	let isSelectExportForms = false;
	let formsToExport = [];

	const toggleForm = (form) => {
		if (formsToExport.find((el) => el.id === form.id)) {
			formsToExport = formsToExport.filter((el) => el.id !== form.id);
		} else {
			formsToExport = [...formsToExport, form];
		}
	};

	let isImportingForm = false;
	const importForm = (event) => {
		const file = event.target.files?.item(0);

		if (file) {
			isImportingForm = true;
			const reader = new FileReader();

			reader.onload = async function (e) {
				const content = e.target.result;
				try {
					await axios.post('/api/custom-forms/import-form', {
						form: content
					});
					invalidateAll();
				} catch (error) {
					console.error('Error al importar el archivo JSON:', error);
				}
			};

			reader.readAsText(file);

			isImportingForm = false;
		}
	};
</script>

<section class="flex flex-col w-full sm:w-2/3 p-4 gap-4">
	<div class="flex gap-4 justify-end">
		<Button color="blue" on:click={() => (createFormModal = true)}>Create new form</Button>
	</div>

	<div class="flex justify-end gap-4">
		<Button color="light" on:click={() => document.getElementById('select-form').click()}>
			{#if isImportingForm}
				<Spinner class="me-3" size="4" /> Importing...
			{:else}
				Import Form
			{/if}
		</Button>
		<input
			id="select-form"
			on:change={importForm}
			type="file"
			accept=".ladatec-forms.json"
			class="hidden"
		/>

		<Button
			size="sm"
			color="light"
			on:click={() => {
				isSelectExportForms = !isSelectExportForms;

				if (!isSelectExportForms) formsToExport.length = 0;
			}}>{isSelectExportForms ? 'Cancel' : 'Export forms'}</Button
		>

		{#if isSelectExportForms}
			<Button
				size="sm"
				color="blue"
				on:click={() => {
					if (formsToExport.length > 0) {
						exportForm(formsToExport);
						formsToExport.length = 0;
						isSelectExportForms = false;
					}
				}}
			>
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
