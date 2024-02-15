<script>
	// @ts-nocheck

	import { Avatar, Dropdown, DropdownItem, Badge } from 'flowbite-svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import ButtonComponent from '../buttons/ButtonComponent.svelte';

	/**
	 * @type {{ id: string; name: null; email: any; defaultTenantUser: { tenant: { name: any; }; }[]; image: any; }}
	 */
	export let userData;
	export let currentTenant;

	console.log(userData);
	async function handleSignOut() {
		await signOut();
	}

	async function handleChangeUserTenant(tenantUser) {
		const headers = { 'X-User-Tenant': currentTenant.currentUserTenant.id };
		const formData = new FormData();
		formData.append('tenantUserId', tenantUser.id);
		formData.append('is_default', true);
		const response = await fetch(`/api/tenants/${tenantUser.tenant.id}/users/${tenantUser.id}`, {
			method: 'PATCH',
			headers: headers,
			body: formData
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			console.log('Form submitted successfully');
			location.reload();
			tenantActor.send({
				type: 'tenant.update',
				value: { ...tenantUser.tenant, currentUserTenant: tenantUser }
			});
		}
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
				{currentTenant.name}<ChevronDownOutline
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
		src="https://minios3.crabdance.com/develop/users/{userData.id}/{userData.image}"
		rounded
	/>
</div>
