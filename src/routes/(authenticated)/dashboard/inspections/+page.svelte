<script>
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';

	const cards = [
		{
			path: 'forms',
			title: 'Manage Forms'
		},
		{
			path: 'register',
			title: 'Register Inspections'
		}
	];
</script>

<section class="space-y-4">
	{#each cards as card}
		<Card href={`${$page.url.pathname}/${card.path}`}>
			<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
		</Card>
	{/each}
</section>
