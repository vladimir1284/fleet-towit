<script>
	// @ts-nocheck
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	export let data;
	const dispatch = createEventDispatcher();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch(`/api/tenants/users/${data}`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			console.error('Failed to delete user');
			return;
		}
		console.log('User deleted successfully');
		dispatch('formvalid', false);
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
	/>
</div>
