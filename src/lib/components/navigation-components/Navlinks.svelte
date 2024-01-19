<script lang="ts">
	import AdminNavLink from './role-navlinks/Admin-navLink.svelte';
	import UserNavLink from './role-navlinks/User-navLink.svelte';

	export let is_admin = false;
</script>

{#if !is_admin}
	<AdminNavLink/>
{:else}
	<UserNavLink/>
{/if}
