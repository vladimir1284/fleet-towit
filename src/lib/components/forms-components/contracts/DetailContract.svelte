<script async lang="ts">
	//@ts-nocheck
	import axios from 'axios';
	import {
		TruckOutline,
		DollarOutline,
		UserOutline,
		ClipboardListOutline
	} from 'flowbite-svelte-icons';
	import { onMount, getContext } from 'svelte';
	import { Modal, Badge, Label } from 'flowbite-svelte';
	import { FeatureDefault, FeatureItem } from 'flowbite-svelte-blocks';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';
	import ClientForm from '$lib/components/forms-components/clients/ClientForm.svelte';
	import UpdateStage from '$lib/components/forms-components/contracts/UpdateStage.svelte';
	import ContractTimeline from '$lib/components/forms-components/contracts/ContractTimeline.svelte';
	import PaymentInvoiceForm from '$lib/components/forms-components/payments/PaymentInvoiceForm.svelte';

	export let data: any;
	export let selectedContract: Array<object> = [];
	export let contractStagesList: Array<object> = [];
	export let contractInvoicesList: Array<object> = [];
	export let contractPaymentsList: Array<object> = [];
	export let contractNotesList: Array<object> = [];

	const currentTenant = getContext('currentTenant');
	let firstFilter: boolean = true;
	let stagesFilter: boolean = true;
	let notesFilter: boolean = true;
	let invoicesFilter: boolean = true;
	let paymentsFilter: boolean = true;

	let timelineData = [];
	let editClient: boolean = false;
	let updateStage: boolean = false;
	let makePaymentModal: boolean = false;

	const reListTimeline = () => {
		timelineData = [];

		if (paymentsFilter) timelineData = [...timelineData, ...contractPaymentsList];
		if (invoicesFilter) timelineData = [...timelineData, ...contractInvoicesList];
		if (notesFilter) timelineData = [...timelineData, ...contractNotesList];
		if (stagesFilter) timelineData = [...timelineData, ...contractStagesList];

		
		// ordenar el array timelineData según su fecha
		timelineData.sort((a, b) => new Date(b.date || b.createdDate) - new Date(a.date || b.createdDate));
	};

	async function updateContractData() {
		await axios
			.all([
				axios.get(`/api/tenants/${$currentTenant.id}/contracts/${selectedContract.id}`),
				axios.get(`/api/tenants/${$currentTenant.id}/contracts/${selectedContract.id}/stage`),
				axios.get(`/api/tenants/${$currentTenant.id}/contracts/${selectedContract.id}/notes`)
			])
			.then(
				axios.spread((contractDataResponse, contractStagesResponse, contractNotesResponse) => {
					selectedContract = contractDataResponse.data;
					contractStagesList = contractStagesResponse.data;
					contractNotesList = contractNotesResponse.data;
				})
			)
			.catch((error) => {
				console.error('Error fetching contract data:', error);
			});
	}

	async function handleCloseEditClientModal(event) {
		updateContractData();
		editClient = event.detail;
	}

	async function handleCloseUpdateStageModal(event) {
		updateContractData();
		updateStage = event.detail;
	}

	onMount(async () => {
		reListTimeline();
	});
</script>

<Modal bind:open={editClient} size="xs" title="Update Client">
	<ClientForm
		data={data}
		selectedClient={selectedContract.client}
		on:formvalid={handleCloseEditClientModal}
	/>
</Modal>
<Modal bind:open={updateStage} title="Update Stage" size="xs">
	<UpdateStage
		data={data}
		{selectedContract}
		on:formvalid={handleCloseUpdateStageModal}
	/>
</Modal>
<Modal bind:open={makePaymentModal} size="xs" title="Pay Last Pending Invoie">
	<PaymentInvoiceForm data={data} on:formvalid={reListTimeline} />
</Modal>

<div id="contractDetails" class="w-full">
	<div class="flex flex-row mb-5">
		<div class="min-w-[75%]">
			<ButtonComponent
				disabled
				color="green"
				placeholder="Pay Last Pending Invoice"
				onClick={() => {
					makePaymentModal = true;
				}}
			/>
		</div>
		<div class="min-w-[25%] flex justify-center pt-3">
			<ButtonComponent
				color={stagesFilter ? 'purple' : 'light'}
				size="xs"
				styles="py-1 mx-1"
				outline
				pill
				placeholder="stage"
				onClick={() => {
					stagesFilter = !stagesFilter;
					reListTimeline();
				}}
			/>

			<ButtonComponent
				color={notesFilter ? 'green' : 'light'}
				size="xs"
				styles="py-1 mx-1"
				outline
				pill
				placeholder="notes"
				onClick={() => {
					notesFilter = !notesFilter;
					reListTimeline();
				}}
			/>

			<ButtonComponent
				color={invoicesFilter ? 'blue' : 'light'}
				size="xs"
				styles="py-1 mx-1"
				outline
				pill
				placeholder="invoices"
				onClick={() => {
					invoicesFilter = !invoicesFilter;
					reListTimeline();
				}}
			/>

			<ButtonComponent
				color={paymentsFilter ? 'red' : 'light'}
				size="xs"
				styles="py-1 mx-1"
				outline
				pill
				placeholder="payments"
				onClick={() => {
					paymentsFilter = !paymentsFilter;
					reListTimeline();
				}}
			/>
		</div>
	</div>
	<div class="flex flex-row justify-between h-[35em] overflow-y-auto">
		<div class="flex-row p-1 mb-8 lg:mb-12">
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
							<Label class="my-3 w-max">Phone number: {selectedContract.client.phoneNumber}</Label>
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
							<Label class="my-3 w-max">Plate: {selectedContract.vehicle.plates[0].plate}</Label>
							<Label class="my-3 w-max">Make: {selectedContract.vehicle.make}</Label>
							<Label class="my-3 w-max">Type: {selectedContract.vehicle.type}</Label>
							<Label class="my-3 w-max">Vin: {selectedContract.vehicle.vin}</Label>
							<Label class="my-3 w-max">Nickname: {selectedContract.vehicle.nickname}</Label>
							<Label class="my-3 w-max">Spare tires: {selectedContract.vehicle.spare_tires}</Label>
						</svelte:fragment>
					</FeatureItem>
				</FeatureDefault>
			</div>
		</div>
		<div class="grow overflow-y-scroll h-full w-auto px-3.5 pt-2">
			<ContractTimeline sessionData={data} {timelineData} on:reListTimeline={reListTimeline} />
		</div>
	</div>
</div>