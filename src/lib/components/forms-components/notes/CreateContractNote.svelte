<script async lang="ts">
	import type { Note } from '$lib/zod';
	import { GradientButton, Input, Textarea, Toggle } from 'flowbite-svelte';
	import { EditOutline, PaperClipOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { DatePicker } from 'date-picker-svelte';
	import { getNoteFileName } from './tools';

	const dispatch = createEventDispatcher();

	export let tenant: number = 0;
	export let selectedContract: any = undefined;
	export let data;
	export let selectedNote: Note | null = null;
	let remainder = false;
	let actionURL = `/api/tenants/${tenant?.id}/contracts/${selectedContract.id}/notes`;
	let file = '';

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('noteCreated');
			}
		}
	});

	if (selectedNote) {
		$form.id = selectedNote.id;
		$form.subject = selectedNote.Subject;
		$form.body = selectedNote.Body;
		if (selectedNote.remainder) {
			$form.remainder = new Date(selectedNote.remainder);
			remainder = true;
		}
	}

	const cancel = async () => {
		dispatch('noteCancel');
	};

	const changeFile = (event: any) => {
		if (event.target.files.length > 0) {
			file = event.target.files[0].name;
		}
	};

	const getFileName = () => {
		return getNoteFileName(selectedNote);
	};
</script>

<form id="noteForm" method="POST" use:enhance action={actionURL} enctype="multipart/form-data">
	<input hidden name="id" bind:value={$form.id} />
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
	></Textarea>

	<div class="flex items-start mt-4">
		<Toggle bind:checked={remainder} class="mr-4">Remainder</Toggle>
		{#if remainder}
			<input type="hidden" name="remainder" bind:value={$form.remainder} readonly />
			<DatePicker bind:value={$form.remainder}></DatePicker>
		{/if}
	</div>

	<!-- <Fileupload type="file" id="file" name="file" class="mt-2" /> -->
	<div class="relative inline-block w-full mt-4">
		<input
			type="file"
			class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
			name="file"
			on:change={changeFile}
		/>
		<div
			class="p-3 bg-gray-100 ring-1 ring-gray-300 text-gray-500 text-center flex items-center justify-center rounded"
		>
			{#if selectedNote && selectedNote.file}
				<div class="flex flex-col items-center">
					<div class="flex items-center">
						<PaperClipOutline></PaperClipOutline>
						{#if file == ''}
							Change file
						{:else}
							Change file to:
							{file}
						{/if}
					</div>
					<div class="z-10">
						<a href={'/' + selectedNote.file}>{getFileName()}</a>
					</div>
				</div>
			{:else}
				<div class="flex flex-col items-center">
					<div class="flex items-center justify-center">
						<PaperClipOutline></PaperClipOutline>
						{#if file == ''}
							Select file
						{:else}
							Selected file
						{/if}
					</div>
					<div>
						{file}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="border-t-red-500 flex justify-end mt-5">
		<GradientButton on:click={cancel} color="red" class="mr-2">Cancel</GradientButton>
		<GradientButton type="Submit" color="blue" class="">Save</GradientButton>
	</div>
</form>