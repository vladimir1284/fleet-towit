<script>
	import { Avatar, Dropdown, DropdownItem, Button } from 'flowbite-svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import avatar from '$lib/images/test.png';
	import Notifications from './Notifications.svelte';
 

	async function handleSignOut() {
		await signOut(); // Call the signOut method from your auth module
	}
</script>

<div class="flex space-x-4 rtl:space-x-reverse">
	<Notifications />
	<Button class="text-black focus:ring-0 w-10 h-10" color="none" outline={false} pill={false}>
		Pepe
		<ChevronDownSolid class="w-3 h-3 ms-2 text-black dark:text-white" />
	</Button>
	<Dropdown>
		<div slot="header" class="px-4 py-2">
			<span class="block text-sm text-gray-900 dark:text-white">some@mail.com</span>
			<span class="block truncate text-xs font-small">Company</span>
		</div>
		<DropdownItem>Dashboard</DropdownItem>
		<DropdownItem>Settings</DropdownItem>
		<DropdownItem on:click={handleSignOut}>Sign out</DropdownItem>
	</Dropdown>
	<Avatar src={avatar} rounded />
</div>
