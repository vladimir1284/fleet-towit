<script>
	// @ts-nocheck
	import axios from 'axios';
	import { getContext } from 'svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { saveToSessionStorage } from '$lib/store/context-store';
	import { Avatar, Dropdown, DropdownItem, Badge } from 'flowbite-svelte';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';

	/**
	 * @type {{ id: number; name: null; email: any; defaultTenantUser: { tenant: { name: any; }; }[]; image: any; }}
	 */
	export let userData;

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
		styles="flex text-black justify-between focus:ring-0 w-20 h-10"
		color="none"
		placeholder={userData && userData.name !== null ? userData.name : '-'}
	>
		<ChevronDownSolid class="w-3 h-3 ms-2 text-black dark:text-white" />
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
				{$currentTenant.name}<ChevronDownOutline
					class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline"
				/>
			</DropdownItem>
			<Dropdown class="w-44 z-20">
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
		<DropdownItem>Dashboard</DropdownItem>
		<DropdownItem href="/profile">Profile</DropdownItem>
		<DropdownItem on:click={handleSignOut}>Sign out</DropdownItem>
	</Dropdown>
	<Avatar
		class="hidden sm:flex"
		rounded
		src={userData.image
			? `https://minios3.crabdance.com/develop/users/${userData.id}/${userData.image}`
			: undefined}
	/>
</div>
