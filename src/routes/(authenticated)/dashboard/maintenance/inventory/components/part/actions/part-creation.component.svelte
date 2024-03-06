<script lang="ts">
	// Modal management variable.
	export let isVisiblePartModal: boolean;

	import { Modal, Button } from 'flowbite-svelte';

	import PartDetail from './part-detail.component.svelte';
	import PartStepper from './part-stepper.components.svelte';
	import PartCustomization from './part-customization.component.svelte';

	let currentStep = 0;
	const partComponentPerStep = [PartDetail, PartCustomization];
</script>

<Modal title="Add part to inventory" bind:open={isVisiblePartModal} autoclose={false}>
	<form>
		<div class="flex flex-col gap-10">
			<PartStepper />
			<svelte:component this={partComponentPerStep[currentStep]} />
			<div class="flex flex-row">
				<div class="basis-1/2">
					{#if currentStep}
						<Button color="blue" class="w-1/2" on:click={() => (currentStep = currentStep - 1)}
							>Back</Button
						>
					{/if}
				</div>
				<div class="basis-1/2 flex justify-end">
					<Button color="blue" class="w-1/2" on:click={() => (currentStep = currentStep + 1)}
						>{currentStep === partComponentPerStep.length - 1 ? 'Go ahead' : 'Next Step'}</Button
					>
				</div>
			</div>
		</div>
	</form>
</Modal>
