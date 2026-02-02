<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>{$page.status} · My App 11</title>
</svelte:head>

<section class="card px-8 py-12">
	<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Error {$page.status}</p>
	<h1 class="mt-6 text-4xl font-semibold">Something went wrong</h1>
	<p class="mt-4 max-w-xl text-sm text-[var(--muted)]">
		{$page.error?.message ?? 'An unexpected error occurred.'}
	</p>
	<div class="mt-8 flex flex-wrap gap-3">
		<a href={`${base}/`} class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]">
			Back to Home
		</a>
		<a href={`${base}/docs`} class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]">
			Docs Index
		</a>
	</div>
</section>
