<script lang="ts">
	// @ts-nocheck

	import {
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
	import { transform } from '../transformation/transform';
	import type { TransformRule } from '../transformation/types';
	import * as Icon from 'flowbite-svelte-icons';
	import type { CustomButton } from './types';
	import ModalJsonTable from './components/ModalJsonTable.svelte';
	import { stringify } from 'querystring';

	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];
	export let createButton: CustomButton | null = null;
	//export let deleteButton: CustomButton | null = null;

	let headers = Array.isArray(data) ? (data.length ? Object.keys(data[0]) : []) : Object.keys(data);

	console.log('HEADERS:', headers);

	let showCompoundItem = false;
	const compoundItem = {
		title: '',
		data: [],
		rules: []
	};

	/*
	 * STATES
	 */

	/*
	 * EVENT HANDLERS
	 */
</script>

<div>
	<ModalJsonTable
		title={compoundItem.title}
		data={compoundItem.data}
		rules={compoundItem.rules}
		showModal={showCompoundItem}
	/>

	{#if title}
		<Heading tag="h2" class="mb-4">{title}</Heading>
		<hr />
	{/if}
	<div class="flex my-4">
		{#if createButton}
			<Button on:click={createButton.onClick} style={createButton.style && createButton.style}>
				{#if createButton.icon}
					{Icon[createButton.icon]}
				{/if}
				{#if createButton.text}
					{createButton.text}
				{/if}
			</Button>
		{/if}
	</div>
	<Table>
		<TableHead>
			{#each headers as header}
				<TableHeadCell>
					<h3>{transform(String(header), rules)}</h3>
				</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#if Array.isArray(data)}
				{#each data as record}
					<TableBodyRow>
						{#each Object.keys(record) as key}
							{#if record[key].type === 'simple'}
								<TableBodyCell><p>{transform(String(record[key].value), rules)}</p></TableBodyCell>
							{:else}
								<TableBodyCell>
									<Button
										on:click={() => {
											showCompoundItem = true;
											compoundItem.title = key;
											const value = record[key].value;
											compoundItem.data = value;
											compoundItem.rules = rules;
										}}
									>
										<div class="flex gap-2">
											<svelte:component
												this={Icon[record[key].button.icon]}
												class="pointer-events-none"
											/>
										</div>
									</Button>
								</TableBodyCell>
							{/if}
						{/each}
					</TableBodyRow>
				{/each}
			{:else}
				{#each Object.keys(data) as key}
					<TableBodyCell><p>{transform(String(data[key].value), rules)}</p></TableBodyCell>
				{/each}
			{/if}
		</TableBody>
	</Table>
</div>
