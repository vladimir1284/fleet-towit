<script async script lang="ts">
	import { FloatingLabelInput } from 'flowbite-svelte';

	
	export let placeholder: string;
	export let formPointer: any | undefined;
	export let constraints: any | undefined;
	export let errors: any | undefined;
	export let form: any | undefined;
</script>

<FloatingLabelInput
	style="outlined"
	type="text"
	id={formPointer}
	name={formPointer}
	aria-invalid={$errors ? 'true' : undefined}
	bind:value={$form[formPointer]}
	{...$constraints[formPointer]}
>
	<slot />
	{placeholder}
</FloatingLabelInput>
{#if $errors[formPointer]}<span class="text-red-600">{$errors[formPointer]}</span>{/if}
