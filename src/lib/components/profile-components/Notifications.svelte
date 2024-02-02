<script>
	import { Dropdown, DropdownItem, Avatar } from 'flowbite-svelte';
	import { BellSolid } from 'flowbite-svelte-icons';

	let notifications = [
		{
			avatar: '/images/profile-picture-1.webp',
			dotColor: 'bg-gray-300',
			sender: 'Jese Leos',
			message: "Hey, what's up? All set for the presentation?",
			time: 'a few moments ago'
		},
		{
			avatar: '/images/profile-picture-2.webp',
			dotColor: 'bg-red-400',
			sender: 'Joseph Mcfall',
			message: 'and 5 others started following you.',
			time: '10 minutes ago'
		}
	];
</script>

<div
	id="bell"
	class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
>
	<BellSolid class="w-5 h-5kj" />
	{#if notifications.length > 0}
		<div class="flex relative">
			<div
				class="inline-flex relative -top-2 end-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
			/>
		</div>
	{/if}
</div>
<Dropdown
	triggeredBy="#bell"
	class="w-full max-w-sm min-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
>
	<div slot="header" class="text-center py-2 font-bold">Notifications</div>
	{#each notifications as notification (notification.sender)}
		<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
			<Avatar src={notification.avatar} dot={{ color: notification.dotColor }} rounded />
			<div class="ps-3 w-full">
				<div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
					{notification.message}
				</div>
				<div class="text-xs text-primary-600 dark:text-primary-500">{notification.time}</div>
			</div>
		</DropdownItem>
	{/each}
</Dropdown>
