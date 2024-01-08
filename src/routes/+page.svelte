<script>
    import { Section, News, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
    import { Button } from 'flowbite-svelte';
    import { ArrowRightSolid } from 'flowbite-svelte-icons';
  </script>
  
  <Section name="heroVisual">
    <div class="mr-auto place-self-center md:col-span-2">
      <HeroHeader h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white" pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        <svelte:fragment slot="h1">Custom text</svelte:fragment>
        <svelte:fragment slot="paragraph">Custom text.</svelte:fragment>
        <a href="/signin"><Button size="xl" color="blue" class="inline-flex items-center justify-center mr-3">Sign in<ArrowRightSolid size="md" class="ml-2 -mr-1" /></Button> </a>
        <a href="/signup"><Button color="light" size="xl" class="inline-flex items-center justify-center">Create account</Button> </a>
      </HeroHeader>
    </div>
    <div class="hidden xs:mt-0 xs:col-span-5 xs:flex">
      <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
    </div>
  </Section>