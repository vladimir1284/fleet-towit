<script lang="ts">
	import { getContext } from 'svelte';
	import { Heading, Button, Select } from 'flowbite-svelte';
	import { TrailerList, TrailerSearch } from '.';

	import type { Writable } from 'svelte/store';
	import type { Vehicle } from '@prisma/client';

	// Retrieve trailer initial context.
	const trailers: Writable<Vehicle[]> = getContext('TrailerList');
</script>

<div>
	<Heading tag="h2" customSize="text-2xl font-extrabold" class="mb-8"
		>Trailer product detailed list</Heading
	>
</div>

<div class="grid grid-flow-col auto-cols-max gap-4 mb-4">
	<Button color="alternative">Active</Button>
	<Button color="alternative" class="col-span-auto">Alternative</Button>
	<TrailerSearch />
	<Select class="mt-2" items={[]} />
	<Button color="alternative" class="col-span-auto">Apply</Button>
	<Button color="alternative" class="col-span-auto">Add vehicule</Button>
</div>

<TrailerList trailers={$trailers} />
