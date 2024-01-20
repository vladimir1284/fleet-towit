<script>
	import { Navbar, NavHamburger } from 'flowbite-svelte';
	import Breadcumb from './Breadcumb.svelte';
	import ProfileHeader from '../profile-components/ProfileHeader.svelte';
	import Navlinks from './Navlinks.svelte';
	import Notifications from '../profile-components/Notifications.svelte'

	/**
	 * @type {any}
	 */
	 export let data;
</script>
<Navbar class="flex flex-wrap justify-between items-center px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
    <div class="flex items-center">
        <Breadcumb />
    </div>
    <div class="flex items-center">
        <Notifications/>
        <NavHamburger class="sm:hidden mr-2" />
    </div>
	<Navlinks userData={data}/>
    <div class="hidden sm:flex sm:items-center sm:ml-auto">
        <ProfileHeader userData={data} />
    </div>
</Navbar>