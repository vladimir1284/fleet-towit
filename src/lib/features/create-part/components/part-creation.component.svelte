<script lang="ts">
	// Modal management variable.
	export let isVisiblePartWizard: boolean;

	import { getContext } from 'svelte';
	import { Modal, Button } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	import PartDetail from './part-detail.component.svelte';
	import PartStepper from './part-stepper.components.svelte';
	import PartCustomization from './part-customization.component.svelte';

	import { PartDetailSchema, PartCustomizationSchema } from '$lib/features/create-part/zod';

	import type { Writable } from 'svelte/store';
	import type { PartCreationType } from '$lib/features/create-part/zod';
	import type { SuperValidated } from 'sveltekit-superforms';

	let currentStep = 0;
	const partComponentPerStep = [
		{ component: PartDetail, stepSchema: zod(PartDetailSchema) },
		{ component: PartCustomization, stepSchema: zod(PartCustomizationSchema) }
	];

	// Retrieve part creation wizard context.
	const partCreationWizardStore: Writable<SuperValidated<PartCreationType>> =
		getContext('PartCreationWizard');

	// Get current step validator.
	$: options.validators = partComponentPerStep[currentStep].stepSchema;
	const {
		form: superPartStore,
		errors,
		enhance,
		validateForm,
		options
	} = superForm($partCreationWizardStore, {
		resetForm: true,
		dataType: 'json',

		// Events management.
		async onSubmit({ cancel }) {
			// If on last step, make a normal request
			if (currentStep === partComponentPerStep.length - 1) return;
			else cancel();

			// Make a manual client-side validation, since we have cancelled.
			const superValidatedStep = await validateForm({ update: true });
			if (superValidatedStep.valid) {
				handleWizardStep(1);
			}
		},
		async onUpdated({ form }) {
			// Errors might be checked inside form.errors field.
			if (form.valid) {
				currentStep = 0;
			}
		}
	});

	const handleWizardStep = (numberOfSteps: number) => {
		const nextStep = currentStep + numberOfSteps;
		if (nextStep >= 0 && nextStep < partComponentPerStep.length) {
			currentStep = nextStep;
		}
	};

	const handleWizardClose = () => {
		currentStep = 0;
		// Others operations on close...
	};

	$: currentStepButtonText =
		currentStep < partComponentPerStep.length - 1 ? 'Next Step' : 'Add Part';
</script>

<Modal
	title="Add part to inventory"
	bind:open={isVisiblePartWizard}
	autoclose={false}
	on:close={handleWizardClose}
>
	<form method="POST" action="?/create" use:enhance>
		<div class="flex flex-col gap-10">
			<PartStepper {currentStep} />
			<svelte:component
				this={partComponentPerStep[currentStep].component}
				{errors}
				{superPartStore}
			/>
			<div
				class="flex flex-row"
				class:justify-between={currentStep}
				class:justify-end={!currentStep}
			>
				{#if currentStep}
					<Button color="blue" class="w-1/5" on:click={() => handleWizardStep(-1)}>Back</Button>
				{/if}
				<Button type="submit" color="blue" class="w-1/5">{currentStepButtonText}</Button>
			</div>
		</div>
	</form>
</Modal>
