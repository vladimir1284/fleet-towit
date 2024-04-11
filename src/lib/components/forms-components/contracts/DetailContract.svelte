<script async lang="ts">
	//@ts-nocheck
	import {
		TruckOutline,
		DollarOutline,
		UserOutline,
		ClipboardListOutline
	} from 'flowbite-svelte-icons';
	import { getContext } from 'svelte';
	import UpdateStage from './UpdateStage.svelte';
	import { FeatureDefault, FeatureItem } from 'flowbite-svelte-blocks';
	import { Badge, Label, Timeline, TimelineItem } from 'flowbite-svelte';
	import ClientForm from '$lib/components/forms-components/clients/ClientForm.svelte';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';

	export let data: any;
	export let selectedContract: any = undefined;
	export let contractStagesList: any = undefined;

	let editClient: boolean = false;
	let updateStage: boolean = false;
	const currentTenant = getContext('currentTenant');

	const formatDate = (date: Date | string) => {
		if (!date) {
			return undefined;
		}
		return new Date(date).toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	async function updateContractData() {
		await axios
			.get(`/api/tenants/${$currentTenant.id}/contracts/${selectedContract.id}`)
			.then((contractDataResponse) => {
				return axios.get(
					`/api/tenants/${$currentTenant.id}/contracts/${selectedContract.id}/stage`
				);
			})
			.then((contractStagesResponse) => {
				selectedContract = contractDataResponse.data;
				contractStagesList = contractStagesResponse.data;
			})
			.catch((error) => {
				console.error('Error fetching contract data:', error);
			});
	}

	async function handleCloseEditModal(event: any) {
		updateContractData();
		editClient = event.detail;
	}

	async function handleCloseUpdateModal(event: any) {
		updateContractData();
		updateStage = event.detail;
	}
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
	<div class="flex flex-row justify-between">
		<div class="grid min-w-[75%] mb-8 lg:mb-12 lg:grid-cols-2">
			<FeatureDefault class="my-2">
				<FeatureItem>
					<svelte:fragment slot="icon">
						<ClipboardListOutline class="text-primary-600 dark:text-primary-300" />
					</svelte:fragment>

					<svelte:fragment slot="h3">Status</svelte:fragment>
					<svelte:fragment slot="paragraph">
						<Badge class="my-1">{selectedContract?.stage.stage}</Badge>
						<Label class="my-4">Reason: {selectedContract?.stage.reason ?? '-'}</Label>
						<Label class="my-4">Comments: {selectedContract?.stage.comments ?? '-'}</Label>
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

			<FeatureDefault class="my-2">
				<FeatureItem>
					<svelte:fragment slot="icon">
						<UserOutline class="text-primary-600 dark:text-primary-300" />
					</svelte:fragment>

					<svelte:fragment slot="h3">Client</svelte:fragment>
					<svelte:fragment slot="paragraph">
						<Label class="my-4 w-max">Name: {selectedContract.client.name}</Label>
						<Label class="my-4 w-max">Email: {selectedContract.client.email}</Label>
						<Label class="my-4 w-max">Phone number: {selectedContract.client.phoneNumber}</Label>
						<ButtonComponent
							styles="my-2 w-max"
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
						<Label class="my-4 w-max">Name: {selectedContract.rentalPlan.name}</Label>
						<Label class="my-4 w-max">Amount: ${selectedContract.rentalPlan.amount}</Label>
						<Label class="my-4 w-max">Periodicity: {selectedContract.rentalPlan.periodicity}</Label>
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
						<Label class="my-4 w-max">Plate: {selectedContract.vehicle.plates[0].plate}</Label>
						<Label class="my-4 w-max">Make: {selectedContract.vehicle.make}</Label>
						<Label class="my-4 w-max">Type: {selectedContract.vehicle.type}</Label>
						<Label class="my-4 w-max">Vin: {selectedContract.vehicle.vin}</Label>
						<Label class="my-4 w-max">Nickname: {selectedContract.vehicle.nickname}</Label>
						<Label class="my-4 w-max">Spare tires: {selectedContract.vehicle.spare_tires}</Label>
					</svelte:fragment>
				</FeatureItem>
			</FeatureDefault>
		</div>

		<Timeline>
			{#each contractStagesList as stage}
				<TimelineItem title={stage.stage} date={formatDate(stage.date)}>
					<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						Reason: {stage.reason || 'No reason provided'} <br />
						Comment: {stage.comments || 'No comment provided'}
					</p>
				</TimelineItem>
			{/each}
		</Timeline>
	</div>
{/if}
