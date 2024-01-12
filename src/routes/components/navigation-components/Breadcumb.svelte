<script>
	import { page } from '$app/stores';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	/**
	 * @type {any[]}
	 */
	let crumbs = [];

	$: {
		const tokens = $page.url.pathname.split('/').filter((t) => t !== '');
		let tokenPath = '';
		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			return { label: t, href: tokenPath };
		});
		crumbs = crumbs.slice(1);
		crumbs.unshift({ label: 'Dashboard', href: '/dashboard' });
	}
</script>

<Breadcrumb >
	{#each crumbs as crumb, i}
		{#if crumb.label === 'Dashboard'}
			{#if crumbs.length <= 1}
				<BreadcrumbItem href="/dashboard" home>Welcome back!</BreadcrumbItem>
			{:else}
				<BreadcrumbItem href="/dashboard" home>Dashboard</BreadcrumbItem>
			{/if}
		{:else}
			<BreadcrumbItem href={crumb.href}>
				{crumb.label}
			</BreadcrumbItem>
		{/if}
	{/each}
</Breadcrumb>
