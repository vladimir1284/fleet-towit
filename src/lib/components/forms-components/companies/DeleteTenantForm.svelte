<script>
	// @ts-nocheck
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	export let data;
	const dispatch = createEventDispatcher();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`/api/tenants/${data}`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			console.error('Failed to delete user');
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
	<Button class="w-[50%] mx-auto block" on:click={handleSubmit}>Delete</Button>
</div>
