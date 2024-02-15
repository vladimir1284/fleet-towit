<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { FormFieldType, CheckOption } from '@prisma/client';
	import { Button, Input, Label, Select, Helper } from 'flowbite-svelte';
	import {
		TrashBinOutline,
		PenOutline,
		CheckOutline,
		CloseOutline,
		PlusOutline
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

	let editCheckOptions: (CheckOption | string)[];
	$: stringifyEditCheckOptions = JSON.stringify(editCheckOptions);

	// FIXME : hay un error aqui no se cambia bien
	let cardTypeSelect: string;

	let newCardName: string;

	const setCardTypeToEdit = (fieldType: FormFieldType) => {
		if (fieldType === FormFieldType.TEXT) cardTypeSelect = 'text';

		if (fieldType === FormFieldType.NUMBER) cardTypeSelect = 'number';

		if (fieldType === FormFieldType.CHECKBOXES) cardTypeSelect = 'checkboxes';

		console.log(cardTypeSelect);
	};

	// checkboxes input
	let checkBoxes = [''];
	$: stringifyCheckBoxes = JSON.stringify(checkBoxes);

	// delete and edit card
	let idCardSelected: number;

	// select component
	let selected: string;

	let cardTypes = [
		{
			value: 'number',
			name: 'Data Entry Numeric',
			description: 'User is able to input numeric data.'
		},
		{
			value: 'text',
			name: 'Data Entry Alphanumeric',
			description: 'User is able to input alphanumeric data.'
		},
		{
			value: 'checkboxes',
			name: 'Checkboxes',
			description: 'User is able to select multiple options.'
		}
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
		<!-- Edit Card -->
		{#if isEditCard}
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
						{#each cardTypes as { value, description }}
							{#if cardTypeSelect === value}
								<p>{description}</p>
							{/if}
						{/each}
					</Helper>
				</div>

				<div class="border-t mt-4 py-4">
					<!-- Form -->
					<form method="post" class="space-y-4" action="?/updateField">
						<input name="card_type" type="hidden" bind:value={cardTypeSelect} />
						<input name="card_id" type="hidden" bind:value={idCardSelected} />
						<input name="checkboxes" type="hidden" bind:value={stringifyEditCheckOptions} />

						<Label class="space-y-2">
							<span>Card name*</span>
							<Input
								name="new_card_name"
								type="text"
								placeholder="Type here"
								bind:value={newCardName}
							/>
						</Label>

						<!-- checkboxes -->

						{#if cardTypeSelect === 'checkboxes'}
							<div class="space-y-4 mb-4">
								{#if editCheckOptions}
									{#each editCheckOptions as options, index}
										<Button
											disabled={editCheckOptions.length <= 1 ? true : false}
											type="button"
											size="xs"
											color="light"
											on:click={() =>
												(editCheckOptions = editCheckOptions.filter((_, i) => i !== index))}
										>
											<CloseOutline class="w-2 h-2" />
										</Button>
										<Label class="space-y-2" key={index}>
											<span>Point {index + 1}*</span>
											{#if options?.id}
												<Input
													type="text"
													placeholder="Type here"
													bind:value={options.name}
													required
												/>
											{:else}
												<Input
													type="text"
													placeholder="Type here"
													bind:value={editCheckOptions[index]}
													required
												/>
											{/if}
										</Label>
									{/each}
								{/if}

								<Button
									color="light"
									size="xs"
									on:click={() => (editCheckOptions = [...editCheckOptions, ''])}
								>
									<PlusOutline class="w-3 h-3 me-2" />
									Add another option</Button
								>
							</div>
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
						{#each cardTypes as { value, description }}
							{#if selected === value}
								<p>{description}</p>
							{/if}
						{/each}
					</Helper>
				</div>

				{#if selected}
					<div class="border-t mt-4 py-4">
						<form method="post" class="space-y-4" action="?/addField">
							<input name="form_id" type="hidden" bind:value={data.customForm.id} />
							<input name="card_type" type="hidden" bind:value={selected} />

							{#if selected}
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
							<!-- checkboxes -->
							{#if selected === 'checkboxes'}
								<input type="hidden" name="checkboxes" bind:value={stringifyCheckBoxes} />

								<div class="space-y-4 mb-4">
									{#each checkBoxes as checkbox, index}
										<Button
											disabled={checkBoxes.length <= 1 ? true : false}
											type="button"
											size="xs"
											color="light"
											on:click={() => (checkBoxes = checkBoxes.filter((_, i) => i !== index))}
										>
											<CloseOutline class="w-2 h-2" />
										</Button>
										<Label class="space-y-2" key={index}>
											<span>Point {index + 1}*</span>
											<Input
												type="text"
												placeholder="Type here"
												bind:value={checkBoxes[index]}
												required
											/>
										</Label>
									{/each}

									<Button
										color="light"
										size="xs"
										on:click={() => (checkBoxes = [...checkBoxes, ''])}
									>
										<PlusOutline class="w-3 h-3 me-2" />
										Add another option</Button
									>
								</div>
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

		<div class="w-full lg:w-1/2 bg-white rounded-lg shadow p-6 h-max">
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				Cards ({data.customForm.fields.length})
			</h5>

			<div class="grid grid-cols-1 gap-4">
				<!-- List Cards -->
				{#each data.customForm.fields as field}
					<div class="shadow bg-white p-6 rounded-lg">
						<h5 class="font-medium text-lg text-gray-800">
							{field.name}
						</h5>

						{#if field.type === FormFieldType.NUMBER}
							<p class="text-blue-500">{cardTypes[0].name}</p>
						{:else if field.type === FormFieldType.TEXT}
							<p class="text-blue-500">{cardTypes[1].name}</p>
						{:else if field.type === FormFieldType.CHECKBOXES}
							<!-- list options -->
							{#if field.checkOptions}
								<ul class="list-disc list-inside">
									{#each field.checkOptions as options}
										<li>
											{options.name}
										</li>
									{/each}
								</ul>
							{/if}
							<p class="text-blue-500">{cardTypes[2].name}</p>
						{/if}

						<div class="flex gap-4">
							<!-- delete button -->
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
							<!-- edit button -->
							<Button
								on:click={() => {
									isEditCard = true;
									newCardName = field.name;
									idCardSelected = field.id;
									setCardTypeToEdit(field.type);
									editCheckOptions = field.checkOptions.length >= 1 ? field.checkOptions : [''];
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
