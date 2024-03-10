<script lang="ts">
	import { CirclePlusSolid } from 'flowbite-svelte-icons';
	import { Heading, P } from 'flowbite-svelte';

	import PartVendor from './part-vendor.component.svelte';
	import PartLocation from './part-location.component.svelte';
	import PartCategory from './part-category.component.svelte';

	import { getContext } from 'svelte';
	import {
		createDefaultPartVendor,
		createDefaultPartLocation
	} from '$lib/features/create-part/helpers';

	import type { Writable } from 'svelte/store';
	import type { PartCreationWizard } from '$lib/types';

	// Retrieve part creation wizard context.
	const partCreationWizardStore: Writable<PartCreationWizard> = getContext('PartCreationWizard');

	// Create new category, vendor or location components and form data.
	const handleAddPartCategory = () => {
		const updatedWizardStore = { ...$partCreationWizardStore };
		partCreationWizardStore.set(updatedWizardStore);
	};
	const handleAddPartVendor = () => {
		const updatedWizardStore = { ...$partCreationWizardStore };
		updatedWizardStore.vendors.push(createDefaultPartVendor());
		// Assign update to trigger re-render.
		partCreationWizardStore.set(updatedWizardStore);
	};
	const handleAddPartLocation = () => {
		const updatedWizardStore = { ...$partCreationWizardStore };
		updatedWizardStore.locations.push(createDefaultPartLocation());
		// Assign update to trigger re-render.
		partCreationWizardStore.set(updatedWizardStore);
	};

	// Remove part related vendor or location based on its index.
	const handleRemovePartVendor = (index: number) => {
		let updatedWizardStore = { ...$partCreationWizardStore };
		updatedWizardStore.vendors = [
			...updatedWizardStore.vendors.slice(0, index),
			...updatedWizardStore.vendors.slice(index + 1, updatedWizardStore.vendors.length)
		];
		// Assign update to trigger re-render.
		partCreationWizardStore.set(updatedWizardStore);
	};
	const handleRemovePartLocation = (index: number) => {
		let updatedWizardStore = { ...$partCreationWizardStore };
		updatedWizardStore.locations = [
			...updatedWizardStore.locations.slice(0, index),
			...updatedWizardStore.locations.slice(index + 1, updatedWizardStore.locations.length)
		];
		// Assign update to trigger re-render.
		partCreationWizardStore.set(updatedWizardStore);
	};
</script>

<div class="flex flex-col gap-4">
	<div>
		<PartCategory />
	</div>
	<div>
		<div class="flex justify-between items-center">
			<Heading tag="h5" class="my-3 font-sans text-slate-700" customSize="text-base font-semibold"
				>Vendors</Heading
			>
			<div
				class="flex gap-2 justify-end items-center me-1.5"
				tabindex="0"
				on:click={handleAddPartVendor}
				on:keydown={handleAddPartVendor}
				role="button"
			>
				<CirclePlusSolid size="md" />
				<P class="my-3 font-sans text-slate-700 text-sm font-semibold text-nowrap">Add vendor</P>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			{#each $partCreationWizardStore.vendors as vendor, index (vendor.uuid)}
				<svelte:component
					this={PartVendor}
					{index}
					{handleRemovePartVendor}
					bind:partVendorName={$partCreationWizardStore.vendors[index].name}
					bind:partVendorCost={$partCreationWizardStore.vendors[index].cost}
				/>
			{/each}
		</div>
	</div>
	<div>
		<div class="flex justify-between items-center">
			<Heading tag="h5" class="my-3 font-sans text-slate-700" customSize="text-base font-semibold"
				>Locations</Heading
			>
			<div
				class="flex gap-2 justify-end items-center"
				tabindex="0"
				on:click={handleAddPartLocation}
				on:keydown={handleAddPartLocation}
				role="button"
			>
				<CirclePlusSolid size="md" />
				<P class="my-3 font-sans text-slate-700 text-sm font-semibold text-nowrap">Add location</P>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			{#each $partCreationWizardStore.locations as location, index (location.uuid)}
				<svelte:component
					this={PartLocation}
					{index}
					{handleRemovePartLocation}
					bind:partLocationName={$partCreationWizardStore.locations[index].name}
					bind:partLocationQuantiy={$partCreationWizardStore.locations[index].quantity}
					bind:partLocationUnit={$partCreationWizardStore.locations[index].unit}
				/>
			{/each}
		</div>
	</div>
</div>
