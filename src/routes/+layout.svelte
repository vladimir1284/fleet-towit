<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import './styles.css';
	import Drawer from '../components/navigation-components/Drawer.svelte';
</script>

<header >
	<Header/>
</header>

<div class="flex mx-auto w-full">
	<Drawer />
	<main class="lg:ml-72 w-full mx-auto">
		<slot />
	</main>
</div>