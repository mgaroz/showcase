<script>
	import { Input, TextArea } from '$lib/components';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash } from '@steeze-ui/heroicons';
	import { getImageURL } from '$lib/utils';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let data;
	export let form;
	let loading = false;
	const submitUpdateProject = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			method="POST"
			action="?/updateProject"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdateProject}
		>
			<h3 class="text-3xl font-bold">Edit {data.project.name}</h3>
			<Input
				id="name"
				label="Project name"
				value={form?.data?.name ?? data.project.name}
				errors={form?.errors?.name}
				disabled={loading}
			/>
			<Input
				id="tagline"
				label="Project tagline"
				value={form?.data?.tagline ?? data.project.tagline}
				errors={form?.errors?.tagline}
				disabled={loading}
			/>
			<Input
				id="url"
				label="Project URL"
				value={form?.data?.url ?? data.project.url}
				errors={form?.errors?.url}
				disabled={loading}
			/>
			<TextArea
				id="description"
				label="Project description"
				value={form?.data?.description ?? data.project.description}
				errors={form?.errors?.description}
				disabled={loading}
			/>
			<div class="form-control w-full max-w-lg">
				<label for="thumbnail" class="label font-medium pb-1">
					<span class="label-text">Thumbnail</span>
				</label>
				{#if data.project.thumbnail}
					<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
						<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
							<button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="w-20 rounded">
							<img
								src={getImageURL(
									data.project.collectionId,
									data.project.id,
									data.project.thumbnail,
									'80x80'
								)}
								alt="project thumbnail"
							/>
						</div>
					</label>
				{/if}
				<input
					type="file"
					class="file-input file-input-bordered w-full max-w-lg mt-w"
					name="thumbnail"
					id="thumbnail"
					disabled={loading}
				/>
				{#if form?.errors?.thumbnail}
					{#each form?.errors?.thumbnail as error}
						<label for="thumbnail" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
			</div>
		</form>
	</div>
</div>
