<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button, Input, Label, Checkbox, Radio, Textarea } from 'flowbite-svelte';
	export let data: PageData;

	const { form, constraints, errors } = superForm(data.form);
</script>

<section class="w-1/3">
	<form
		class="flex flex-col gap-4 bg-white rounded-lg shadow p-4 min-w-72"
		method="post"
		action="?/createResponse"
		enctype="multipart/form-data"
	>
		<div class="flex flex-col gap-4">
			{#each data.inspection.customForm.cards as card}
				<div>
					<h5 class="font-bold underline">{card.name}</h5>

					<div class="flex flex-col gap-4 ml-4 mt-4">
						{#each card.fields as field}
							<Label>
								<h5 class="font-semibold">{field.name}</h5>

								{#if field.type == data.FormFieldType.TEXT}
									<Input
										placeholder="Type here"
										required
										type="text"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.NUMBER}
									<Input
										required
										placeholder="123..."
										type="number"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.SINGLE_CHECK}
									{#each field.checkOptions as checkOptions}
										<Radio
											required
											name={`field_${field.id}_radio`}
											value={checkOptions.id}
											{...$constraints[`field_${field.id}_radio`]}
										>
											{checkOptions.name}
										</Radio>
									{/each}
									<Textarea name={`field_${field.id}_note`} placeholder="Note" />
								{:else if field.type == data.FormFieldType.EMAIL}
									<Input
										required
										placeholder="email@example.com"
										type="email"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.DATE}
									<Input
										required
										placeholder="Type here"
										type="date"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.TIME}
									<Input
										required
										placeholder="Type here"
										type="time"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.PHONE}
									<Input
										required
										placeholder="(123) 456-7890"
										type="tel"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.IMAGE}
									<input
										type="file"
										required
										name={`field_${field.id}`}
										accept="image/*"
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										on:input={(e) => {
											$form[`field_${field.id}`] = e.currentTarget.files?.item(0);
										}}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.SIGNATURE}
									<!-- <input
										type="file"
										required
										name={`field_${field.id}`}
										accept="image/*"
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										on:input={(e) => {
											$form[`field_${field.id}`] = e.currentTarget.files?.item(0);
										}}
										{...$constraints[`field_${field.id}`]}
									/> -->
									dfdfdfdf
								{/if}
							</Label>
							{#if $errors[`field_${field.id}`]}
								<span class="text-red-500">{$errors[`field_${field.id}`]}</span>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<Button type="submit">Create</Button>
	</form>
</section>
