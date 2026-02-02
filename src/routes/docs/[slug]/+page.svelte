<script lang="ts">
	let { data } = $props();
	let copyLabel = $state('Copy as MD');
	let docSearch = $state('');
	let articleEl: HTMLElement | null = null;

	const copyMarkdown = async () => {
		try {
			await navigator.clipboard.writeText(data.doc.content);
			copyLabel = 'Copied';
			setTimeout(() => {
				copyLabel = 'Copy as MD';
			}, 1500);
		} catch {
			copyLabel = 'Failed';
			setTimeout(() => {
				copyLabel = 'Copy as MD';
			}, 1500);
		}
	};

	const highlightInElement = (root: HTMLElement, query: string) => {
		const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
		const textNodes: Text[] = [];
		let current = walker.nextNode();
		while (current) {
			if (current.nodeValue && current.nodeValue.trim()) {
				textNodes.push(current as Text);
			}
			current = walker.nextNode();
		}
		for (const node of textNodes) {
			const text = node.nodeValue ?? '';
			const regex = new RegExp(escaped, 'gi');
			if (!regex.test(text)) continue;
			const span = document.createElement('span');
			span.innerHTML = text.replace(regex, '<mark>$&</mark>');
			node.replaceWith(span);
		}
	};

	$effect(() => {
		if (!articleEl) return;
		articleEl.innerHTML = data.doc.html;
		const query = docSearch.trim();
		if (!query) return;
		highlightInElement(articleEl, query);
	});
</script>

<svelte:head>
	<title>{data.doc.title} · My App 11</title>
</svelte:head>

<section class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
	<div>
		<div class="card px-8 py-10">
			<div class="flex flex-wrap items-center justify-between gap-6">
				<div>
					<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{data.doc.category}</p>
					<h1 class="mt-4 text-3xl font-semibold">{data.doc.title}</h1>
					<p class="mt-3 max-w-2xl text-sm text-[var(--muted)]">{data.doc.summary}</p>
				</div>
				<div class="flex flex-wrap items-center gap-3"></div>
			</div>

			<div class="mt-8 lg:hidden">
				<details class="group">
					<summary class="flex cursor-pointer list-none items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
						On this page
						<svg
							class="text-[var(--muted)] transition group-open:rotate-180"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</summary>
					<div class="mt-4">
						{#if data.doc.toc.length === 0}
							<p class="text-sm text-[var(--muted)]">No headings available.</p>
						{:else}
							<ul class="flex flex-col gap-3 text-sm">
								{#each data.doc.toc as item}
									<li class={item.level === 2 ? 'ml-2' : item.level === 3 ? 'ml-4' : ''}>
										<a
											href={`#${item.id}`}
											class="text-[var(--muted)] transition hover:text-[var(--text)]"
										>
											{item.text}
										</a>
									</li>
								{/each}
							</ul>
						{/if}
					</div>

					<div class="mt-6 border-t pt-4" style="border-color: var(--line)">
						<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Search in page</p>
						<input
							type="search"
							placeholder="Search this doc..."
							bind:value={docSearch}
							class="mt-3 w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none"
							style="border-color: var(--line); background: var(--surface); color: var(--text)"
						/>
					</div>
				</details>
			</div>
		</div>

		<article class="card mt-8 px-8 py-10 doc-body" bind:this={articleEl}>
			{@html data.doc.html}
		</article>

		<div class="card mt-8 px-8 py-6 lg:hidden">
			<div class="flex flex-wrap items-center gap-3">
				<button
					type="button"
					on:click={copyMarkdown}
					class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]"
				>
					{copyLabel}
				</button>
				<a href="/" class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]">
					Back to Home
				</a>
			</div>
		</div>
	</div>

	<aside class="card h-fit px-6 py-8 lg:sticky lg:top-24 hidden lg:block">
		<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">On this page</p>
		{#if data.doc.toc.length === 0}
			<p class="mt-4 text-sm text-[var(--muted)]">No headings available.</p>
		{:else}
			<ul class="mt-4 flex flex-col gap-3 text-sm">
				{#each data.doc.toc as item}
					<li class={item.level === 2 ? 'ml-2' : item.level === 3 ? 'ml-4' : ''}>
						<a
							href={`#${item.id}`}
							class="text-[var(--muted)] transition hover:text-[var(--text)]"
						>
							{item.text}
						</a>
					</li>
				{/each}
			</ul>
		{/if}

		<div class="mt-8 border-t pt-6" style="border-color: var(--line)">
			<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Search in page</p>
			<input
				type="search"
				placeholder="Search this doc..."
				bind:value={docSearch}
				class="mt-4 w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none"
				style="border-color: var(--line); background: var(--surface); color: var(--text)"
			/>
		</div>

		<div class="mt-8 border-t pt-6" style="border-color: var(--line)">
			<p class="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Actions</p>
			<div class="mt-4 flex flex-col gap-3">
				<button
					type="button"
					on:click={copyMarkdown}
					class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]"
				>
					{copyLabel}
				</button>
				<a href="/" class="tag transition hover:border-[var(--accent)] hover:text-[var(--text)]">
					Back to Home
				</a>
			</div>
		</div>
	</aside>
</section>
