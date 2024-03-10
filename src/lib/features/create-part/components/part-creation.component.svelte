<script lang="ts">
	// Modal management variable.
	export let isVisiblePartWizard: boolean;

	import { Modal, Button } from 'flowbite-svelte';
	import { setPartCreationWizardContext } from '$lib/context/part.context';

	import PartDetail from './part-detail.component.svelte';
	import PartStepper from './part-stepper.components.svelte';
	import PartCustomization from './part-customization.component.svelte';

	import { DEFAULT_PART_CREATION_DATA } from '../helpers';

	// Set part creation data context.
	setPartCreationWizardContext(DEFAULT_PART_CREATION_DATA);

	let currentStep = 0;
	const partComponentPerStep = [PartDetail, PartCustomization];

	const handleWizardStep = (numberOfSteps: number) => {
		const nextStep = currentStep + numberOfSteps;
		if (nextStep < partComponentPerStep.length || nextStep > 0) {
			currentStep += numberOfSteps;
		}
	};

	const handleWizardClose = () => {
		currentStep = 0;
		// Others operations on close.
	};
</script>

<Modal
	title="Add part to inventory"
	bind:open={isVisiblePartWizard}
	autoclose={false}
	on:close={handleWizardClose}
>
	<form>
		<div class="flex flex-col gap-10">
			<PartStepper />
			<svelte:component this={partComponentPerStep[currentStep]} />
			<div
				class="flex flex-row"
				class:justify-between={currentStep}
				class:justify-end={!currentStep}
			>
				{#if currentStep}
					<Button color="blue" class="w-1/5" on:click={() => handleWizardStep(-1)}>Back</Button>
				{/if}
				{#if currentStep < partComponentPerStep.length - 1}
					<Button type="button" color="blue" class="w-1/5" on:click={() => handleWizardStep(1)}
						>Next Step</Button
					>
				{:else}
					<Button type="submit" color="blue" class="w-1/5">Add Part</Button>
				{/if}
			</div>
		</div>
	</form>
</Modal>
