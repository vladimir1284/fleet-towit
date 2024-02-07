<script async script lang="ts">
	import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline, GoogleSolid } from 'flowbite-svelte-icons';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { signIn } from '@auth/sveltekit/client';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';

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
		<EmailInputComponent placeholder="Insert email address" form={form} errors={errors} constraints={constraints}/>
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
		<Checkbox checked={useMagicLink} on:change={() => (useMagicLink = !useMagicLink)}>
			Receive access token
		</Checkbox>
		<SubmitButtonComponent placeholder="Login to your account" styles="w-full color-blue"/>
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
