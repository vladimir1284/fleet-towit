<script lang="ts">
	import { Input, Label, Button, Textarea } from 'flowbite-svelte';
</script>

<form method="POST" action="?/create">
	<div class="flex flex-col gap-2 mx-4">
		<div>
			<Label for="part-name" class="mb-2">Name:</Label>
			<Input type="text" id="part-name" name="name" required />
		</div>
		<div>
			<Label for="part-number" class="mb-2">Number:</Label>
			<Input type="number" id="part-number" name="number" required />
		</div>
		<div>
			<Label for="part-critical-qty" class="mb-2">Critical QTY:</Label>
			<Input type="text" id="part-critical-qty" name="criticalQty" required />
		</div>
		<div>
			<Label for="part-upc" class="mb-2">UPC:</Label>
			<Input type="text" id="part-upc" name="upc" required />
		</div>
		<div>
			<Label for="part-description" class="mb-2">Part description:</Label>
			<Textarea id="part-description" rows="3" name="description" />
		</div>
		<Button type="submit" class="bg-smooth-green">Create part</Button>
	</div>
</form>
