<script lang="ts">
	// @ts-nocheck
	import {
		Card,
		GradientButton,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Modal,
		Alert,
		Badge
	} from 'flowbite-svelte';
	import { TrashBinSolid, FileEditSolid, ArrowDownToBracketOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { PageData } from '../$types';
	import TollForm from '$lib/components/forms-components/tolls/TollForm.svelte';
	import DeleteTollForm from '$lib/components/forms-components/tolls/DeleteTollForm.svelte';
	import { createActor } from 'xstate';
	import axios from 'axios';
	import { tollsStateMachine } from '$lib/store/tolls-state-machine';

	export let data: PageData;

	let tolls = [];
	let showAlert = false;
	let createModal = false;
	let editModal = false;
	let deleteModal = false;
	let loading = false;
	let selectedId = '';
	let selectedToll = undefined;
	let message = '';

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

	function handleAlert(text) {
		showAlert = true;
		message = text;
		setTimeout(() => {
			showAlert = false;
		}, 4000);
	}

	async function loadData() {
		await axios
			.get(`/api/tenants/${$currentTenant.id}/contracts/tolls`)
			.then((response) => {
				tolls = response.data;
				tollActor.send({ type: 'success' });
			})
			.catch(() => {
				tollActor.send({ type: 'fail' });
			})
			.finally(() => {
				loading = false;
			});
	}

	async function handleCloseModal(event) {
		console.log('Detail: ', event.detail);
		tollActor.send({ type: 'ok' });
		createModal = event.detail;
		//await loadData();
		handleAlert('Toll created succesfully!');
	}

	async function handleEdit(toll) {
		selectedToll = toll;
		editModal = true;
	}

	async function handleCloseEditModal(event) {
		editModal = event.detail;
		handleAlert('Toll edited succesfully!');
		const response = await fetch(`/api/tenants/${$currentTenant.id}/contracts/tolls`);
		tolls = [...(await response.json())];
	}

	async function handleDelete(toll) {
		selectedToll = toll;
		deleteModal = true;
	}

	async function handleCloseDeleteModal(event) {
		deleteModal = event.detail;
		handleAlert('Toll deleted succesfully!');
		const response = await fetch(`/api/tenants/${$currentTenant.id}/contracts/tolls`);
		tolls = [...(await response.json())];
	}

	const tollActor = createActor(tollsStateMachine).start();
	tollActor.subscribe((state) => {
		console.log(state.value);
		if (state.value == 'Loading') {
			loadData();
		}
	});

	$: if (createModal == false) {
		tollActor.send({ type: 'onClose' });
	}

	$: console.log('ACTOR VALUE: ', $tollActor.value);
</script>

{#if $tollActor.value == 'Loading'}
	<p>Loading...</p>
{:else}
	{#if $tollActor.value == 'Create'}
		<Modal bind:open={createModal} outsideclose class="w-fit min-w-[25vw]">
			<TollForm {data} on:formvalid={handleCloseModal} />
		</Modal>		
	{/if}
	{#if $tollActor.value == 'Edit'}
		<Modal bind:open={editModal} class="w-fit min-w-[25vw]">
			<TollForm {data} {selectedToll} on:formvalid={handleCloseEditModal} />
		</Modal>
	{/if}
	{#if $tollActor.value == 'Edit'}
		<Modal size="xs" padding="md" bind:open={deleteModal}>
			<DeleteTollForm
			tollId={selectedToll.id}
			contractId={selectedToll.contractId}
			on:formvalid={handleCloseDeleteModal}
			/>
		</Modal>
	{/if}

	<Card size="xl" padding="md" class="flex w-full max-h-[33rem] md:w-auto mt-5">
		<Table>
			<caption
				class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
			>
				<GradientButton
					shadow
					color="blue"
					on:click={() => {
						tollActor.send({ type: 'onCreate' });
						createModal = true;
					}}
				>
					Create Toll
				</GradientButton>
			</caption>

			<TableHead>
				<TableHeadCell class="text-center">VEHICLE PLATE</TableHeadCell>
				<TableHeadCell class="text-center">CONTRACT ID</TableHeadCell>
				<TableHeadCell class="text-center">INVOICE NUMBER</TableHeadCell>
				<TableHeadCell class="text-center">CREATED DATE</TableHeadCell>
				<TableHeadCell class="text-center">INVOICE</TableHeadCell>
				<TableHeadCell class="text-center">STAGE</TableHeadCell>
				<TableHeadCell class="text-center"></TableHeadCell>
			</TableHead>
			<TableBody class="divide-y">
				{#each tolls as toll}
					<TableBodyRow>
						<TableBodyCell class="text-center">{toll.vehicle.plate}</TableBodyCell>
						<TableBodyCell class="text-center">{toll.contractId}</TableBodyCell>
						<TableBodyCell class="text-center">{toll.invoiceNumber}</TableBodyCell>
						<TableBodyCell class="text-center">{formatDate(toll.createDate)}</TableBodyCell>
						<TableBodyCell class="flex justify-center">
							{#if toll.invoice}
								<a
									download
									href={`https://minios3.crabdance.com/develop/contracts/${toll.contractId}/tolls/${toll.id}/${toll.invoice}`}
								>
									<ArrowDownToBracketOutline class="text-blue-700" />
								</a>
							{:else}
								-
							{/if}
						</TableBodyCell>
						<TableBodyCell class="text-center">
							<Badge color={toll.stage === 'PAID' ? 'green' : 'red'} rounded class="px-2.5 py-0.5"
								>{toll.stage}</Badge
							>
						</TableBodyCell>
						<TableBodyCell class="flex w-32 justify-between">
							<FileEditSolid class="text-gray-400" on:click={() => handleEdit(toll)} />
							<TrashBinSolid class="text-red-500" on:click={() => handleDelete(toll)} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</Card>

	{#if showAlert}
		<Alert class="fixed bottom-0 right-0 m-4 z-1" color="green" dismissable>
			{message}
		</Alert>
	{/if}
{/if}
