<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let data;

	let loading = false;
	const dispatch = createEventDispatcher();

	const handleSubmit = async (event) => {
		loading = true;
		event.preventDefault();
		const response = await fetch(`/api/tenants/users/${data}`, {
			method: 'DELETE'
		});
		try {
			if (!response.ok) {
				console.error('Failed to delete');
				return;
			}
			console.log('User deleted successfully');
			dispatch('formvalid', false);
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex flex-col justify-center align-center space-y-6">
	<div class="sm:col-span-2">
		<h1>Delete user?</h1>
	</div>
	<SubmitButtonComponent
		placeholder="Delete"
		styles="w-[50%] mx-auto block"
		onClick={handleSubmit}
		{loading}
	/>
</div>
