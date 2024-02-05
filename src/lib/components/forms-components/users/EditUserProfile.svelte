<script>
	// @ts-nocheck
	import { Button, Label, Fileupload, Avatar, FloatingLabelInput } from 'flowbite-svelte';
	import { EnvelopeSolid, UserSolid } from 'flowbite-svelte-icons';
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

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		if (!imageUrl) return;
		const response = await fetch('/profile', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			console.log('Successfully uploaded');
		} else {
			console.log('Failed to upload');
		}
	}

	let firstName = '';
	let lastName = '';
	$: fullName = `${firstName} ${lastName}`;
</script>

<form
	class="flex flex-col space-y-6"
	method="POST"
	enctype="multipart/form-data"
	on:submit={handleSubmit}
>
	<h3 class="text-xl font-medium text-gray-900 dark:text-white">Edit your profile information</h3>
	<div id="container">
		<Label class="space-y-2" size="xl">
			<Fileupload class="hidden" name="image" for="avatar" on:change={handleFileChange} />
			<Avatar class="min-w-[10.5em] min-h-[1em]" id="avatar" size="xl" src={imageUrl} />
		</Label>
		<div id="inputs">
			<input type="hidden" name="full-name" value={fullName} />
			<FloatingLabelInput
				style="outlined"
				class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
				type="text"
				name="first-name"
				required
				bind:value={firstName}
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
					bind:value={lastName}
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
		</div>
	</div>
	<Button type="submit" class="w-full color-blue">Create user</Button>
</form>
