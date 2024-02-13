<script lang="ts">
	import { tenantActor } from '$lib/store/context-store';
	import { goto } from '$app/navigation';

	let currentTenant = tenantActor.getSnapshot().context.currentTenant;
	tenantActor.subscribe((state) => {
		currentTenant = state.context.currentTenant;
	});
	if (currentTenant === 'initial') {
		tenantActor.send({ type: 'tenant.init', value: 'currentTenant' });
	}

	//@ts-expect-error it throws that currentUserTenant is a string due to the initial data of currentTenant which is a string
	if (currentTenant.currentUserTenant.role === 'STAFF') {
		goto('/dashboard');
	}
</script>

<slot />
