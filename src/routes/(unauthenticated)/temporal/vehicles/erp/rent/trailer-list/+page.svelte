<script lang="ts">
	export let data;
	import { TrailerManagement } from './components';
	import { setTrailerListContext } from './context/trailer';

	import type { Vehicle } from '@prisma/client';

	const { initialTrailers }: { initialTrailers: Vehicle[] } = data;
	// Set trailer initial context.
	setTrailerListContext(initialTrailers);
</script>

<div class="container grid grid-cols-12">
	<div class="col-start-4 col-span-8">
		<TrailerManagement />
	</div>
</div>
