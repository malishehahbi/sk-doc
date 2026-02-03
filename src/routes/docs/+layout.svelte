<script lang="ts">
	import { base } from '$app/paths';
	let { data, children } = $props();
	let sidebarOpen = $state(false);

	let grouped = $derived.by(() => {
		const groups = new Map<string, typeof data.docs>();
		for (const doc of data.docs) {
			const list = groups.get(doc.category) ?? [];
			list.push(doc);
			groups.set(doc.category, list);
		}
		return Array.from(groups.entries()).map(([category, docs]) => ({
			category,
			docs
		}));
	});
</script>

<div class="mb-6 flex items-center gap-3 lg:hidden">
	<button
		type="button"
		on:click={() => (sidebarOpen = true)}
		class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]"
		aria-label="Open sections"
	>
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<line x1="4" y1="7" x2="20" y2="7"></line>
			<line x1="4" y1="12" x2="20" y2="12"></line>
			<line x1="4" y1="17" x2="20" y2="17"></line>
		</svg>
		<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Docs</p>
	</button>
	
</div>

<div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
	<aside class="card h-fit px-6 py-8 lg:sticky lg:top-24 hidden lg:block">
		<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Documentation</p>
		<nav class="mt-6 flex flex-col gap-6">
			{#each grouped as group}
				<div>
					<p class="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
						{group.category}
					</p>
					<ul class="mt-3 flex flex-col gap-3">
						{#each group.docs as doc}
							<li>
								<a
									href={`${base}/docs/${doc.slug}`}
									class="block text-sm text-[var(--text)] transition hover:text-[var(--muted)]"
								>
									{doc.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside>
	<section>
		{@render children()}
	</section>
</div>

<div
	class={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
	on:click={() => (sidebarOpen = false)}
></div>
<aside
	class={`fixed left-4 top-6 z-50 h-[calc(100%-3rem)] w-72 px-6 py-8 shadow-xl transition ${
		sidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'
	} lg:hidden card rounded-3xl`}
>
	<div class="flex items-center justify-between">
		<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Documentation</p>
		<button type="button" class="tag" on:click={() => (sidebarOpen = false)}>Close</button>
	</div>
	<nav class="mt-6 flex flex-col gap-6">
		{#each grouped as group}
			<div>
				<p class="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
					{group.category}
				</p>
				<ul class="mt-3 flex flex-col gap-3">
					{#each group.docs as doc}
						<li>
							<a
								href={`${base}/docs/${doc.slug}`}
								class="block text-sm text-[var(--text)] transition hover:text-[var(--muted)]"
								on:click={() => (sidebarOpen = false)}
							>
								{doc.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
</aside>
