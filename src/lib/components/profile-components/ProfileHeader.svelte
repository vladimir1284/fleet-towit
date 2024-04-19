<script>
	// @ts-nocheck
	import axios from 'axios';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { signOut } from '@auth/sveltekit/client';
	import { ChevronLeftOutline } from 'flowbite-svelte-icons';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';
	import { Avatar, Dropdown, DropdownItem, Badge } from 'flowbite-svelte';

	/**
	 * @type {{ id: number; name: null; email: any; defaultTenantUser: { tenant: { name: any; }; }[]; image: any; }}
	 */
	export let userData;
	export let notifications = [1];

	const currentTenant = getContext('currentTenant');

	async function handleSignOut() {
		await signOut();
	}

	async function handleChangeUserTenant(tenantUser) {
		const formData = new FormData();
		formData.append('tenantUserId', tenantUser.id);
		formData.append('is_default', true);

		await axios
			.patch(`/api/tenants/${tenantUser.tenant.id}/users/${tenantUser.id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(() => {
				console.log('Changed tenant user');
				location.reload();
				currentTenant.set({
					...tenantUser.tenant,
					currentUserTenant: tenantUser
				});
			})
			.catch((error) => {
				console.error(`HTTP error! status: ${error.response.status}`);
				throw new Error(`HTTP error! status: ${error.response.status}`);
			});
	}
</script>

<div class="flex">
	<ButtonComponent
		pill
		styles="!p-1 focus:ring-0"
		color="light"
		id="avatar_with_name"
		placeholder={userData && userData.name !== null ? userData.name : userData.email}
	>
		<Avatar
			class="me-2"
			src={userData.image
				? `https://minios3.crabdance.com/develop/users/${userData.id}/${userData.image}`
				: undefined}
			dot={notifications.length > 0 ? { color: 'red' } : undefined}
		/>
	</ButtonComponent>

	<Dropdown>
		<div slot="header" class="px-4 py-2">
			<span class="block text-sm text-gray-900 dark:text-white">{userData.email}</span>
			<span class="block truncate text-xs font-small">
				{userData?.defaultTenantUser?.tenant.name}
			</span>
		</div>
		{#if userData.tenantUsers.length}
			<DropdownItem class="cursor-pointer">
				<ChevronLeftOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
				Current: {$currentTenant.name}
			</DropdownItem>
			<Dropdown placement="left-start" class="w-44 z-20">
				{#each userData?.tenantUsers as tenantUser}
					<DropdownItem on:click={handleChangeUserTenant(tenantUser)}>
						{tenantUser.tenant.name} as {tenantUser.role}
						{#if tenantUser.is_default}
							<Badge color="blue" rounded class="px-2.5 py-0.5">Default</Badge>
						{/if}
					</DropdownItem>
				{/each}
			</Dropdown>
		{/if}

		<DropdownItem class="flex flex-row ">
			Notifications
			{#if notifications.length > 0}
				<div class="flex relative">
					<div
						class="inline-flex relative -top-1 -start-0.5  w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
					/>
				</div>
			{/if}
		</DropdownItem>

		<DropdownItem
			on:click={() => {
				goto('/dashboard');
			}}
		>
			Dashboard
		</DropdownItem>

		<DropdownItem
			on:click={() => {
				goto('/profile');
			}}
		>
			Profile
		</DropdownItem>
		<DropdownItem slot="footer" on:click={handleSignOut}>Sign out</DropdownItem>
	</Dropdown>
</div>
