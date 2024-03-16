<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { Select } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher, getContext } from 'svelte';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';


	export let data;
	export let selectedUser;
	export let tenantsList = [];

	
	let loading = false;
	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let actionURL = `/api/tenants/${$currentTenant.currentUserTenant.tenantId}/users`;

	const fixSchema = z.object({
		role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
		email: z.string().email(),
		tenantId: z.number(),
		id: z.string().optional()
	});

	const { form, errors, constraints, enhance } = superForm(data.form, {
		SPA: true,
		validators: fixSchema,
	});

	let roles = [
		{ value: 'ADMIN', name: 'ADMIN' },
		{ value: 'STAFF', name: 'STAFF' }
	];

	let tenantsSelector = [];
	tenantsList?.forEach((element) => {
		tenantsSelector.push({ value: element.id, name: element.name });
	});

	if (selectedUser) {
		$form.email = selectedUser.user.email;
		$form.role = selectedUser.role;
		$form.tenantId = selectedUser.tenant.id;
		actionURL = actionURL + `/${selectedUser.id}`;
	}

	$: if (!$currentTenant.isAdmin) {
		$form.tenantId = $currentTenant.id;
	}

	async function handleSubmit(event) {
		loading = true;
		event.preventDefault();
		$form.email = $form.email.trim();
		const formData = new FormData(event.target);
		const headers = {
			'X-User-Tenant': $currentTenant.currentUserTenant.id
		};
		const response = await fetch(actionURL, {
			method: 'POST',
			headers: headers,
			body: formData
		});
		try{
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				dispatch('formvalid', false);
				console.log('Form submitted successfully');
			}
		}finally{
			loading = false;
		}
	}
</script>

<form
	class="flex flex-col justify-center align-center space-y-6"
	method="POST"
	enctype="multipart/form-data"
	on:submit={handleSubmit}
	use:enhance
>
	<input hidden name="id" bind:value={$form.id} />
	<div class="sm:col-span-2">
		<EmailInputComponent placeholder="Insert user email" {form} {errors} {constraints} />
	</div>
	<Select
		class="mt-2"
		items={roles}
		name="role"
		placeholder="Select a role..."
		bind:value={$form.role}
	/>
	{#if $currentTenant.isAdmin}
		<Select
			class="mt-2"
			items={tenantsSelector}
			name="tenantId"
			placeholder="Select a company..."
			bind:value={$form.tenantId}
		/>
	{:else}
		<input hidden name="tenantId" bind:value={$form.tenantId} />
	{/if}
	<SubmitButtonComponent
		placeholder={!selectedUser ? 'Create user' : 'Update user'}
		styles="w-[50%] mx-auto block"
		{loading}
	/>
</form>
