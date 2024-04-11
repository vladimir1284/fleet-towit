<script async lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte';
	import type { Note } from '$lib/zod';
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';
	import { Fileupload, Input, Label, Textarea, Toggle } from 'flowbite-svelte';
	import DateInputComponent from '$lib/components/inputs/DateInputComponent.svelte';
	import { EditOutline, PaperClipOutline, CloseOutline } from 'flowbite-svelte-icons';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	
	export let data;
	export let tenant: number = 0;
	export let selectedNote: Note | null = null;
	export let selectedContract: any = undefined;
	
	const dispatch = createEventDispatcher();
	let actionURL = `/api/tenants/${tenant}/contracts/${selectedContract.id}/notes`;
	let today = new Date().toISOString().split('T')[0];
	let attachFile = false;
	let remainder = false;
	let fileSize = 0;


	onMount(async () => {
		if ($form.file) {
			attachFile = true;
		}
	});

	const { form, errors, constraints, enhance } = superForm(data.noteForm, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('noteCreated');
			}
		}
	});

	if (selectedNote) {
		console.log(selectedNote)
		$form.id = selectedNote.id;
		$form.subject = selectedNote.Subject;
		$form.body = selectedNote.Body;
		$form.file = selectedNote.file;
		if (selectedNote.remainder) {
			$form.remainder = new Date(selectedNote.remainder);
			remainder = true;
		}
	}

	const cancel = async () => {
		dispatch('noteCancel');
	};

	const changeFile = (event: any) => {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement && inputElement.files) {
			$form.file = inputElement.files[0].name;
			fileSize = inputElement.files[0].size;
		}
		attachFile = !attachFile;
	};

	const deleteFile = () => {
		document.getElementById('fileData').value = null;
		fileSize = 0;
		attachFile = false;
		$form.file = undefined;
	};
</script>

<form id="noteForm" method="POST" use:enhance action={actionURL} enctype="multipart/form-data">
	<input hidden name="id" bind:value={$form.id} />
	<input hidden name="file" bind:value={$form.file} />
	<Input
		id="subject"
		name="subject"
		type="text"
		placeholder="Subject..."
		required
		bind:value={$form.subject}
	>
		<EditOutline slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
	</Input>

	<Textarea
		id="body"
		name="body"
		placeholder="Content..."
		rows="7"
		class="mt-3 resize-none"
		bind:value={$form.body}
	/>

	<div class="flex place-content-between my-2">
		<div class="flex">
			<Toggle bind:checked={remainder} class="mr-4">Remainder</Toggle>
			{#if remainder}
				<DateInputComponent
					formPointer="remainder"
					{form}
					{errors}
					{constraints}
					minDate={today}
					placeholder="Set remainder"
				/>
			{/if}
		</div>

		<Fileupload class="hidden" name="fileData" id="fileData" on:change={changeFile} />
		{#if !attachFile}
			<ButtonComponent
				placeholder=""
				outline
				styles="flex justify-center align-center"
				onClick={() => {
					document.getElementById('fileData')?.click();
				}}
			>
				<Label>
					<PaperClipOutline class="text-gray-400" />
				</Label>
			</ButtonComponent>
			
		{:else}
			<ButtonComponent
				placeholder=""
				outline
				styles="flex justify-center align-center"
				onClick={deleteFile}
			>
				<Label>
					<div
						class="flex align-center justify-center"
						transition:slide={{ duration: 800, axis: 'x' }}
					>
						<CloseOutline class="text-gray-400" />
						<div class="ms-2">
							{$form.file}
						</div>
					</div>
				</Label>
			</ButtonComponent>
		{/if}

	</div>

	<div class="border-t-red-500 flex justify-end mt-5">
		<ButtonComponent onClick={cancel} color="red" styles="mr-2" placeholder="Cancel" />
		<SubmitButtonComponent styles="mr-2" placeholder="Save" />
	</div>
</form>