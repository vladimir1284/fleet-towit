<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { createEventDispatcher } from 'svelte';
	import { loadFromSessionStorage } from '$lib/store/context-store';
	import { superForm } from 'sveltekit-superforms/client';
	import { Checkbox } from 'flowbite-svelte';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import NameInputComponent from '$lib/components/inputs/NameInputComponent.svelte';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import PhoneNumberInputComponent from '$lib/components/inputs/PhoneNumberInputComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import { reqInvoiceApi, reqAccountApi } from '@killbill/requests';
	import { AnnotationSolid } from 'flowbite-svelte-icons';
	// import { Invoice } from '@killbill/api/models/Invoice';
	export let data;
	export let selectedInvoice: any = null;
	export let maxAmount = 999999999999; // aun no lo tengo
	export let minAmount = 0;
	const dispatch = createEventDispatcher();
	const currentTenant = loadFromSessionStorage('currentTenant');

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
	} else {
		// TODO buscar el primer invoice a pagar
		// selectedInvoice = await
		$form.external_payment = false;
		// $form.amount = selectedInvoice.amount;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		// const formData = new FormData(event.target);
		const { auditLogs, ...otherData } = selectedInvoice;
		const invoice: InvoicePayment = {
			...otherData,
			amount: $form.amount
		};

		try {
			const res = await reqInvoiceApi.createInstantPayment({
				invoiceId: selectedInvoice.invoiceId,
				body: invoice, // InvoicePayment
				xKillbillCreatedBy: 'admin',
				externalPayment: true,
				xKillbillReason: 'Contract-Timeline',
				xKillbillComment: $form.comment
			});
			if (res.status === 201) console.info('Payment invoice successful:', res.data);
			else console.warn('Unexpected response status:', res.status);
		} catch (error) {
			console.error('Payment invoice error:', error);
		}
		dispatch('formvalid');
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
	<!-- <div class="sm:col-span-2 px-2">
		<Checkbox>External?</Checkbox>
	</div> -->
	<div class="sm:col-span-2">
		<AmountInputComponent formPointer="amount" {form} {errors} {constraints} placeholder="Amount" />
	</div>
	<div class="sm:col-span-2">
		<TextInputComponent
			formPointer="comment"
			form={form.comment}
			errors={errors.comment}
			constraints={constraints.comment}
			placeholder="Comment"><AnnotationSolid class="w-6 h-6 inline" /></TextInputComponent
		>
	</div>
	<SubmitButtonComponent
		placeholder={!selectedInvoice ? 'Pay Older Invoice' : 'Pay invoice'}
		styles="w-[50%] mx-auto block"
	/>
</form>