<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	export let customFormId: number;
	export let idCardSelected: number;

	export let isOpen = false;
	export let onClose = () => {};

	const closeModal = () => {
		isOpen = false;
		onClose();
	};
</script>

<Modal bind:open={isOpen} size="xs" dismissable={false}>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this card ?
		</h3>
		<!-- Form -->
		<form method="post" action="?/deleteCard" use:enhance={() => closeModal()}>
			<input type="hidden" bind:value={idCardSelected} name="card_id" />
			<input type="hidden" value={customFormId} name="form_id" />

			<Button type="submit" color="red" class="me-2">Yes, I'm sure</Button>
			<Button on:click={closeModal} color="alternative">No, cancel</Button>
		</form>
		<!-- Form -->
	</div>
</Modal>
