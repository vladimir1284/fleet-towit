<script lang="ts">
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

	export let vehicle;
	export let rules: TransformRule = [];
</script>

<Table>
	<TableHead>
		<TableHeadCell></TableHeadCell>
		<TableHeadCell></TableHeadCell>
	</TableHead>
	<TableBody>
		{#each Object.keys(vehicle) as key}
			<TableBodyRow>
				<TableBodyCell>{transform(String(key), rules)}</TableBodyCell>
				<TableBodyCell>{transform(String(vehicle[key]), rules)}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
