<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { FormFieldType } from '@prisma/client';
	import { Card, Button, Input, Label, Select, Helper, Modal } from 'flowbite-svelte';
	import {
		ExclamationCircleOutline,
		TrashBinOutline,
		PenOutline,
		CheckOutline
	} from 'flowbite-svelte-icons';

	export let data: PageData;

	const { form, constraints } = superForm(data.form);

	let openDeleteFormModal = false;

	let isEditNameForm = false;

	let openDeleteCardModal = false;
	let idCardSelected;

	let selected;
	let cardTypes = [
		{ value: 'number', name: 'Data Entry Numeric' },
		{ value: 'text', name: 'Data Entry Alphanumeric' }
	];
</script>

<section class="flex flex-col gap-4 w-2/3 pb-10">
	<div class="flex justify-between shadow bg-white p-6 rounded-lg">
		{#if isEditNameForm}
			<form class="inline-flex gap-4 w-1/2" method="post" action="?/renameForm">
				<Input
					bind:value={data.customForm.name}
					class="w-full"
					placeholder="Type here"
					name="new_form_name"
					required
				/>
				<input name="form_id" type="hidden" bind:value={data.customForm.id} />
				<Button type="submit" outline size="xs" color="light">
					<CheckOutline class="h-5 w-5" />
				</Button>
			</form>
		{:else}
			<h5
				class="text-2xl inline-flex gap-4 font-bold break-all text-gray-900 dark:text-white w-1/2"
			>
				{data.customForm.name}

				<Button outline size="xs" color="light" class="h-max">
					<PenOutline on:click={() => (isEditNameForm = true)} class="h-5 w-5" />
				</Button>
			</h5>
		{/if}

		<Button
			class="w-max h-max"
			size="xs"
			outline
			color="red"
			on:click={() => (openDeleteFormModal = true)}><TrashBinOutline class="h-4 w-4" /></Button
		>
	</div>

	<div class="flex gap-4">
		<div class="min-w-96 w-1/2 h-max bg-white rounded-lg shadow p-6">
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Add card</h5>
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

		<div class="min-w-96 w-1/2 bg-white rounded-lg shadow p-6 h-max">
			<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				Cards ({data.customForm.fields.length})
			</h5>
			<div class="flex flex-col gap-4">
				{#each data.customForm.fields as field}
					<Card>
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
							<Button outline size="xs" color="light">
								<PenOutline class="h-4 w-4" />
							</Button>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</div>

	<!-- Modal to delete Card-->
	<Modal bind:open={openDeleteCardModal} size="xs">
		<div class="text-center">
			<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this card ?
			</h3>
			<form method="post" action="?/deleteCard">
				<input type="hidden" bind:value={idCardSelected} name="card_id" />
				<input type="hidden" value={data.customForm.id} name="form_id" />

				<Button type="submit" color="red" class="me-2">Yes, I'm sure</Button>
				<Button on:click={() => (openDeleteCardModal = false)} color="alternative"
					>No, cancel</Button
				>
			</form>
		</div>
	</Modal>

	<!-- Modal to delete Form-->
	<Modal bind:open={openDeleteFormModal} size="xs">
		<div class="text-center">
			<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this form?
			</h3>
			<form method="post" action="?/deleteForm">
				<input type="hidden" value={data.customForm.id} name="form_id" />

				<Button type="submit" color="red" class="me-2">Yes, I'm sure</Button>
				<Button on:click={() => (openDeleteFormModal = false)} color="alternative"
					>No, cancel</Button
				>
			</form>
		</div>
	</Modal>
</section>
