<script lang="ts">
	import { CirclePlusSolid } from 'flowbite-svelte-icons';
	import { Heading, Input, P } from 'flowbite-svelte';

	import PartVendor from './part-vendor.component.svelte';
	import PartLocation from './part-location.component.svelte';

	// Generate uuid per new vendor or location component.
	import { v4 as uuidv4 } from 'uuid';

	// Default customization step components.
	let vendors = [{ uuid: uuidv4(), component: PartVendor }];
	let locations = [{ uuid: uuidv4(), component: PartLocation }];

	// Create new vendor or location components.
	const addPartVendor = () => {
		vendors = [...vendors, { uuid: uuidv4(), component: PartVendor }];
	};
	const addPartLocation = () => {
		locations = [...locations, { uuid: uuidv4(), component: PartLocation }];
	};

	// Remove part related vendor or location based on its index.
	const removePartVendor = (index: number) => {
		vendors = [...vendors.slice(0, index), ...vendors.slice(index + 1, vendors.length)];
	};
	const removePartLocation = (index: number) => {
		locations = [...locations.slice(0, index), ...locations.slice(index + 1, locations.length)];
	};
</script>

<div class="flex flex-col gap-4">
	<div>
		<Input type="text" placeholder="Type to search or add categories..." required />
	</div>
	<div>
		<div class="flex justify-between items-center">
			<Heading tag="h5" class="my-3 font-sans text-slate-700" customSize="text-base font-semibold"
				>Vendors</Heading
			>
			<div
				class="flex gap-2 justify-end items-center me-1.5"
				tabindex="0"
				on:click={addPartVendor}
				on:keydown={addPartVendor}
				role="button"
			>
				<CirclePlusSolid size="md" />
				<P class="my-3 font-sans text-slate-700 text-sm font-semibold text-nowrap">Add vendor</P>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			{#each vendors as vendor, index (vendor.uuid)}
				<svelte:component this={vendor.component} {index} {removePartVendor} />
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
				on:click={addPartLocation}
				on:keydown={addPartLocation}
				role="button"
			>
				<CirclePlusSolid size="md" />
				<P class="my-3 font-sans text-slate-700 text-sm font-semibold text-nowrap">Add location</P>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			{#each locations as location, index (location.uuid)}
				<svelte:component this={location.component} {index} {removePartLocation} />
			{/each}
		</div>
	</div>
</div>
