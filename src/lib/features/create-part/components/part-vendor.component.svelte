<script lang="ts">
	export let index: number;
	export let handleRemovePartVendor: Function;

	// Part wizard binding values.
	export let partVendorName: string;

	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { InvalidForm } from '$lib/components/customized';
	import { ButtonGroup, InputAddon, Input } from 'flowbite-svelte';

	import { numberProxy } from 'sveltekit-superforms';

	import type { PartCreationType } from '$lib/types';
	import type { SuperForm } from 'sveltekit-superforms';

	// Retrieve super form context.
	const superPartForm: SuperForm<PartCreationType> = getContext('SuperPartForm');
	const { form: superPartStore, errors: superPartErrorStore } = superPartForm;

	$: partVendorNameError = $superPartErrorStore?.vendors?.[index]?.name;
	$: partVendorCostError = $superPartErrorStore?.vendors?.[index]?.cost;

	const partVendorCost = numberProxy(superPartStore, `vendors[${index}].cost`, {
		// Guarantee placeholder display.
		empty: 'zero',
		initiallyEmptyIfZero: true
	});
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input type="text" placeholder="Vendor's name" bind:value={partVendorName} />
		<div class="h-5">
			{#if partVendorNameError}<InvalidForm errors={partVendorNameError} />{/if}
		</div>
	</div>
	<div class="basis-2/5">
		<div class="flex gap-3 items-center">
			<ButtonGroup class="w-full">
				<InputAddon>$</InputAddon>
				<Input type="number" step={0.01} placeholder="Part cost" bind:value={$partVendorCost} />
			</ButtonGroup>
			{#if index > 0}
				<TrashBinSolid on:click={() => handleRemovePartVendor(index)} />
			{/if}
		</div>
		<div class="h-5">
			{#if partVendorCostError}<InvalidForm errors={partVendorCostError} />{/if}
		</div>
	</div>
</div>
