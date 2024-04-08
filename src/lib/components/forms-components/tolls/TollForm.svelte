<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher, getContext } from 'svelte';
	import { FeatureDefault, FeatureItem } from 'flowbite-svelte-blocks';
	import { Select, Fileupload, Label, Badge, Alert } from 'flowbite-svelte';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';
	import { PaperClipOutline, ExclamationCircleSolid } from 'flowbite-svelte-icons';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import DateInputComponent from '$lib/components/inputs/DateInputComponent.svelte';
	import TollFileCard from '$lib/components/forms-components/tolls/TollFileCard.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';
	import AutocompleteInputComponent from '$lib/components/inputs/AutocompleteInputComponent.svelte';

	export let data;
	export let selectedToll;

	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let headers;
	let plates = [];
	let attachFile = false;
	let loading = false;
	let fileSize = 0;
	let selectedContract;
	let formDisabled = true;
	let showAlert = false;

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
			return size?.toFixed(1).toString() + ' ' + x[exp] + 'B';
		}
	};

	async function getContractByDate(selectedDate: string, vehiclePlate: string) {
		headers = { 'X-User-Tenant': $currentTenant.id };
		let plateId = findPlateID(vehiclePlate);
		if (plateId) {
			const response = await fetch(
				`/api/tenants/${$currentTenant.id}/contracts?search_date=${selectedDate}&plate_id=${plateId}`,
				{ headers }
			);

			selectedContract = await response.json();
		} else {
			selectedContract = undefined;
		}
	}

	onMount(async () => {
		if ($form.invoice) {
			fetch(
				`https://minios3.crabdance.com/develop/contracts/${selectedToll.contractId}/tolls/${selectedToll.id}/${selectedToll.invoice}`,
				{ method: 'HEAD' }
			).then((r) => {
				fileSize = parseInt(r.headers.get('Content-Length'));
			});

			attachFile = true;
		}
		headers = { 'X-User-Tenant': $currentTenant.id };
		const platesResponse = await fetch(`/api/tenants/${$currentTenant.id}/plates`, { headers });
		plates = [...(await platesResponse.json())];
	});

	let stageSelectorList = [
		{ value: 'PAID', name: 'PAID' },
		{ value: 'UNPAID', name: 'UNPAID' }
	];

	let actionURL = `/api/tenants/${$currentTenant.id}/contracts/tolls`;

	const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
		onSubmit: async (event) => {
			event.formData.set('plateId', findPlateID($form.plateId));
		},
		onUpdate: async (event) => {
			const plate = plates.filter((_plate) => _plate.id == event.form.data.plateId);
			event.form.data.plateId = plate[0].plate;
			event.form.data.createDate = event.form.data.createDate
				.toISOString()
				.slice(0, 10)
			if (event.form.errors._errors) {
				handleAlert(event.form.errors._errors[0])
			}
		},
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	if (selectedToll) {
		$form.amount = selectedToll.amount;
		$form.plateId = selectedToll.plate.plate;
		$form.stage = selectedToll.stage;
		$form.invoice = selectedToll.invoice;
		$form.invoiceNumber = selectedToll.invoiceNumber;
		$form.note = selectedToll.note;
		$form.createDate = selectedToll.createDate.slice(0, 10);
		actionURL = `/api/tenants/${$currentTenant.id}/contracts/${selectedToll.contractId}/tolls/${selectedToll.id}`;
	}

	const deleteFile = () => {
		document.getElementById('fileData').value = null;
		fileSize = 0;
		attachFile = false;
		$form.invoice = '';
	};


	function changeFile(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement && inputElement.files) {
			console.log('file changed');
			$form.invoice = inputElement.files[0].name;
			fileSize = inputElement.files[0].size;
		}
		attachFile = !attachFile;
	}


	function handleAlert(message) {
		showAlert = message;
		setTimeout(() => {
			showAlert = false;
		}, 10000);
	}


	function findPlateID(plate) {
		let selectedPlate = plates.filter((_plate) => _plate['plate'] === plate?.toUpperCase());
		if (selectedPlate.length) {
			return selectedPlate[0].id;
		} else {
			return undefined;
		}
	}

	$: if ($form.plateId !== 0 && $form.plateId !== undefined && $form.createDate !== undefined) {
		getContractByDate($form.createDate, $form.plateId);
	}
	$: if (selectedContract && selectedContract?.message !== 'no_data') {
		formDisabled = false;
	} else {
		formDisabled = true;
	}
</script>

<div class="flex flex-row justify-center align-center space-y-6 gap-4">
	<form
		class="flex flex-col justify-center align-center space-y-6 gap-2"
		method="POST"
		enctype="multipart/form-data"
		action={actionURL}
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
			<AutocompleteInputComponent
				formPointer="plateId"
				filterCriteria="plate"
				{form}
				{errors}
				{constraints}
				placeholder="Type vehicle plate"
				suggestions={plates}
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
			<AmountInputComponent placeholder="Amount" {form} {errors} {constraints} />
		</div>

		<div class="sm:col-span-2">
			<TextInputComponent formPointer="note" {form} {errors} {constraints} placeholder="Note" />
		</div>
		<div class={selectedToll ? 'sm:col-span-2' : 'hidden'}>
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
				<TollFileCard fileName={$form.invoice} size={getSize(fileSize)} handleDelete={deleteFile} />
			</div>
		{/if}
		<div class="flex gap-1">
			<SubmitButtonComponent
				placeholder={!selectedToll ? 'Create toll' : 'Update toll'}
				styles="w-[70%] grow mx-auto block"
				loading={$delayed}
				disabled={formDisabled}
			/>
			<Fileupload class="hidden" name="fileData" id="fileData" on:change={changeFile} />
			{#if !attachFile}
				<ButtonComponent
					placeholder=""
					outline
					styles="w-[10%] flex justify-center align-center mx-auto"
					onClick={() => {
						document.getElementById('fileData')?.click();
					}}
				>
					<Label>
						<PaperClipOutline class="text-gray-400" />
					</Label>
				</ButtonComponent>
			{/if}
		</div>
		{#if showAlert}
			<Alert class="fixed bottom-0 right-0 m-4 z-1" color="red" dismissable>
				{showAlert}
			</Alert>
		{/if}
	</form>
	{#if selectedContract && selectedContract?.message !== 'no_data'}
		<div transition:slide={{ duration: 300, axis: 'x' }}>
			<FeatureDefault>
				<FeatureItem class="flex flex-row">
					<svelte:fragment slot="h3">Contract information:</svelte:fragment>
					<svelte:fragment slot="paragraph">
						<Label class="my-4 w-max">
							Status: <Badge class="my-1">{selectedContract?.stage.stage}</Badge>
						</Label>
						<Label class="my-4 w-max">Client name: {selectedContract?.client.name}</Label>
						<Label class="my-4 w-max">Client email: {selectedContract?.client.email}</Label>
						<Label class="my-4 w-max">
							Client phone number: {selectedContract?.client.phoneNumber}
						</Label>
					</svelte:fragment>
				</FeatureItem>
			</FeatureDefault>
		</div>
	{:else if selectedContract && selectedContract?.message == 'no_data'}
		<div
			class="flex justify-center align-center gap-2"
			transition:slide={{ duration: 300, axis: 'x' }}
		>
			<ExclamationCircleSolid class="text-red-300" />
			<FeatureDefault>
				<FeatureItem class="flex flex-row">
					<svelte:fragment slot="h3">No contract found:</svelte:fragment>
					<svelte:fragment slot="paragraph">
						<Label class="my-4 w-max">There is no active contract on selected date</Label>
					</svelte:fragment>
				</FeatureItem>
			</FeatureDefault>
		</div>
	{/if}
</div>
