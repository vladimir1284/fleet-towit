<script lang="ts">
	// @ts-nocheck

	import {
		Alert,
		Button,
		Heading,
		Hr,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { transform } from './transformation/transform';
	import type { TransformRule } from './transformation/types';
	import { PlusSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import EditRecord from './EditRecord.svelte';
	import type { MoreDetailsButton } from './types';
	import { goto } from '$app/navigation';

	export let title: string = '';
	export let records: Object[] = [];
	export let moreDetailsButton: MoreDetailsButton | null = null;
	export let rules: TransformRule[] = [];
	export let excludeFields: string[] = [];

	excludeFields.push('moreDetailsRoute');

	export let remove: (id: string) => {};
	export let create: () => {};

	let headers = records.length ? Object.keys(records[0]) : [];

	let showEditModal = false;
	let recordToEdit;
</script>

<EditRecord
	bind:value={recordToEdit}
	show={showEditModal}
	close={() => {
		showEditModal = false;
	}}
/>

<div>
	{#if title}
		<Heading tag="h2" class="mb-4">{title}</Heading>
		{#if records.length}<hr />{/if}
	{/if}

	{#if records.length}
		<div class="flex justify-end my-4">
			<Button on:click={create}>
				<PlusSolid class="pointer-events-none" />
			</Button>
		</div>
		<Table>
			<TableHead>
				{#each headers as header}
					{#if !excludeFields.includes(header)}
						<TableHeadCell>
							<h3>{transform(String(header), rules)}</h3>
						</TableHeadCell>
					{/if}
				{/each}
				<TableHeadCell/>
			</TableHead>
			<TableBody>
				{#each records as record}
					<TableBodyRow>
						{#each Object.keys(record) as key}
							{#if !excludeFields.includes(key)}
								<TableBodyCell><p>{transform(String(record[key]), rules)}</p></TableBodyCell>
							{/if}
						{/each}
						<TableBodyCell class="flex gap-2">
							{#if moreDetailsButton}
								<svelte:component
									this={moreDetailsButton.icon}
									class="text-gray-400"
									on:click={() => {
										goto(record.moreDetailsRoute);
									}}
								/>
							{/if}
							<TrashBinSolid
								class="text-red-500"
								on:click={() => {
									remove(record.id);
								}}
							/>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{:else}
		<Alert color="red">No data</Alert>
	{/if}
</div>
