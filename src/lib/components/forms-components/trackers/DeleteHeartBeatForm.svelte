<script>
	// @ts-nocheck
	import axios from 'axios';
	import { createEventDispatcher, getContext } from 'svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let vehicleId;
	export let heartBeatId;

	let loading = false;
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	const handleSubmit = async (event) => {
		event.preventDefault();
		loading = true;
		await axios
			.delete(
				`/api/tenants/${$currentTenant.id}/vehicles/${vehicleId}/tracker/heartbeats/${heartBeatId}`
			)
			.then(() => {
				console.log('Deleted successfully');
				dispatch('formvalid', false);
			})
			.catch((error) => {
				console.error('Failed to delete', error);
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<div class="flex flex-col justify-center align-center space-y-6">
	<div class="sm:col-span-2">
		<h1>Delete?</h1>
	</div>
	<SubmitButtonComponent
		placeholder="Delete"
		styles="w-[50%] mx-auto block"
		onClick={handleSubmit}
		{loading}
	/>
</div>
