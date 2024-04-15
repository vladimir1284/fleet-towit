<script lang="ts">
	import { Dropdown, DropdownItem, Button } from 'flowbite-svelte';
	import { ChevronDownSolid, CirclePlusOutline } from 'flowbite-svelte-icons';

	import { PartList } from '$lib/features/list-part/components';
	import { PartSearch } from '$lib/features/search-part/components';
	import { PartCreation } from '$lib/features/create-part/components';

	import queryString from 'query-string';
	import { getContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	import type { Part } from '@prisma/client';
	import axios from 'axios';

	// Retrieve part list context.
	const writablePartStore: Writable<Part[]> = getContext('PartList');

	// Component state.
	let isVisiblePartWizard = false,
		partSearchPattern = '';

	const searchPartRecords = async (partSearchPattern: string) => {
		const queryParams = {
			name: partSearchPattern
		};

		const parsedQueryParams = queryString.stringifyUrl(
			{
				url: '/api/maintenance/inventory/parts',
				query: queryParams
			},
			{
				// Options if required...
			}
		);

		await axios
			.get(parsedQueryParams)
			.then((response) => {
				const { data: untainedTenantParts } = response.data;
				return untainedTenantParts;
			})
			.catch((error) => {
				console.error('Error fetching parts:', error);
				return $writablePartStore;
			});
	};

	$: promise = searchPartRecords(partSearchPattern);
</script>

<div class="flex justify-end mb-5">
	<div class="flex flex-column gap-2">
		<PartSearch bind:partSearchPattern />
		<Button>Actions<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button>
		<Dropdown>
			<DropdownItem>Export All</DropdownItem>
			<DropdownItem>Edit Categories</DropdownItem>
			<DropdownItem>Edit Locations</DropdownItem>
			<DropdownItem>Delete</DropdownItem>
		</Dropdown>
		<Button on:click={() => (isVisiblePartWizard = true)}
			><CirclePlusOutline class="w-4 h-4 me-2 text-white dark:text-white" />Part</Button
		>
	</div>
</div>

<PartCreation bind:isVisiblePartWizard />

{#await promise}
	<div>Waiting...</div>
{:then parts}
	<PartList {parts} />
{/await}
