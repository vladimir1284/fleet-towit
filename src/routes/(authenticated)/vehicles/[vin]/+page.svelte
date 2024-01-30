<script lang="ts">
	import type { PageData } from './$types';
	import { Heading, P, Table, TableBody, TableBodyCell, TableBodyRow } from 'flowbite-svelte';

	export let data: PageData;
</script>

<Heading>VEHICLE INFORMATION</Heading>
<div class="m-4">
	<Table>
		<TableBody class="divide-y">
			{#each Object.keys(data) as key}
				<TableBodyRow>
					<TableBodyCell><span class="font-bold">{key.toUpperCase()}</span></TableBodyCell>
					<TableBodyCell>{data[key]}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
