<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button, Input, Label, Checkbox, Radio, Textarea, Modal, Helper } from 'flowbite-svelte';
	import * as signaturePad from 'signature_pad';
	import Preview from '$lib/components/inspections/Preview.svelte';

	export let data: PageData;

	let openSignModal = false;
	let pad;
	let fieldId: number;
	let showPreview: boolean = false;
	let isValidResponse: boolean = false;

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

<section class="flex flex-col items-end gap-4 w-2/4 p-4">
	<Button
		class="w-max"
		on:click={() => {
			showPreview = !showPreview;
			isValidResponse = false;
		}}>{showPreview ? 'Form' : 'Preview'}</Button
	>

	<div class="bg-white w-full rounded-lg shadow">
		<Preview {form} {data} {showPreview} />

		<!-- form never hidden -->
		<form
			class="flex flex-col gap-4 p-4 min-w-72"
			method="post"
			action={isValidResponse ? '?/createResponse' : '?/validateResponse'}
			enctype="multipart/form-data"
			use:enhance={() => {
				showPreview = true;
				return async ({ result }) => {
					if (result.type === 'success') isValidResponse = true;
					else await applyAction(result);
				};
			}}
		>
			<!-- hidde inputs -->
			<div class={showPreview ? 'hidden' : 'flex flex-col gap-4'}>
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
												bind:group={$form[`field_${field.id}_radio`]}
												value={checkOptions.id}
												{...$constraints[`field_${field.id}_radio`]}
											>
												{checkOptions.name}
											</Radio>
										{/each}
										<Textarea
											class="mt-2"
											placeholder="Note"
											name={`field_${field.id}_note`}
											bind:value={$form[`field_${field.id}_note`]}
											{...$constraints[`field_${field.id}_note`]}
										/>
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
										<Label class="space-y-2 mb-2">
											<input
												class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 text-sm rounded-lg border !p-0 dark:text-gray-400"
												type="file"
												required={field.required}
												name={`field_${field.id}`}
												accept="image/*"
												aria-invalid={$errors[`field_${field.id}`] ? 'true' : undefined}
												on:input={(e) => {
													const file = e.currentTarget.files?.item(0);

													$form[`field_${field.id}`] = file;
												}}
												{...$constraints[`field_${field.id}`]}
											/>
											<Helper>PNG, JPG (MAX. 3mb).</Helper>
										</Label>

										<!-- preview -->
										<div
											class={$form[`field_${field.id}`]
												? 'w-16 h-16 rounded-lg mt-2 overflow-hidden'
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
												src={$form[`field_${field.id}`]}
												alt="Signature preview"
											/>
										</div>

										<Button
											color={$form[`field_${field.id}`] ? 'green' : 'blue'}
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

			{#if isValidResponse}
				<div class="grid grid-cols-2 gap-4">
					<Button
						type="button"
						on:click={() => {
							showPreview = false;
							isValidResponse = false;
						}}>Back to edit</Button
					>
					<Button type="submit">Confirm</Button>
				</div>
				<Helper>If you are satisfied with the result, click confirm</Helper>
			{:else}
				<Button type="submit">Create</Button>
			{/if}
		</form>
	</div>

	<!-- <SuperDebug data={$form} /> -->
	<Modal title="Sign here" bind:open={openSignModal}>
		<canvas class="border w-full"></canvas>
		<Button color="light" on:click={() => pad.clear()}>Clear</Button>
		<svelte:fragment slot="footer">
			<Button on:click={getSignature}>I accept</Button>
			<Button on:click={() => (openSignModal = false)} color="alternative">Decline</Button>
		</svelte:fragment>
	</Modal>
</section>
