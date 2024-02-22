<script lang="ts">
	import type { PageData } from './$types';
	import { FormFieldType } from '@prisma/client';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button, Input, Label, Select, Checkbox, Radio, Textarea } from 'flowbite-svelte';
	export let data: PageData;

	const { form, constraints, errors } = superForm(data.form);
</script>

<section>
	<form class="flex flex-col gap-4 bg-white p-4 min-w-72" method="post" action="?/createResponse">
		<div class="grid grid-cols-2 gap-4">
			{#each data.inspection.customForm.fields as field}
				<Label>
					<h5 class="font-semibold">{field.name}</h5>

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

						<!-- checkboxes field -->
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

						<!-- single check field -->
					{:else if field.type == FormFieldType.SINGLE_CHECK}
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
