<script lang="ts">
	//@ts-nocheck
	import { Card, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import  { companyActor } from '$lib/store/context-store';
	import { goto } from '$app/navigation';
	export let data: PageData;

	async function handleSelectCompany(company) {
		console.log('sasasas', company)
		companyActor.send({
			type: 'company.update',
			value: company
		});
		await goto('/dashboard');
	}
</script>

{#if data?.session}
	{#each data?.aviableCompanies as company}
		<Card padding="sm" size="xl" class="flex flex-col justify-evenly min-w-[300px] min-h-[200px]">
			<div class="flex flex-col items-center pb-4">
				<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{company.name}</h5>
				<div class="flex mt-4 space-x-3 rtl:space-x-reverse lg:mt-6">
					<Button on:click={() => handleSelectCompany(company)}>Enter</Button>
				</div>
			</div>
		</Card>
	{/each}
{/if}
