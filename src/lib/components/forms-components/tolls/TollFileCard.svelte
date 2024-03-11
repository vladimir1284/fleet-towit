<script lang="ts">
	import {
		FileImageOutline,
		FileZipOutline,
		FileInvoiceOutline,
		FileLinesOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import ButtonComponent from '../../buttons/ButtonComponent.svelte';
	import { Section } from 'flowbite-svelte-blocks';
	import { Card, Label } from 'flowbite-svelte';

	export let handleDelete = () => {};
	export let fileName: string;
	export let size: number;
	let extension: string;
	let type: string;

	extension = fileName?.split('.').toReversed()[0];
	extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'webp'
		? (type = 'image')
		: extension == 'pdf'
			? (type = 'pdf')
			: extension == 'zip'
				? (type = 'zip')
				: (type = 'other');
</script>

<Card size="md" padding="none" class="p-2">
	<div class="flex items-center space-x-4 rtl:space-x-reverse">
		{#if type == 'image'}
			<FileImageOutline class=" flex-shrink-0 text-blue-700 w-[2rem] h-[2rem]" />
		{:else if type == 'pdf'}
			<FileLinesOutline class=" flex-shrink-0 text-blue-700 w-[2rem] h-[2rem]" />
		{:else if type == 'zip'}
			<FileZipOutline class=" flex-shrink-0 text-blue-700 w-[2rem] h-[2rem]" />
		{:else}
			<FileInvoiceOutline class=" flex-shrink-0 text-blue-700 w-[3rem] h-[3rem]" />
		{/if}
		<div class="flex-1 min-w-0">
			<p class="text-sm font-bold text-gray-700 tracking-tight">
				{fileName?.split('.')[0]}
			</p>
			<p class="text-sm text-gray-500 truncate dark:text-gray-400">
				{size}
			</p>
		</div>
		<ButtonComponent
			placeholder=""
			outline
			color="red"
			styles="w-[10%] flex justify-center align-center mx-auto"
			onClick={handleDelete}
		>
			<Label>
				<TrashBinSolid class="text-red-500" />
			</Label>
		</ButtonComponent>
	</div>
</Card>