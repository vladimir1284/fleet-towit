<script lang="ts">
	//@ts-nocheck
	import {
		Card,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Modal,
		Heading
	} from 'flowbite-svelte';

	import { TrashBinSolid, FileEditSolid, EyeOutline, CloseOutline } from 'flowbite-svelte-icons';
	import { slide } from 'svelte/transition';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import TrackersForm from '$lib/components/forms-components/trackers/TrackersForm.svelte';
	import DeleteTrackersForm from '$lib/components/forms-components/trackers/DeleteTrackersForm.svelte';
	import PopupDisplayer from '$lib/components/forms-components/trackers/PopupDisplayer.svelte';
	import HeartBeatForm from '$lib/components/forms-components/trackers/HeartBeatForm.svelte';
	import DeleteHeartBeatForm from '$lib/components/forms-components/trackers/DeleteHeartBeatForm.svelte';

	import type { PageData } from '../$types';
	import { onMount, getContext } from 'svelte';
	import axios from 'axios';

	let map;
	const popup = L.popup();
	const markerLayer = L.layerGroup();
	let markersList = [];
	const initialView = L.latLng(39.8283, -98.5795);

	const initMap = (container: HTMLElement) => {
		map = L.map(container, { preferCanvas: true }).setView(initialView, 5);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
		}).addTo(map);
		map.on('click', onMapClick);
		markerLayer.addTo(map);
	};

	const onMapClick = (e) => {
		if (selectedTracker) {
			initialData = e.latlng;

			popup
				.setLatLng(e.latlng)
				.setContent(() => {
					const container = L.DomUtil.create('div');
					new PopupDisplayer({
						target: container,
						props: {
							data: e.latlng
						}
					}).$on('actioned', () => {
						createHeartBeat = selectedTracker;
					});
					return container;
				})
				.openOn(map);
		}
	};

	const createMarkers = (objectsArray) => {
		const newMarkers = [];
		objectsArray.forEach((obj) => {
			const marker = L.marker(L.latLng(obj.latitude, obj.longitude));
			newMarkers.push(marker);
		});
		return newMarkers;
	};

	$: {
		markerLayer.clearLayers();
		markersList.forEach((_marker) => {
			markerLayer.addLayer(_marker);
		});
	}

	$: {
		if (!selectedTracker) {
			const objects = [];
			vehicles.forEach((vehicle) => {
				if (vehicle.tracker?.heartBeats[0]) {
					const hb = vehicle.tracker?.heartBeats[0];
					objects.push(hb);
				}
			});
			markersList = createMarkers(objects);
			if (popup.isOpen()) {
				popup.close();
			}
		} else {
			const pos = selectedTracker.tracker?.heartBeats[0];
			if (pos) {
				markersList = createMarkers([selectedTracker.tracker.heartBeats[0]]);
				map.panTo(L.latLng(pos.latitude, pos.longitude));
				visibleHeartBeatId = pos.id;
			} else {
				markersList = [];
			}
		}
	}

	export let data: PageData;
	let vehicles = [];
	let createModal: any = false;
	let editModal: any = false;
	let deleteModal: any = false;
	let selectedTracker: any;
	let visibleHeartBeatId: number | undefined = undefined;
	let initialData: any;
	let createHeartBeat: any = false;
	let deleteHeartBeat: any = false;

	const currentTenant = getContext('currentTenant');
	const updateData = async () => {
		await axios.get(`/api/tenants/${$currentTenant.id}/vehicles`).then((resp) => {
			vehicles = resp.data;
		});
	};

	$: {
		if (selectedTracker) {
			selectedTracker = vehicles.find((v) => v.id === selectedTracker.id);
		}
	}

	onMount(async () => {
		await updateData();
	});

	const closeCreateModal = async (event) => {
		createModal = event.detail;
		await updateData();
	};
	const closeEditModal = async (event) => {
		editModal = event.detail;
		await updateData();
	};
	const closeDeleteModal = async (event) => {
		deleteModal = event.detail;
		await updateData();
	};

	const closeHeartBeatModal = async (event) => {
		createHeartBeat = event.detail;
		popup.close();
		await updateData();
	};
	const closeDeleteHeartBeatModal = async (event) => {
		deleteHeartBeat = event.detail;
		await updateData();
	};
</script>

<Modal bind:open={createModal} size="xs">
	<TrackersForm {data} selectedVehicle={createModal} on:formvalid={closeCreateModal} />
</Modal>
<Modal bind:open={editModal} size="xs">
	<TrackersForm
		{data}
		selectedVehicle={editModal}
		selectedTracker={editModal.tracker}
		on:formvalid={closeEditModal}
	/>
</Modal>
<Modal bind:open={deleteModal} size="xs">
	<DeleteTrackersForm vehicleId={deleteModal.id} on:formvalid={closeDeleteModal} />
</Modal>

<Modal bind:open={createHeartBeat} size="xs">
	<HeartBeatForm
		{data}
		selectedVehicle={createHeartBeat}
		{initialData}
		on:formvalid={closeHeartBeatModal}
	/>
</Modal>

<Modal bind:open={deleteHeartBeat} size="xs">
	<DeleteHeartBeatForm
		vehicleId={deleteHeartBeat.vehicleId}
		heartBeatId={deleteHeartBeat.heartBeatId}
		on:formvalid={closeDeleteHeartBeatModal}
	/>
</Modal>

<Card size="xl" padding="none" class="flex w-full md:w-[80%] mt-5">
	<div id="map" class="flex w-full h-[20rem] rounded-md z-0" use:initMap />
</Card>
<Card size="xl" padding="md" class="flex w-full max-w-[100%] md:w-auto md:max-w-[100%] mt-2">
	<div
		class="flex md:flex-row flex-col justify-center align-center gap-4 md:divide-x md:divide-y-0 divide-y"
	>
		<div class="flex overflow-y-auto h-[14rem]">
			<Table class="gap-2">
				<TableHead>
					<TableHeadCell class="text-center">VEHICLE</TableHeadCell>
					<TableHeadCell class="text-center">TRACKER NAME</TableHeadCell>
					<TableHeadCell class="text-center"></TableHeadCell>
				</TableHead>
				<TableBody>
					{#each vehicles as vehicle}
						<TableBodyRow>
							<TableBodyCell class="text-center"
								>{vehicle.type + '-' + vehicle.make + '-' + vehicle.model}</TableBodyCell
							>
							<TableBodyCell class="text-center">{vehicle.tracker?.name || '-'}</TableBodyCell>
							<TableBodyCell class="flex w-40 justify-between">
								{#if vehicle.tracker}
									{#if selectedTracker?.id === vehicle.id}
										<EyeOutline class="text-blue-400" />
									{:else}
										<EyeOutline
											class="text-gray-400"
											on:click={() => {
												selectedTracker = vehicle;
												const firstHeartBeat = vehicle.tracker?.heartBeats[0];
												if (firstHeartBeat) {
													markersList = createMarkers([firstHeartBeat]);
													visibleHeartBeatId = firstHeartBeat.id;
												} else {
													markersList = [];
												}
											}}
										/>
									{/if}
									<FileEditSolid
										class="text-gray-400"
										on:click={() => {
											selectedTracker = false;
											editModal = vehicle;
										}}
									/>
									<TrashBinSolid
										class="text-red-500"
										on:click={() => {
											selectedTracker = false;
											deleteModal = vehicle;
										}}
									/>
								{:else}
									<Button
										color="blue"
										on:click={() => {
											selectedTracker = false;
											createModal = vehicle;
										}}>Add Tracker</Button
									>
								{/if}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
		{#if selectedTracker}
			<div
				class="flex justify-start align-center gap-2 flex-col overflow-x-auto"
				transition:slide={{ duration: 300, axis: 'x' }}
			>
				<div class="flex flex-row ml-5 align-center">
					<Heading tag="h4">{selectedTracker.tracker.name}</Heading>
					<Button
						outline
						class="w-10 h-10"
						color="red"
						on:click={() => {
							selectedTracker = false;
						}}
					>
						<CloseOutline />
					</Button>
				</div>
				<div class="flex overflow-y-auto h-[9rem] ml-5">
					{#if selectedTracker.tracker.heartBeats.length}
						<Table>
							<TableHead>
								<TableHeadCell class="text-center">TIMESTAMP</TableHeadCell>
								<TableHeadCell class="text-center">LAT</TableHeadCell>
								<TableHeadCell class="text-center">LONG</TableHeadCell>
								<TableHeadCell class="text-center"></TableHeadCell>
							</TableHead>
							<TableBody>
								{#each selectedTracker.tracker.heartBeats as heartBeat}
									<TableBodyRow>
										<TableBodyCell>{heartBeat.timeStamp}</TableBodyCell>
										<TableBodyCell>{heartBeat.latitude}</TableBodyCell>
										<TableBodyCell>{heartBeat.longitude}</TableBodyCell>
										<TableBodyCell class="flex w-[fit-content] justify-between">
											{#if heartBeat.id === visibleHeartBeatId}
												<EyeOutline
													class="text-blue-400 m-2"
													on:click={() => {
														map.panTo(L.latLng(heartBeat.latitude, heartBeat.longitude));
													}}
												/>
											{:else}
												<EyeOutline
													class="text-gray-400 m-2"
													on:click={() => {
														visibleHeartBeatId = heartBeat.id;
														markersList = createMarkers([heartBeat]);
														map.panTo(L.latLng(heartBeat.latitude, heartBeat.longitude));
													}}
												/>
											{/if}
											<TrashBinSolid
												class="text-red-500 m-2"
												on:click={() => {
													deleteHeartBeat = {
														vehicleId: selectedTracker.id,
														heartBeatId: heartBeat.id
													};
												}}
											/>
										</TableBodyCell>
									</TableBodyRow>
								{/each}
							</TableBody>
						</Table>
					{:else}
						No positions yet
					{/if}
				</div>
				<small class="text-center md:min-w-[max-content] ml-5"
					>Click on the map to add new position</small
				>
			</div>
		{/if}
	</div>
</Card>
