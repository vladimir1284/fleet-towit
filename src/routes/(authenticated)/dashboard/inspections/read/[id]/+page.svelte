<script lang="ts">
	import type { PageData } from './$types';
	import { Checkbox, Button } from 'flowbite-svelte';

	export let data: PageData;

	const day = data.inspection.createdAt.getDate();
	const month = data.inspection.createdAt.getMonth() + 1;
	const year = data.inspection.createdAt.getFullYear();

	const dateInspections = `${day}/${month}/${year}`;

	const makePdf = async () => {
		const req = await fetch(`/api/inspections/pdf/${data.inspection.id}`);
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

<section class="bg-white rounded-lg shadow p-4 flex flex-col gap-4 w-2/3">
	<Button class="w-max" on:click={makePdf}>Download pdf</Button>
	<div class="flex flex-wrap justify-between">
		<h2 class="font-semibold">
			Model: <span class="font-normal">{data.inspection.vehicle.model}</span>
		</h2>
		<h2 class="font-semibold">
			VIN: <span class="font-normal">{data.inspection.vehicle.vin}</span>
		</h2>
		<h2 class="font-semibold">
			Plate: <span class="font-normal">{data.inspection.vehicle.plate}</span>
		</h2>
		<h2 class="font-semibold mr-16">
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
	<div class="flex flex-col gap-4">
		{#each data.inspection.customForm.cards as card}
			<h5 class="font-semibold underline">{card.name}:</h5>
			<div class="ml-4">
				{#each card.fields as field}
					<div class="flex items-center border-b p-2">
						<h5 class="font-semibold w-1/3">{field.name}:</h5>
						<!-- single check -->
						{#if field.type === data.FormFieldType.SINGLE_CHECK}
							<div class="flex gap-4">
								{#each field.checkOptions as option}
									{#each field.responses as response}
										<div class="flex items-center gap-2">
											{#if option.id === response.checkOptionId}
												<Checkbox disabled checked /> {option.name}
											{:else}
												<Checkbox disabled /> {option.name}
											{/if}
										</div>
									{/each}
								{/each}
								{#each field.responses as response}
									{#if response.note}
										<p class="font-semibold">
											Note: <span class="font-normal">{response.note}</span>
										</p>
									{/if}
								{/each}
							</div>
						{/if}
						<!-- number , text -->
						{#if field.type === data.FormFieldType.NUMBER || field.type === data.FormFieldType.TEXT}
							<div>
								{#each field.responses as response}
									{response.content}
								{/each}
							</div>
						{:else if field.type === data.FormFieldType.EMAIL}
							<div>
								{#each field.responses as response}
									<a href={`mailto:${response.content}`}>{response.content}</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>
