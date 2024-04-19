<script>
	// @ts-nocheck
	import { getContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let data;

	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let actionURL = `/api/tenants/${$currentTenant?.id}/contracts/${data}/stage`;

	const { form, errors, constraints, enhance, delayed } = superForm(data.stageForm, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	if (data) {
		$form.stage = 'DISMISS';
	}
</script>

<form method="POST" use:enhance action={actionURL}>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
		<input hidden name="id" bind:value={$form.id} />
		<input hidden name="stage" bind:value={$form.stage} />
		<div class="sm:col-span-2">
			<TextInputComponent
				formPointer="reason"
				{form}
				{errors}
				{constraints}
				placeholder="Type a reason..."
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
		<div class="sm:col-span-2"></div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<SubmitButtonComponent placeholder="Dismiss" styles="w-40" loading={$delayed} />
		</div>
	</div>
</form>
