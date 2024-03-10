<script lang="ts">
	import { Input } from 'flowbite-svelte';

	export let attribute: string;
</script>

<div class="relative">
	<Input
		type="text"
		class="px-4 py-2 text-lg border-2 border-gray-400 rounded peer bg-inherit"
		required
	/>
	<span
		class="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-gray-200 ml-2 peer-valid:text-sm peer-valid:-translate-y-5"
	>
		{attribute}
	</span>
</div>
