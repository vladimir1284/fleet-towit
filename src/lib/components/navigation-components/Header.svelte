<script lang="ts">
	import { Navbar, NavHamburger } from 'flowbite-svelte';
	import Breadcumb from './Breadcumb.svelte';
	import ProfileHeader from '../profile-components/ProfileHeader.svelte';
	import Navlinks from './Navlinks.svelte';
	import Notifications from '../profile-components/Notifications.svelte';

	export let data: any;
	export let currentTenant: any;
</script>

<Navbar
	class="flex flex-wrap justify-between items-center px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b"
>
	<div class="flex justify-between items-center w-full">
		<div class="order-1">
			<Breadcumb />
		</div>
		<div class="order-3 sm:order-3">
			<Notifications />
		</div>
		<div class="order-3 w-full flex items-center justify-center sm:order-2 p-25%">
			<Navlinks currentTenant={currentTenant} />
		</div>
		<div class="hidden order-4 sm:flex sm:items-center sm:ml-auto order-2 sm:order-4">
			<ProfileHeader userData={data} />
		</div>
		<div class="sm:hidden order-5">
			<NavHamburger class="mr-2" />
		</div>
	</div>
</Navbar>
