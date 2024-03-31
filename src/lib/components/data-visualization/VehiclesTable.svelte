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
	import TableCellButton from './TableCellButton.svelte';
	import { goto } from '$app/navigation';

	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];

	const { vehicles, details } = data;

	let headers = vehicles.length ? Object.keys(vehicles[0]) : [];
</script>

<div>
	{#if title}
		<Heading tag="h2" class="mb-4">{title}</Heading>
		<hr />
	{/if}
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
			{#each vehicles as vehicle}
				<TableBodyRow>
					{#each Object.keys(vehicle) as key}
						<TableBodyCell><p>{transform(String(vehicle[key]), rules)}</p></TableBodyCell>
					{/each}
					{#each Object.keys(details) as key}
						<TableBodyCell>
							<TableCellButton
								iconName={details[key].icon}
								onClick={() => {
									goto(`/vehicles/${vehicle.vin}/${key}`);
								}}
							/>
						</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
