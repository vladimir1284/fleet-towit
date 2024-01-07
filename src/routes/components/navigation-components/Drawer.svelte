<script>
	import { page } from '$app/stores';
	import { Button, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;
	let showSidebar = true;
</script>

{#if showSidebar}
	<div>
		<Sidebar {activeUrl}>
			<SidebarWrapper class="bg-white">
				<SidebarGroup>
					<SidebarItem label="Dashboard" href="/">
						<svelte:fragment slot="icon">
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Inspections" href="/inspections">
						<svelte:fragment slot="icon">
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 20"
							>
								<path
									d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v2H7V2ZM5 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 4H8a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2Zm0-4H8a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Maintenance" href="/maintenance">
						<svelte:fragment slot="icon">
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Assets" href="/assets">
						<svelte:fragment slot="icon">
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 19"
							>
								<path
									d="M10.013 4.175 5.006 7.369l5.007 3.194-5.007 3.193L0 10.545l5.006-3.193L0 4.175 5.006.981l5.007 3.194ZM4.981 15.806l5.006-3.193 5.006 3.193L9.987 19l-5.006-3.194Z"
								/>
								<path
									d="m10.013 10.545 5.006-3.194-5.006-3.176 4.98-3.194L20 4.175l-5.007 3.194L20 10.562l-5.007 3.194-4.98-3.211Z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Reminders" href="/reminders">
						<svelte:fragment slot="icon">
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 14 20"
							>
								<path
									d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Reports" href="/reports">
						<svelte:fragment slot="icon">
							<svg
								class="w-6 h-6 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 18"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
								/>
							</svg>
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
		<Button
			pill={true}
			color="blue"
			class="w-[1%] h-[6%]"
			on:click={() => {
				showSidebar = !showSidebar;
			}}
		>
			X
		</Button>
	</div>
{:else}
	<span id="corner-button">
		<Button
			pill={true}
			color="blue"
			class="w-[0.5%] h-[5%]"
			on:click={() => {
				showSidebar = !showSidebar;
			}}
		>
			<ArrowRightOutline class="w-4 h-4" />
		</Button>
	</span>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-height: 100vh;
		min-height: 92vh;
		padding-bottom: 5px;
		width: fit-content;
		align-items: center;
		background-color: white;
	}

	#corner-button {
		position: absolute;
		bottom: 1%;
		left: 1%;
	}
</style>
