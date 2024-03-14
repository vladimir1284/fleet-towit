<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import { getContext } from 'svelte';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	export let data;
	let loading = false;

	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	console.log('DATA: ', data);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`/api/tenants/${$currentTenant.id}/rentalPlan/${data}`, {
			method: 'DELETE'
		});
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
