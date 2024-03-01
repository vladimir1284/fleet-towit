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
	import { transform } from './transformation/transform';
	import type { TransformRule } from './transformation/types';

	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];

	let headers = data.length ? Object.keys(data[0]) : [];
</script>

<div>
	<Heading tag="h2" class="mb-4">{title}</Heading>
	<hr />
	<div class="flex justify-end my-4">
		<Button>
			<strong class="mx-1">+</strong> New cost
		</Button>
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
