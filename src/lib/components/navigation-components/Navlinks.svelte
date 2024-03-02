<script lang="ts">
	//@ts-nocheck
	import { NavUl, NavLi } from 'flowbite-svelte';
	import UserNavLink from './role-navlinks/User-navLink.svelte';
	export let currentTenant;
</script>

<NavUl>
	<NavLi class="cursor-pointer text-lg" href="/dashboard">Home</NavLi>
	{#if currentTenant.currentUserTenant.role === 'ADMIN' || currentTenant.currentUserTenant.role === 'OWNER'}
		<NavLi class="cursor-pointer text-lg" href="/admin/users/">Users</NavLi>
	{/if}
	{#if currentTenant.isAdmin}
		<NavLi class="cursor-pointer text-lg" href="/admin/tenants">Tenants</NavLi>
	{:else}
		<UserNavLink navStyle="cursor-pointer text-lg" />
	{/if}
</NavUl>
