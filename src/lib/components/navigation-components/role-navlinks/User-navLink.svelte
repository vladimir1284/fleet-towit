<script lang="ts">
	import { NavLi, DropdownItem, Dropdown } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	export let navStyle: string;
</script>

<NavLi class={navStyle} href="/dashboard">Dashboard</NavLi>

<NavLi class={navStyle} href="/dashboard/plans">Rental Plans</NavLi>
<NavLi class={navStyle} href="/dashboard/clients">Clients</NavLi>
<NavLi class={navStyle} href="/dashboard/contracts">Contracts</NavLi>
<NavLi class={navStyle} href="/dashboard/tolls">Tolls</NavLi>
<NavLi class={navStyle}>
	Inspections<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem label="Inspection history" href="/dashboard/inspections"
		>Inspection history</DropdownItem
	>
	<DropdownItem label="Forms" href="/dashboard/inspections/forms">Forms</DropdownItem>
	<DropdownItem label="Exception report" href="/dashboard/inspections/exception-report"
		>Exception report</DropdownItem
	>
</Dropdown>
<NavLi class={navStyle}>
	Maintence<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem label="Defects" href="/dashboard/maintenance/defects">Defects</DropdownItem>
	<DropdownItem label="Service tasks" href="/dashboard/maintenance/service-tasks"
		>Service tasks</DropdownItem
	>
	<DropdownItem label="Service programs" href="/dashboard/maintenance/service-programs"
		>Service programs</DropdownItem
	>
	<DropdownItem label="Service schedule" href="/dashboard/maintenance/service-schedule"
		>Service schedule</DropdownItem
	>
	<DropdownItem label="Work orders" href="/dashboard/maintenance/work-orders"
		>Work orders</DropdownItem
	>
	<DropdownItem label="Inventory" href="/dashboard/maintenance/inventory">Inventory</DropdownItem>
</Dropdown>
