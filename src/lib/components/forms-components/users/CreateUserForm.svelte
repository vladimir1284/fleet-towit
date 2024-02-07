<script lang="ts">
	// @ts-nocheck
	import { Button, Select, FloatingLabelInput } from 'flowbite-svelte';
	import { EnvelopeSolid } from 'flowbite-svelte-icons';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { createEventDispatcher } from 'svelte';
	import { tenantActor } from '$lib/store/context-store';
	import { z } from 'zod';
	export let data;
	export let selectedUser;
	export let tenantsList = [];
	const dispatch = createEventDispatcher();
	const currentTenant = tenantActor.getSnapshot().context.currentTenant;
	let actionURL = `/api/tenants/${currentTenant.currentUserTenant.tenantId}/users`;

	const fixSchema = z.object({
		role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
		email: z.string().email(),
		tenantId: z.string(),
		id: z.string().optional()
	});

	const { form, errors, constraints, enhance } = superForm(data.form, {
		SPA: true,
		validators: fixSchema,
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
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

	$: if (!currentTenant.isAdmin) {
		$form.tenantId = currentTenant.id;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const headers = {
			'X-User-Tenant': currentTenant.currentUserTenant.id
		};
		const response = await fetch(actionURL, {
			method: 'POST',
			headers: headers,
			body: formData
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			console.log('Form submitted successfully');
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
		<FloatingLabelInput
			style="outlined"
			class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
			type="text"
			name="email"
			placeholder="Insert your email"
			required
			bind:value={$form.email}
			{...$constraints.email}
		>
			<EnvelopeSolid class="w-6 h-6 inline" />
			Email
		</FloatingLabelInput>
		{#if $errors.email}<span class="text-red-600">{$errors.email}</span>{/if}
	</div>
	<Select
		class="mt-2"
		items={roles}
		name="role"
		placeholder="Select a role..."
		bind:value={$form.role}
	/>
	{#if currentTenant.isAdmin}
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
	<Button type="submit" class="w-[50%] mx-auto block"
		>{!selectedUser ? 'Create' : 'Update'} user</Button
	>
</form>
