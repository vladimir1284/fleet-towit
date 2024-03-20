<script async lang="ts">
	//@ts-nocheck
	import { getContext } from 'svelte';
	import { Select } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let data: any;
	export let selectedContract: any = undefined;

	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let actionURL = `/api/tenants/${$currentTenant?.id}/contracts/${selectedContract.id}/stage`;

	const { form, errors, constraints, enhance } = superForm(data.stageForm, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	const stageSelector = [
		{ value: 'PENDING', name: 'PENDING' },
		{ value: 'ACTIVE', name: 'ACTIVE' },
		{ value: 'ENDED', name: 'ENDED' },
		{ value: 'DISMISS', name: 'DISMISS' }
	];

	if (selectedContract) {
		$form.stage = selectedContract.stage.stage;
	}
</script>

<form method="POST" use:enhance action={actionURL}>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
		<input hidden name="id" bind:value={$form.id} />
		<div class="sm:col-span-2">
			<Select
				class="mt-2"
				items={stageSelector}
				id="stage"
				name="stage"
				placeholder="Select a stage..."
				bind:value={$form.stage}
			/>
		</div>
		<div class="sm:col-span-2">
			<TextInputComponent
				formPointer="comments"
				{form}
				{errors}
				{constraints}
				placeholder="Type a comment..."
			/>
		</div>
		<div class="sm:col-span-2">
			<TextInputComponent
				formPointer="reason"
				{form}
				{errors}
				{constraints}
				placeholder="Type a reason..."
			/>
		</div>
		<div class="sm:col-span-2"></div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<SubmitButtonComponent
				placeholder={!selectedContract ? 'Create stage' : 'Update stage'}
				styles="w-40"
			/>
		</div>
	</div>
</form>
