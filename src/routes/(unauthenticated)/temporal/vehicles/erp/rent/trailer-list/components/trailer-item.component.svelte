<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';

	import type { Vehicle } from '@prisma/client';

	export let trailer: Vehicle;
</script>

<TableBodyRow>
	<TableBodyCell>
		{trailer.type}
	</TableBodyCell>
</TableBodyRow>
