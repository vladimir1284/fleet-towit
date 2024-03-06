<script lang="ts">
	import { MultiSelect, Label, Heading } from 'flowbite-svelte';
	let selected = [];
	let countries = [
		{ value: 'us', name: 'United States' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'fr', name: 'France' },
		{ value: 'jp', name: 'Japan' },
		{ value: 'en', name: 'England' }
	];
</script>

<div class="flex flex-col gap-4">
	<div>
		<Label for="part-name" class="mb-2">Part categories:</Label>
		<MultiSelect items={countries} bind:value={selected} size="md" id="part-location" />
	</div>
	<div class="flex flex-col"></div>
	<div class="flex flex-col"></div>
</div>
