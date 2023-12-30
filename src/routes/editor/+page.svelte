<script lang="ts">
	import type { PageData } from './$types';
	import Tag from '$lib/editor/Tag.svelte';
	export let data: PageData;
	import { Tipex } from '@friendofsvelte/tipex';
	export let htmlContent = ``;
</script>

<Tipex
	{htmlContent}
	style="margin-top: 1rem; margin-bottom: 0;"
	className="h-[70vh] border border-neutral-200 overflow-y-auto"
>
	<svelte:fragment slot="utilities">
		<Tag />
	</svelte:fragment>
</Tipex>
