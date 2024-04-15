<script lang="ts">
	//@ts-nocheck
	import { PlusSolid } from 'flowbite-svelte-icons';
	import CreateContractNote from '$lib/components/forms-components/notes/CreateContractNote.svelte';
	import type { Note } from '$lib/zod';
	import { getContext } from 'svelte';
	import NoteCard from '$lib/components/forms-components/notes/NoteCard.svelte';
	import type { PageData } from '../../../../routes/$types';
	import type { NoteResult } from '$lib/actions/contracts_notes';
	import { GradientButton, Modal, Spinner, Timeline, TimelineItem } from 'flowbite-svelte';

	interface Contract {
		id: number;
	}

	const currentTenant = getContext('currentTenant');

	export let selectedContract: Contract | undefined = undefined;
	export let open = false;
	export let data: PageData;

	let actionURL = `/api/tenants/${$currentTenant.id}/contracts/${selectedContract?.id}/notes`;

	let loading = false;
	let creating = false;
	let selectedNote: Note | null = null;
	let notes: Array<[string, Array<NoteResult>]> | null = null;

	const formatDate = (date: Date | string): string => {
		return new Date(date).toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	function map(notesRes: Array<NoteResult>): Map<string, Array<NoteResult>> {
		const m = new Map<string, Array<NoteResult>>();

		for (let i = 0; i < notesRes.length; i++) {
			const date = formatDate(notesRes[i].createdDate);
			let list = m.get(date);
			if (!list) {
				list = [notesRes[i]];
			} else {
				list.push(notesRes[i]);
			}
			m.set(date, list);
		}
		return m;
	}

	async function updateContractNotes() {
		if (!selectedContract) return;
		loading = true;

		try {
			const notesResp = await fetch(actionURL);
			const notesRes = await notesResp.json();
			notes = Array.from(map(notesRes));
		} catch (e) {
			console.log(e);
		} finally {
			loading = false;
		}
	}

	const onNoteCreated = async () => {
		onNoteFormClose();
		updateContractNotes();
	};
	const onNoteFormClose = () => {
		creating = false;
		selectedNote = null;
	};

	const onNewNote = () => {
		selectedNote = null;
		creating = true;
	};

	const onNoteEdit = (e: CustomEvent) => {
		selectedNote = e.detail;
		creating = true;
	};

	const onNoteRemove = async (e: CustomEvent) => {
		const response = await fetch(`${actionURL}/${e.detail.id}`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			console.error('Failed to delete user');
			return;
		}
		console.log('Deleted successfully');
		updateContractNotes();
	};

	$: {
		if (open && selectedContract) {
			updateContractNotes();
		}
	}
</script>

<Modal size="md" padding="md" bind:open on:close={() => (creating = false)}>
	<svelte:fragment slot="header">
		{#if creating}
			<span class="font-bold text-gray-700 text-xl">
				Contract #{selectedContract?.id}:
				{!selectedNote ? 'New note' : 'Note ' + selectedNote.id}
			</span>
		{:else}
			<span class="font-bold text-gray-700 text-xl">Contract #{selectedContract?.id}: Notes</span>
			<GradientButton class="p-2 ml-2" color="blue" pill on:click={onNewNote}>
				<PlusSolid size="sm"></PlusSolid>
			</GradientButton>
		{/if}
	</svelte:fragment>
	<div>
		{#if creating}
			<CreateContractNote
				on:noteCancel={onNoteFormClose}
				on:noteCreated={onNoteCreated}
				{data}
				tenant={$currentTenant.id}
				{selectedContract}
				{selectedNote}
			></CreateContractNote>
		{:else if loading}
			<div class="flex justify-center align-middle">
				<Spinner color="blue" />
			</div>
		{:else if notes}
			<Timeline class="w-full">
				{#each notes as [date, notesList]}
					<TimelineItem class="w-full" {date}>
						{#each notesList as note}
							<NoteCard {data} {note} on:edit={onNoteEdit} on:delete={onNoteRemove} />
						{/each}
					</TimelineItem>
				{/each}
			</Timeline>
		{/if}
	</div>
</Modal>
