<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button, Input, Label, Checkbox, Radio, Textarea, Modal } from 'flowbite-svelte';
	import * as signaturePad from 'signature_pad';
	export let data: PageData;

	let openSignModal = false;
	let pad;
	let fieldId: number;

	const openModalToSign = (field_id: number) => {
		openSignModal = true;
		fieldId = field_id;

		setTimeout(() => {
			const canvas = document.querySelector('canvas');
			pad = new signaturePad.default(canvas);
			resizeCanvas();
		}, 1);
	};

	function resizeCanvas() {
		const canvas = document.querySelector('canvas');
		if (canvas) {
			const ratio = Math.max(window.devicePixelRatio || 1, 1);
			canvas.width = canvas.offsetWidth * ratio;
			canvas.height = canvas.offsetHeight * ratio;
			canvas.getContext('2d').scale(ratio, ratio);
			if (pad) pad.clear(); // otherwise isEmpty() might return incorrect value
		}
	}

	window.addEventListener('resize', resizeCanvas);

	const getSignature = async () => {
		if (!pad.isEmpty()) {
			openSignModal = false;
			const url = pad.toDataURL();
			const input = document.getElementById(`field_${fieldId}`);
			input.value = url;
			$form[`field_${fieldId}`] = url;
		}
	};

	const { form, constraints, errors } = superForm(data.form);
</script>

<section class="w-2/4 p-4">
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
										required={field.required}
										type="text"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.NUMBER}
									<Input
										required={field.required}
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
											required={field.required}
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
										required={field.required}
										placeholder="email@example.com"
										type="email"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.DATE}
									<Input
										required={field.required}
										placeholder="Type here"
										type="date"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.TIME}
									<Input
										required={field.required}
										placeholder="Type here"
										type="time"
										name={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>
								{:else if field.type == data.FormFieldType.PHONE}
									<Input
										required={field.required}
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
										required={field.required}
										name={`field_${field.id}`}
										accept="image/*"
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										on:input={(e) => {
											const file = e.currentTarget.files?.item(0);

											$form[`field_${field.id}`] = file;

											document.getElementById(`preview_${field.id}`).src =
												URL.createObjectURL(file);
										}}
										{...$constraints[`field_${field.id}`]}
									/>

									<!-- preview -->
									<div
										class={$form[`field_${field.id}`]
											? 'w-16 h-16 rounded-lg mt-2 overflow-hidden'
											: 'hidden'}
									>
										<img class="w-full h-full" id={`preview_${field.id}`} />
									</div>
								{:else if field.type == data.FormFieldType.SIGNATURE}
									<input
										type="text"
										required={field.required}
										class="hidden"
										name={`field_${field.id}`}
										id={`field_${field.id}`}
										aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
										bind:value={$form[`field_${field.id}`]}
										{...$constraints[`field_${field.id}`]}
									/>

									<!-- signature preview -->
									<div
										class={$form[`field_${field.id}`]
											? 'w-32 h-16 rounded-lg mt-2 overflow-hidden mb-2'
											: 'hidden'}
									>
										<img
											class="w-full h-full"
											id={`preview_${field.id}`}
											src={$form[`field_${fieldId}`]}
										/>
									</div>

									<Button
										color={$form[`field_${fieldId}`] && !pad.isEmpty() ? 'green' : 'blue'}
										on:click={() => openModalToSign(field.id)}>Touch to sign</Button
									>
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
	<Modal title="Sign here" bind:open={openSignModal}>
		<canvas class="border w-full"></canvas>
		<Button color="light" on:click={() => pad.clear()}>Clear</Button>
		<svelte:fragment slot="footer">
			<Button on:click={getSignature}>I accept</Button>
			<Button on:click={() => (openSignModal = false)} color="alternative">Decline</Button>
		</svelte:fragment>
	</Modal>
</section>
