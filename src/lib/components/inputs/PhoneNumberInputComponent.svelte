<script async script lang="ts">
	import { PhoneSolid } from 'flowbite-svelte-icons';
	import { FloatingLabelInput } from 'flowbite-svelte';

	export let placeholder: string = 'Phone Number';
	export let constraints: any;
	export let errors: any;
	export let form: any;

	$: formattedPhoneNumber = formatPhoneNumber($form.phoneNumber);

	function formatPhoneNumber(phoneNumber: string) {
		let cleaned = ('' + phoneNumber).replace(/\D/g, '');
		let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			$form.phoneNumber = '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4];
		}
	}
</script>

<FloatingLabelInput
	style="outlined"
	type="tel"
	id="phoneNumber"
	name="phoneNumber"
	required
	aria-invalid={$errors.phoneNumber ? 'true' : undefined}
	bind:value={$form.phoneNumber}
	{...$constraints.phoneNumber}
>
	<PhoneSolid class="w-6 h-6 inline" />
	{placeholder}
</FloatingLabelInput>
{#if $errors.phoneNumber}<span class="text-red-600">{$errors.phoneNumber}</span>{/if}
