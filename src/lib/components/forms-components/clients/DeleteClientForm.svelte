<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import { tenantActor } from '$lib/store/context-store';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	export let data;

	const dispatch = createEventDispatcher();
	const currentTenant = tenantActor.getSnapshot().context.currentTenant;
	console.log('DATA: ', data);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`/api/tenants/${currentTenant.id}/client/${data}`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			console.error('Failed to delete', response);
			return;
		}
		console.log('Deleted successfully');
		dispatch('formvalid', false);
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
	/>
</div>
