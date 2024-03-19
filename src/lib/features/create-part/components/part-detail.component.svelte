<script lang="ts">
	export let errors: Writable<SuperFormError>;
	export let superPartStore: Writable<PartCreationType>;

	import { Label, Input, Textarea } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import {
		// Constants.
		PART_UPC_LAYOUT_CONSTRAINT,
		PART_QTY_LAYOUT_CONSTRAINT,
		PART_NUMBER_LAYOUT_CONSTRAINT
	} from '$lib/features/create-part/helpers';

	import type { Writable } from 'svelte/store';
	import type { PartCreationType } from '$lib/types';
	import { SuperFormError } from 'sveltekit-superforms';
</script>

<div class="flex flex-col gap-4">
	<div>
		<Label for="part-name" class="mb-2 font-medium text-sm font-sans text-slate-700"
			>Part name:</Label
		>
		<Input
			type="text"
			id="part-name"
			placeholder="Ex: Transmission, Radiator, Axle"
			bind:value={$superPartStore.name}
		/>
	</div>
	<div class="flex justify-between">
		<div class="flex basis-2/3 gap-2">
			<Input
				type="number"
				placeholder="Part amount"
				class="basis-1/3"
				bind:value={$superPartStore.number}
			/>
			<Input
				type="number"
				placeholder="Critical QTY"
				class="basis-1/3"
				bind:value={$superPartStore.criticalQty}
			/>
			<InfoCircleSolid class="self-center" />
		</div>
		<Input type="number" placeholder="UPC" class="basis-1/3" bind:value={$superPartStore.upc} />
	</div>
	<Textarea
		placeholder="Part description"
		rows="4"
		class="resize-none"
		bind:value={$superPartStore.description}
	/>
</div>
