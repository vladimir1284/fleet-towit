<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { createEventDispatcher } from 'svelte';
	import { tenantActor } from '$lib/store/context-store';
	import { superForm } from 'sveltekit-superforms/client';
	import { Checkbox } from 'flowbite-svelte';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import NameInputComponent from '$lib/components/inputs/NameInputComponent.svelte';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import PhoneNumberInputComponent from '$lib/components/inputs/PhoneNumberInputComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import { reqInvoiceApi } from '@killbill/requests';
	import { AnnotationSolid } from 'flowbite-svelte-icons';
	// import { Invoice } from '@killbill/api/models/Invoice';
	export let data;
	export let selectedInvoice: any = null;
	export let maxAmount; // aun no lo tengo
	export let minAmount = 0;
	const dispatch = createEventDispatcher();
	const currentTenant = tenantActor.getSnapshot().context.currentTenant;

	const fixSchema = z.object({
		amount: z.string().refine(
			(value) => {
				const num = parseFloat(value);
				const regex = /^\d*\.?\d+$/; // Expresión regular para números decimales positivos
				return regex.test(value) && num >= minAmount && num <= maxAmount;
			},
			{
				message: `Amount must be a number between ${minAmount} and ${maxAmount}`
			}
		),
		comment: z.string()
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

	if (selectedInvoice) {
		$form.external_payment = false;
		$form.amount = selectedInvoice.amount;
		$form.comment = selectedInvoice.comment;
	} else {
		// buscar el primer invoice a pagar
		// selectedInvoice = await
		$form.external_payment = false;
		// $form.amount = selectedInvoice.amount;
		// $form.comment = selectedInvoice.comment;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		// const formData = new FormData(event.target);
		const invoice: Invoice = {
			...selectedInvoice,
			amount: $form.amount
		};
		try {
			const res = await reqInvoiceApi.createInstantPayment({
				invoiceId: selectedInvoice.invoiceId,
				body: invoice,
				xKillbillCreatedBy: 'admin',
				externalPayment: $form.external_payment

				// 	requestedDate: new Date(),
				// 	xKillbillReason: 'Contract-Timeline',
				// 	xKillbillComment: $form.comment
				// });
			});
			console.info(res);
		} catch (error) {
			console.error('Payment invoice error :', error);
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
	<!-- <input hidden name="tenantId" bind:value={$form.tenantId} /> -->
	<div class="sm:col-span-2 px-2">
		<Checkbox>External?</Checkbox>
	</div>
	<div class="sm:col-span-2">
		<AmountInputComponent formPointer="amount" {form} {errors} {constraints} placeholder="Amount" />
	</div>
	<div class="sm:col-span-2">
		<TextInputComponent
			formPointer="comment"
			form={$form.comment}
			errors={$errors.comment}
			constraints={$constraints.comment}
			placeholder="Comment"><AnnotationSolid class="w-6 h-6 inline" /></TextInputComponent
		>
	</div>
	<SubmitButtonComponent
		placeholder={!selectedInvoice ? 'Pay Older Invoice' : 'Pay invoice'}
		styles="w-[50%] mx-auto block"
	/>
</form>
