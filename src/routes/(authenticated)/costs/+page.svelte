<script lang="ts">
	import Table from '$lib/components/data-visualization/CostsTable.svelte';
	import { Heading } from 'flowbite-svelte';

	export let data;

	//console.log('DATA:\n', JSON.stringify(data));
</script>

<Heading>Costs</Heading>
<Table data={data.costs} rules={['capitalize', 'wordify']} />
