<script lang='ts'>
    import { createEventDispatcher } from 'svelte'
    import { Button } from 'flowbite-svelte';

    export let data: any;
    const dispatch = createEventDispatcher();
    const clickEvent = () => {
        dispatch('actioned')
    } 
</script>
<div class="flex flex-col">
    <div><strong>Selected Position</strong></div>
    <div>Lat: {data.lat}</div>
    <div>Lng: {data.lng}</div>
    <Button on:click={clickEvent}>Add location</Button>
</div>
