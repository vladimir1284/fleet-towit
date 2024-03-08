<script lang="ts">
	import Table from '$lib/components/data-visualization/JsonTable/JsonTable.svelte';
	import { Button, Heading, P } from 'flowbite-svelte';
	import type { PageData } from '../../$types';
	import CreateVehicle from '$lib/components/modals/CreateVehicle.svelte';

	export let data: PageData;

	const vehicles = data.vehiclesData;

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
</script>

<Heading tag="h1" class="text-center">Vehicles</Heading>
<Table data={vehicles} rules={['capitalize', 'wordify']} {createButton} />
<CreateVehicle show={showCreateVehicle} {createVehicle} />
