<script lang="ts">
	import Table from '$lib/components/data-visualization/VehiclesTable.svelte';
	import { Heading } from 'flowbite-svelte';
	import type { PageData } from '../../$types';

	export let data: PageData;
</script>

<Heading tag="h1" class="text-center">Vehicles</Heading>
<Table data={data.vehicles} rules={['capitalize', 'wordify']} />
