<script lang="ts">
	// @ts-nocheck
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	const currentTenant = getContext('currentTenant');
	console.log($currentTenant);

	if ($currentTenant.currentUserTenant.role === 'STAFF') {
		goto('/dashboard');
	}
</script>

<slot />
