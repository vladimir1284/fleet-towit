<script lang="ts">
	import type { NoteResult } from '$lib/actions/contracts_notes';
	import { getRemainderStatusColor } from '$lib/actions/contracts_notes_status';
	import { Avatar, Button, Card, Indicator, Modal } from 'flowbite-svelte';
	import {
		EditOutline,
		ExclamationCircleOutline,
		PaperClipOutline,
		TrashBinOutline
	} from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import { getNoteFileName } from './tools';

	const dispatch = createEventDispatcher();

	export let note: NoteResult;
	export let data: any;

	let deleteModal = false;

	const getTime = (date: Date | string) => {
		const d = new Date(date);
		let h = d.getHours();
		let m = d.getMinutes();
		return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
	};

	const deleteNote = () => {
		dispatch('delete', note);
	};

	const onDelete = () => {
		deleteModal = true;
	};

	const onEdit = () => {
		dispatch('edit', note);
	};

	const getUser = (): string => {
		if (note.user.name) {
			return note.user.name;
		}
		if (note.user.email) {
			return note.user.email;
		}
		return 'UNKNOWN';
	};

	const getRemStatusColor = (): 'none' | 'blue' | 'red' | 'yellow' => {
		if (!note.remainder) return 'none';
		return getRemainderStatusColor(note.remainder);
	};

	const getFileName = () => {
		return getNoteFileName(note);
	};
</script>

<Modal bind:open={deleteModal} size="xs" autoclose>
	<div class="text-center">
		<div class="flex items-center justify-center">
			<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this note?
			</h3>
		</div>
		<Button color="red" class="me-2" on:click={deleteNote}>Yes, I'm sure</Button>
		<Button color="alternative">No, cancel</Button>
	</div>
</Modal>

<div class="flex mb-4 w-full" id="noteBox">
	<Card class="flex-grow flex-row mx-2 p-2 gap-2 relative" size="xl" padding="none">
		{#if note.user.image}
			<Avatar src={note.user.image} size="sm"></Avatar>
		{:else}
			<Avatar size="sm"></Avatar>
		{/if}
		{#if note.remainder}
			<Indicator
				color={getRemStatusColor()}
				border
				class="mt-2 mr-2"
				size="lg"
				placement="top-right"
			></Indicator>
		{/if}
		<div class="flex-column">
			<div class="text-sm text-primary-500">{getUser()}</div>
			<div class="font-bold">{note.Subject}</div>
			<div>{note.Body}</div>
			{#if note.file}
				<div class="mt-2">
					<a
						href={`https://minios3.crabdance.com/develop/contracts/${note.contractId}/notes/${note.id}/${note.file}`}
						class="flex items-center text-gray-400"
					>
						<PaperClipOutline size="sm" />
						{getFileName()}
					</a>
				</div>
			{/if}
		</div>
	</Card>
	<div class="flex-shrink-0 flex flex-col items-end">
		<div class="flex-grow transition-all flex" id="controls">
			{#if data.session.user.id == note.user.id}
				<EditOutline color="red" size="sm" class="mb-2 mt-2 mr-1" on:click={onEdit} />
				<TrashBinOutline color="red" size="sm" class="mb-2 mt-2" on:click={onDelete} />
			{/if}
		</div>
		<span class="text-sm">{getTime(note.createdDate)}</span>
	</div>
</div>

<style>
	#controls {
		opacity: 0;
	}
	#noteBox:hover #controls {
		opacity: 1;
	}
</style>
