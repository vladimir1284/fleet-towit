<script lang="ts">
	import { TableBodyCell, TableBodyRow, Checkbox } from 'flowbite-svelte';

	import type { Vehicle } from '@prisma/client';

	export let trailer: Vehicle;

	const trailerObjectValues = Object.values(trailer);
</script>

<TableBodyRow>
	<TableBodyCell class="!p-4">
		<Checkbox />
	</TableBodyCell>
	{#each trailerObjectValues as trailerObjectValue}
		<TableBodyCell>
			{trailerObjectValue}
		</TableBodyCell>
	{/each}
</TableBodyRow>
