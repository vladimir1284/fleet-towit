<script lang="ts">
	import { Search, Dropdown, DropdownItem, Button } from 'flowbite-svelte';
	import { ChevronDownSolid, CirclePlusOutline } from 'flowbite-svelte-icons';

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox
	} from 'flowbite-svelte';

	import { PartCreation } from './actions';

	import { getContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	import type { Part } from '@prisma/client';

	let isVisiblePartModal = false;

	// Retrieve part list context.
	const writablePartStore: Writable<Part[]> = getContext('PartList');
	const partTableHeaders = Object.keys($writablePartStore[0]);
</script>

<div class="flex justify-end mb-5">
	<div class="flex flex-column gap-2">
		<Search size="md" />
		<Button>Actions<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button>
		<Dropdown>
			<DropdownItem>Export All</DropdownItem>
			<DropdownItem>Edit Categories</DropdownItem>
			<DropdownItem>Edit Locations</DropdownItem>
			<DropdownItem>Delete</DropdownItem>
		</Dropdown>
		<Button on:click={() => (isVisiblePartModal = true)}
			><CirclePlusOutline class="w-4 h-4 me-2 text-white dark:text-white" />Part</Button
		>
	</div>
</div>

<PartCreation bind:isVisiblePartModal />

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell class="!p-4">
			<Checkbox />
		</TableHeadCell>
		{#each partTableHeaders as header}
			<TableHeadCell>{header}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each $writablePartStore as part}
			<TableBodyRow>
				<TableBodyCell class="!p-4">
					<Checkbox />
				</TableBodyCell>
				{#each Object.values(part) as value}
					<TableBodyCell>{value}</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
