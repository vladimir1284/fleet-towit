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

<Breadcrumb aria-label="Default breadcrumb example">
	{#each crumbs as crumb, i}
		{#if crumb.label === 'Dashboard'}
			<BreadcrumbItem href="/dashboard" home>Welcome back!</BreadcrumbItem>
		{:else}
			<BreadcrumbItem href={crumb.href}>
				{crumb.label}
			</BreadcrumbItem>
		{/if}
	{/each}
</Breadcrumb>
