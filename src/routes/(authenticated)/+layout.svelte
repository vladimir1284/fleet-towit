<script lang="ts">
	import Header from '$lib/components/navigation-components/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>FLEET-TOWIT</title>
</svelte:head>

<div class="flex flex-col justify-between mx-auto w-full">
	<header class="mb-20">
		<Header data={data.session.user}/>
	</header>
	<main class="flex justify-evenly flex-wrap w-full gap-2 ">
		<slot />
	</main>
</div>
