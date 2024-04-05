<script lang="ts">
	import type { PageData } from './$types';
	import { Checkbox, Button } from 'flowbite-svelte';

	export let data: PageData;

	const day = data.inspection.createdAt.getDate() + 1;
	const month = data.inspection.createdAt.getMonth() + 1;
	const year = data.inspection?.createdAt.getFullYear();

	const dateInspections = `${day}/${month}/${year}`;

	const makePdf = async () => {
		const req = await fetch(`/api/inspections/pdf/${data.inspection?.id}`);
		const blob = await req.blob();

		const url = URL.createObjectURL(blob);
		const element = document.createElement('a');
		element.href = url;
		element.setAttribute('download', 'inspection.pdf');
		document.body.appendChild(element);
		element.click();

		document.body.removeChild(element);
	};
</script>

<section class="bg-white p-4 flex flex-col gap-4 w-2/3">
	<Button class="w-max" on:click={makePdf}>Download pdf</Button>
	<div class="flex flex-wrap lg:flex-nowrap gap-4">
		<h2 class="font-semibold">
			Model: <span class="font-normal">{data.inspection?.vehicle.model}</span>
		</h2>
		<h2 class="font-semibold">
			VIN: <span class="font-normal">{data.inspection?.vehicle.vin}</span>
		</h2>
		<h2 class="font-semibold">
			Plate: <span class="font-normal">{data.inspection?.vehicle.plates[0].plate }</span>
		</h2>
		<h2 class="font-semibold">
			Date: <span class="font-normal">
				{dateInspections}
			</span>
		</h2>
	</div>
	<div class="flex flex-wrap justify-between">
		<h2 class="font-semibold">Inspector: ________</h2>
		<h2 class="font-semibold">Signature: ________</h2>
		<h2 class="font-semibold">Rentador: ________</h2>
		<h2 class="font-semibold mr-16">Signature: ________</h2>
	</div>
	<div class="grid grid-cols-2 gap-4" id="inspection">
		{#each data.inspection.customForm.fields as field}
			<h2 class="font-semibold">{field.name}:</h2>
			<!-- checboxes -->
			{#if field.type === data.FormFieldType?.CHECKBOXES}
				<div class="flex gap-4">
					{#each field.checkOptions as option}
						{#each field.responses as response}
							{#if response.checkOptionId == option.id}
								<div class="flex gap-2">
									{option.name}
									{#if response.checked}
										<Checkbox disabled checked />
									{:else}
										<Checkbox disabled />
									{/if}
								</div>
							{/if}
						{/each}
					{/each}
				</div>
			{/if}
			<!-- single check -->
			{#if field.type === data.FormFieldType?.SINGLE_CHECK}
				<div class="flex gap-4">
					{#each field.checkOptions as option}
						{#each field.responses as response}
							<div class="flex gap-2">
								{#if option.id === response.checkOptionId}
									{option.name} <Checkbox disabled checked />
								{:else}
									{option.name} <Checkbox disabled />
								{/if}
							</div>
						{/each}
					{/each}
					{#each field.responses as response}
						{#if response.note}
							<p class="font-semibold">Note: <span class="font-normal">{response.note}</span></p>
						{/if}
					{/each}
				</div>
			{/if}
			<!-- number , text -->
			{#if field.type === data.FormFieldType?.NUMBER || field.type === data.FormFieldType?.TEXT}
				<div>
					{#each field.responses as response}
						{response.content}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</section>
