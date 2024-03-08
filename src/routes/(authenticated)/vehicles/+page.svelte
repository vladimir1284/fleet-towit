<script lang="ts">
	import Table from '$lib/components/data-visualization/JsonTable/JsonTable.svelte';
	import { Button, Heading, P } from 'flowbite-svelte';
	import type { PageData } from '../../$types';
	import CreateVehicle from '$lib/components/modals/CreateVehicle.svelte';
	import FileSaver from 'file-saver';

	export let data: PageData;

	const saveVehicleData = (data) => {
		const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'text/plain;charset=utf-8' });
		FileSaver.saveAs(blob, 'vehicle-data-' + new Date().toTimeString());
	};

	if (data) {
		saveVehicleData(data);
	}

	/*
	 * STATES
	 */

	let showCreateVehicle = false;
	let showMoreDetails = true;

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
<Table data={data.vehicles} rules={['capitalize', 'wordify']} {createButton} />
<CreateVehicle show={showCreateVehicle} {createVehicle} />
