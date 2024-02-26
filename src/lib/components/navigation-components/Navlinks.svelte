<script lang="ts">
	//@ts-nocheck
	import { NavUl, NavLi, MegaMenu, Badge, Dropdown, DropdownItem } from 'flowbite-svelte';
	import UserNavLink from './role-navlinks/User-navLink.svelte';
	export let currentTenant;
</script>

<NavUl>
	<NavLi class="cursor-pointer" href="/dashboard">Home</NavLi>
	{#if currentTenant.currentUserTenant.role === 'ADMIN' || currentTenant.currentUserTenant.role === 'OWNER'}
		<NavLi class="cursor-pointer" href="/admin/users/">Users</NavLi>
	{/if}
	{#if currentTenant.isAdmin}
		<NavLi class="cursor-pointer" href="/admin/tenants">Tenants</NavLi>
	{:else}
		<UserNavLink />
	{/if}
</NavUl>