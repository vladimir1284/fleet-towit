<script lang="ts">
	// @ts-nocheck
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { TrashBinSolid, FileEditSolid } from 'flowbite-svelte-icons';

	export let users;
	export let showOptions = false;
	
	const dispatch = createEventDispatcher();
</script>

<TableHead>
	<TableHeadCell class="text-center">EMAIL</TableHeadCell>
	<TableHeadCell class="text-center">NAME</TableHeadCell>
	<TableHeadCell class="text-center">TENANT</TableHeadCell>
	<TableHeadCell class="text-center">ROLE</TableHeadCell>
	<TableHeadCell class="text-center"></TableHeadCell>
</TableHead>
<TableBody class="divide-y">
	{#each users as user}
		<TableBodyRow>
			<TableBodyCell class="text-center">{user.user.email}</TableBodyCell>
			<TableBodyCell class="text-center">{user.user.name || '-'}</TableBodyCell>
			<TableBodyCell class="text-center">{user.tenant?.name}</TableBodyCell>
			<TableBodyCell class="text-center">{user.role}</TableBodyCell>
			{#if showOptions}
				<TableBodyCell class=" flex w-32 justify-between">
					<FileEditSolid class="text-gray-400" on:click={() => dispatch('editUser', user)} />
					<TrashBinSolid class="text-red-500" on:click={() => dispatch('deleteUser', user.id)} />
				</TableBodyCell>
			{/if}
		</TableBodyRow>
	{/each}
</TableBody>
