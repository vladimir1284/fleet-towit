<script lang="ts">
	//import Table from '$lib/components/data-visualization/VehiclesTable.svelte';
	import GenericTable from '$lib/components/data-visualization/GenericTable.svelte';
	import { Button, Heading, P } from 'flowbite-svelte';
	import type { PageData } from '../../$types';
	import CreateVehicle from '$lib/components/modals/CreateVehicle.svelte';
	import type { MoreDetailsButton } from '$lib/components/data-visualization/types';
	import { TableSolid } from 'flowbite-svelte-icons';
	import { SvelteComponent } from 'svelte';

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
		icon: TableSolid,
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
</script>

<Heading tag="h1" class="text-center">Vehicles</Heading>
<!--<Table data={tableData} rules={['capitalize', 'wordify']} {createButton} />-->
<GenericTable
	records={vehicles}
	rules={['capitalize', 'wordify']}
	create={() => {
		showCreateVehicle = true;
	}}
	{moreDetailsButton}
	excludeFields={['id', 'vin']}
/>
<CreateVehicle
	show={showCreateVehicle}
	{createVehicle}
	close={() => {
		showCreateVehicle = false;
	}}
/>
