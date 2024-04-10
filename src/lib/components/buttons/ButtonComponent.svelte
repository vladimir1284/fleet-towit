<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	export let outline: boolean = false;
	export let placeholder: any;
	export let styles: string = '';
	export let color:
		| 'blue'
		| 'red'
		| 'yellow'
		| 'green'
		| 'purple'
		| 'light'
		| 'dark'
		| 'primary'
		| 'none'
		| 'alternative'
		| undefined = 'blue';
	export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
	export let loading: boolean = false;
</script>

<Button class={styles} {outline} {color} on:click={onClick}>
	{#if loading}
		<Spinner size="5" color="white" />
	{:else}
		<slot />
		{placeholder}
	{/if}
</Button>
