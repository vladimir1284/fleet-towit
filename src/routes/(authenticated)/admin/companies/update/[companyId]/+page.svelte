<script lang="ts">
	// @ts-nocheck
	import {
		Modal,
	} from 'flowbite-svelte';
    import CreateCompanyForm from '$lib/components/forms-components/companies/CreateCompanyForm.svelte';
	import type { PageData } from '../$types';
	export let data: PageData;

	let showAlert = false;
	let popupModal = true;

	function handleCloseModal(event) {
		popupModal = event.detail;
		showAlert = true;

		setTimeout(() => {
			showAlert = false;
		}, 4000);
	}
    
</script>

<Modal size="xs" padding="md" bind:open={popupModal}>
	<CreateCompanyForm data={data} on:formvalid={handleCloseModal} />
</Modal>