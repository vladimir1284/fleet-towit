<script lang="ts">
	import { Button, Input, Label, Checkbox, Radio, Textarea, Modal } from 'flowbite-svelte';

	export let form;
	export let data;
	export let showPreview;

	const parseDate = (date: string) => {
		const dateParsed = new Date(date);

		const day = dateParsed.getDate() + 1;
		const month = dateParsed.getMonth() + 1;
		const year = dateParsed.getFullYear();

		return `${day} / ${month} / ${year}`;
	};

	console.log($form);
	console.log(data.inspection.customForm.cards);
</script>

<section class={showPreview ? 'w-full' : 'hidden'}>
	<div class="flex flex-col gap-4 bg-white rounded-lg shadow p-4 w-full">
		<div class="flex flex-col gap-4">
			{#each data.inspection.customForm.cards as card}
				<h5 class="font-semibold underline">{card.name}:</h5>
				<div class="ml-4">
					{#each card.fields as field}
						<div class="flex border-b p-2">
							<h5 class="font-semibold w-1/3">{field.name}:</h5>
							<!-- NUMBER ,  TEXT , TIME-->
							{#if field.type === data.FormFieldType.NUMBER || field.type === data.FormFieldType.TEXT || field.type === data.FormFieldType.TIME}
								{$form[`field_${field.id}`]}
								<!-- EMAIL -->
							{:else if field.type === data.FormFieldType.EMAIL}
								<a href={`mailto:${$form[`field_${field.id}`]}`}>{$form[`field_${field.id}`]}</a>
								<!-- DATE -->
							{:else if field.type === data.FormFieldType.DATE}
								{$form[`field_${field.id}`] ? parseDate($form[`field_${field.id}`]) : ''}
								<!-- PHONE -->
							{:else if field.type === data.FormFieldType.PHONE}
								<a href={`tel:${$form[`field_${field.id}`]}`}>{$form[`field_${field.id}`]}</a>
								<!-- IMAGE -->
							{:else if field.type === data.FormFieldType.IMAGE}
								<div
									class={$form[`field_${field.id}`]
										? 'w-64 rounded mt-2 overflow-hidden'
										: 'hidden'}
								>
									<img
										class="w-full h-full"
										id={`preview_${field.id}`}
										src={$form[`field_${field.id}`]
											? URL.createObjectURL($form[`field_${field.id}`])
											: undefined}
										alt="Image preview"
									/>
								</div>
								<!-- SIGNATURE -->
							{:else if field.type === data.FormFieldType.SIGNATURE}
								<div
									class={$form[`field_${field.id}`]
										? 'w-32 h-16 rounded-lg mt-2 overflow-hidden mb-2'
										: 'hidden'}
								>
									<img
										class="w-full h-full"
										id={`preview_${field.id}`}
										src={$form[`field_${field.id}`]}
										alt="Signature preview"
									/>
								</div>
								<!-- SINGLE CHECK -->
							{:else if field.type === data.FormFieldType.SINGLE_CHECK}
								<div class="flex flex-col w-max gap-2">
									{#each field.checkOptions as option}
										{#if option.id === $form[`field_${field.id}_radio`]}
											<Checkbox disabled checked>{option.name}</Checkbox>
										{:else}
											<Checkbox disabled>{option.name}</Checkbox>
										{/if}
									{/each}
								</div>

								{#if $form[`field_${field.id}_note`]}
									<div class="ml-2">
										<p class="font-semibold">
											Note: <span class="font-normal break-all"
												>{$form[`field_${field.id}_note`]}</span
											>
										</p>
									</div>
								{/if}
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>
