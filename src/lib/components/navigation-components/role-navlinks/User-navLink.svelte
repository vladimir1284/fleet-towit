<script lang="ts">
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { NavLi, DropdownItem, Dropdown } from 'flowbite-svelte';

	export let navStyle: string;
</script>

<NavLi class={navStyle} href="/plans">Rental Plans</NavLi>
<NavLi class={navStyle} href="/clients">Clients</NavLi>
<NavLi class={navStyle} href="/contracts">Contracts</NavLi>
<NavLi class={navStyle} href="/tolls">Tolls</NavLi>
<NavLi class={navStyle} href="/trackers">Trackers</NavLi>

<NavLi class={navStyle}>
	Inspections<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem>
		<NavLi class={navStyle}  href="/inspections">
			Inspection history
		</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle}  href="/inspections/forms">
			Forms
		</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle}  href="/inspections/exception-report">
			Exception report
		</NavLi>
	</DropdownItem>
</Dropdown>

<NavLi class={navStyle}>
	Maintence<ChevronDownOutline class="w-3 h-3 ms-2 text-black-800 dark:text-white inline" />
</NavLi>
<Dropdown>
	<DropdownItem>
		<NavLi class={navStyle}  href="/maintenance/defects">
			Defects
		</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle}  href="/maintenance/service-tasks">
			Service tasks
		</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle}  href="/maintenance/service-programs">
			Service programs
		</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle}  href="/maintenance/service-schedule">
			Service schedule
		</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle}  href="/maintenance/work-orders">
			Work orders
		</NavLi>
	</DropdownItem>
	<DropdownItem>
		<NavLi class={navStyle}  href="/maintenance/inventory">
			Inventory
		</NavLi>
	</DropdownItem>
</Dropdown>
