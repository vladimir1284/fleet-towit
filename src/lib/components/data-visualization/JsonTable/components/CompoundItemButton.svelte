<script lang="ts">
	import { Button } from 'flowbite-svelte';

	export let icon: any;
	export let onClick: (e: Event) => {};
</script>

<Button on:click={onClick}>
	<div class="flex gap-2">
		{#if icon}
			<svelte:component this={icon} class="pointer-events-none" />
		{/if}
	</div>
</Button>
