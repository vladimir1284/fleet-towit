<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import { CirclePlusSolid } from 'flowbite-svelte-icons';

	import PartVendor from './part-vendor.component.svelte';
	import PartLocation from './part-location.component.svelte';
	import PartCategory from './part-category.component.svelte';

	import {
		createDefaultPartVendor,
		createDefaultPartLocation
	} from '$lib/features/create-part/helpers';

	import type { PartCreationType } from '$lib/types';
	import type { SuperForm } from 'sveltekit-superforms';

	// Retrieve super form context.
	const superPartForm: SuperForm<PartCreationType> = getContext('SuperPartForm');
	const { form: superPartStore } = superPartForm;

	// Create new category, vendor or location components and form data.
	const handleAddPartCategory = () => {
		const updatedWizardStore = { ...$superPartStore };
		superPartStore.set(updatedWizardStore);
	};
	const handleAddPartVendor = () => {
		const updatedWizardStore = { ...$superPartStore };
		updatedWizardStore.vendors.push(createDefaultPartVendor());
		// Assign update to trigger re-render.
		superPartStore.set(updatedWizardStore);
	};
	const handleAddPartLocation = () => {
		const updatedWizardStore = { ...$superPartStore };
		updatedWizardStore.locations.push(createDefaultPartLocation());
		// Assign update to trigger re-render.
		superPartStore.set(updatedWizardStore);
	};

	// Remove part related vendor or location based on its index.
	const handleRemovePartVendor = (index: number) => {
		let updatedWizardStore = { ...$superPartStore };
		updatedWizardStore.vendors = [
			...updatedWizardStore.vendors.slice(0, index),
			...updatedWizardStore.vendors.slice(index + 1, updatedWizardStore.vendors.length)
		];
		// Assign update to trigger re-render.
		superPartStore.set(updatedWizardStore);
	};
	const handleRemovePartLocation = (index: number) => {
		let updatedWizardStore = { ...$superPartStore };
		updatedWizardStore.locations = [
			...updatedWizardStore.locations.slice(0, index),
			...updatedWizardStore.locations.slice(index + 1, updatedWizardStore.locations.length)
		];
		// Assign update to trigger re-render.
		superPartStore.set(updatedWizardStore);
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
		<div class="flex flex-col gap-3">
			{#each $superPartStore.vendors as vendor, index (vendor.uuid)}
				<svelte:component
					this={PartVendor}
					{index}
					{handleRemovePartVendor}
					bind:partVendorName={$superPartStore.vendors[index].name}
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
		<div class="flex flex-col gap-3">
			{#each $superPartStore.locations as location, index (location.uuid)}
				<svelte:component
					this={PartLocation}
					{index}
					{handleRemovePartLocation}
					bind:partLocationName={$superPartStore.locations[index].name}
					bind:partLocationUnit={$superPartStore.locations[index].unit}
				/>
			{/each}
		</div>
	</div>
</div>
