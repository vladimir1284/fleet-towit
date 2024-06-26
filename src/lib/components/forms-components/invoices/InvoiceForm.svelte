<script lang="ts">
	// @ts-nocheck
	import { z } from 'zod';
	import { createEventDispatcher } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte';
	import AmountInputComponent from '$lib/components/inputs/AmountInputComponent.svelte';
	import { reqInvoiceApi } from '@killbill/requests';
	import { AnnotationSolid } from 'flowbite-svelte-icons';
	// import { InvoiceItem } from '@killbill/api/models/InvoiceItem';
	import { onMount } from 'svelte';

	export let data;
	export let selectedInvoiceItem;
	export let maxAmount;
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
			if (form.valid) dispatch('formvalid', false);
		}
	});

	if (selectedInvoiceItem) {
		$form.amount = parseInt(maxAmount); //selectedInvoiceItem.amount;
		$form.comment = selectedInvoiceItem.comment;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		// const formData = new FormData(event.target);
		const { auditLogs, ...otherData } = selectedInvoiceItem;
		const invoiceItem: InvoiceItem = {
			...otherData,
			amount: $form.amount
		};
		try {
			const res = await reqInvoiceApi.adjustInvoiceItem({
				body: invoiceItem,
				invoiceId: selectedInvoiceItem.invoiceId,
				xKillbillCreatedBy: 'admin',
				requestedDate: new Date(),
				xKillbillReason: 'Contract-Timeline',
				xKillbillComment: $form.comment
			});
			if (res.status === 201) console.info('Adjusting invoice item successful:', res.data);
			else console.warn('Unexpected response status:', res.status);
		} catch (error) {
			if (error.response.status === 201) {
				console.info('Adjusting invoice item successful');
			} else console.error('Adjusting invoice item error:', error);
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
	<div class="sm:col-span-2">
		<AmountInputComponent
			formPointer="amount"
			{form}
			{errors}
			{constraints}
			placeholder="Item amount"
		/>
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
		placeholder={!selectedInvoiceItem ? 'Create invoice' : 'Adjust invoice'}
		styles="w-[50%] mx-auto block"
		loading={$delayed}
	/>
</form>
