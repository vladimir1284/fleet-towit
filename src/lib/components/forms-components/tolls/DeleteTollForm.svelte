<script>
	// @ts-nocheck
	import axios from 'axios';
	import { createEventDispatcher, getContext } from 'svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let tollId;
	export let contractId;


	let loading = false;
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	const handleSubmit = async (event) => {
		loading = true;
		event.preventDefault();
		await axios.delete(`/api/tenants/${$currentTenant.id}/contracts/${contractId}/tolls/${tollId}`)
			.then(() => {
				dispatch('formvalid', false)
				})
			.catch(resp => {
				console.error('Failed to delete', resp)
				})
			.finally(() => {
					loading = false
				})
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
