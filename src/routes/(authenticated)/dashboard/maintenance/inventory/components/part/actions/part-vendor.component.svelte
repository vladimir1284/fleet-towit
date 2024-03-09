<script lang="ts">
	export let index: number;
	export let removePartVendor: Function;

	import { fade } from 'svelte/transition';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { ButtonGroup, InputAddon, Input } from 'flowbite-svelte';
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input type="text" placeholder="Vendor's name" required />
	</div>
	<div class="flex basis-2/5 gap-3 items-center">
		<ButtonGroup class="w-full">
			<InputAddon>$</InputAddon>
			<Input type="number" step={0.1} placeholder="Part cost" />
		</ButtonGroup>
		{#if index > 0}
			<TrashBinSolid on:click={() => removePartVendor(index)} />
		{/if}
	</div>
</div>
