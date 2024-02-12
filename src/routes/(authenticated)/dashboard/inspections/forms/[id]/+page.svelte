<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { FormFieldType } from '@prisma/client';
	import { Button, Input, Label, Select, Helper } from 'flowbite-svelte';
	import {
		TrashBinOutline,
		PenOutline,
		CheckOutline,
		CloseOutline
	} from 'flowbite-svelte-icons';
	import DeleteCustomFromModal from '$lib/components/forms-components/custom-forms/DeleteCustomFormModal.svelte';
	import DeleteCardModal from '$lib/components/forms-components/custom-forms/DeleteCardModal.svelte';

	export let data: PageData;

	const { form, constraints } = superForm(data.form);

	// modals
	let openDeleteFormModal = false;
	const handleDeleteFormModalClose = () => (openDeleteFormModal = false);

	let openDeleteCardModal = false;
	const handleDeleteCardModalClose = () => (openDeleteCardModal = false);

	// edit form name
	let isEditFormName = false;
	let formName = data.customForm?.name;

	// edit card
	let isEditCard = false;
	let cardTypeSelect: string;
	let newCardName: string;
	const setCardTypeToEdit = (fieldType: FormFieldType) => {
		if (fieldType === FormFieldType.TEXT) cardTypeSelect = 'text';

		if (fieldType === FormFieldType.NUMBER) cardTypeSelect = 'number';
	};

	// delete and edit card
	let idCardSelected: number;

	// select component
	let selected: string;
	let cardTypes = [
		{ value: 'number', name: 'Data Entry Numeric' },
		{ value: 'text', name: 'Data Entry Alphanumeric' }
	];
</script>

<section class="flex flex-col gap-4 w-full sm:w-2/3 pb-10 p-1">
	<div class="flex justify-between gap-4 shadow bg-white p-6 rounded-lg">
		{#if isEditFormName}
			<!-- Form -->
			<form
				class="flex flex-wrap lg:flex-nowrap gap-4 md:w-1/2"
				method="post"
				action="?/renameForm"
			>
				<Input
					bind:value={data.customForm.name}
					class="w-full max-w-64"
					placeholder="Type here"
					name="new_form_name"
					required
				/>
				<input name="form_id" type="hidden" bind:value={data.customForm.id} />
				<div class="inline-flex gap-4">
					<Button type="submit" outline size="xs" color="light">
						<CheckOutline class="h-5 w-5" />
					</Button>
					<Button
						on:click={() => (isEditFormName = false)}
						type="submit"
						outline
						size="xs"
						color="light"
					>
						<CloseOutline class="h-4 w-4" />
					</Button>
				</div>
			</form>
			<!-- Form -->
		{:else}
			<h5
				class="text-lg lg:text-2xl inline-flex gap-4 font-bold break-all text-gray-900 dark:text-white w-1/2"
			>
				{formName}

				<Button outline size="xs" color="light" class="h-max">
					<PenOutline on:click={() => (isEditFormName = true)} class="h-5 w-5" />
				</Button>
			</h5>
		{/if}

		<Button
			class="w-max h-max"
			size="xs"
			outline
			color="red"
			on:click={() => (openDeleteFormModal = true)}><TrashBinOutline class="h-5 w-5" /></Button
		>
	</div>

	<div class="flex flex-col lg:flex-row gap-4">
		{#if isEditCard}
			<!-- Edit Card -->
			<div class="w-full lg:w-1/2 h-max bg-white rounded-lg shadow p-6">
				<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
					Edit card
				</h5>
				<div>
					<Label>
						Select an option
						<Select class="mt-2" items={cardTypes} bind:value={cardTypeSelect} />
					</Label>
					<Helper class="mt-2">
						{#if selected === 'number'}
							User is able to input numeric data.
						{:else if selected === 'text'}
							User is able to input alphanumeric data.
						{/if}
					</Helper>
				</div>

				<div class="border-t mt-4 py-4">
					<!-- Form -->
					<form method="post" class="space-y-4" action="?/updateField">
						<input name="card_type" type="hidden" bind:value={cardTypeSelect} />
						<input name="card_id" type="hidden" bind:value={idCardSelected} />
						{#if cardTypeSelect === 'number' || cardTypeSelect === 'text'}
							<Label class="space-y-2">
								<span>Card name*</span>
								<Input
									name="new_card_name"
									type="text"
									placeholder="Type here"
									bind:value={newCardName}
								/>
							</Label>
						{/if}

						<div class="inline-flex gap-4">
							<Button on:click={() => (isEditCard = false)} outline color="red">Cancel</Button>
							<Button type="submit" color="blue">Update</Button>
						</div>
					</form>
					<!-- Form -->
				</div>
			</div>
		{:else}
			<!-- Add Card  -->
			<div class="w-full lg:w-1/2 h-max bg-white rounded-lg shadow p-6">
				<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
					Add card
				</h5>
				<div>
					<Label>
						Select an option
						<Select class="mt-2" items={cardTypes} bind:value={selected} />
					</Label>
					<Helper class="mt-2">
						{#if selected === 'number'}
							User is able to input numeric data.
						{:else if selected === 'text'}
							User is able to input alphanumeric data.
						{/if}
					</Helper>
				</div>

				{#if selected}
					<div class="border-t mt-4 py-4">
						<form method="post" class="space-y-4" action="?/addField">
							<input name="form_id" type="hidden" bind:value={data.customForm.id} />
							<input name="card_type" type="hidden" bind:value={selected} />
							{#if selected === 'number' || selected === 'text'}
								<Label class="space-y-2">
									<span>Card name*</span>
									<Input
										name="card_name"
										type="text"
										placeholder="Type here"
										{...$constraints.card_name}
										bind:value={$form.card_name}
									/>
								</Label>
							{/if}

							<div class="inline-flex gap-4">
								<Button on:click={() => (selected = '')} outline color="red">Cancel</Button>
								<Button type="submit" color="blue">Add</Button>
							</div>
						</form>
					</div>
				{/if}
			</div>
		{/if}

		<!-- List Cards -->
		<div class="w-full lg:w-1/2 bg-white rounded-lg shadow p-6 h-max">
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				Cards ({data.customForm.fields.length})
			</h5>
			<div class="grid grid-cols-1 gap-4">
				{#each data.customForm.fields as field}
					<div class="shadow bg-white p-6 rounded-lg">
						<h5 class="font-medium text-lg text-gray-800">
							{field.name}
						</h5>

						{#if field.type === FormFieldType.TEXT}
							{cardTypes[1].name}
						{:else if field.type === FormFieldType.NUMBER}
							{cardTypes[0].name}
						{/if}

						<div class="flex gap-4">
							<Button
								outline
								size="xs"
								color="light"
								on:click={() => {
									idCardSelected = field.id;
									openDeleteCardModal = true;
								}}
							>
								<TrashBinOutline class="h-4 w-4" />
							</Button>
							<Button
								on:click={() => {
									isEditCard = true;
									newCardName = field.name;
									idCardSelected = field.id;
									setCardTypeToEdit(field.type);
								}}
								outline
								size="xs"
								color="light"
							>
								<PenOutline class="h-4 w-4" />
							</Button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Modal to delete Form-->
	<DeleteCustomFromModal
		isOpen={openDeleteFormModal}
		onClose={handleDeleteFormModalClose}
		customFormId={data.customForm.id}
	/>

	<!-- Modal to delete Card-->
	<DeleteCardModal
		isOpen={openDeleteCardModal}
		onClose={handleDeleteCardModalClose}
		customFormId={data.customForm.id}
		{idCardSelected}
	/>
</section>
