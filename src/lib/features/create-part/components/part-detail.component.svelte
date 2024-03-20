<script lang="ts">
	export let errors: Writable<SuperFormErrorType>;
	export let superPartStore: Writable<PartCreationType>;

	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { Label, Input, Textarea } from 'flowbite-svelte';
	import { InvalidForm } from '$lib/components/customized';

	import type { Writable } from 'svelte/store';
	import type { PartCreationType, SuperFormErrorType } from '$lib/types';
</script>

<div class="flex flex-col gap-4">
	<div>
		<Label for="part-name" class="mb-2 font-medium text-sm font-sans text-slate-700"
			>Part name:</Label
		>
		<Input
			type="text"
			id="part-name"
			placeholder="Ex: Transmission, Radiator, Axle"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$superPartStore.name}
		/>
		{#if $errors.name}<InvalidForm errors={$errors.name} />{/if}
	</div>
	<div class="flex justify-between gap-2">
		<div class="flex gap-2">
			<div class="basis-2/5">
				<Input type="number" placeholder="Part amount" bind:value={$superPartStore.number} />
				{#if $errors.number}<InvalidForm errors={$errors.number} />{/if}
			</div>
			<div class="self-start basis-2/4">
				<div class="flex gap-2">
					<Input
						type="number"
						placeholder="Critical QTY"
						bind:value={$superPartStore.criticalQty}
					/>
					<InfoCircleSolid class="self-center" />
				</div>
				{#if $errors.criticalQty}<InvalidForm errors={$errors.criticalQty} />{/if}
			</div>
		</div>
		<div class="basis-1/3 self-start">
			<Input placeholder="UPC" bind:value={$superPartStore.upc} />
			{#if $errors.upc}<InvalidForm errors={$errors.upc} />{/if}
		</div>
	</div>
	<div>
		<Textarea
			placeholder="Part description"
			rows="4"
			class="resize-none"
			bind:value={$superPartStore.description}
		/>
		{#if $errors.description}<InvalidForm errors={$errors.description} />{/if}
	</div>
</div>
