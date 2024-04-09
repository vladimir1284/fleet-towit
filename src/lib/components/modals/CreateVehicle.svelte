<script lang="ts">
	import { getContext } from 'svelte';
	import { superForm } from 'sveltekit-superforms';

	import { Button, Modal, Label, Input } from 'flowbite-svelte';
	import Dropzone from './components/Dropzone.svelte';
	import ExtraFields from './components/ExtraFields.svelte';

	export let show = false;
	export let close;
	// export let createVehicle;

	/*
	 * STATES
	 */

	let nickname = '';
	let type = '';
	let make = '';
	// let year = 2000;
	let odometer = 0;
	let status = 'Available';
	let model = 'Elantra';
	let vehiclePictures = [];
	let documents = [];
	let costs = [];

	const action = `/vehicles?/create`;
	const superVehicleContext = getContext('VehicleForm');
	const { form, enhance } = superForm($superVehicleContext, {
		dataType: 'json'
	});
</script>

<Modal bind:open={show} size="xs" autoclose={false} class="w-full" on:close={close}>
	<form method="POST" {action} use:enhance>
		<div class="flex flex-col space-y-6">
			<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">New Vehicle</h3>
			<Label class="space-y-2">
				<span>Nickname</span>
				<Input type="text" bind:value={$form.nickname} />
			</Label>
			<Label class="space-y-2 flex flex-col span-2">
				<span>Model</span>
				<select bind:value={$form.model}>
					<option value="CX-5">CX-5</option>
					<option value="YZF-R6">YZF-R6</option>
					<option value="Camry">Camry</option>
					<option value="Elantra">Elantra</option>
				</select>
			</Label>
			<Label class="space-y-2">
				<span>Make</span>
				<Input type="text" bind:value={$form.make} />
			</Label>
			<Label class="space-y-2">
				<span>Year</span>
				<Input type="number" bind:value={$form.year} />
			</Label>
			<Label class="space-y-2">
				<span>Odometer</span>
				<Input type="number" bind:value={$form.odometer} min={0} />
			</Label>
			<Label class="space-y-2 flex flex-col span-2">
				<span>Status</span>
				<select bind:value={$form.status}>
					<option value="AVAILABLE">Available</option>
					<option value="UNAVAILABLE">Unavailable</option>
				</select>
			</Label>
			<Label class="space-y-2">
				<span>Pictures</span>
				<Dropzone value={vehiclePictures} />
			</Label>
			<Label class="space-y-2">
				<span>Documents</span>
				<Dropzone value={documents} />
			</Label>
			<Label class="space-y-2">
				<span>Costs</span>
				<Dropzone value={costs} />
			</Label>
			<Button type="submit" class="w-full1">Create vehicle</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a href="/" class="text-primary-700 hover:underline dark:text-primary-500">
					Create account
				</a>
			</div>
		</div>
	</form>
</Modal>
