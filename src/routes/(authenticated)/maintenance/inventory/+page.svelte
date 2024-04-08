<script lang="ts">
	export let data;

	import { Heading } from 'flowbite-svelte';
	import { PartManagement } from '$lib/features/list-part/components';
	import { setPartListContext, setPartCreationWizardContext } from '$lib/context/part.context';

	const { initialParts, superValidatedPartWizard } = data;

	// Set part contexts.
	setPartListContext(initialParts);
	// Set part creation data context.
	setPartCreationWizardContext(superValidatedPartWizard);
</script>

<div class="container grid grid-cols-12">
	<div class="col-start-3 col-span-9">
		<PartManagement />
	</div>
</div>

