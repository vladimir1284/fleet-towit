<script async script lang="ts">
	import { Card, Label, Input, Checkbox } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline, GoogleSolid } from 'flowbite-svelte-icons';
	import EmailInputComponent from '$lib/components/inputs/EmailInputComponent.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { signIn } from '@auth/sveltekit/client';
	import SubmitButtonComponent from '../../buttons/SubmitButtonComponent.svelte';
	import ButtonComponent from '$lib/components/buttons/ButtonComponent.svelte';

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
		<EmailInputComponent placeholder="Insert email address" {form} {errors} {constraints} />
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
		<SubmitButtonComponent placeholder="Login to your account" styles="w-full color-blue" />
		<ButtonComponent
			placeholder="Sign in with Google"
			color="light"
			styles="justify-evenly text-blue-700 text-lg font-bold"
			on:click={() => signIn('google')}
		>
			<!-- svelte-ignore illegal-attribute-character -->
			<svg
 				width="27.530331"
 				height="27.530331"
 				viewBox="0  0  7.2840665  7.2840665"
 				version="1.1"
 				id="svg1"
 				xml:space="preserve"
 				sodipodi:docname="dibujo.svg"
 				xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
 				xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
 				xmlns="http://www.w3.org/2000/svg"
 				xmlns:svg="http://www.w3.org/2000/svg"
 				><sodipodi:namedview
 					id="namedview1"
 					pagecolor="#ffffff"
 					bordercolor="#111111"
 					borderopacity="1"
 					inkscape:showpageshadow="0"
 					inkscape:pageopacity="0"
 					inkscape:pagecheckerboard="1"
 					inkscape:deskcolor="#d1d1d1"
 					inkscape:document-units="mm"
 					inkscape:zoom="0.70110129"
 					inkscape:cx="63.471571"
 					inkscape:cy="405.79015"
 					inkscape:window-width="1920"
 					inkscape:window-height="1001"
 					inkscape:window-x="-9"
 					inkscape:window-y="-9"
 					inkscape:window-maximized="1"
 					inkscape:current-layer="layer1"
 				/><defs id="defs1" /><g
 					inkscape:label="Capa  1"
 					inkscape:groupmode="layer"
 					id="layer1"
 					transform="translate(-88.167683,-131.37798)"
 					><g id="Google" transform="matrix(0.05690677,0,0,0.05690677,88.167683,131.37798)"
 						><rect
 							clip-rule="evenodd"
 							fill="none"
 							fill-rule="evenodd"
 							height="128"
 							width="128"
 							id="rect1"
 							x="0"
 							y="0"
 						/><path
 							clip-rule="evenodd"
 							d="m  27.585,64 c  0,-4.157  0.69,-8.143  1.923,-11.881 L  7.938,35.648 C  3.734,44.183  1.366,53.801  1.366,64 c  0,10.191  2.366,19.802  6.563,28.332 L  29.487,75.829 C  28.266,72.108  27.585,68.137  27.585,64"
 							fill="#fbbc05"
 							fill-rule="evenodd"
 							id="path1"
 						/><path
 							clip-rule="evenodd"
 							d="m  65.457,26.182 c 9.031,0 17.188,3.2 23.597,8.436 L 107.698,16 C 96.337,6.109 81.771,0 65.457,0 40.129,0 18.361,14.484 7.938,35.648 l 21.569,16.471 c 4.97,-15.086 19.137,-25.937 35.95,-25.937"
							fill="#ea4335"
							fill-rule="evenodd"
							id="path2"
						/><path
							clip-rule="evenodd"
							d="m 65.457,101.818 c -16.812,0 -30.979,-10.851 -35.949,-25.937 L 7.938,92.349 C 18.361,113.516 40.129,128 65.457,128 c 15.632,0 30.557,-5.551 41.758,-15.951 L 86.741,96.221 c -5.777,3.639 -13.052,5.597 -21.284,5.597"
							fill="#34a853"
							fill-rule="evenodd"
							id="path3"
						/><path
							clip-rule="evenodd"
							d="m 126.634,64 c 0,-3.782 -0.583,-7.855 -1.457,-11.636 h -59.72 v 24.727 h 34.376 c -1.719,8.431 -6.397,14.912 -13.092,19.13 l 20.474,15.828 C 118.981,101.129 126.634,84.861 126.634,64"
							fill="#4285f4"
							fill-rule="evenodd"
							id="path4"
						/></g
					></g
				></svg
			>
		</ButtonComponent>
	</form>
</Card>
