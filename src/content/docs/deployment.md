---
title: Deployment
summary: Build and deploy the docs to GitHub Pages.
order: 7
category: Operations
---

# Deployment

This project is configured for static hosting on GitHub Pages.

## Requirements

- `@sveltejs/adapter-static` in `package.json`
- `paths.base` set to your repo name in `svelte.config.js`
- `static/.nojekyll` present

## Build locally

```bash
npm install
npm run build
```

The output is in `build/`.

## GitHub Pages

Push to `main` to trigger the workflow in `.github/workflows/deploy.yml`.

If your site is at `https://<user>.github.io/my-app-11`, keep:

```js
paths: { base: '/my-app-11' }
```

If the site is a root domain, use:

```js
paths: { base: '' }
```
