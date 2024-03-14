<script async lang="ts">
	//@ts-nocheck
	import { Select } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { getContext } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';

	export let data;
	export let clients: [];
	export let vehicles: [];
	export let rentalPlans: [];
	export let selectedContract: any = undefined;

	let loading = false;
	let clientsSelector: any = [];
	let vehiclesSelector: any = [];
	let rentalPlansSelector: any = [];
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let actionURL = `/api/tenants/${$currentTenant.id}/contracts`;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	if ($form.clientId == 0 && $form.vehicleId == 0 && $form.rentalPlanId == 0) {
		$form.clientId = undefined;
		$form.vehicleId = undefined;
		$form.rentalPlanId = undefined;
	}

	if (selectedContract) {
		$form.clientId = selectedContract.clientId;
		$form.vehicleId = selectedContract.vehicleId;
		$form.rentalPlanId = selectedContract.rentalPlanId;
		actionURL = actionURL + `/${selectedContract.id}`;
	}

	clients?.forEach((client) => {
		clientsSelector.push({
			//@ts-expect-error Eslint throws does not exist on type 'never'
			value: client.id,
			//@ts-expect-error Eslint throws does not exist on type 'never'
			name: client.name ?? client.email
		});
	});

	vehicles?.forEach((vehicle) => {
		//@ts-expect-error Eslint throws does not exist on type 'never'
		if (vehicle.status === 'AVAILABLE') {
			vehiclesSelector.push({
				//@ts-expect-error Eslint throws does not exist on type 'never'
				value: vehicle.id,
				//@ts-expect-error Eslint throws does not exist on type 'never'
				name: vehicle.type + '-' + vehicle.make + '-' + vehicle.model
			});
		}
	});

	rentalPlans?.forEach((rentalPlan) => {
		rentalPlansSelector.push({
			//@ts-expect-error Eslint throws does not exist on type 'never'
			value: rentalPlan.id,
			//@ts-expect-error Eslint throws does not exist on type 'never'
			name: rentalPlan.name
		});
	});
</script>

<form method="POST" use:enhance action={actionURL}>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
		<input hidden name="id" bind:value={$form.id} />
		<div class="sm:col-span-2">
			<Select
				class="mt-2"
				items={clientsSelector}
				id="clientId"
				name="clientId"
				placeholder="Select a client..."
				bind:value={$form.clientId}
			/>
		</div>
		<div class="sm:col-span-2">
			<Select
				class="mt-2"
				items={vehiclesSelector}
				id="vehicleId"
				name="vehicleId"
				placeholder="Select a vehicle..."
				bind:value={$form.vehicleId}
			/>
		</div>
		<div class="sm:col-span-2">
			<Select
				class="mt-2"
				items={rentalPlansSelector}
				id="rentalPlanId"
				name="rentalPlanId"
				placeholder="Select a plan..."
				bind:value={$form.rentalPlanId}
			/>
		</div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<SubmitButtonComponent
				placeholder={!selectedContract ? 'Create plan' : 'Update plan'}
				styles="w-40"
			/>
		</div>
	</div>
</form>
