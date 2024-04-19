<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';

	export let form;
	export let formsToExport;
	export let toggleForm;

	const isChecked = (form) => formsToExport.map((el) => el.id).includes(form.id);

	const handleChange = () => toggleForm(form);
</script>

<Checkbox checked={isChecked(form)} on:change={handleChange} />
