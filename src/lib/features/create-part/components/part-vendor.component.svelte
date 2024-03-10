<script lang="ts">
	export let index: number;
	export let handleRemovePartVendor: Function;

	// Part wizard binding values.
	export let partVendorName: string;
	export let partVendorCost: number;

	import { fade } from 'svelte/transition';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { ButtonGroup, InputAddon, Input } from 'flowbite-svelte';
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input type="text" placeholder="Vendor's name" bind:partVendorName required />
	</div>
	<div class="flex basis-2/5 gap-3 items-center">
		<ButtonGroup class="w-full">
			<InputAddon>$</InputAddon>
			<Input type="number" step={0.1} placeholder="Part cost" bind:partVendorCost required />
		</ButtonGroup>
		{#if index > 0}
			<TrashBinSolid on:click={() => handleRemovePartVendor(index)} />
		{/if}
	</div>
</div>
