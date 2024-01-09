<script lang="ts">
	import { Input, Label, Helper, Button, Checkbox, A } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form } = superForm(data.form);
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>

<div class="grid-cols-1">
	<div class="mb-4">
		<SuperDebug data={$form} />
	</div>

	<form method="POST">
		<div class="grid gap-6 mb-6 md:grid-cols-2">
			<div>
				<Label for="name" class="mb-2">Name</Label>
				<Input type="text" name="name" bind:value={$form.name} />
			</div>
			<div>
				<Label for="phone" class="mb-2">Phone number</Label>
				<Input
					type="tel"
					name="phoneNumber"
					bind:value={$form.phoneNumber}
					placeholder="123-45-678"
				/>
			</div>
			<div>
				<Label for="email" class="mb-2">E-mail</Label>
				<Input type="email" name="email" bind:value={$form.email} />
			</div>
			<Button type="submit">Create</Button>
		</div>
	</form>
</div>
