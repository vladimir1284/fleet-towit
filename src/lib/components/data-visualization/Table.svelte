<script lang="ts">
	import {
		Hr,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let title;
	export let data;

	let headers = data.length ? Object.keys(data[0]) : [];
</script>

<div>
	<h2>{title}</h2>
	<hr />
	<Table>
		<TableHead>
			{#each headers as header}
				<TableHeadCell>
					<h3>{header}</h3>
				</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody class="divide-y">
			{#each data as record}
				<TableBodyRow>
					{#each Object.keys(record) as key}
						<TableBodyCell><p>{record[key]}</p></TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
