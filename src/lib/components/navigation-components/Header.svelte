<script lang="ts">
	import { Navbar, NavHamburger } from 'flowbite-svelte';
	import Navlinks from '$lib/components/navigation-components/Navlinks.svelte';
	import ProfileHeader from '$lib/components/profile-components/ProfileHeader.svelte';

	export let data: any;
</script>

<Navbar class="flex flex-wrap justify-between items-center px-2 sm:px-4 py-2.5 w-full border-b">
	<div class="flex justify-between items-center w-full">
		<div class="order-3 w-full flex items-center justify-center sm:order-2 p-25%">
			<Navlinks />
		</div>
		<div class="order-4 sm:flex sm:items-center sm:ml-auto order-2 sm:order-4">
			<ProfileHeader userData={data} />
		</div>
		<div class="sm:hidden order-5">
			<NavHamburger class="mr-2" />
		</div>
	</div>
</Navbar>
