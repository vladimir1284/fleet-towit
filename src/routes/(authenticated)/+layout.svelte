<script lang="ts">
	//@ts-nocheck
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import { setContext } from 'svelte';
	import Header from '$lib/components/navigation-components/Header.svelte';

	export let data: LayoutData;
	const currentTenant = writable();
	setContext('currentTenant', currentTenant);

	$: if ($currentTenant == undefined) {
		if (data?.session?.user?.defaultTenantUser) {
			console.log('llegaste aqui')
			const currentUserTenant = data.session.user.defaultTenantUser;
			currentTenant.set({ ...currentUserTenant.tenant, currentUserTenant });
		} else {
			console.log('llegaste al esle ')
			goto('/signin');
		}

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
