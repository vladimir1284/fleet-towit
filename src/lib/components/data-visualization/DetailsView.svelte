<script lang="ts">
	import { Alert, Heading, Spinner } from 'flowbite-svelte';
	import Table from '$lib/components/data-visualization/GenericTable.svelte';
	import { onMount } from 'svelte';
	import type { TransformRule } from './transformation/types';
	import { transform } from './transformation/transform';
	import axios from 'axios';

	export let rules: TransformRule[] = ['capitalize', 'wordify'];
	export let vin: string;
	export let categoryName: string;
	export let excludeFields: string[] = [];

	let records: any[];
	let nickname: string;

	const load = async () => {
		const url = `/api/vehicles/${vin}/${categoryName}/`;

        try {
            const response = await axios.get(url);
            records = response.data.records;
            nickname = response.data.nickname;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Not reloaded');
        }

	};

	const remove = async (id: string) => {
		try {
            const url = `/api/vehicles/${vin}/${categoryName}/${id}`;
            await axios.delete(url);

            await load();
        } catch (error) {
            console.error('Error removing item:', error);
            // Consider a more user friendly way to handle errors, such as displaying a message in the UI
            alert(error.message); // This line is commented out as it's not recommended to use alerts for error handling in production applications
        }
	};

	const create = async () => {
		await load();
	};

	onMount(async () => {
		await load();
	});
</script>

<Heading tag="h1" class="text-center"
	>{transform(categoryName, rules)} of {nickname ? nickname : 'vehicle with no nickname'}</Heading
>
<span class="w-full text-center"><strong>VIN:</strong> {vin}</span>
{#if records}
	{#if records.length}
		<Table {records} rules={['capitalize', 'wordify']} {remove} {create} {excludeFields} />
	{:else}
		<Alert color="yellow">
			<span class="font-medium">No data</span>
		</Alert>
	{/if}
{:else}
	<Spinner />
{/if}
