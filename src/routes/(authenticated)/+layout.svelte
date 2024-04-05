<script lang="ts">
	//@ts-nocheck
	import Header from '$lib/components/navigation-components/Header.svelte';
	import { loadFromSessionStorage } from '$lib/store/context-store';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	export let data: LayoutData;

	const currentTenant = writable();
	setContext('currentTenant', currentTenant);
	currentTenant.set(loadFromSessionStorage('currentTenant'));

	$: if ($currentTenant === undefined) {
		goto('/select-tenant');
	} else if (
		!data.session.user?.tenantUsers.some(
	 		(tenantUser: { tenantId: any }) => tenantUser.tenantId == $currentTenant.id
		)
	) {
		goto('/select-tenant');
	}
</script>

<svelte:head>
	<title>FLEET-TOWIT</title>
</svelte:head>

<div class="flex flex-col mx-auto w-full min-h-screen max-h-screen">
	<header class="flex">
		<Header data={data.session.user} {$currentTenant} />
	</header>
	<main class="flex justify-evenly flex-wrap w-full h- gap-2">
		<slot />
	</main>
</div>
