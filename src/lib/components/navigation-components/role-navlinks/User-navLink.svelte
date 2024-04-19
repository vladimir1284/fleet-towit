<script lang="ts">
	//@ts-nocheck
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { NavLi, DropdownItem, Dropdown, MegaMenu } from 'flowbite-svelte';

	export let navStyle: string;

	let menu = [
		{ name: 'Plans', href: '/plans' },
		{ name: 'Contracts', href: '/contracts' },
		{ name: 'Tolls', href: '/tolls' },
		{ name: 'Trackers', href: '/trackers' }
	];
</script>

<NavLi class={navStyle} href="/clients">Clients</NavLi>

<NavLi class={navStyle}>
	Rental<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<MegaMenu items={menu} class='z-50 shadow-lg' let:item>
	<NavLi class="mx-2" href={item.href}>
		{item.name}
	</NavLi>
</MegaMenu>

<NavLi class={navStyle} href="/vehicles">
	Vehicles
</NavLi>

<NavLi class={navStyle}>
	Inspections<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem>
		<NavLi class={navStyle} href="/inspections">Inspection history</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle} href="/inspections/forms">Forms</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle} href="/inspections/exception-report">Exception report</NavLi>
	</DropdownItem>
</Dropdown>

<NavLi class={navStyle}>
	Maintence<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem>
		<NavLi class={navStyle} href="/maintenance/defects">Defects</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle} href="/maintenance/service-tasks">Service tasks</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle} href="/maintenance/service-programs">Service programs</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle} href="/maintenance/service-schedule">Service schedule</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle} href="/maintenance/work-orders">Work orders</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle} href="/maintenance/inventory">Inventory</NavLi>
	</DropdownItem>
</Dropdown>
