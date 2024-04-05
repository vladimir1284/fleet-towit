<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import JsonTable from '../../JsonTable.svelte';
	import type { TransformRule } from '../../../transformation/types';
	import type { CustomButton } from '../../types';

	export let showModal: boolean;
	export let onClose: (e: Event) => {};
	export let title: string = '';
	export let details: Object[] = [];
	export let rules: TransformRule[] = [];
</script>

<Modal bind:open={showModal} size="xs" autoclose={false} class="w-full" on:close={onClose}>
	{#each details as detail}{/each}
</Modal>
