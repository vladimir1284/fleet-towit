<script lang="ts">
	import DetailsView from '$lib/components/data-visualization/DetailsView.svelte';
	import { Heading } from 'flowbite-svelte';
	import type { PageData } from '../$types';

	export let data: PageData;

	const { vin } = data;
</script>

<DetailsView {vin} categoryName="costs" excludeFields={['id', 'vehicleId']} />
