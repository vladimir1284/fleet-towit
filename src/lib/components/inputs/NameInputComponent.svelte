<script async script lang="ts">
	import { FloatingLabelInput } from 'flowbite-svelte';

	export let placeholder: string;
	export let constraints: any;
	export let errors: any;
	export let form: any;
</script>

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
	<slot />
	{placeholder}
</FloatingLabelInput>
{#if $errors.name}<span class="text-red-600">{$errors.name}</span>{/if}
