<script>
	import { getImageURL } from '$lib/utils';
	export let project;
</script>

<div class="card w-96 bg-base-100 shadow-xl group">
	<figure>
		<img
			src={project.thumbnail
				? getImageURL(project.collectionId, project.id, project.thumbnail)
				: `https://via.placeholder.com/300/4506CB/FFFFFF/?text=${project.name}`}
			alt="project thumbnail"
			class="transition-transform group-hover:scale-110"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title">{project.name}</h2>
		<p>{project.tagline}</p>
		<div class="card-actions justify-end">
			<a href="/projects/{project.id}" class="btn btn-primary">View Project</a>
		</div>
	</div>
</div>
