<script lang="ts">
	import { Button } from 'flowbite-svelte';
	export let placeholder: any;
	export let styles: string = '';
	export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
</script>

<Button type="submit" class={styles} on:click={onClick}>{placeholder}</Button>
