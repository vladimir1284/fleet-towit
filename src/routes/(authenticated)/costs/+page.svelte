<script lang="ts">
	import DetailsView from '$lib/components/data-visualization/DetailsView.svelte';
	import Table from '$lib/components/data-visualization/GenericTable.svelte';
	import { Heading } from 'flowbite-svelte';

	export let data;

	//console.log('DATA:\n', JSON.stringify(data));
</script>

<Heading>Costs</Heading>
<DetailsView />
