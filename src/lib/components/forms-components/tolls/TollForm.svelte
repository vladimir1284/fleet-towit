<script lang="ts">
	// @ts-nocheck
	import AutocompleteInputComponent from '../../inputs/AutocompleteInputComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import DateInputComponent from '$lib/components/inputs/DateInputComponent.svelte';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { Select, Fileupload } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	export let data;
	export let selectedToll;
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let headers;
	let vehicles = [];

	onMount(async () => {
		headers = { 'X-User-Tenant': $currentTenant.id };
		const vehiclesResponse = await fetch(`/api/tenants/${$currentTenant.id}/vehicles`, {
			headers
		});
		vehicles = [...(await vehiclesResponse.json())];
		console.log(vehicles);
	});

	let stageSelectorList = [
		{ value: 'PAID', name: 'PAID' },
		{ value: 'UNPAID', name: 'UNPAID' }
	];
	console.log(data.form);
	let actionURL = `/api/tenants/${$currentTenant.id}/contracts/tolls`;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	function changeFile(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement && inputElement.files) {
			console.log('file changed');
			$form.invoice = inputElement.files[0].name;
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		$form.email = $form.email.trim();
		const formData = new FormData(event.target);
		const headers = {
			'X-User-Tenant': $currentTenant.currentUserTenant.id
		};
		const response = await fetch(actionURL, {
			method: 'POST',
			headers: headers,
			body: formData
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			console.log('Form submitted successfully');
		}
	}

	$: console.log('TOLL FORM VALUES: ', $form);
</script>

<form
	class="flex flex-col justify-center align-center space-y-6"
	method="POST"
	enctype="multipart/form-data"
	on:submit={handleSubmit}
	use:enhance
>
	<input hidden name="id" bind:value={$form.id} />
	<div class="sm:col-span-2">
		<TextInputComponent
			formPointer="invoiceNumber"
			{form}
			{errors}
			{constraints}
			placeholder="Invoice number"
		/>
	</div>

	<div class="sm:col-span-2">
		<DateInputComponent
			formPointer="createDate"
			{form}
			{errors}
			{constraints}
			placeholder="Select date"
		/>
	</div>

	<div class="sm:col-span-2">
		<AutocompleteInputComponent
			formPointer="vehicleId"
			filterCriteria="plate"
			{form}
			{errors}
			{constraints}
			placeholder="Type vehicle plate"
			suggestions={vehicles}
		/>
	</div>

	<div class="sm:col-span-2">
		<AmountInputComponent placeholder="Amount" {form} {errors} {constraints} />
	</div>

	<div class="sm:col-span-2">
		<TextInputComponent formPointer="note" {form} {errors} {constraints} placeholder="Note" />
	</div>

	<div class="sm:col-span-2">
		<Select
			class="mt-2"
			items={stageSelectorList}
			name="stage"
			placeholder="Select a stage..."
			bind:value={$form.stage}
		/>
	</div>

	<div class="sm:col-span-2">
		<Fileupload name="fileData" id="fileData" on:change={changeFile} />
	</div>

	<SubmitButtonComponent
		placeholder={!selectedToll ? 'Create toll' : 'Update toll'}
		styles="w-[50%] mx-auto block"
	/>
</form>
