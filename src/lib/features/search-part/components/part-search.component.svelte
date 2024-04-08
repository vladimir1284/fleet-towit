<script lang="ts">
	export let partSearchPattern: string;

	import { Search } from 'flowbite-svelte';
</script>

<Search size="md" placeholder="Type to search a part..." bind:value={partSearchPattern} />
