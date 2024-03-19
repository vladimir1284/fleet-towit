<script lang="ts">
	export let currentStep: number;
</script>

<ol
	class="items-center w-full space-y-4 sm:flex sm:justify-between sm:space-x-8 sm:space-y-0 rtl:space-x-reverse"
>
	<li class="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
		<span
			class="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500"
		>
			1
		</span>
		<span>
			<h3 class="font-medium leading-tight">Part description</h3>
		</span>
	</li>
	<li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
		<span
			class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400"
		>
			2
		</span>
		<span>
			<h3 class="font-medium leading-tight">Part customization</h3>
		</span>
	</li>
</ol>
