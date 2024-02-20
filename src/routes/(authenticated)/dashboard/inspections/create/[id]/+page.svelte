<script lang="ts">
	import type { PageData } from './$types';
	import { FormFieldType } from '@prisma/client';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button, Input, Label, Select, Checkbox } from 'flowbite-svelte';
	export let data: PageData;

	const { form, constraints, errors } = superForm(data.form);
</script>

<section>
	<form class="flex flex-col gap-4 bg-white p-4 min-w-72" method="post" action="?/createResponse">
		<div class="grid grid-cols-2 gap-4">
			{#each data.inspection.customForm.fields as field}
				<Label>
					{field.name}

					<!-- alphanumeric fields -->
					{#if field.type == FormFieldType.TEXT}
						<Input
							placeholder="Type here"
							required
							type="text"
							name={`field_${field.id}`}
							aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
							bind:value={$form[`field_${field.id}`]}
						/>

						<!-- numeric field -->
					{:else if field.type == FormFieldType.NUMBER}
						<Input
							required
							placeholder="Type here"
							type="number"
							name={`field_${field.id}`}
							aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
							bind:value={$form[`field_${field.id}`]}
							{...$constraints[`field_${field.id}`]}
						/>

						<!-- chechboxes field -->
					{:else if field.type == FormFieldType.CHECKBOXES}
						{#each field.checkOptions as checkOptions}
							<Checkbox
								name={`field_${field.id}_checkbox_${checkOptions.id}`}
								bind:checked={$form[`field_${field.id}_checkbox_${checkOptions.id}`]}
								{...$constraints[`field_${field.id}_checkbox_${checkOptions.id}`]}
							>
								{checkOptions.name}
							</Checkbox>
						{/each}
					{/if}
				</Label>
				{#if $errors[`field_${field.id}`]}
					<span class="text-red-500">{$errors[`field_${field.id}`]}</span>
				{/if}
			{/each}
		</div>

		<Button type="submit">Send</Button>
	</form>
</section>
