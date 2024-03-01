<script lang="ts">
	//@ts-nocheck
	import { goto } from '$app/navigation';
	import { Card, Button } from 'flowbite-svelte';
	import { tenantActor } from '$lib/store/context-store';

	import bcrypt from 'bcryptjs';
	import { USER_TENANT_HEADER } from '$lib/shared';

	import type { PageData } from './$types';
	export let data: PageData;
	import { onMount } from 'svelte';

	onMount(() => {
		if (data.session?.user.defaultTenantUser) {
			const currentUserTenant = data.session.user.defaultTenantUser;
			tenantActor.send({
				type: 'tenant.update',
				value: { ...currentUserTenant.tenant, currentUserTenant }
			});
			goto('/dashboard');
		}
	});

	async function handleSelectTenant(tenant) {
		const currentUserTenant = data.session.user.tenantUsers.find(
			(tenantUser) => tenantUser.tenantId == tenant.id
		);

		// Set X-User-Tenant cookie on browser level.
		/*
		const salt = bcrypt.genSaltSync(10);
		const currentUserTenantHash = await bcrypt.hash(currentUserTenant.id, salt);
		document.cookie = `${USER_TENANT_HEADER}=${currentUserTenantHash};`;
		*/

		tenantActor.send({ type: 'tenant.update', value: { ...tenant, currentUserTenant } });
		await goto('/dashboard');
	}
</script>

{#if data?.session}
	<div class="flex flex-wrap gap-2 justify-center">
		{#each data?.aviableTenants as tenant}
			<Card padding="sm" size="xl" class="flex flex-col justify-evenly min-w-[300px] min-h-[200px]">
				<div class="flex flex-col items-center pb-4">
					<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{tenant.name}</h5>
					<div class="flex mt-4 space-x-3 rtl:space-x-reverse lg:mt-6">
						<Button on:click={() => handleSelectTenant(tenant)}>Enter</Button>
					</div>
				</div>
			</Card>
		{/each}
	</div>
{/if}
