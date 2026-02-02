---
title: Search + Theme
summary: Real-time indexing and local theme persistence.
order: 4
category: Experience
---

# Search + Theme

Search is instant and local. It filters through titles and the full text of every markdown file.

## Behavior

- Typing updates the list immediately.
- Results are ranked by the document order, then title.
- Clear the field to return to the full index.

## Theme toggle

The toggle writes a `theme` key to `localStorage`, then applies the theme at the document root.
