<script lang="ts">
	//@ts-nocheck
	import { NavUl, NavLi, MegaMenu } from 'flowbite-svelte';
	import UserNavLink from './role-navlinks/User-navLink.svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import ButtonComponent from '../buttons/ButtonComponent.svelte';
	import { tenantActor } from '$lib/store/context-store';
	export let data;
	export let currentTenant;

	async function handleChangeUserTenant(tenantUser) {
		tenantActor.send({ type: 'tenant.update', value: { ...tenantUser.tenant, currentUserTenant: tenantUser} });	
	};
</script>

<NavUl>
	<NavLi class="cursor-pointer" href="/dashboard">Home</NavLi>
	{#if currentTenant.currentUserTenant.role === 'ADMIN' || currentTenant.currentUserTenant.role === 'OWNER'}
		<NavLi class="cursor-pointer" href="/admin/users/">Users</NavLi>
	{/if}
	{#if data.tenantUsers.length}
		<NavLi class="cursor-pointer">
			Change tenant<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
	  	</NavLi>
		<MegaMenu items={data?.tenantUsers} let:item>
			<ButtonComponent outline styles="m-2" placeholder={item.tenant.name} onClick={() => handleChangeUserTenant(item)}/>
		</MegaMenu>
	{/if}
	{#if currentTenant.isAdmin}
		<NavLi class="cursor-pointer" href="/admin/tenants">Tenants</NavLi>
	{:else}
		<UserNavLink />
	{/if}
</NavUl>
