<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { Button, Input, Label, Select, Helper, Modal, Checkbox } from 'flowbite-svelte';
	import {
		TrashBinOutline,
		PenOutline,
		CheckOutline,
		CloseOutline,
		PlusOutline,
		ArrowDownOutline
	} from 'flowbite-svelte-icons';
	import DeleteCustomFormModal from '$lib/components/forms-components/custom-forms/DeleteCustomFormModal.svelte';
	import DeleteCardModal from '$lib/components/forms-components/custom-forms/DeleteCardModal.svelte';

	export let data: PageData;

	if (data?.redirect_to) goto(`/inspections/forms/${data.redirect_to}/`);

	// modals
	let openDeleteFormModal = false;
	const handlerDeleteFormModalClose = () => (openDeleteFormModal = false);

	let openDeleteCardModal = false;
	const handlerDeleteCardModalClose = () => (openDeleteCardModal = false);

	// delete  card
	let idCardSelected: number;

	// new card
	let cardName: string;

	// edit card ( cardId )
	let editCard: number;

	// edit field (list index)
	let editField: number;

	// edit form name
	let isEditFormName = false;
	let formName = data.customForm?.name;

	//
	let cardTypes = [
		{
			value: data.FormFieldType.NUMBER,
			name: 'Data Entry Numeric',
			description: 'User is able to input numeric data.'
		},
		{
			value: data.FormFieldType.TEXT,
			name: 'Data Entry Alphanumeric',
			description: 'User is able to input alphanumeric data.'
		},
		{
			value: data.FormFieldType.SINGLE_CHECK,
			name: 'Single Check',
			description: 'User is able to check (pass or fail) a single point.'
		},
		{
			value: data.FormFieldType.EMAIL,
			name: 'Email Entry',
			description: 'User is able to input email.'
		},
		{
			value: data.FormFieldType.DATE,
			name: 'Date Entry',
			description: 'User is able to input date.'
		},
		{
			value: data.FormFieldType.TIME,
			name: 'Time Entry',
			description: 'User is able to input time.'
		},
		{
			value: data.FormFieldType.PHONE,
			name: 'Phone Number Entry',
			description: 'User is able to input a phone number.'
		},
		{
			value: data.FormFieldType.IMAGE,
			name: 'Upload image',
			description: 'User can enter select an image from their device.'
		},
		{
			value: data.FormFieldType.SIGNATURE,
			name: 'Signature Entry',
			description: 'User is able to register his signature.'
		}
	];

	interface Field {
		labelName: string;
		type: data.FormFieldType;
		required: boolean;
		pointPass?: string;
		pointFail?: string;
		id?: number;
	}

	let fields: Field[] = [];

	let cardTypeSelect: data.FormFieldType;
	let labelName: string;
	let pointPass: string;
	let pointFail: string;
	let required: boolean = true;
	let fieldId: number;

	$: stringifyFields = JSON.stringify(fields);

	const addFieldToCard = () => {
		const newField: Field = {
			labelName: labelName,
			type: cardTypeSelect,
			id: fieldId,
			pointPass,
			pointFail,
			required
		};

		if (editField >= 0) {
			fields = fields.filter((_, i) => i !== editField);

			fields.splice(editField, 0, newField);
		} else fields = [...fields, newField];

		labelName = '';
		pointPass = undefined;
		pointFail = undefined;
		required = true;
		editField = undefined;
		fieldId = undefined;
	};
</script>

<section class="flex flex-col gap-4 w-full sm:w-2/3 pb-10 p-4">
	<!-- nombre del formulario -->
	<div class="flex justify-between gap-4 shadow bg-white p-6 rounded-lg">
		{#if isEditFormName}
			<!-- Form -->
			<form
				class="flex flex-wrap lg:flex-nowrap gap-4 md:w-1/2"
				method="post"
				action="?/renameForm"
				use:enhance={({ formData }) => {
					isEditFormName = false;
					formName = formData.get('new_form_name');
				}}
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
				<Button
					on:click={() => (isEditFormName = true)}
					outline
					size="xs"
					color="light"
					class="h-max"
				>
					<PenOutline class="h-5 w-5" />
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

	<!-- create card -->
	<div class="flex w-full gap-4">
		<div class="bg-white p-4 flex flex-col gap-4 shadow rounded-lg w-1/2 h-max">
			<div>
				<Label for="card_name" class="mb-2">Card name*</Label>
				<Input bind:value={cardName} type="text" id="card_name" placeholder="Type here" required />
			</div>
			<!-- select -->
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
			<!-- /select -->
			{#if cardTypeSelect}
				<div class="border-t mt-4 py-4 flex flex-col gap-4">
					<!-- label field -->
					<Label class="space-y-2">
						<span>Label name*</span>
						<Input name="label_name" type="text" placeholder="Type here" bind:value={labelName} />
					</Label>

					{#if cardTypeSelect === 'SINGLE_CHECK'}
						<div class="space-y-4 mb-4">
							<Label class="space-y-2">
								<span class="text-green-400">Point pass*</span>
								<Input type="text" placeholder="Type here" bind:value={pointPass} />
							</Label>

							<Label class="space-y-2">
								<span class="text-red-500">Point fail*</span>
								<Input type="text" placeholder="Type here" bind:value={pointFail} />
							</Label>
						</div>
					{/if}

					<Checkbox checked={required} on:change={() => (required = !required)}>Required</Checkbox>

					<div class="inline-flex gap-4">
						<Button
							on:click={() => {
								cardTypeSelect = '';
								editField = undefined;
							}}
							outline
							color="red">Cancel</Button
						>
						<Button type="button" color="blue" on:click={addFieldToCard}
							>{editField >= 0 ? 'Update field' : 'Add field'}</Button
						>
					</div>
				</div>
			{/if}
		</div>

		<!-- view custom fields -->
		<div class="bg-white h-max p-4 flex flex-col gap-4 shadow rounded-lg w-1/2">
			<h4 class="font-semibold text-lg">{cardName ? cardName : 'New Card'}</h4>
			<div class="h-80 overflow-y-auto border rounded-lg">
				{#each fields as field, index}
					<div class="p-2 flex flex-col">
						<!-- field label -->
						{field.labelName}

						<!-- field type -->
						{#each cardTypes as ct}
							{#if ct.value === field.type}
								<p class="text-blue-500">{ct.name}</p>
								<p>({field.required ? 'required' : 'not required'})</p>
							{/if}
						{/each}

						<div class="inline-flex gap-4 mt-1">
							<!-- delete field button -->
							<Button
								type="button"
								size="xs"
								color="light"
								class="w-max"
								on:click={() => (fields = fields.filter((_, i) => i !== index))}
							>
								<CloseOutline class="w-2 h-2" />
							</Button>
							<!-- edit field button -->
							<Button
								type="button"
								size="xs"
								color="light"
								class="w-max"
								on:click={() => {
									const field = fields[index];

									cardTypeSelect = field.type;
									labelName = field.labelName;
									pointPass = field.pointPass;
									pointFail = field.pointFail;
									required = field.required;
									fieldId = field?.id;

									editField = index;
								}}
							>
								<PenOutline class="w-2 h-2" />
							</Button>
						</div>
					</div>
					<div class="border-b"></div>
				{/each}
			</div>
			<!-- Form -->
			<form
				method="post"
				action={editCard ? '?/updateCard' : '?/addCard'}
				use:enhance={() => {
					fields = [];
					cardName = '';
					editCard = false;
				}}
			>
				<input type="hidden" name="card_name" bind:value={cardName} />
				<input type="hidden" name="card_id" bind:value={editCard} />
				<input type="hidden" name="form_id" bind:value={data.customForm.id} />
				<input type="hidden" name="fields" bind:value={stringifyFields} />
				<Button type="submit">{editCard ? 'Update card' : 'Create card'}</Button>
				<Button
					on:click={() => {
						fields = [];
						cardName = '';
						editCard = undefined;
					}}
					outline
					color="red">Cancel</Button
				>
			</form>
			<!-- Form -->
		</div>
	</div>

	<!-- card list -->
	<div class="bg-white shadow rounded-lg p-4 flex flex-col gap-4">
		<h4 class="font-bold text-xl">Cards ({data.customForm.cards.length})</h4>
		<div class="border-t"></div>
		{#each data.customForm.cards as card, index}
			<div class="border-b pb-4">
				<h5 class="font-semibold text-lg underline">
					{card.name}:
				</h5>
				<div class="ml-4 mt-4 flex flex-col gap-2">
					{#each card.fields as field}
						<!-- field -->
						<div class="border p-2 rounded-lg">
							<h5 class="font-medium text-lg">
								{field.name}
							</h5>
							{#if field.checkOptions}
								<ul class="list-disc list-inside">
									{#each field.checkOptions as options}
										<li>
											{options.name}
										</li>
									{/each}
								</ul>
							{/if}
							{#each cardTypes as ct}
								{#if ct.value === field.type}
									<span class="text-blue-500 font-normal">{ct.name}</span>
								{/if}
							{/each}
						</div>
					{/each}
				</div>
				<div class="ml-4 mt-4">
					<!-- delete card button -->
					<Button
						outline
						size="xs"
						color="light"
						on:click={() => {
							idCardSelected = card.id;
							openDeleteCardModal = true;
						}}
					>
						<TrashBinOutline class="h-4 w-4" />
					</Button>
					<!-- edit card button -->
					<Button
						outline
						size="xs"
						color="light"
						on:click={() => {
							cardName = card.name;
							editCard = card.id;

							fields = card.fields.map((el) => {
								const field = {
									labelName: el.name,
									type: el.type,
									required: el.required,
									id: el.id
								};

								if (el.type === data.FormFieldType.SINGLE_CHECK) {
									field.pointPass = el.checkOptions[0].name;
									field.pointFail = el.checkOptions[1].name;
									return field;
								} else return field;
							});

							document.documentElement.scrollTop = 0;
						}}
					>
						<PenOutline class="h-4 w-4" />
					</Button>
				</div>
			</div>
		{/each}
	</div>

	<!-- Modal to delete Form-->
	<DeleteCustomFormModal
		isOpen={openDeleteFormModal}
		onClose={handlerDeleteFormModalClose}
		customFormId={data.customForm.id}
	/>

	<!-- Modal to delete Card-->
	<DeleteCardModal
		isOpen={openDeleteCardModal}
		onClose={handlerDeleteCardModalClose}
		customFormId={data.customForm.id}
		{idCardSelected}
	/>
</section>
