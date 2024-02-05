<script lang="ts">
	import { Button, Label, Fileupload, Avatar, FloatingLabelInput, Modal } from 'flowbite-svelte';
	import { EnvelopeSolid, EyeOutline, EyeSlashOutline, UserSolid } from 'flowbite-svelte-icons';
	import { Card } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	let imageUrl: any;
	let image: string = '';
	let editModal = false;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		onUpdated: async ({ form }) => {
			if (form.valid) {
				console.log('Form is valid');
			}
		}
	});

	async function handleEdit() {
		editModal = true;
	}

	async function handleCloseEditModal(event: { detail: boolean }) {
		editModal = event.detail;
		location.reload();
	}

	function handleFileChange(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput && fileInput.files) {
			const file = fileInput.files[0];
			if (file) {
				image = file.name;
				const reader = new FileReader();
				reader.onload = (e) => {
					imageUrl = e.target?.result;
				};
				reader.readAsDataURL(file);
			}
		}
	}

	$: {
		$form.image = image;
	}
</script>

<Modal bind:open={editModal} size="xs">
	<form use:enhance class="flex flex-col space-y-6" method="POST" enctype="multipart/form-data">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Edit your profile information</h3>
		<div class="flex justify-between max-w-[50em] min-w-full items-start">
			<Label class="space-y-2" size="xl">
				<Fileupload class="hidden" name="imageData" for="avatar" on:change={handleFileChange} />
				<Avatar
					class="min-w-[10.5em] min-h-[1em]"
					id="avatar"
					size="xl"
					src={data.session.user?.image
						? `https://minios3.crabdance.com/develop/users/${data.session.user?.id}/${data.session.user?.image}`
						: undefined}
				/>
			</Label>
			<input type="hidden" name="id" bind:value={$form.id} />
			<div class="flex flex-wrap items-start w-full max-w-[25em] justify-between">
				<input type="hidden" name="image" bind:value={$form.image} />
				<Label class="space-y-2">
					<span>First name</span>
					<FloatingLabelInput
						style="outlined"
						class="focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
						type="text"
						name="name"
						required
						bind:value={$form.name}
					>
						<UserSolid class="w-6 h-6 inline" />
						Name
					</FloatingLabelInput>
				</Label>
				<Label class="space-y-2">
					<span>Email</span>
					<FloatingLabelInput
						style="outlined"
						class="flex min-w-full focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
						type="email"
						name="email"
						placeholder="Insert your email"
						required
						bind:value={$form.email}
						{...$constraints.email}
					>
						<EnvelopeSolid class="w-6 h-6 inline" />
						Email
					</FloatingLabelInput>
				</Label>
			</div>
		</div>
		<Button type="submit" class="max-w-1/10">Update</Button>
	</form>
</Modal>

<div class="flex w-full max-w-full justify-center h-full p-2">
	<Card class=" flex justify-between w-full max-w-full min-h-full">
		<Card
			class="shadow-none border-none"
			img="https://minios3.crabdance.com/develop/users/{data.session.user?.id}/{data.session.user
				?.image}"
			horizontal
			size="md"
		>
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{data.session.user?.name}
			</h5>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{data.session.user?.email}
			</p>
		</Card>
		<Button on:click={handleEdit}>Edit info</Button>
	</Card>
</div>
