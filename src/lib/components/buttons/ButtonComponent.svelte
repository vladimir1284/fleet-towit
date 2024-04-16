<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	export let loading: boolean = false;
	export let disabled: boolean = loading;
	export let outline: boolean = false;
	export let pill: boolean = false;
	export let placeholder: any;
	export let styles: string = '';
	export let size: 
		| "xs" 
		| "sm" 
		| "lg" 
		| "xl" 
		| "md" 
		| undefined = undefined;
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
</script>

<Button class={styles} {size} {disabled} {pill} {outline} {color} on:click={onClick}>
	{#if loading}
		<Spinner size="5" color="white" />
	{:else}
		<slot />
		{placeholder}
	{/if}
</Button>
