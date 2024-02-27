<script async lang="ts">
	import { Select } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { tenantActor } from '$lib/store/context-store';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';

	export let data: any;
	export let selectedContract: any = undefined;

	const dispatch = createEventDispatcher();
	const currentTenant = tenantActor.getSnapshot().context.currentTenant;
	//@ts-expect-error Fix error on type string
	let actionURL = `/api/tenants/${currentTenant?.id}/contracts/${selectedContract.id}/stage`;

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
			<TextInputComponent
				formPointer="comments"
				form={$form.comments}
				errors={$errors.comments}
				constraints={$constraints.comments}
				placeholder="Type a comment..."
			/>
		</div>
		<div class="sm:col-span-2">
			<TextInputComponent
				formPointer="reason"
				form={$form.reason}
				errors={$errors.reason}
				constraints={$constraints.reason}
				placeholder="Type a reason..."
			/>
		</div>
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
		<div class="sm:col-span-2"></div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<SubmitButtonComponent
				placeholder={!selectedContract ? 'Create plan' : 'Update plan'}
				styles="w-40"
			/>
		</div>
	</div>
</form>
