<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Card, Button, Input, Label, Select, Helper, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	export let data: PageData;

	const { form, constraints } = superForm(data.form);

	let openDeleteFormModal = false;
	let selected;
	let cardTypes = [
		{ value: 'number', name: 'Data Entry Numeric' },
		{ value: 'text', name: 'Data Entry Alphanumeric' }
	];

	// console.log(data.customForm);
</script>

<section class="flex flex-col gap-4">
	<div class="flex justify-between shadow bg-white p-6 rounded-lg">
		<h5 class="text-2xl font-bold break-all text-gray-900 dark:text-white w-1/2">
			{data.customForm.name}
		</h5>

		<Button
			class="w-max h-max"
			size="xs"
			outline
			color="red"
			on:click={() => (openDeleteFormModal = true)}>Delete</Button
		>
	</div>

	<div class="flex gap-4">
		<Card class="min-w-96">
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
		</Card>

		<div>
			<Card class="min-w-96">
				<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
					Cards ({data.customForm.fields.length})
				</h5>
			</Card>
		</div>
	</div>

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
