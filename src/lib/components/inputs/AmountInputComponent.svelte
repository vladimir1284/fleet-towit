<script async script lang="ts">
	import { CashSolid } from 'flowbite-svelte-icons';
	import { FloatingLabelInput } from 'flowbite-svelte';

	export let placeholder: string;
	export let constraints: any;
	export let errors: any;
	export let form: any;

	$: if ($form.amount == 0) {
		$form.amount = undefined;
	}
</script>

<FloatingLabelInput
	style="outlined"
	type="number"
	id="amount"
	name="amount"
	required
	aria-invalid={$errors.amount ? 'true' : undefined}
	bind:value={$form.amount}
	{...$constraints.amount}
>
	<CashSolid class="w-6 h-6 inline" />
	{placeholder}
</FloatingLabelInput>
{#if $errors.amount}<span class="text-red-600">{$errors.amount}</span>{/if}
