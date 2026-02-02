<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();
</script>

<svelte:head>
	<title>Docs · Mali</title>
</svelte:head>

<section class="card px-8 py-10">
	<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Docs</p>
	<h1 class="mt-6 text-3xl font-semibold">Select a document</h1>
	<p class="mt-3 max-w-2xl text-sm text-[var(--muted)]">
		Choose a page from the list below to start reading. You can also use the search in the
		navbar to jump directly to content.
	</p>

	<div class="mt-8 grid gap-4 lg:grid-cols-2">
		{#each data.docs as doc}
			<a href={`${base}/docs/${doc.slug}`} class="card px-6 py-6 transition hover:-translate-y-1">
				<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{doc.category}</p>
				<h2 class="mt-4 text-xl font-semibold">{doc.title}</h2>
				<p class="mt-3 text-sm text-[var(--muted)]">{doc.summary}</p>
			</a>
		{/each}
	</div>
</section>
