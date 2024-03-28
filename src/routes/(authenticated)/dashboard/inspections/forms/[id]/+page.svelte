<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button, Input, Label, Select, Helper, Modal } from 'flowbite-svelte';
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

	if (data?.redirect_to) goto(`/dashboard/inspections/forms/${data.redirect_to}/`);

	const { form, constraints } = superForm(data.form);

	// modals
	let openDeleteFormModal = false;
	const handlerDeleteFormModalClose = () => (openDeleteFormModal = false);

	let openDeleteCardModal = false;
	const handlerDeleteCardModalClose = () => (openDeleteCardModal = false);

	// delete  card
	let idCardSelected: number;

	// new card
	let newCardName: string;

	// edit form name
	let isEditFormName = false;
	let formName = data.customForm?.name;

	//
	let cardTypes = [
		{
			value: 'NUMBER',
			name: 'Data Entry Numeric',
			description: 'User is able to input numeric data.'
		},
		{
			value: 'TEXT',
			name: 'Data Entry Alphanumeric',
			description: 'User is able to input alphanumeric data.'
		},
		{
			value: 'SINGLE_CHECK',
			name: 'Single Check',
			description: 'User is able to check (pass or fail) a single point.'
		},
		{
			value: 'EMAIL',
			name: 'Email',
			description: 'User is able to input email.'
		},
		{
			value: 'DATE',
			name: 'Date',
			description: 'User is able to input date.'
		},
		{
			value: 'TIME',
			name: 'Time',
			description: 'User is able to input time.'
		},
		{
			value: 'PHONE',
			name: 'Phone',
			description: 'User is able to input phone.'
		}
	];

	interface Field {
		labelName: string;
		type: data.FormFieldType;
		pointPass?: string;
		pointFail?: string;
	}

	let fields: Field[] = [];
	let cardTypeSelect: data.FormFieldType;
	let labelName: string;
	let pointPass: string;
	let pointFail: string;

	$: stringifyFields = JSON.stringify(fields);

	const addFieldToCard = () => {
		fields = [
			...fields,
			{
				labelName: labelName,
				type: cardTypeSelect,
				pointPass,
				pointFail
			}
		];

		labelName = '';
		pointPass = undefined;
		pointFail = undefined;
	};
</script>

<section class="flex flex-col gap-4 w-full sm:w-2/3 pb-10 p-1">
	<!-- nombre del formulario -->
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
				<Input
					bind:value={newCardName}
					type="text"
					id="card_name"
					placeholder="Type here"
					required
				/>
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

					<div class="inline-flex gap-4">
						<Button on:click={() => (cardTypeSelect = '')} outline color="red">Cancel</Button>
						<Button type="button" color="blue" on:click={addFieldToCard}>Add field</Button>
					</div>
				</div>
			{/if}
		</div>

		<!-- view custom fields -->
		<div class="bg-white h-max p-4 flex flex-col gap-4 shadow rounded-lg w-1/2">
			<h4 class="font-semibold text-lg">{newCardName ? newCardName : 'New Card'}</h4>
			<div class="h-80 overflow-y-auto border rounded-lg">
				{#each fields as field, index}
					<div class="p-2 flex flex-col">
						<!-- field label -->
						{field.labelName}

						<!-- field type -->
						{#each cardTypes as ct}
							{#if ct.value === field.type}
								<p class="text-blue-500">{ct.name}</p>
							{/if}
						{/each}

						<Button
							type="button"
							size="xs"
							color="light"
							class="w-max"
							on:click={() => (fields = fields.filter((_, i) => i !== index))}
						>
							<CloseOutline class="w-2 h-2" />
						</Button>
					</div>
					<div class="border-b"></div>
				{/each}
			</div>

			<form method="post" action="?/addCard">
				<input
					type="hidden"
					name="card_name"
					bind:value={newCardName}
					{...$constraints.card_name}
				/>
				<input
					type="hidden"
					name="form_id"
					bind:value={data.customForm.id}
					{...$constraints.form_id}
				/>
				<input type="hidden" name="fields" bind:value={stringifyFields} {...$constraints.fields} />
				<Button type="submit">Create card</Button>
			</form>
		</div>
	</div>

	<!-- card list -->
	<div class="bg-white shadow rounded-lg p-4 flex flex-col gap-4">
		<h4 class="font-bold text-xl">Cards ({data.customForm.cards.length})</h4>
		<div class="border-t"></div>
		{#each data.customForm.cards as card}
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
					<!-- delete field button -->
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
