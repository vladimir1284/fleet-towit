<script lang="ts">
	import { getContext } from 'svelte';

	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { Label, Input, Textarea } from 'flowbite-svelte';
	import { InvalidForm } from '$lib/components/customized';

	import { numberProxy } from 'sveltekit-superforms';

	import type { PartCreationType } from '$lib/types';
	import type { SuperForm } from 'sveltekit-superforms';

	// Retrieve super form context.
	const superPartForm: SuperForm<PartCreationType> = getContext('SuperPartForm');
	const { form: superPartStore, errors: superPartErrorStore } = superPartForm;

	const partNumber = numberProxy(superPartStore, 'number', {
		// Guarantee placeholder display.
		empty: 'zero',
		initiallyEmptyIfZero: true
	});
	const criticalQty = numberProxy(superPartStore, 'criticalQty', {
		// Guarantee placeholder display.
		empty: 'zero',
		initiallyEmptyIfZero: true
	});
</script>

<div class="flex flex-col gap-3">
	<div>
		<Label for="part-name" class="mb-2 font-medium text-sm font-sans text-slate-700"
			>Part name:</Label
		>
		<Input
			type="text"
			id="part-name"
			placeholder="Ex: Transmission, Radiator, Axle"
			aria-invalid={$superPartErrorStore.name ? 'true' : undefined}
			bind:value={$superPartStore.name}
		/>
		<div class="h-5">
			{#if $superPartErrorStore.name}<InvalidForm errors={$superPartErrorStore.name} />{/if}
		</div>
	</div>
	<div class="flex justify-between gap-2">
		<div class="flex gap-2">
			<div class="basis-2/5">
				<Input type="number" placeholder="Part amount" bind:value={$partNumber} />
				<div class="h-5">
					{#if $superPartErrorStore.number}<InvalidForm errors={$superPartErrorStore.number} />{/if}
				</div>
			</div>
			<div class="self-start basis-2/4">
				<div class="flex gap-2">
					<Input type="number" placeholder="Critical QTY" bind:value={$criticalQty} />
					<InfoCircleSolid class="self-center" />
				</div>
				<div class="h-5">
					{#if $superPartErrorStore.criticalQty}<InvalidForm
							errors={$superPartErrorStore.criticalQty}
						/>{/if}
				</div>
			</div>
		</div>
		<div class="basis-1/3 self-start">
			<Input placeholder="UPC" bind:value={$superPartStore.upc} />
			<div class="h-5">
				{#if $superPartErrorStore.upc}<InvalidForm errors={$superPartErrorStore.upc} />{/if}
			</div>
		</div>
	</div>
	<div>
		<Textarea
			placeholder="Part description"
			rows="4"
			class="resize-none"
			bind:value={$superPartStore.description}
		/>
		<div class="h-5">
			{#if $superPartErrorStore.description}<InvalidForm
					errors={$superPartErrorStore.description}
				/>{/if}
		</div>
	</div>
</div>
