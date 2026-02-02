---
title: Getting Started
summary: Set up your first docs, understand the folder structure, and publish fast.
order: 1
category: Foundations
---

# Getting Started

Welcome to your documentation system. Every page is a markdown file, compiled at build time and rendered with a minimal Swiss layout.

## Quick path

1. Add a markdown file under `src/content/docs`.
2. Use frontmatter to set `title`, `summary`, `order`, and `category`.
3. Save and reload — the index, sidebar, and search update automatically.

## Structure

Each doc is stored as plain text. Keep headlines short, write dense paragraphs, and let white space do the talking.

```txt
src/content/docs/
  getting-started.md
  authoring-guide.md
  customization.md
  deployment.md
  content-style.md
```

## First edits

- Update the `title` and `summary` to match your content.
- Use `#` once per file for the main heading.
- Use `##` and `###` for sections so the “On this page” navigation works.
