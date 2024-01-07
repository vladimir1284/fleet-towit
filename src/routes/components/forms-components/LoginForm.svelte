<script async script lang="ts">
	import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';

	let show = false;
	let useMagicLink = false;
</script>

<Card class="w-full max-w-md">
	<form class="flex flex-col space-y-6" action="/">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input
				class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
				type="email"
				name="email"
				placeholder="Insert your email"
				required
			>
				<EnvelopeSolid slot="left" class="w-4 h-4" />
			</Input>
		</Label>
		{#if !useMagicLink}

		<Label class="space-y-2">
			<span>Your password</span>
			<Input
				class="focus:ring-2 border-blue-500 focus:outline-2 focus:ring-2 focus:ring-blue-500"
				type={show ? 'text' : 'password'}
				name="password"
				placeholder="Insert password"
				required
			>
				<button slot="right" on:click={() => (show = !show)} class="pointer-events-auto">
					{#if show}
						<EyeOutline class="w-6 h-6" />
					{:else}
						<!-- svelte-ignore missing-declaration -->
						<EyeSlashOutline class="w-6 h-6" />
					{/if}
				</button>
			</Input>
		</Label>
		{/if}
		<div class="flex items-start">
			<Checkbox color="blue" on:change={() => (useMagicLink = !useMagicLink)}>Receive access token</Checkbox>
		</div>
		<Button type="submit" color="blue" class="w-full color-blue">Login to your account</Button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <a href="/signup" class="text-blue-500 hover:underline dark:text-primary-500">
				Create account
			</a>
		</div>
	</form>
</Card>
