<script lang="ts">
	export let index: number;
	export let errors: Writable<SuperFormErrorType>;
	export let handleRemovePartVendor: Function;

	// Part wizard binding values.
	export let partVendorName: string;
	export let partVendorCost: string;

	import { fade } from 'svelte/transition';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { ButtonGroup, InputAddon, Input } from 'flowbite-svelte';

	import type { Writable } from 'svelte/store';
	import type { SuperFormErrorType } from '$lib/types';
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input type="text" placeholder="Vendor's name" bind:value={partVendorName} />
	</div>
	<div class="flex basis-2/5 gap-3 items-center">
		<ButtonGroup class="w-full">
			<InputAddon>$</InputAddon>
			<Input type="number" step={0.01} placeholder="Part cost" bind:value={partVendorCost} />
		</ButtonGroup>
		{#if index > 0}
			<TrashBinSolid on:click={() => handleRemovePartVendor(index)} />
		{/if}
	</div>
</div>
