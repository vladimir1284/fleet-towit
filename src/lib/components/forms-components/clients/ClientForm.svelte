<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { createEventDispatcher } from 'svelte';
	import { UserSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import NameInputComponent from '$lib/components/inputs/NameInputComponent.svelte';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';
	import PhoneNumberInputComponent from '$lib/components/inputs/PhoneNumberInputComponent.svelte';

	export let data;
	export let selectedClient;
	import { getContext } from 'svelte';

	const dispatch = createEventDispatcher();
	const currentTenant = getContext('currentTenant');
	let actionURL = `/api/tenants/${$currentTenant.id}/client`;
	let loading = false;

	const fixSchema = z.object({
		name: z.string(),
		email: z.string().email(),
		phoneNumber: z.string().regex(/^\+?\d{1,4}?[-. ]?\(?\d{1,3}?\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/, {
			message: 'Invalid phone number format'
		}),
		tenantId: z.number(),
		id: z.number().optional()
	});

	const { form, errors, constraints, enhance } = superForm(data, {
		validators: fixSchema,
		onSubmit: async (event) => {
			$form.email = $form.email.trim();
		},
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	if (selectedClient) {
		$form.name = selectedClient.name;
		$form.email = selectedClient.email;
		$form.phoneNumber = selectedClient.phoneNumber;
		$form.tenantId = selectedClient.tenantId;
		actionURL = actionURL + `/${selectedClient.id}`;
	}
</script>

<form
	class="flex flex-col justify-center align-center space-y-6"
	method="POST"
	enctype="multipart/form-data"
	action={actionURL}
	use:enhance
>
	<input hidden name="id" bind:value={$form.id} />
	<input hidden name="tenantId" bind:value={$form.tenantId} />
	<div class="sm:col-span-2">
		<NameInputComponent placeholder="Insert client name" {form} {errors} {constraints}>
			<UserSolid class="w-6 h-6 inline" />
		</NameInputComponent>
	</div>
	<div class="sm:col-span-2">
		<EmailInputComponent placeholder="Insert client email" {form} {errors} {constraints} />
	</div>
	<div class="sm:col-span-2">
		<PhoneNumberInputComponent placeholder="Insert client phone" {form} {errors} {constraints} />
	</div>
	<SubmitButtonComponent
		placeholder={!selectedClient ? 'Create client' : 'Update client'}
		styles="w-[50%] mx-auto block"
		{loading}
	/>
</form>
