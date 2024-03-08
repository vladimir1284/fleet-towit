<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import JsonTable from '../JsonTable.svelte';
	import type { TransformRule } from '../../transformation/types';
	import type { CustomButton } from '../types';

	export let showModal: boolean;
	export let onClose: (e: Event) => {};
	export let title: string = '';
	export let data: Object[] = [];
	export let rules: TransformRule[] = [];
	export let createButton: CustomButton | null = null;

	$: console.log('MODAL DATA\n' + JSON.stringify(data));
</script>

<Modal bind:open={showModal} size="xs" autoclose={false} class="w-full" on:close={onClose}>
	<JsonTable {title} {data} {rules} {createButton} />
</Modal>
