<script lang="ts">
	// @ts-nocheck
	import AutocompleteInputComponent from '../../inputs/AutocompleteInputComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import DateInputComponent from '$lib/components/inputs/DateInputComponent.svelte';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import ButtonComponent from '../../buttons/ButtonComponent.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { Select, Fileupload, Label } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	import TollFileCard from '$lib/components/forms-components/tolls/TollFileCard.svelte';

	import {
		PaperClipOutline,
		FileImageOutline,
		FileZipOutline,
		FileInvoiceOutline,
		FileLinesOutline
	} from 'flowbite-svelte-icons';

	export let data;
	export let selectedToll;
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let headers;
	let vehicles = [];
	let attachFile = false;

	let fileSize = 0;

	const getSize = function (size, exp = 0) {
		if (size > 900) {
			return getSize(size / 1024, exp + 1);
		} else {
			const x = {
				0: '',
				1: 'K',
				2: 'M',
				3: 'G',
				4: 'T'
			};
			return size.toFixed(1).toString() + ' ' + x[exp] + 'B';
		}
	};

	onMount(async () => {
		headers = { 'X-User-Tenant': $currentTenant.id };
		const vehiclesResponse = await fetch(`/api/tenants/${$currentTenant.id}/vehicles`, {
			headers
		});
		vehicles = [...(await vehiclesResponse.json())];
	});

	let stageSelectorList = [
		{ value: 'PAID', name: 'PAID' },
		{ value: 'UNPAID', name: 'UNPAID' }
	];

	let actionURL = `/api/tenants/${$currentTenant.id}/contracts/tolls`;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		SPA: true,
		//validators: tollSchema,
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	if (selectedToll) {
		$form.amount = selectedToll.amount;
		$form.vehicleId = selectedToll.vehicle.plate;
		$form.stage = selectedToll.stage;
		$form.invoiceNumber = selectedToll.invoiceNumber;
		$form.note = selectedToll.note;
		$form.createDate = selectedToll.createDate.slice(0, 10);
		actionURL = `/api/tenants/${$currentTenant.id}/contracts/${selectedToll.contractId}/tolls/${selectedToll.id}`;
	}

	function changeFile(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement && inputElement.files) {
			console.log('file changed');
			$form.invoice = inputElement.files[0].name;
			fileSize = inputElement.files[0].size;
		}
		attachFile = !attachFile;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		formData.set('vehicleId', findVehicleID($form.vehicleId));
		console.log('elformf', formData);
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

	function findVehicleID(plate) {
		let selectedVehicle = vehicles.filter((vehicle) =>
			vehicle['plate'].includes(plate.toUpperCase())
		);
		return selectedVehicle[0].id;
	}
</script>

<form
	class="flex flex-col justify-center align-center space-y-6 gap-2"
	method="POST"
	enctype="multipart/form-data"
	on:submit={handleSubmit}
	use:enhance
>
	<input hidden name="id" bind:value={$form.id} />
	<input hidden name="invoice" bind:value={$form.invoice} />
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

	{#if attachFile}
		<div class="sm:col-span-2">
			<TollFileCard fileName={$form.invoice} size={getSize(fileSize)}  />
		</div>
	{/if}
	<div class="flex gap-1">
		<SubmitButtonComponent
			placeholder={!selectedToll ? 'Create toll' : 'Update toll'}
			styles="w-[70%] grow mx-auto block"
		/>
		{#if !attachFile}
			<ButtonComponent
				placeholder=""
				outline
				styles="w-[10%] flex justify-center align-center mx-auto"
			>
				<Label>
					<PaperClipOutline id="attach" class="text-gray-400" />
					<Fileupload
						class="hidden"
						name="fileData"
						id="fileData"
						for="attach"
						on:change={changeFile}
					/>
				</Label>
			</ButtonComponent>
		{/if}
	</div>
</form>
