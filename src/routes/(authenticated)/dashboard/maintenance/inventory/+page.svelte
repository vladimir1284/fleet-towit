<script lang="ts">
	export let data;
	import { Heading } from 'flowbite-svelte';
	import { PartManagement } from './components';
	import { setPartListContext } from './context';

	const { initialParts } = data;

	// Set part contexts.
	setPartListContext(initialParts);
</script>

<div class="container grid grid-cols-12">
	<div class="col-start-4 col-span-9">
		<div>
			<Heading tag="h2" customSize="text-4xl font-extrabold" class="mb-8">Inventory</Heading>
		</div>
		<div><PartManagement /></div>
	</div>
</div>
