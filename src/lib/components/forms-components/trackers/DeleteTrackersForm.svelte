<script>
	// @ts-nocheck
	import { createEventDispatcher, getContext } from 'svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let vehicleId;

	let loading = false;
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(
			`/api/tenants/${$currentTenant.id}/vehicles/${vehicleId}/tracker`,
			{
				method: 'DELETE'
			}
		);
		try{
			if (!response.ok) {
				console.error('Failed to delete');
				return;
			}else {
				console.log('Deleted successfully');
				dispatch('formvalid', false);
			}
		}finally{
			loading = false;
		}
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
