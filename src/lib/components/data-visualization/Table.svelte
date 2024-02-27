<script lang="ts">
	// @ts-nocheck

	import {
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

	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];

	console.log('DATA\n', JSON.stringify(data));

	let headers = data.length ? Object.keys(data[0]) : [];
</script>

<div>
	<Heading tag="h2">{title}</Heading>
	<hr />
	<Table>
		<TableHead>
			{#each headers as header}
				<TableHeadCell>
					<h3>{transform(String(header), rules)}</h3>
				</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each data as record}
				<TableBodyRow>
					{#each Object.keys(record) as key}
						<TableBodyCell><p>{transform(String(record[key]), rules)}</p></TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
