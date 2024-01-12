<script async lang="ts">
	import { Button, Label, FloatingLabelInput } from 'flowbite-svelte';
	import { EnvelopeSolid, BuildingSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher } from 'svelte';

	export let data;

	const dispatch = createEventDispatcher();

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			console.log(form);
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});
</script>

<form action="/admin/companies" method="POST" use:enhance>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
				Company name
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
				Company email
			</FloatingLabelInput>
			{#if $errors.email}<span class="text-red-600">{$errors.email}</span>{/if}
		</div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<Button type="submit" class="w-40">Create company</Button>
		</div>
	</div>
</form>
