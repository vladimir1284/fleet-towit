<script async script lang="ts">
	import { FloatingLabelInput, Label } from 'flowbite-svelte';

	
	export let placeholder: string;
	export let suggestions: any;
	export let formPointer: any | undefined;
	export let filterCriteria: string;
	export let constraints: any | undefined;
	export let errors: any | undefined;
	export let form: any | undefined;

	let showSuggestions = false;
	let selectedIndex = -1;

	$: if ($form[formPointer] == 0) {
		$form[formPointer] = undefined;
	}
	$: console.log('x', $form[formPointer]?.toUpperCase);
	$: filteredSuggestions = filterSuggestions(
		suggestions,
		$form[formPointer]?.toUpperCase(),
		filterCriteria
	);

	function handleInput(event: any) {
		$form[formPointer] = event.target.value;
		showSuggestions = true;
	}

	function handleSuggestionClick(suggestionValue: string) {
		$form[formPointer] = suggestionValue;
		showSuggestions = false;
	}

	function filterSuggestions(
		suggestions: any[],
		filterPointer: string,
		filterCriteria: string
	): any[] {
		return suggestions.filter((suggestion) => suggestion[filterCriteria].includes(filterPointer));
	}
</script>

<FloatingLabelInput
	style="outlined"
	type="text"
	id={formPointer}
	name={formPointer}
	required
	aria-invalid={$errors ? 'true' : undefined}
	on:input={handleInput}
	bind:value={$form[formPointer]}
	{...$constraints[formPointer]}
>
	<slot />
	{placeholder}
</FloatingLabelInput>
{#if showSuggestions && suggestions.length > 0}
	<ul
		class="flex flex-col overflow-y-scroll w-full max-h-[8rem] mt-1 bg-white border border-gray-300 rounded shadow-lg"
	>
		{#each filteredSuggestions as suggestion, index}
			<button
				class="p-2 hover:bg-gray-100 cursor-pointer {selectedIndex === index ? 'bg-gray-200' : ''}"
				on:click={() => handleSuggestionClick(suggestion.plate)}
			>
				{suggestion.plate}
			</button>
		{/each}
	</ul>
{/if}
{#if $errors[formPointer]}<span class="text-red-600">{$errors[formPointer]}</span>{/if}
