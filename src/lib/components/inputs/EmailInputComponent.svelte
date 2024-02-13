<script async script lang="ts">
	import { FloatingLabelInput } from 'flowbite-svelte';
	import { EnvelopeSolid } from 'flowbite-svelte-icons';

	export let placeholder: string;
	export let constraints: any;
	export let errors: any;
	export let form: any;
</script>

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
	{placeholder}
</FloatingLabelInput>
{#if $errors.email}<span class="text-red-600">{$errors.email}</span>{/if}
