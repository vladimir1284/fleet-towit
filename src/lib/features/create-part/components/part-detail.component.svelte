<script lang="ts">
	import { Label, Input, Textarea } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import {
		// Constants.
		PART_UPC_LAYOUT_CONSTRAINT,
		PART_QTY_LAYOUT_CONSTRAINT,
		PART_NUMBER_LAYOUT_CONSTRAINT
	} from '../helpers';
</script>

<div class="flex flex-col gap-4">
	<div>
		<Label for="part-name" class="mb-2 font-medium text-sm font-sans text-slate-700"
			>Part name:</Label
		>
		<Input
			type="text"
			id="part-name"
			name="name"
			placeholder="Ex: Transmission, Radiator, Axle"
			required
		/>
	</div>
	<div class="flex justify-between">
		<div class="flex basis-2/3 gap-2">
			<Input
				type="number"
				name="amount"
				placeholder="Part amount"
				min="0"
				max={PART_NUMBER_LAYOUT_CONSTRAINT}
				class="basis-1/3"
				required
			/>
			<Input
				type="number"
				name="qty"
				placeholder="Critical QTY"
				min="0"
				max={PART_QTY_LAYOUT_CONSTRAINT}
				class="basis-1/3"
				required
			/>
			<InfoCircleSolid class="self-center" />
		</div>
		<Input
			type="number"
			name="upc"
			placeholder="UPC"
			min="0"
			max={PART_UPC_LAYOUT_CONSTRAINT}
			class="basis-1/3"
			required
		/>
	</div>
	<Textarea placeholder="Part description" rows="4" name="description" class="resize-none" />
</div>
