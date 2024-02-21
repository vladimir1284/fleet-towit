<script lang="ts">
	import TrailerList from './trailer-list.component.svelte';
	import {
		Heading,
		Button,
		TableBodyRow,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		Checkbox
	} from 'flowbite-svelte';
	import { getContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	import type { Vehicle } from '@prisma/client';

	// Retrieve trailer initial context.
	const trailers: Writable<Vehicle[]> = getContext('TrailerList');
</script>

<div>
	<Heading tag="h2" customSize="text-2xl font-extrabold" class="mb-8"
		>Trailer product detailed list</Heading
	>
</div>

<div class="grid grid-flow-col auto-cols-max gap-4 mb-4">
	<Button color="alternative">Active</Button>
	<Button color="alternative" class="col-span-auto">Alternative</Button>
</div>

<TrailerList trailers={$trailers} />

<!-- <div class="grid">
	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell class="!p-4">
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell>Product name</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each $trailers.Results as item}
				<TableBodyRow>
					<TableBodyCell class="!p-4">
						<Checkbox />
					</TableBodyCell>
					<TableBodyCell>{item.Variable}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div> -->
