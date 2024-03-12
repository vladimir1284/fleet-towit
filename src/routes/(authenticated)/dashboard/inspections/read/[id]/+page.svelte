<script lang="ts">
	import type { PageData } from './$types';
	import { Checkbox, Button } from 'flowbite-svelte';
	import * as pdfMake from 'pdfmake/build/pdfmake';
	import * as pdfFonts from 'pdfmake/build/vfs_fonts';


	export let data: PageData;

	const day = data.inspection.createdAt.getDate() + 1;
	const month = data.inspection.createdAt.getMonth() + 1;
	const year = data.inspection.createdAt.getFullYear() + 1;

	const dateInspections = `${day}/${month}/${year}`;

	const fontsCdnHost = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/';


	const makePdf = async () => {
		pdfMake.fonts = {
			Roboto: {
				normal: `${fontsCdnHost}Roboto/Roboto-Regular.ttf`,
				bold: `${fontsCdnHost}Roboto/Roboto-Medium.ttf`,
				italics: `${fontsCdnHost}Roboto/Roboto-Italic.ttf`,
				bolditalics: `${fontsCdnHost}Roboto/Roboto-MediumItalic.ttf`
			},

			Fontello: {
				normal: data.fontelloURL,
				bold: data.fontelloURL,
				italics: data.fontelloURL,
				bolditalics: data.fontelloURL
			}
		};

		const docDefinition = {
			content: [
				{
					columns: [
						{
							text: [
								{ text: 'TOWIT HOUSTON\n', style: 'header' },
								{ text: 'INSPECTION DE TRAILER CAR HAULER', style: 'subheader' }
							],
							alignment: 'center'
						},

						{
							image: 'twt',
							width: 140,
							height: 45
						}
					]
				},
				'\n',
				{
					alignment: 'justify',
					columns: [
						// model
						{
							text: [
								{ text: 'Modelo: ', style: 'details' },
								{ text: data.inspection.vehicle.model, style: 'content' }
							]
						},
						// VIN
						{
							text: [
								{ text: 'VIN: ', style: 'details' },
								{ text: data.inspection.vehicle.vin, style: 'content' }
							]
						},
						// plate
						{
							text: [
								{ text: 'Plate: ', style: 'details' },
								{ text: data.inspection.vehicle.plate, style: 'content' }
							]
						},
						// Date
						{
							text: [
								{ text: 'Date: ', style: 'details' },
								{ text: dateInspections, style: 'content' }
							]
						}
					]
				},
				'\n',
				{
					alignment: 'justify',
					columns: [
						{
							text: 'Inspector: _________________',
							style: 'details'
						},
						{
							text: 'Signature: _________________',
							style: 'details'
						},
						{
							text: 'Rentador: _________________',
							style: 'details'
						},
						{
							text: 'Signature: _________________',
							style: 'details'
						}
					]
				},
				'\n'
			],

			images: {
				twt: data.twtImg
			},

			styles: {
				header: {
					fontSize: 16,
					bold: true
				},
				subheader: {
					fontSize: 11,
					bold: true
				},
				details: {
					fontSize: 9.5,
					bold: true
				},
				content: {
					fontSize: 9
				},
				icon: {
					font: 'Fontello'
				}
			}
		};

		for (const field of data.inspection.customForm.fields) {
			// text , number
			if (field.type === data.FormFieldType.NUMBER || field.type === data.FormFieldType.TEXT) {
				const columns = [
					{
						text: `${field.name}:`,
						style: 'content',
						width: 170
					}
				];

				// response
				for (const response of field.responses) {
					columns.push({
						text: response.content,
						style: 'content'
					});
				}

				docDefinition.content.push({ columns });
				docDefinition.content.push('\n');
				// single ckeck
			} else if (field.type === data.FormFieldType.SINGLE_CHECK) {
				const columns = [
					{
						text: `${field.name}:`,
						style: 'content',
						width: 170
					}
				];

				for (const option of field.checkOptions) {
					for (const response of field.responses) {
						if (option.id === response.checkOptionId) {
							columns.push({
								text: [{ text: '', style: 'icon' }, `  ${option.name}`],
								style: 'content',
								width: 80
							});
						} else {
							columns.push({
								text: [{ text: '', style: 'icon' }, `  ${option.name}`],
								style: 'content',
								width: 80
							});
						}
					}
				}

				for (const response of field.responses) {
					if (response.note) {
						columns.push({
							text: `Note: ${response.note}`,
							style: 'content'
						});
					} else {
						columns.push({
							text: ``,
							style: 'content'
						});
					}
				}

				docDefinition.content.push({ columns });
				docDefinition.content.push('\n');
			}
		}

		pdfMake.createPdf(docDefinition).open();
	};
</script>

<section class="bg-white p-4 flex flex-col gap-4 w-2/3">
	<Button class="w-max" on:click={makePdf}>Download pdf</Button>
	<div class="flex flex-wrap lg:flex-nowrap gap-4">
		<h2 class="font-semibold">
			Model: <span class="font-normal">{data.inspection.vehicle.model}</span>
		</h2>
		<h2 class="font-semibold">
			VIN: <span class="font-normal">{data.inspection.vehicle.vin}</span>
		</h2>
		<h2 class="font-semibold">
			Plate: <span class="font-normal">{data.inspection.vehicle.plate}</span>
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
			{#if field.type === data.FormFieldType.CHECKBOXES}
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
			{#if field.type === data.FormFieldType.SINGLE_CHECK}
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
			{#if field.type === data.FormFieldType.NUMBER || field.type === data.FormFieldType.TEXT}
				<div>
					{#each field.responses as response}
						{response.content}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</section>
