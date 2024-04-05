<script lang="ts">
	import { Alert, Heading, Spinner } from 'flowbite-svelte';
	import type { PageData } from '../../../routes/$types';
	import Table from '$lib/components/data-visualization/GenericTable.svelte';
	import { onMount } from 'svelte';
	import type { TransformRule } from './transformation/types';
	import { transform } from './transformation/transform';

	export let rules: TransformRule[] = ['capitalize', 'wordify'];
	export let vin: string;
	export let categoryName: string;
	export let excludeFields: string[] = [];

	let records: any[];
	let nickname: string;

	const load = async () => {
		const url = `/api/vehicles/${vin}/${categoryName}/`;

		console.log('URL', url);
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			records = data.records;
			nickname = data.nickname;
		} else {
			throw new Error('Not reloaded');
		}
	};

	const remove = async (id: string) => {
		try {
			const url = `/api/vehicles/${vin}/${categoryName}/${id}`;
			const response = await fetch(url, {
				method: 'delete'
			});

			await load();
		} catch (error) {
			//@ts-ignore
			alert(error.message);
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
