<script lang="ts">
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { NavLi, DropdownItem, Dropdown } from 'flowbite-svelte';

	export let navStyle: string;
</script>

<NavLi class={navStyle} href="/plans">Rental Plans</NavLi>
<NavLi class={navStyle} href="/clients">Clients</NavLi>
<NavLi class={navStyle} href="/contracts">Contracts</NavLi>
<NavLi class={navStyle} href="/tolls">Tolls</NavLi>

<NavLi class={navStyle}>
	Inspections<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem label="Inspection history" href="/inspections">Inspection history</DropdownItem>
	<DropdownItem label="Forms" href="/inspections/forms">Forms</DropdownItem>
	<DropdownItem label="Exception report" href="/inspections/exception-report"
		>Exception report</DropdownItem
	>
</Dropdown>

<NavLi class={navStyle}>
	Maintence<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem label="Defects" href="/maintenance/defects">Defects</DropdownItem>
	<DropdownItem label="Service tasks" href="/maintenance/service-tasks">Service tasks</DropdownItem>
	<DropdownItem label="Service programs" href="/maintenance/service-programs"
		>Service programs</DropdownItem
	>
	<DropdownItem label="Service schedule" href="/maintenance/service-schedule"
		>Service schedule</DropdownItem
	>
	<DropdownItem label="Work orders" href="/maintenance/work-orders">Work orders</DropdownItem>
	<DropdownItem label="Inventory" href="/maintenance/inventory">Inventory</DropdownItem>
</Dropdown>
