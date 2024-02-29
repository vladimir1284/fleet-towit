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
	import * as Icon from 'flowbite-svelte-icons';
	import CreateVehicle from '../modals/CreateVehicle.svelte';

	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];

	let headers = data.length ? Object.keys(data[0]) : [];

	/*
	 * STATES
	 */
	let showCreateVehicle = false;
	let showMoreDetails = true;

	/*
	 * EVENT HANDLERS
	 */

	const createVehicle = (data) => {};
</script>

<div>
	{#if showCreateVehicle}
		<CreateVehicle {createVehicle} show={showCreateVehicle} />
	{/if}
	{#if title}
		<Heading tag="h2" class="mb-4">{title}</Heading>
		<hr />
	{/if}
	<div class="flex my-4">
		<Button
			on:click={() => {
				showCreateVehicle = true;
			}}
		>
			<strong class="mx-1">+</strong> New vehicle
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
						{#if record[key].type === 'simple'}
							<TableBodyCell><p>{transform(String(record[key].value), rules)}</p></TableBodyCell>
						{:else}
							<TableBodyCell>
								<Button
									on:click={() => {
										showMoreDetails = true;
									}}
								>
									<div class="flex gap-2">
										{#if record[key].button.icon === 'TableSolid'}
											<Icon.TableSolid class="pointer-events-none" />
										{:else if record[key].button.icon === 'ImageSolid'}
											<Icon.ImageSolid class="pointer-events-none" />
										{:else if record[key].button.icon === 'BookSolid'}
											<Icon.BookSolid class="pointer-events-none" />
										{:else if record[key].button.icon === 'ChartSolid'}
											<Icon.ChartSolid class="pointer-events-none" />
										{:else if record[key].button.icon === 'EyeSolid'}
											<Icon.EyeSolid class="pointer-events-none" />
										{/if}
									</div>
								</Button>
							</TableBodyCell>
						{/if}
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
