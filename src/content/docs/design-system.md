---
title: Layout & Design System
summary: The layout rules, spacing, and styling tokens that define the docs template.
order: 2
category: Foundations
---

# Layout & Design System

The interface uses a restrained palette and a clear grid. Cards are bordered, typography is quiet, and spacing stays consistent across pages.

## Tokens and theming

- Light mode uses warm neutrals; dark mode uses deep charcoal.
- Accent lines are subtle and grid-aligned.
- Typography uses a clean sans-serif with a geometric edge.

Edit these in `src/routes/layout.css`:
- `:root` for light mode
- `.dark` for dark mode

## Layout rules

- Default section spacing is large to keep content breathable.
- Use asymmetric columns to avoid heavy symmetry.
- Avoid stacking dense blocks back‑to‑back.

## Components

Common styles live in `layout.css`:
- `.card` for containers
- `.tag` for pills/buttons
- `.doc-body` for markdown typography
