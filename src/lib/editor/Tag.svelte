<script lang="ts">
	// import { tipexEditor } from './editor_store';
	import { tipexEditor } from '@friendofsvelte/tipex';

	import { onMount } from 'svelte';
	onMount(() => {
		console.log($tipexEditor);
	});

	// TODO: open a modal for creating a tag, specifying the name and the type of the variable
	function createTag() {
		$tipexEditor?.commands.deleteSelection();
		$tipexEditor?.commands.insertContent('{{ new_tag }}');
	}
</script>

<button class="tipex-edit-button" on:click={createTag}>
	<iconify-icon icon="majesticons:curly-braces"></iconify-icon>
</button>
