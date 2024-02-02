<script async lang="ts">
	import { Button, FloatingLabelInput } from 'flowbite-svelte';
	import { EnvelopeSolid, BuildingSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher } from 'svelte';

	export let data;
	export let selectedTenant;
	let actionURL = '/api/tenants';

	const dispatch = createEventDispatcher();

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});
	if (selectedTenant) {
		$form.name = selectedTenant.name;
		$form.email = selectedTenant.email;
		actionURL = actionURL+`/${selectedTenant.id}`;
	}
</script>

<form method="POST" use:enhance action={actionURL}>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
		<input hidden name="id" bind:value={$form.id}/>
		<div class="sm:col-span-2">
			<FloatingLabelInput
				style="outlined"
				type="text"
				id="name"
				name="name"
				required
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			>
				<BuildingSolid class="w-6 h-6 inline" />
				Tenant name
			</FloatingLabelInput>
			{#if $errors.name}<span class="text-red-600">{$errors.name}</span>{/if}
		</div>
		<div class="sm:col-span-2">
			<FloatingLabelInput
				style="outlined"
				type="email"
				id="email"
				name="email"
				required
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			>
				<EnvelopeSolid class="w-6 h-6 inline" />
				Tenant email
			</FloatingLabelInput>
			{#if $errors.email}<span class="text-red-600">{$errors.email}</span>{/if}
		</div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<Button type="submit" class="w-40">{!$form.id ? 'Create' : 'Update'} tenant</Button>
		</div>
	</div>
</form>
