<script lang="ts">
	//@ts-nocheck
	import Header from '$lib/components/navigation-components/Header.svelte';
	import { tenantActor } from '$lib/store/context-store';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	export let data: LayoutData;

	$: if (currentTenant === 'initial') {
		tenantActor.send({ type: 'tenant.init', value: 'currentTenant' });
	}
	
	$: tenantActor.subscribe((state) => {
		currentTenant = state.context.currentTenant;
	});

	$: currentTenant = tenantActor.getSnapshot().context.currentTenant;

	$: if (currentTenant !== 'initial') {
		if (!currentTenant) {
			goto('/select-tenant');
		}
		const actualTenant = data.session.user.tenantUsers.find(
			(user) => user.id === currentTenant.currentUserTenant.id
		);
		if (actualTenant.role !== currentTenant.currentUserTenant.role) {
			tenantActor.send({
				type: 'tenant.update',
				value: {
					...actualTenant.tenant,
					currentUserTenant: {
						id: actualTenant.id,
						tentantId: actualTenant.tentantId,
						role: actualTenant.role,
						userId: actualTenant.userId
					}
				}
			});
		}
	}

	$: if (!data.session.user?.tenantUsers.some((tenantUser: { tenantId: any }) => tenantUser.tenantId === currentTenant.id)) {
		goto('/select-tenant');
	}

</script>

<svelte:head>
	<title>FLEET-TOWIT</title>
</svelte:head>

<div class="flex flex-col justify-between mx-auto w-full">
	<header class="mb-20">
		<Header data={data.session.user} {currentTenant} />
	</header>
	<main class="flex justify-evenly flex-wrap w-full gap-2">
		<slot />
	</main>
</div>
