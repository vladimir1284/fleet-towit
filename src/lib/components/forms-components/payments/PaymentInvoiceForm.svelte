<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { createEventDispatcher } from 'svelte';
	import { reqInvoiceApi } from '@killbill/requests';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import { AnnotationSolid } from 'flowbite-svelte-icons';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

	export let data;
	export let selectedInvoice: object | undefined = undefined;
	export let maxAmount = 999999999999; // aun no lo tengo
	export let minAmount = 0;
	const dispatch = createEventDispatcher();

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
	const { form, errors, constraints, enhance, delayed } = superForm(data.paymentInvoiceForm, {
		SPA: true,
		validators: zod(fixSchema),
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
		$form.external_payment = false;
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
	<div class="sm:col-span-2">
		<AmountInputComponent 
			formPointer="amount" 
			{form} 
			{errors} 
			{constraints} 
			placeholder="Amount"/>
	</div>
	<div class="sm:col-span-2">
		<TextInputComponent 
			formPointer="comment" 
			{form} 
			{errors} 
			{constraints} 
			placeholder="Comment">

				<AnnotationSolid class="w-6 h-6 inline" />
				
		</TextInputComponent>
	</div>
	<SubmitButtonComponent
		placeholder={!selectedInvoice ? 'Pay Older Invoice' : 'Pay invoice'}
		styles="w-[50%] mx-auto block"
		loading={$delayed}
	/>
</form>
