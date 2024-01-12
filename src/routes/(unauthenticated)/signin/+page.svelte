<script lang="ts">
	import LoginForm from "../../components/forms-components/authentication/LoginForm.svelte"
	
	import type { PageData } from './$types';

	export let data: PageData;

</script>

<LoginForm data={data}/>