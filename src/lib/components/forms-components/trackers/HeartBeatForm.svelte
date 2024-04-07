<script lang="ts">

    import { superForm } from 'sveltekit-superforms/client';  
    import { getContext, createEventDispatcher } from 'svelte'; 
    import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte'; 
    import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';
    import DateInputComponent from '$lib/components/inputs/DateInputComponent.svelte';


    const dispatch = createEventDispatcher();
    export let data;
    export let selectedVehicle: any
    export let initialData;
    const currentTenant: any = getContext('currentTenant');
    let actionURL = `/api/tenants/${$currentTenant.id}/vehicles/${selectedVehicle.id}/tracker/heartbeats`

    const { form, errors, constraints, enhance, delayed } = superForm(data.heartBeatForm, {
        onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
    });
    if (initialData) {
        $form.latitude = initialData.lat;
        $form.longitude = initialData.lng
    }
</script>
<form class="flex flex-col justify-center align-center space-y-6" method="POST" use:enhance action={actionURL}>
    <div class="sm:col-span-2">
		<TextInputComponent
				formPointer="latitude"
				{form}
				{errors}
				{constraints}
				placeholder="latitude"
		/>
		<TextInputComponent
				formPointer="longitude"
				{form}
				{errors}
				{constraints}
				placeholder="longitude"
		/>
		<DateInputComponent
				formPointer="timestamp"
				{form}
				{errors}
				{constraints}
				placeholder="Select date"
			/>
	</div>
    <SubmitButtonComponent
		placeholder={"Add"}
		styles="w-[70%] grow mx-auto block"
		loading={$delayed}
			/>
</form>