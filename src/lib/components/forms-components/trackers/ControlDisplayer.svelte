<script lang="ts">
    import Car from "$lib/images/icons/Car.svelte";
    import Truck from "$lib/images/icons/Truck.svelte";
    import Motorbike from "$lib/images/icons/Motorbike.svelte";
    import Bus from "$lib/images/icons/Bus.svelte";
    import TriangleDown from "$lib/images/icons/TriangleDown.svelte";
    import CarCog from "$lib/images/icons/CarCog.svelte"

    import { Card } from "flowbite-svelte";

    export let icons: string[] = [];

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

</script>
{#if icons.length}
    <Card class='flex flex-col'>
        {#each icons as icon}
            <div class='flex flex-row'>
                {#if carTypes.includes(icon)}
                    <Car color={getColor(icon)} />
                {:else if truckTypes.includes(icon)}
                    <Truck color={getColor(icon)}/>
                {:else if icon === 'Motorcycle'}
                    <Motorbike color={getColor(icon)}/>
                {:else if icon === 'Bus'}
                    <Bus color={getColor(icon)}/>
                {:else}
                    <CarCog color={getColor(icon)}/>
                {/if}
                <span class="ml-5">{icon}</span>
            </div>
        {/each}
    </Card>
{/if}