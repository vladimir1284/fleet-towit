<script>
	import { Button, Modal, Label, Input } from 'flowbite-svelte';
	import Dropzone from './components/Dropzone.svelte';
	import ExtraFields from './components/ExtraFields.svelte';

	export let show = false;
	export let createVehicle;

	/*
	 * STATES
	 */

	let plate = '';
	let vin = '';
	let odometer = 0;
	let nickname = '';
	let spareTires = 0;
	let extraFields = [];
	let status = 'Available';
	let vehiclePictures = [];
	let documents = [];
	let costs = [];
</script>

<Modal bind:open={show} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Plate</span>
			<Input type="text" bind:value={plate} required />
		</Label>
		<Label class="space-y-2">
			<span>VIN</span>
			<Input type="text" bind:value={vin} required />
		</Label>
		<Label class="space-y-2">
			<span>Odometer</span>
			<Input type="number" bind:value={odometer} min={0} required />
		</Label>
		<Label class="space-y-2">
			<span>Nickname</span>
			<Input type="text" bind:value={nickname} required />
		</Label>
		<Label class="space-y-2">
			<span>Spare Tires</span>
			<Input type="text" bind:value={spareTires} required />
		</Label>
		<Label class="space-y-2 flex flex-col span-2">
			<span>Status</span>
			<select bind:value={status}>
				<option value="Available">Available</option>
				<option value="Unavailable">Unavailable</option>
			</select>
		</Label>
		<Label class="space-y-2 flex flex-col span-2">
			<span>ExtraFields</span>
			<ExtraFields value={extraFields} />
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
		<Button
			on:click={() => {
				createVehicle({});
			}}
			class="w-full1">Create vehicle</Button
		>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <a href="/" class="text-primary-700 hover:underline dark:text-primary-500">
				Create account
			</a>
		</div>
	</form>
</Modal>
