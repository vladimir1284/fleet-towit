<script lang="ts">
	//@ts-nocheck
	import { NavUl, NavLi, MegaMenu, Badge, Dropdown, DropdownItem } from 'flowbite-svelte';
	import UserNavLink from './role-navlinks/User-navLink.svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { tenantActor } from '$lib/store/context-store';
	export let data;
	export let currentTenant;
	console.log(currentTenant)

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
		}
		tenantActor.send({
			type: 'tenant.update',
			value: { ...tenantUser.tenant, currentUserTenant: tenantUser }
		});
		location.reload();
	}
</script>

<NavUl>
	<NavLi class="cursor-pointer" href="/dashboard">Home</NavLi>
	{#if currentTenant.currentUserTenant.role === 'ADMIN' || currentTenant.currentUserTenant.role === 'OWNER'}
		<NavLi class="cursor-pointer" href="/admin/users/">Users</NavLi>
	{/if}
	{#if data.tenantUsers.length}
		<NavLi class="cursor-pointer">
			{currentTenant.name}<ChevronDownOutline
				class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline"
			/>
		</NavLi>
		<Dropdown class="w-44 z-20">
			{#each data?.tenantUsers as tenantUser}
				<DropdownItem on:click={handleChangeUserTenant(tenantUser)}>
					{tenantUser.tenant.name} as {tenantUser.role}
					{#if tenantUser.is_default}
						<Badge color="blue" rounded class="px-2.5 py-0.5">Default</Badge>
					{/if}
				</DropdownItem>
			{/each}
		  </Dropdown>
	{/if}
	{#if currentTenant.isAdmin}
		<NavLi class="cursor-pointer" href="/admin/tenants">Tenants</NavLi>
	{:else}
		<UserNavLink />
	{/if}
</NavUl>