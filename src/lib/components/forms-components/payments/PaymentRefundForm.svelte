<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { createEventDispatcher } from 'svelte';
	import { loadFromSessionStorage } from '$lib/store/context-store';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import { reqPaymentApi } from '$lib/killbill/requests';
	import { AnnotationSolid } from 'flowbite-svelte-icons';

	export let data;
	export let selectedPayment: any = null;
	export let maxAmount = 999999999999; // aun no lo tengo
	export let minAmount = 0;
	const dispatch = createEventDispatcher();

	const fixSchema = z.object({
		amount: z
			.number()
			.or(z.string())
			.refine(
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

	const { form, errors, constraints, enhance, delayed } = superForm(data, {
		SPA: true,
		validators: fixSchema,
		onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
	});

	if (selectedPayment) {
		$form.amount = 200;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const { auditLogs, ...otherData } = selectedPayment;
		const payment: PaymentTransaction = {
			amount: $form.amount
		};

		try {
			const res = reqPaymentApi.refundPayment({
				body: payment,
				paymentId: selectedPayment.paymentId,
				xKillbillCreatedBy: 'admin',
				xKillbillReason: 'Contract-Timeline',
				xKillbillComment: $form.comment
			});
			if (res.status === 201) console.info('Refund payment successful:', res.data);
			else console.warn('Unexpected response status:', res.status);
		} catch (error) {
			if (error.response.status === 201) {
				console.info('Refund payment successful');
			} else console.error('Refund payment error:', error);
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
	<SubmitButtonComponent placeholder="Refund" styles="w-[50%] mx-auto block" loading={$delayed} />
</form>