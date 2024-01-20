<script lang="ts">
	//@ts-nocheck
	import AdminNavLink from './role-navlinks/Admin-navLink.svelte';
	import UserNavLink from './role-navlinks/User-navLink.svelte';
	export let userData;
	console.log(userData.user)
</script>

{#if userData.companyUsers[0].role === 'ADMIN' || userData.companyUsers[0].role === 'OWNER'}
	<AdminNavLink/>
{:else}
	<UserNavLink/>
{/if}
