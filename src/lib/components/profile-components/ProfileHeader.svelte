<script>
	import { Avatar, Dropdown, DropdownItem, Button } from 'flowbite-svelte';
	import { signOut } from '@auth/sveltekit/client';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import ButtonComponent from '../buttons/ButtonComponent.svelte';

	/**
	 * @type {{ id: string; name: null; email: any; tenantUsers: { tenant: { name: any; }; }[]; image: any; }}
	 */
	export let userData;

	async function handleSignOut() {
		await signOut();
	}
</script>

<div class="flex">
	<ButtonComponent
		styles="text-black focus:ring-0 w-10 h-10"
		color="none"
		placeholder={userData && userData.name !== null ? userData.name : '-'}
	>
		<ChevronDownSolid class="w-3 h-3 ms-2 text-black dark:text-white" />
	</ButtonComponent>
	<Dropdown>
		<div slot="header" class="px-4 py-2">
			<span class="block text-sm text-gray-900 dark:text-white">{userData.email}</span>
			<span class="block truncate text-xs font-small">{userData?.tenantUsers[0].tenant.name}</span>
		</div>
		<DropdownItem>Dashboard</DropdownItem>
		<DropdownItem href="/profile">Profile</DropdownItem>
		<DropdownItem on:click={handleSignOut}>Sign out</DropdownItem>
	</Dropdown>
	<Avatar
		src="https://minios3.crabdance.com/develop/users/{userData.id}/{userData.image}"
		rounded
	/>
</div>
