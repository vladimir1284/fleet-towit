<script async lang="ts">
	import { BuildingSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { createEventDispatcher } from 'svelte';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import NameInputComponent from '$lib/components/inputs/NameInputComponent.svelte';

	export let data;
	export let selectedTenant;
	let actionURL = '/api/tenants';

	const dispatch = createEventDispatcher();

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});
	$: $form.email = $form.email.trim();
	if (selectedTenant) {
		$form.name = selectedTenant.name;
		$form.email = selectedTenant.email;
		$form.email = $form.email.trim();
		actionURL = actionURL + `/${selectedTenant.id}`;
	}
</script>

<form method="POST" use:enhance action={actionURL}>
	<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
		<input hidden name="id" bind:value={$form.id} />
		<div class="sm:col-span-2">
			<NameInputComponent placeholder="Tenant name" {form} {errors} {constraints}>
				<BuildingSolid class="w-6 h-6 inline" />
			</NameInputComponent>
		</div>
		<div class="sm:col-span-2">
			<EmailInputComponent placeholder="Tenant email address" {form} {errors} {constraints} />
		</div>
		<div class="flex sm:col-span-2 justify-center items-center">
			<SubmitButtonComponent
				placeholder={!$form.id ? 'Create tenant' : 'Update tenant'}
				styles="w-40"
			/>
		</div>
	</div>
</form>
