<script lang="ts">
	export let index: number;
	export let removePartLocation: Function;

	import { fade } from 'svelte/transition';
	import { Input, Select } from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
</script>

<div class="flex justify-between gap-10" transition:fade>
	<div class="basis-3/5">
		<Input type="text" placeholder="Location" required />
	</div>
	<div class="flex basis-2/5 gap-3 items-center">
		<div class="flex justify-between gap-2">
			<Input type="number" placeholder="Quantity" class="basis-4/5" />
			<Select class="basis-1/5" />
		</div>
		{#if index > 0}
			<TrashBinSolid on:click={() => removePartLocation(index)} />
		{/if}
	</div>
</div>
