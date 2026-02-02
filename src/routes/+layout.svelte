<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let theme = $state<'light' | 'dark'>('light');
	let searchOpen = $state(false);
	let searchQuery = $state('');

	const applyTheme = (value: 'light' | 'dark') => {
		const root = document.documentElement;
		root.classList.toggle('dark', value === 'dark');
		root.dataset.theme = value;
		theme = value;
		localStorage.setItem('theme', value);
	};

	onMount(() => {
		const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
		applyTheme(stored ?? (prefersDark ? 'dark' : 'light'));
	});

	const toggleTheme = () => {
		applyTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const closeSearch = () => {
		searchOpen = false;
		searchQuery = '';
	};

	let filteredDocs = $derived.by(() => {
		const normalized = searchQuery.trim().toLowerCase();
		if (!normalized) return [];
		return data.docs.filter((doc) => {
			const haystack = `${doc.title} ${doc.summary} ${doc.plainText}`.toLowerCase();
			return haystack.includes(normalized);
		});
	});

	const highlight = (text: string) => {
		const normalized = searchQuery.trim();
		if (!normalized) return text;
		const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>My App 11 Docs</title>
</svelte:head>

<div class="min-h-screen">
	<header class="container-shell flex items-center justify-between py-8">
		<div class="flex items-center gap-4">
			<div class="h-3 w-3 rounded-full border" style="border-color: var(--line)"></div>
			<div>
				<p class="text-[11px] uppercase tracking-[0.4em] text-[var(--muted)]">Neorw</p>
				<a href="/"><p class="text-lg font-semibold tracking-tight">Documentatios</p></a>
			</div>
		</div>
		<div class="flex items-center gap-3">
			<button
				type="button"
				on:click={() => (searchOpen = true)}
				class=""
				aria-label="Open search"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<circle cx="11" cy="11" r="7"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</button>
			<button
				type="button"
				on:click={toggleTheme}
				class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]"
				aria-label="Toggle dark mode"
			>
				<span class="text-[10px]">{theme === 'dark' ? 'Dark' : 'Light'}</span>
			</button>
		</div>
	</header>

	<main class="container-shell pb-16">
		{@render children()}
	</main>
</div>

{#if searchOpen}
	<div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" on:click={closeSearch}></div>
	<div
		class="fixed left-1/2 top-20 z-50 w-[90vw] max-w-2xl -translate-x-1/2 card px-6 py-6"
	>
		<div class="flex items-center justify-between gap-4">
			<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Search</p>
			<button type="button" class="tag" on:click={closeSearch}>Close</button>
		</div>
		<div class="mt-4">
			<input
				type="search"
				placeholder="Search docs..."
				bind:value={searchQuery}
				class="w-full rounded-2xl border px-5 py-4 text-sm transition focus:outline-none"
				style="border-color: var(--line); background: var(--surface); color: var(--text)"
			/>
		</div>
		<div class="mt-5 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
			{filteredDocs.length} results
		</div>
		<div class="mt-4 flex max-h-[50vh] flex-col gap-3 overflow-auto">
			{#each filteredDocs as doc}
				<a href={`/docs/${doc.slug}`} class="card px-5 py-4" on:click={closeSearch}>
					<p class="text-sm font-semibold">
						{@html highlight(doc.title)}
					</p>
					<p class="mt-2 text-xs text-[var(--muted)]">
						{@html highlight(doc.summary)}
					</p>
				</a>
			{/each}
		</div>
	</div>
{/if}
