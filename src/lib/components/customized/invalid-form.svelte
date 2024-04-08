<script lang="ts">
	import { Helper } from 'flowbite-svelte';
	export let errors: string[];
</script>

<Helper class="pt-2" color="red">
	{errors}
</Helper>
