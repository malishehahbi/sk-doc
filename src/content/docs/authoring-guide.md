---
title: Authoring Guide
summary: How to add, organize, and customize documentation in this app.
order: 5
category: Authoring
---

# Authoring Guide

This app is markdown-first. Every document lives as a `.md` file under `src/content/docs` and is automatically indexed for search and navigation.

## Create a new doc

1. Add a markdown file in `src/content/docs`.
2. Include frontmatter for metadata.
3. Write content using standard markdown headings.

```md
---
title: My New Doc
summary: A short summary shown in cards and search.
order: 6
category: Authoring
---

# My New Doc

Your content here.
```

## Organize by category

Use the `category` field to group docs in the left sidebar.

Example categories:
- Foundations
- Experience
- Authoring

## Control ordering

The `order` field controls sort order. Lower numbers appear first.

If `order` is missing, the document appears after ordered items.

## Headings and "On this page"

The right sidebar and mobile accordion are built from `#`, `##`, and `###` headings.

Use a single `#` for the page title and `##`/`###` for sections.

## Search behavior

Global search (in the navbar) indexes:
- Title
- Summary
- Full content

In-page search highlights matches inside the current document.

## Customize styling

UI styles live in:
- `src/routes/layout.css` (colors, typography, components)

You can adjust:
- Color tokens in `:root` and `.dark`
- Card styles (`.card`)
- Typography scale for headings and body text

## Deploying

This app is configured for GitHub Pages using the static adapter.

Make sure:
- `svelte.config.js` uses `@sveltejs/adapter-static`
- `paths.base` matches your repo name
- `.nojekyll` exists in `static/`

Build output is in `build/`.
