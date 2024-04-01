<script lang="ts">
	import DetailsView from '$lib/components/data-visualization/DetailsView.svelte';
	import GenericTable from '$lib/components/data-visualization/GenericTable.svelte';
	import { transform } from '$lib/components/data-visualization/transformation/transform';
	import type { PageData } from '../$types';
	import {
		Gallery,
		Heading,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let data: PageData;

	let { vehicle } = data;
	let pictures = vehicle.vehiclePictures.map((picture) => ({
		alt: '',
		src: picture.image
	}));
</script>

<div class="p-4">
	<Heading>VEHICLE INFORMATION</Heading>
	<div class="my-4 flex flex-col p-1 items-start">
		{#each Object.keys(vehicle) as key}
			{#if typeof vehicle[key] !== 'object'}
				<P>
					<strong>{`${transform(key, ['capitalize'])}: `}</strong>
					<span>{transform(vehicle[key], ['capitalize'])}</span>
				</P>
			{/if}
		{/each}
		<div class="my-3">
			<Heading tag="h2">Extra fields</Heading>
			<Table class="my-2">
				<TableHead>
					<TableHeadCell>Field</TableHeadCell>
					<TableHeadCell>Value</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each Object.keys(vehicle.extraFields) as key}
						<TableBodyRow>
							<TableBodyCell>
								{key}
							</TableBodyCell>
							<TableBodyCell>
								{transform(vehicle.extraFields[key], ['capitalize'])}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
		<div class="my-3">
			<Heading tag="h2">Pictures</Heading>
			<Gallery items={pictures} class="gap-4 grid-cols-2 md:grid-cols-3 my-2" />
		</div>
		<div class="my-3">
			<GenericTable
				title="Documents"
				records={vehicle.documents}
				rules={['capitalize', 'wordify', 'simple-datetime']}
				excludeFields={['id', 'file', 'vehicleId', 'extraFields']}
			/>
		</div>
		<div class="my-3">
			<GenericTable
				title="Contracts"
				records={vehicle.contracts}
				rules={['capitalize', 'wordify']}
				excludeFields={['id', 'file', 'vehicleId', 'extraFields']}
			/>
		</div>
		<div class="my-3">
			<GenericTable
				title="Costs"
				records={vehicle.costs}
				rules={['capitalize', 'wordify']}
				excludeFields={['id', 'vehicleId']}
			/>
		</div>
	</div>
</div>
