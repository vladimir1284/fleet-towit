<script lang="ts">
	import Table from '$lib/components/data-visualization/VehiclesTable.svelte';
	import { Button, Heading, P } from 'flowbite-svelte';
	import type { PageData } from '../../$types';
	import CreateVehicle from '$lib/components/modals/CreateVehicle.svelte';

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

	console.log(
		`type of {
                    "image": "https://example.com/cx51.jpg"
                }`,
		typeof {
			image: 'https://example.com/cx51.jpg'
		}
	);
</script>

<Heading tag="h1" class="text-center">Vehicles</Heading>
<Table data={tableData} rules={['capitalize', 'wordify']} {createButton} />
<CreateVehicle show={showCreateVehicle} {createVehicle} />
