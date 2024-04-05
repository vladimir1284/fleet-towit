<script async lang="ts">
	//@ts-nocheck
	import { Select } from 'flowbite-svelte';
	import { FileSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher, getContext } from 'svelte';
	import NameInputComponent from '$lib/components/inputs/NameInputComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let data;
	export let selectedPlan: any;


	let periodicityList = [
		{ value: 'WEEKLY', name: 'WEEKLY' },
		{ value: 'BIWEEKLY', name: 'BIWEEKLY' },
		{ value: 'MONTHLY', name: 'MONTHLY' }
	];
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let actionURL = `/api/tenants/${$currentTenant?.id}/rentalPlan`;
	console.log('actionURL  ', actionURL);

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});
	if (selectedPlan) {
		$form.name = selectedPlan.name;
		$form.amount = selectedPlan.amount;
		$form.periodicity = selectedPlan.periodicity;
		actionURL = actionURL + `/${selectedPlan.id}`;
	}
</script>

<form method="POST" use:enhance action={actionURL}>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
		<input hidden name="id" bind:value={$form.id} />
		<div class="sm:col-span-2">
			<NameInputComponent placeholder="Plan name" {form} {errors} {constraints}>
				<FileSolid class="w-6 h-6 inline" />
			</NameInputComponent>
		</div>
		<div class="sm:col-span-2">
			<AmountInputComponent placeholder="Amount" {form} {errors} {constraints} />
		</div>
		<div class="sm:col-span-2">
			<Select
				class="mt-2"
				items={periodicityList}
				name="periodicity"
				placeholder="Select a periodicity..."
				bind:value={$form.periodicity}
			/>
		</div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<SubmitButtonComponent
				placeholder={!selectedPlan ? 'Create plan' : 'Update plan'}
				styles="w-40"
			/>
		</div>
	</div>
</form>
