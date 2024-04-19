<script lang="ts">
	import GenericTable from '$lib/components/data-visualization/GenericTable.svelte';
	import { Heading, Card } from 'flowbite-svelte';
	import type { PageData } from '../../$types';
	import CreateVehicle from '$lib/components/modals/CreateVehicle.svelte';
	import type { MoreDetailsButton } from '$lib/components/data-visualization/types';
	import { EyeOutline } from 'flowbite-svelte-icons';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data: PageData;

	const { vehicles, details } = data;

	const tableData = {
		vehicles,
		details
	};

	/*
	 * STATES
	 */

	let showCreateVehicle = false;
	let moreDetailsButton: MoreDetailsButton = {
		icon: EyeOutline,
		text: 'More details'
	};

	/*
	 * OTHERS
	 */

	const createButton = {
		text: 'New vehicle',
		onClick: () => {
			showCreateVehicle = true;
		}
	};

	const createVehicle = (data) => {};

	// Vehicle creation context.
	const { form } = data;
	setContext('VehicleForm', writable(form));
</script>


<CreateVehicle
	show={showCreateVehicle}
	{createVehicle}
	close={() => {
		showCreateVehicle = false;
	}}
/>

<Card size="xl" class="flex w-full max-h-[33rem] md:w-auto mt-5">
	<GenericTable
		records={vehicles}
		rules={['capitalize', 'wordify']}
		create={() => {
			showCreateVehicle = true;
		}}
		{moreDetailsButton}
		excludeFields={['id', 'vin']}
	/>
</Card>


