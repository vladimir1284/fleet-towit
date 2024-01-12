<script>
	// @ts-nocheck

	import { Card, Button, Label, Input, Checkbox, Fileupload, Avatar, FloatingLabelInput } from 'flowbite-svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline, UserSolid } from 'flowbite-svelte-icons';
	let show = false;
	/**
	 * @type {string | null}
	 */
	let imageUrl;

	// This function is called when a file is selected
	/**
	 * @param {{ target: { files: any[]; }; }} event
	 */
	function handleFileChange(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				// @ts-ignore
				imageUrl = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}
</script>

	<form class="flex flex-col space-y-6" action="/">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h3>
		<div id="container">
			<Label class="space-y-2" size="xl">
				<Fileupload class="hidden" name="image" for="avatar" on:change={handleFileChange} />
				<Avatar class="min-w-[10.5em] min-h-[1em]" id="avatar" size="xl" src={imageUrl} />
			</Label>
			<div id="inputs">
					<FloatingLabelInput
						style="outlined"
						class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
						type="text"
						name="first-name"
						required
					>	
					<UserSolid class="w-6 h-6 inline" />
					First name
				</FloatingLabelInput>
				<Label class="space-y-2">
					<span>Last name</span>
					<FloatingLabelInput
						style="outlined"
						class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
						type="text"
						required
					>
					<UserSolid class="w-6 h-6 inline" />
					Last name
					</FloatingLabelInput>
				</Label>
				<Label class="space-y-2">
					<span>Email</span>
					<FloatingLabelInput
						style="outlined"
						class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
						type="email"
						name="email"
						placeholder="Insert your email"
						required
					>	
						<EnvelopeSolid class="w-6 h-6 inline" />
						Email
					</FloatingLabelInput>
				</Label>

				<Label class="space-y-2">
					<span>Your password</span>
					<FloatingLabelInput 
						style="outlined"
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
								<EyeSlashOutline class="w-6 h-6" />
							{/if}
						</button>
					</FloatingLabelInput>
				</Label>
			</div>
		</div>
		<Button type="submit" class="w-full color-blue">Create user</Button>
	</form>
