<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import * as ICON from 'flowbite-svelte-icons';

	export let iconName: string;
	export let onClick: (e: Event) => {};
</script>

<Button on:click={onClick}>
	<div class="flex gap-2">
		{#if iconName}
			<svelte:component this={ICON[iconName]} class="pointer-events-none" />
		{/if}
	</div>
</Button>
