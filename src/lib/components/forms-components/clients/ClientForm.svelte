<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { createEventDispatcher } from 'svelte';
	import { tenantActor } from '$lib/store/context-store';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import NameInputComponent from '$lib/components/inputs/NameInputComponent.svelte';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import PhoneNumberInputComponent from '$lib/components/inputs/PhoneNumberInputComponent.svelte';
	import { UserSolid } from 'flowbite-svelte-icons';
	export let data;
	export let selectedClient;
	const dispatch = createEventDispatcher();
	const currentTenant = tenantActor.getSnapshot().context.currentTenant;
	let actionURL = `/api/tenants/${currentTenant.id}/client`;

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
		SPA: true,
		validators: fixSchema,
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

	async function handleSubmit(event) {
		event.preventDefault();
		$form.email = $form.email.trim();
		const formData = new FormData(event.target);
		const headers = {
			'X-User-Tenant': currentTenant.currentUserTenant.id
		};
		const response = await fetch(actionURL, {
			method: 'POST',
			headers: headers,
			body: formData
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			console.log('Form submitted successfully');
		}
	}
</script>

<form
	class="flex flex-col justify-center align-center space-y-6"
	method="POST"
	enctype="multipart/form-data"
	on:submit={handleSubmit}
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
	/>
</form>
