<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();
	let query = $state('');

	let normalized = $derived.by(() => query.trim().toLowerCase());
	let filteredDocs = $derived.by(() =>
		normalized
			? data.docs.filter((doc) => {
					const haystack = `${doc.title} ${doc.summary} ${doc.plainText}`.toLowerCase();
					return haystack.includes(normalized);
				})
			: data.docs
	);
</script>

<section class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
	<div class="card px-8 py-10">
		<p class="tag">Docs</p>
		<h1 class="mt-8 text-4xl font-semibold leading-tight">
			Minimal documentation, designed on a strict grid.
		</h1>
		<p class="mt-4 text-base text-[var(--muted)]">
			Markdown-first system with instant search, light and dark modes, and a Swiss-style rhythm.
			Everything lives in `src/content/docs`.
		</p>
		<div class="mt-8 flex flex-wrap gap-4">
			
			<a href="{base}/docs/getting-started">
			<div class="rounded-2xl border px-5 py-3 text-xs uppercase tracking-[0.3em]" style="border-color: var(--line)">
				Start Reading →
			</div></a>
		</div>
	</div>
	<div class="card flex flex-col justify-between px-8 py-10">
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">System status</p>
			<h2 class="mt-6 text-2xl font-semibold">Search index synced</h2>
			<p class="mt-3 text-sm text-[var(--muted)]">
				Every markdown file is parsed at build time. Updates appear immediately in the index.
			</p>
		</div>
		<div class="mt-10 border-t pt-6 text-xs uppercase tracking-[0.3em]" style="border-color: var(--line)">
			Grid locked · spacing balanced · dark mode ready
		</div>
	</div>
</section>

<section class="mt-12 card px-8 py-8">
	<div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
		<div>
			<h2 class="text-2xl font-semibold">Search the docs</h2>
			<p class="mt-2 text-sm text-[var(--muted)]">
				Filter by title, summary, or full content. Clear the field to reset.
			</p>
		</div>
		<div class="w-full lg:max-w-md">
			<label class="sr-only" for="doc-search">Search docs</label>
			<input
				id="doc-search"
				type="search"
				placeholder="Search docs..."
				bind:value={query}
				class="w-full rounded-2xl border px-5 py-4 text-sm transition focus:outline-none"
				style="border-color: var(--line); background: var(--surface); color: var(--text)"
			/>
		</div>
	</div>
	<div class="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
		{filteredDocs.length} results
	</div>
</section>

<section class="mt-12 grid gap-6 lg:grid-cols-2">
	{#each filteredDocs as doc}
		<a href={`${base}/docs/${doc.slug}`} class="card group px-8 py-8 transition hover:-translate-y-1">
			<div class="flex items-start justify-between gap-6">
				<div>
					<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Doc {doc.order}</p>
					<h3 class="mt-4 text-2xl font-semibold">{doc.title}</h3>
				</div>
				<span
					class="h-10 w-10 rounded-full border text-[var(--muted)] transition group-hover:text-[var(--text)]"
					style="border-color: var(--line)"
				>
					<span class="grid h-full w-full place-items-center text-xs">↗</span>
				</span>
			</div>
			<p class="mt-4 text-sm text-[var(--muted)]">{doc.summary}</p>
		</a>
	{/each}
</section>
