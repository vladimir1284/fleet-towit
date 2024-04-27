<script lang="ts">
	export let parts;
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox
	} from 'flowbite-svelte';

	// import type { Part } from '@prisma/client';
	import { PART_TABLE_HEADERS } from '../helpers/constants';
</script>

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell class="!p-4">
			<Checkbox />
		</TableHeadCell>
		{#each PART_TABLE_HEADERS as header}
			<TableHeadCell>{header}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each parts as part}
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
