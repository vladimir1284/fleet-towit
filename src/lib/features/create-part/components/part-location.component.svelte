<script lang="ts">
	export let index: number;
	export let handleRemovePartLocation: Function;

	// Part wizard binding values.
	export let partLocationName: string;
	export let partLocationUnit: string;

	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Input, Select } from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { InvalidForm } from '$lib/components/customized';

	import { numberProxy } from 'sveltekit-superforms';

	import type { PartCreationType } from '$lib/types';
	import type { SuperForm } from 'sveltekit-superforms';

	// Retrieve super form context.
	const superPartForm: SuperForm<PartCreationType> = getContext('SuperPartForm');
	const { form: superPartStore, errors: superPartErrorStore } = superPartForm;

	$: partLocationNameError = $superPartErrorStore?.locations?.[index]?.name;
	$: partLocationQuantityError = $superPartErrorStore?.locations?.[index]?.quantity;

	const partLocationQuantity = numberProxy(superPartStore, `locations[${index}].quantity`, {
		// Guarantee placeholder display.
		empty: 'zero',
		initiallyEmptyIfZero: true
	});
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input
			type="text"
			placeholder="Location"
			aria-invalid={partLocationNameError ? 'true' : undefined}
			bind:value={partLocationName}
		/>
		<div class="h-5">
			{#if partLocationNameError}<InvalidForm errors={partLocationNameError} />{/if}
		</div>
	</div>
	<div class="basis-2/5">
		<div class="flex gap-3 items-center">
			<div class="flex justify-between gap-2">
				<div>
					<Input
						type="number"
						name="quantity"
						placeholder="Quantity"
						class="basis-4/5"
						aria-invalid={partLocationQuantityError ? 'true' : undefined}
						bind:value={$partLocationQuantity}
					/>
				</div>
				<Select class="basis-1/5" bind:value={partLocationUnit} />
			</div>
			{#if index > 0}
				<TrashBinSolid on:click={() => handleRemovePartLocation(index)} />
			{/if}
		</div>
		<div class="h-5">
			{#if partLocationQuantityError}<InvalidForm errors={partLocationQuantityError} />{/if}
		</div>
	</div>
</div>
