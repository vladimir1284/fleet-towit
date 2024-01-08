<script lang="ts">
	import '../app.css';
	import './styles.css';
</script>
<svelte:head>
	<title>FLEET-TOWIT</title>
</svelte:head>

<div class="flex w-full h-full justify-center items-center">
	<main class="flex w-full h-full justify-center items-center" >
		<slot />
	</main>
</div>
