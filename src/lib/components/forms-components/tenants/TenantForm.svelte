<script async lang="ts">
	import { Select } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { BuildingSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import NameInputComponent from '$lib/components/inputs/NameInputComponent.svelte';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let data;
	export let selectedTenant: any;
	export let usersList: [] = [];

	let tenantUsersList = [];
	let tenantUsersSelector: { value: any; name: any }[] = [];
	let actionURL = '/api/tenants';
	const dispatch = createEventDispatcher();

	const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});
	$: $form.email = $form.email.trim();
	if (selectedTenant) {
		console.log(selectedTenant);

		$form.name = selectedTenant.name;
		$form.email = selectedTenant.email;
		$form.ownerId = selectedTenant.owner?.id;
		$form.email = $form.email.trim();
		$form.ownerId = selectedTenant.owner?.id;
		//@ts-expect-error
		tenantUsersList = usersList.filter((user) => user.tenant.id == selectedTenant.id);
		tenantUsersList?.forEach((element) => {
			tenantUsersSelector.push({
				//@ts-expect-error Eslint throws does not exist on type 'never'
				value: element.id,
				//@ts-expect-error Eslint throws does not exist on type 'never'
				name: element.user.name ?? element.user.email
			});
		});
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
		{#if selectedTenant}
			<div class="sm:col-span-2">
				Select a owner
				<Select
					class="mt-2"
					items={tenantUsersSelector}
					name="ownerId"
					placeholder="Select a user to be owner..."
					bind:value={$form.ownerId}
				/>
			</div>
		{/if}
		<div class="flex sm:col-span-2 justify-center items-center">
			<SubmitButtonComponent
				placeholder={!selectedTenant ? 'Create tenant' : 'Update tenant'}
				styles="w-40"
				loading={$delayed}
			/>
		</div>
	</div>
</form>
