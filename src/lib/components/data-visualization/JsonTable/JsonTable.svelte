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
	import ModalJsonTable from './lib/components/ModalJsonTable.svelte';
	import FileSaver from 'file-saver';
	import { formatData, iconifyData } from './utils';
	import CompoundItemButton from './lib/components/CompoundItemButton.svelte';

	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];
	export let createButton: CustomButton | null = null;
	//export let deleteButton: CustomButton | null = null;

	let formatedData = formatData(data);
	let iconifiedData = iconifyData(formatedData);
	const headers = formatedData.length ? formatedData[0].map((entry) => entry.key) : [];

	if (data) {
		((data) => {
			const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'text/plain;charset=utf-8' });
			FileSaver.saveAs(blob, 'vehicle-data-' + new Date().toTimeString());
		})(iconifiedData);
	}

	let showCompoundItem = false;

	const compoundItem = {
		title: '',
		data: [],
		rules: []
	};

	/*
	 * EVENT HANDLERS
	 */

	const compoundItemClick = (item) => {
		showCompoundItem = true;

		compoundItem.title = item.key;
		compoundItem.rules = rules;
		compoundItem.data = item.value;
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
			{#each formatedData as elements}
				<TableBodyRow>
					{#each elements as entry}
						<TableBodyCell>
							{#if entry.type === 'literal'}
								{entry.value}
							{:else if ['entity', 'collection'].includes(entry.type)}
								<CompoundItemButton
									icon={entry.icon}
									onClick={() => {
										compoundItemClick(entry);
									}}
								/>
							{/if}
						</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
			<!--<TableBodyRow>
					{#if entry.type === 'literal'}
						<TableBodyCell><p>{transform(String(entry.value), rules)}</p></TableBodyCell>
					{:else}
						<TableBodyCell>
							-<CompoundItemButton
									icon={entry[key].button && Icon[entry[key].button.icon]}
									onClick={() => {
										compoundItemClick(entry, key);
									}}
								/>
							<TableBodyCell><p>{transform(String(entry[key]), rules)}</p></TableBodyCell>
						</TableBodyCell>
					{/if}
					<p>{JSON.stringify(entry.value)}</p>
				</TableBodyRow>-->
		</TableBody>
	</Table>
</div>
