<script async script lang="ts">
	import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline, GoogleSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';

	import { signIn } from '@auth/sveltekit/client';

	export let data;

	let show = false;
	let useMagicLink = true;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				signIn('email', { email: form.data.email, callbackUrl: '/select-tenant' });
			}
		}
	});
</script>

<Card class="w-full max-w-md">
	<form class="flex flex-col space-y-6" action="/signin" method="post" use:enhance>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input
				class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
				type="email"
				name="email"
				placeholder="Insert your email"
				required
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			>
				<EnvelopeSolid slot="left" class="w-4 h-4" />
			</Input>
		</Label>
		{#if $errors.email}<span class="text-red-600">{$errors.email}</span>{/if}
		{#if !useMagicLink}
			<Label class="space-y-2">
				<span>Your password</span>
				<Input
					class="focus:ring-2 border-blue-500 focus:outline-2 focus:ring-2 focus:ring-blue-500"
					type={show ? 'text' : 'password'}
					name="password"
					placeholder="Insert password"
					required
					aria-invalid={$errors.password ? 'true' : undefined}
					bind:value={$form.password}
					{...$constraints.password}
				>
					<button slot="right" on:click={() => (show = !show)} class="pointer-events-auto">
						{#if show}
							<EyeOutline class="w-6 h-6" />
						{:else}
							<EyeSlashOutline class="w-6 h-6" />
						{/if}
					</button>
				</Input>
			</Label>
			{#if $errors.password}<span class="text-red-600">{$errors.password}</span>{/if}
		{/if}
		<div class="flex items-start">
			<Checkbox color="blue" checked={useMagicLink} on:change={() => (useMagicLink = !useMagicLink)}
				>Receive access token</Checkbox
			>
		</div>
		<Button type="submit" color="blue" class="w-full color-blue">Login to your account</Button>
		<Label>
			<GoogleSolid
				class="w-6 h-6"
				on:click={() => {
					signIn('google');
				}}
			/>
		</Label>
	</form>
</Card>
