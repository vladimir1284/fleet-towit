<script async lang="ts">
	//@ts-nocheck
	import { tenantActor } from '$lib/store/context-store';
	import { Badge, Label, GradientButton } from 'flowbite-svelte';
	import { FeatureDefault, FeatureItem } from 'flowbite-svelte-blocks';
	import {
		TruckOutline,
		DollarOutline,
		UserOutline,
		ClipboardListOutline
	} from 'flowbite-svelte-icons';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';
	import ClientForm from '../clients/ClientForm.svelte';
	import UpdateStage from './UpdateStage.svelte';
	import ContractTimeline from './ContractTimeline.svelte';

	export let data: any;
	export let selectedContract: any = undefined;
	export let contractStagesList: any = undefined;
	export let contractInvoicesList: any = undefined;
	export let contractPaymentsList: any = undefined;
	let TimelineData = [];
	let loading = false;
	let editClient: boolean = false;
	let updateStage: boolean = false;

	const relistTimeline = (data: Array) => {
		// ordenar el array TimelineData según su fecha
		// console.log(contractStagesList);
		// console.log(contractInvoicesList);
		// console.log(contractPaymentsList);

		TimelineData = [...contractStagesList, ...contractInvoicesList, ...contractPaymentsList];
		TimelineData.sort((a, b) => new Date(b.date) - new Date(a.date));
	};
	async function updateContractData() {
		const currentTenant = tenantActor.getSnapshot().context.currentTenant;
		const headers = { 'X-User-Tenant': currentTenant.currentUserTenant.id };
		const contractData = await fetch(
			`/api/tenants/${currentTenant.id}/contracts/${selectedContract.id}`,
			{ headers }
		);
		const contractStages = await fetch(
			`/api/tenants/${currentTenant.id}/contracts/${selectedContract.id}/stage`
		);
		selectedContract = await contractData.json();
		contractStagesList = await contractStages.json();
		relistTimeline();
	}

	async function handleCloseEditModal(event: any) {
		updateContractData();
		editClient = event.detail;
	}

	async function handleCloseUpdateModal(event: any) {
		updateContractData();
		updateStage = event.detail;
	}

	relistTimeline();
</script>

{#if editClient}
	<ClientForm
		data={data?.clientForm}
		selectedClient={selectedContract.client}
		on:formvalid={handleCloseEditModal}
	/>
{:else if updateStage}
	<UpdateStage data={data?.stageForm} {selectedContract} on:formvalid={handleCloseUpdateModal} />
{:else}
	<div>
		<div class="flex flex-row mb-5">
			<div class="min-w-[77%]">
				<GradientButton color="green">Make New Payment</GradientButton>
			</div>
			<div class="pl-5 hidden lg:block">
				<Badge class="my-1" color="gray">payments</Badge>
				<Badge class="my-1" color="gray">invoices</Badge>
			</div>
		</div>
		<div class="flex flex-row justify-between h-[40em] overflow-y-auto">
			<div class="min-w-[75%] p-1 mb-8 lg:mb-12">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FeatureDefault>
						<FeatureItem>
							<svelte:fragment slot="icon">
								<ClipboardListOutline class="text-primary-600 dark:text-primary-300" />
							</svelte:fragment>
							<svelte:fragment slot="h3">Status</svelte:fragment>

							<svelte:fragment slot="paragraph">
								<Badge class="my-1">{selectedContract?.stage.stage}</Badge>
								<Label class="my-3">Reason: {selectedContract?.stage.reason ?? '-'}</Label>
								<Label class="my-3">Comments: {selectedContract?.stage.comments ?? '-'}</Label>
								<ButtonComponent
									styles="my-2 w-max"
									placeholder="Update contract stage"
									onClick={() => {
										updateStage = true;
									}}
								/>
							</svelte:fragment>
						</FeatureItem>
					</FeatureDefault>

					<FeatureDefault>
						<FeatureItem>
							<svelte:fragment slot="icon">
								<UserOutline class="text-primary-600 dark:text-primary-300" />
							</svelte:fragment>

							<svelte:fragment slot="h3">Client</svelte:fragment>
							<svelte:fragment slot="paragraph">
								<Label class="my-3 w-max">Name: {selectedContract.client.name}</Label>
								<Label class="my-3 w-max">Email: {selectedContract.client.email}</Label>
								<Label class="my-3 w-max">Phone number: {selectedContract.client.phoneNumber}</Label
								>
								<ButtonComponent
									styles="my-3 w-max"
									placeholder="Update client information"
									onClick={() => {
										editClient = true;
									}}
								/>
							</svelte:fragment>
						</FeatureItem>
					</FeatureDefault>

					<FeatureDefault>
						<FeatureItem>
							<svelte:fragment slot="icon">
								<DollarOutline class="text-primary-600 dark:text-primary-300" />
							</svelte:fragment>

							<svelte:fragment slot="h3">Plan</svelte:fragment>
							<svelte:fragment slot="paragraph">
								<Label class="my-3 w-max">Name: {selectedContract.rentalPlan.name}</Label>
								<Label class="my-3 w-max">Amount: ${selectedContract.rentalPlan.amount}</Label>
								<Label class="my-3 w-max"
									>Periodicity: {selectedContract.rentalPlan.periodicity}</Label
								>
							</svelte:fragment>
						</FeatureItem>
					</FeatureDefault>

					<FeatureDefault>
						<FeatureItem>
							<svelte:fragment slot="icon">
								<TruckOutline class="text-primary-600 dark:text-primary-300" />
							</svelte:fragment>

							<svelte:fragment slot="h3">Vehicle</svelte:fragment>
							<svelte:fragment slot="paragraph">
								<Label class="my-3 w-max">Plate: {selectedContract.vehicle.plate}</Label>
								<Label class="my-3 w-max">Make: {selectedContract.vehicle.make}</Label>
								<Label class="my-3 w-max">Type: {selectedContract.vehicle.type}</Label>
								<Label class="my-3 w-max">Vin: {selectedContract.vehicle.vin}</Label>
								<Label class="my-3 w-max">Nickname: {selectedContract.vehicle.nickname}</Label>
								<Label class="my-3 w-max">Spare tires: {selectedContract.vehicle.spare_tires}</Label
								>
							</svelte:fragment>
						</FeatureItem>
					</FeatureDefault>
				</div>
			</div>
			<div class="overflow-y-scroll h-[100%] hidden lg:block">
				<ContractTimeline {TimelineData} />
			</div>
		</div>
	</div>
	<!-- {#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if} -->
{/if}
