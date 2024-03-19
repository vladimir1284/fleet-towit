<script lang="ts">
	export let index: number;
	export let handleRemovePartLocation: Function;

	// Part wizard binding values.
	export let partLocationName: string;
	export let partLocationQuantity: string | null;
	export let partLocationUnit: string;

	import { fade } from 'svelte/transition';
	import { Input, Select } from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input type="text" placeholder="Location" bind:value={partLocationName} required />
	</div>
	<div class="flex basis-2/5 gap-3 items-center">
		<div class="flex justify-between gap-2">
			<Input
				type="number"
				name="quantity"
				placeholder="Quantity"
				class="basis-4/5"
				bind:value={partLocationQuantity}
				required
			/>
			<Select class="basis-1/5" bind:value={partLocationUnit} />
		</div>
		{#if index > 0}
			<TrashBinSolid on:click={() => handleRemovePartLocation(index)} />
		{/if}
	</div>
</div>
