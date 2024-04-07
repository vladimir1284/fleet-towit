<script lang='ts'>

    import { superForm } from 'sveltekit-superforms/client';  
    import { getContext, createEventDispatcher } from 'svelte'; 
    import TextInputComponent from '$lib/components/inputs/TextInputComponent.svelte'; 
    import SubmitButtonComponent from '$lib/components/buttons/SubmitButtonComponent.svelte';

    const dispatch = createEventDispatcher();
    export let data;
    export let selectedVehicle: any
    export let selectedTracker: any = undefined;
    const currentTenant: any = getContext('currentTenant');
    let actionURL = `/api/tenants/${$currentTenant.id}/vehicles/${selectedVehicle.id}/tracker`

    const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
        onUpdated: async ({ form }) => {
			if (form.valid) {
				dispatch('formvalid', false);
			}
		}
    });

    if (selectedTracker) {
        $form.name = selectedTracker.name;
    }


</script>

<form class="flex flex-col justify-center align-center space-y-6" method="POST" use:enhance action={actionURL}>
    <div class="sm:col-span-2">
		<TextInputComponent
				formPointer="name"
				{form}
				{errors}
				{constraints}
				placeholder="Name"
		/>
	</div>
    <SubmitButtonComponent
		placeholder={!selectedTracker ? 'Create Tracker' : 'Update Tracker'}
		styles="w-[70%] grow mx-auto block"
		loading={$delayed}
			/>
</form>