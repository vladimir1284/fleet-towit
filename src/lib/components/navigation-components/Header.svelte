<script>
	import { Navbar } from 'flowbite-svelte';
	import Breadcumb from './Breadcumb.svelte';
	import ProfileHeader from '../profile-components/ProfileHeader.svelte';
	import Navlinks from './Navlinks.svelte';

	/**
	 * @type {any}
	 */
	 export let data;
</script>

<Navbar class="flex justify-evenly px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
	<Breadcumb />
	<Navlinks />
	<ProfileHeader userData={data} />
</Navbar>
