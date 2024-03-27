<script>
	// @ts-nocheck
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let data;
	
	let loading = false;
	const dispatch = createEventDispatcher();

	//TODO: change the logic of deleting a tenant
	
	const handleSubmit = async (event) => {
		loading = true;
		console.log('THE DATA: ', data)
		event.preventDefault();
		await axios.delete(`/api/tenants/${data}`)
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
