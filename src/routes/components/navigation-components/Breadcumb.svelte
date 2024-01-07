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
		crumbs.unshift({ label: 'Home', href: '/' });
	}
</script>

<Breadcrumb aria-label="Default breadcrumb example">
	{#each crumbs as crumb, i}
		{#if crumb.label === 'Home'}
			<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		{:else}
			<BreadcrumbItem href={crumb.href}>
				{crumb.label}
			</BreadcrumbItem>
		{/if}
	{/each}
</Breadcrumb>
