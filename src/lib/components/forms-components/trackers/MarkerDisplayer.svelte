<script lang='ts'>
    import Car from "$lib/images/icons/Car.svelte";
    import Truck from "$lib/images/icons/Truck.svelte";
    import Motorbike from "$lib/images/icons/Motorbike.svelte";
    import Bus from "$lib/images/icons/Bus.svelte";
    import TriangleDown from "$lib/images/icons/TriangleDown.svelte";
    import CarCog from "$lib/images/icons/CarCog.svelte"

    const carTypes = ['Car', 'SUV', 'RV', 'Van']
    const truckTypes = ['Truck', 'Trailer']
    
    const getColor = (fromType: string) => {
        let hex = Array.from(new TextEncoder().encode(fromType), byte => (byte*4).toString(16).padStart(2, "0")).join("");
        hex = hex.slice(0, 6)
        if (!(hex.length == 6)) {
            hex = hex.padEnd(6-hex.length, '0')
        }
        return "#"+hex    
    }

    export let type: string;
</script>
<div class='flex flex-col align-center w-fit'>
    {#if carTypes.includes(type)}
        <Car color={getColor(type)} />
    {:else if truckTypes.includes(type)}
        <Truck color={getColor(type)}/>
    {:else if type === 'Motorcycle'}
        <Motorbike color={getColor(type)}/>
    {:else if type === 'Bus'}
        <Bus color={getColor(type)}/>
    {:else}
        <CarCog color={getColor(type)}/>
    {/if}
    <TriangleDown color={getColor(type)}/>
</div>