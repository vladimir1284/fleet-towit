<script lang="ts">
	//@ts-nocheck
	import { getContext } from 'svelte';
	import { NavUl, NavLi } from 'flowbite-svelte';
	import UserNavLink from '$lib/components/navigation-components/role-navlinks/User-navLink.svelte';

	const currentTenant = getContext('currentTenant');
</script>

<NavUl>
	<NavLi class="cursor-pointer text-lg" href="/dashboard">Home</NavLi>
	{#if $currentTenant.currentUserTenant.role === 'ADMIN' || $currentTenant.currentUserTenant.role === 'OWNER'}
		<NavLi class="cursor-pointer text-lg" href="/admin/users/">Users</NavLi>
	{/if}
	{#if $currentTenant.isAdmin}
		<NavLi class="cursor-pointer text-lg" href="/admin/tenants">Tenants</NavLi>
	{:else}
		<UserNavLink navStyle="cursor-pointer text-lg" />
	{/if}
</NavUl>
