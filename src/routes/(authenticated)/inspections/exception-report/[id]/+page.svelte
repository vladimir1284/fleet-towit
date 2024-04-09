<script lang="ts">
	import { onMount } from 'svelte';
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

	const parseDate = (date: string) => {
		const dateParsed = new Date(date);

		const day = dateParsed.getDate();
		const month = dateParsed.getMonth() + 1;
		const year = dateParsed.getFullYear();

		return `${day} / ${month} / ${year}`;
	};

	const presignedGetObject = async (file_name: string) => {
		for (const cards of data.inspection.customForm.cards) {
			for (const field of cards.fields) {
				if (
					field.type === data.FormFieldType.IMAGE ||
					field.type === data.FormFieldType.SIGNATURE
				) {
					if (field.responses[0].content) {
						const req = await fetch(
							`/api/inspections/presignedGetObject/${field.responses[0].content}?inspection=${data.inspection.id}`
						);
						const resp = await req.json();

						const image = document.getElementById(field.id);
						image.src = resp.file_url;
					}
				}
			}
		}
	};

	onMount(async () => {
		await presignedGetObject();
	});
</script>

<section class="p-4 w-2/3">
	<div class="flex flex-col gap-4 bg-white rounded-lg shadow p-4 w-full">
		<Button class="w-max" on:click={makePdf}>Download pdf</Button>
		<div class="flex flex-wrap justify-between">
			<h2 class="font-semibold">
				Model: <span class="font-normal">{data.inspection.vehicle.model}</span>
			</h2>
			<h2 class="font-semibold">
				VIN: <span class="font-normal">{data.inspection.vehicle.vin}</span>
			</h2>
			{#if data.inspection.vehicle.plate}
				<h2 class="font-semibold">
					Plate: <span class="font-normal">{data.inspection.vehicle.plate}</span>
				</h2>
			{/if}
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
						<div class="flex border-b p-2">
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
								<!-- number , text , time -->
							{:else if field.type === data.FormFieldType.NUMBER || field.type === data.FormFieldType.TEXT || field.type === data.FormFieldType.TIME}
								<div>
									{#each field.responses as response}
										{response.content ? response.content : '-'}
									{/each}
								</div>
								<!-- email -->
							{:else if field.type === data.FormFieldType.EMAIL}
								<div>
									{#each field.responses as response}
										{#if response.content}
											<a href={`mailto:${response.content}`}>{response.content}</a>
										{:else}
											-
										{/if}
									{/each}
								</div>
								<!-- date -->
							{:else if field.type === data.FormFieldType.DATE}
								<div>
									{#each field.responses as response}
										{response.content ? parseDate(response.content) : '-'}
									{/each}
								</div>
								<!-- phone -->
							{:else if field.type === data.FormFieldType.PHONE}
								<div>
									{#each field.responses as response}
										{#if response.content}
											<a href={`tel:${response.content}`}>{response.content}</a>
										{:else}
											-
										{/if}
									{/each}
								</div>
								<!-- image -->
							{:else if field.type === data.FormFieldType.IMAGE || field.type === data.FormFieldType.SIGNATURE}
								<div>
									{#each field.responses as response}
										{#if response.content}
											<img id={field.id} alt="Preview image" class="w-64" />
										{:else}
											-
										{/if}
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>
