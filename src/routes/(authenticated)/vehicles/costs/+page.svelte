<script>
	import Table from '$lib/components/data-visualization/Table.svelte';
	import mockData from '$lib/mocks/costs.json';
</script>

<Table title="Costs" data={mockData} />
