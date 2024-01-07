<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import './styles.css';
	import Drawer from './components/navigation-components/Drawer.svelte';
</script>
<svelte:head>
	<title>FLEET-TOWIT</title>
</svelte:head>
<header >
	<Header/>
</header>

<div class="flex mx-auto w-full gap-2">
	<Drawer />
	<main class="w-full mx-auto h-full gap-2" >
		<slot />
	</main>
</div>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-height: 92vh;
		min-height: 92vh;
		padding-top: 5px;
		padding-bottom: 5px;
		margin-right: 5px;
		overflow-y: scroll;
		overflow-x: hidden;
	}
</style>