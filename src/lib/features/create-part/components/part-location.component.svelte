<script lang="ts">
	export let index: number;
	export let errors: Writable<SuperFormErrorType>;
	export let handleRemovePartLocation: Function;

	// Part wizard binding values.
	export let partLocationName: string;
	export let partLocationQuantity: string;
	export let partLocationUnit: string;

	import { fade } from 'svelte/transition';
	import { Input, Select } from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { InvalidForm } from '$lib/components/customized';

	import type { Writable } from 'svelte/store';
	import type { SuperFormErrorType } from '$lib/types';

	$: quantityError = $errors?.locations?.[index]?.quantity;
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input
			type="text"
			placeholder="Location"
			aria-invalid={$errors?.locations?.[index]?.name ? 'true' : undefined}
			bind:value={partLocationName}
		/>
	</div>
	<div class="flex basis-2/5 gap-3 items-center">
		<div class="flex justify-between gap-2">
			<div>
				<Input
					type="number"
					name="quantity"
					placeholder="Quantity"
					class="basis-4/5"
					aria-invalid={quantityError ? 'true' : undefined}
					bind:value={partLocationQuantity}
				/>
			</div>
			<Select class="basis-1/5 self-start" bind:value={partLocationUnit} />
		</div>
		{#if index > 0}
			<TrashBinSolid on:click={() => handleRemovePartLocation(index)} />
		{/if}
	</div>
</div>
