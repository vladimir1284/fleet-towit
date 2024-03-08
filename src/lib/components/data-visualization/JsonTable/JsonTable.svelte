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
	import CompoundItemButton from './components/CompoundItemButton.svelte';

	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];
	export let createButton: CustomButton | null = null;
	//export let deleteButton: CustomButton | null = null;

	let headers = Array.isArray(data) ? (data.length ? Object.keys(data[0]) : []) : Object.keys(data);

	console.log('HEADERS:', headers);

	/*
	 * STATES
	 */

	let showCompoundItem = false;

	const compoundItem = {
		title: '',
		data: [],
		rules: []
	};

	/*
	 * EVENT HANDLERS
	 */

	const compoundItemClick = (data, key) => {
		showCompoundItem = true;

		compoundItem.title = key;
		compoundItem.rules = rules;

		const value = data[key].value;
		compoundItem.data = value;

		console.log('***DATA RECEIVED IN JSON TABLE***\n' + JSON.stringify(data, null, 4));
	};
</script>

<div>
	<ModalJsonTable
		title={compoundItem.title}
		data={compoundItem.data}
		rules={compoundItem.rules}
		showModal={showCompoundItem}
		onClose={() => {
			showCompoundItem = false;
		}}
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
									<CompoundItemButton
										icon={record[key].button && Icon[record[key].button.icon]}
										onClick={() => {
											compoundItemClick(record, key);
										}}
									/>
								</TableBodyCell>
							{/if}
						{/each}
					</TableBodyRow>
				{/each}
			{:else}
				{#each Object.keys(data) as key}
					{#if data[key].type === 'simple'}
						<TableBodyCell><p>{transform(String(data[key].value), rules)}</p></TableBodyCell>
					{:else}
						<TableBodyCell>
							<CompoundItemButton
								icon={data[key].button && Icon[data[key].button.icon]}
								onClick={() => {
									compoundItemClick(data, key);
								}}
							/>
						</TableBodyCell>
					{/if}
				{/each}
			{/if}
		</TableBody>
	</Table>
</div>
