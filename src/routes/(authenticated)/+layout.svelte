<script lang="ts">
    import Header from '../components/navigation-components/Header.svelte';
    import Drawer from '../components/navigation-components/Drawer.svelte';
</script>

<svelte:head>
    <title>FLEET-TOWIT</title>
</svelte:head>

<div class="flex flex-col mx-auto w-full">
    <header>
        <Header/>
    </header>
    <div class="flex w-full gap-2">
		<Drawer />
        <main class="w-full mx-auto h-full gap-2">
            <slot />
        </main>
    </div>
</div>

<style>
    header {
        width: 100%; /* Ensure the header takes the full width */
    }
    .flex-col {
        flex-direction: column;
    }
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
