<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	export let placeholder: any;
	export let styles: string = '';
	export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
	export let loading: boolean = false;
	export let disabled: boolean = false;
</script>

<Button type="submit" class={styles} disabled={loading || disabled} on:click={onClick}>
	{#if loading}
		<Spinner size="5" color="white" />
	{:else}
		{placeholder}
	{/if}
</Button>
