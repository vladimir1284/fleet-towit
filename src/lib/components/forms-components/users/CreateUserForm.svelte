<script lang="ts">
	// @ts-nocheck
	import { Button, Select, FloatingLabelInput } from 'flowbite-svelte';
	import { EnvelopeSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher } from 'svelte';
	export let data;
	export let tenantsList = [];

	const dispatch = createEventDispatcher();

	const { form, errors, constraints, enhance } = superForm(data.form, {
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
	tenantsList?.forEach(element => {
		tenantsSelector.push({value: element.id, name: element.name})
	});
</script>

<form class="flex flex-col justify-center align-center space-y-6" method="POST" use:enhance>
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
	<Select
		class="mt-2"
		items={tenantsSelector}
		name="tenantId"
		placeholder="Select a company..."
		bind:value={$form.tenantId}
	/>
	<Button type="submit" class="w-[50%] mx-auto block">{!$form.id ? 'Create' : 'Update'} user</Button>
</form>
