<script lang="ts">
	import { TrailerItem } from '.';
	import { Table, TableHead, TableHeadCell, TableBody, Checkbox } from 'flowbite-svelte';

	import type { Vehicle } from '@prisma/client';

	export let trailers: Vehicle[];
	const trailerTableHeaders = Object.keys(trailers[0]);
</script>

<Table>
	<TableHead defaultRow={false}>
		<TableHeadCell class="!p-4">
			<Checkbox />
		</TableHeadCell>
		{#each trailerTableHeaders as header}
			<TableHeadCell>{header}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each trailers as trailer}
			<TrailerItem {trailer} />
		{/each}
	</TableBody>
</Table>
