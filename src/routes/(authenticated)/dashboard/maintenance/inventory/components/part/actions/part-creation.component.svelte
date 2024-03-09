<script lang="ts">
	// Modal management variable.
	export let isVisiblePartModal: boolean;

	import { onMount } from 'svelte';
	import { Modal, Button } from 'flowbite-svelte';
	import { setPartCreationFormContext } from '../../../context';

	import PartDetail from './part-detail.component.svelte';
	import PartStepper from './part-stepper.components.svelte';
	import PartCustomization from './part-customization.component.svelte';

	let currentStep = 0;
	const partComponentPerStep = [PartDetail, PartCustomization];

	onMount(() => {
		// Set part creation data context.
		setPartCreationFormContext();
	});
</script>

<Modal title="Add part to inventory" bind:open={isVisiblePartModal} autoclose={false}>
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
					<Button color="blue" class="w-1/5" on:click={() => (currentStep = currentStep - 1)}
						>Back</Button
					>
				{/if}
				{#if currentStep < partComponentPerStep.length - 1}
					<Button
						type="button"
						color="blue"
						class="w-1/5"
						on:click={() => (currentStep = currentStep + 1)}>Next Step</Button
					>
				{:else}
					<Button type="submit" color="blue" class="w-1/5">Add Part</Button>
				{/if}
			</div>
		</div>
	</form>
</Modal>
