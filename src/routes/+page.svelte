<script>
	import { Section, News, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';
	import { ArrowRightSolid } from 'flowbite-svelte-icons';
</script>

<Section name="heroVisual">
	<div class="mr-auto place-self-center md:col-span-2">
		<HeroHeader
			h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
			pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
		>
			<svelte:fragment slot="h1">Custom text</svelte:fragment>
			<svelte:fragment slot="paragraph">Custom text.</svelte:fragment>
			<a href="/signin">
				<ButtonComponent
					color="blue"
					styles="inline-flex items-center justify-center mr-3"
					placeholder="Sign in"
				>
					<ArrowRightSolid size="md" class="ml-2 -mr-1" />
				</ButtonComponent>
			</a>
		</HeroHeader>
	</div>
</Section>
