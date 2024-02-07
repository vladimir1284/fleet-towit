<script>
	import { Button, Modal } from 'flowbite-svelte';
	import PartManagement from './part-management.svelte';
	let formModal = false;
</script>

<Button on:click={() => (formModal = true)}>Form modal</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<PartManagement />
</Modal>
