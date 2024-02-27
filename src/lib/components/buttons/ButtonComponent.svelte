<script lang="ts">
	import { Button } from 'flowbite-svelte';
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
</script>

<Button class={styles} {outline} {color} on:click={onClick}><slot /> {placeholder}</Button>
