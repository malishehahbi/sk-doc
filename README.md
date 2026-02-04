# sk-doc

A modern Svelte-based documentation and blogging platform built with SvelteKit, Tailwind CSS, and Markdown support.

## 📋 Overview

**sk-doc** is a lightweight, fast, and elegant static site generator designed for creating documentation sites and blogs. Built on SvelteKit with TypeScript support, it combines the power of Svelte components with the simplicity of Markdown content.

## ✨ Features

- **🎨 Svelte + SvelteKit**: Modern, reactive component framework with excellent developer experience
- **🎯 TypeScript Support**: Full TypeScript support for type-safe development
- **📝 Markdown Support**: Write content in Markdown with `gray-matter` for frontmatter parsing and `marked` for rendering
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **⚡ Vite-powered**: Lightning-fast build tool and development server
- **🔧 Static Adapter**: Built-in static site generation for easy deployment
- **📱 Responsive Design**: Mobile-first, responsive layouts out of the box

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/malishehahbi/sk-doc.git

# Navigate to the project directory
cd sk-doc

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev

# Or open in browser automatically
npm run dev -- --open
```

The app will be available at `http://localhost:5173`

### Type Checking

Run type checking and Svelte validation:

```bash
npm run check

# Or watch mode for continuous checking
npm run check:watch
```

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
sk-doc/
├── src/              # Source code
│   ├── routes/       # SvelteKit routes and pages
│   ├── lib/          # Reusable components and utilities
│   └── app.svelte    # Root component
├── static/           # Static assets (images, fonts, etc.)
├── svelte.config.js  # SvelteKit configuration
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies and scripts
```

## 🛠️ Technology Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev) - The fastest way to build Svelte apps
- **Language**: [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Build Tool**: [Vite](https://vitejs.dev) - Next generation frontend tooling
- **Content**: [Marked](https://marked.js.org) - Markdown parser and compiler
- **Frontmatter**: [Gray Matter](https://github.com/jonschlinkert/gray-matter) - Parse YAML/JSON frontmatter

## 📚 Usage

### Creating Content

Create Markdown files in your content directory with frontmatter:

```markdown
---
title: My First Post
date: 2024-02-04
description: A short description
---

# My First Post

Your content goes here...
```

### Customization

- Modify Tailwind CSS styles in `svelte.config.js`
- Add custom components in `src/lib/`
- Create new routes in `src/routes/`

## 🚢 Deployment

### Static Hosting

The project uses `@sveltejs/adapter-static` for static site generation, making it easy to deploy to:

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

Simply run `npm run build` and deploy the `build/` directory.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## 💡 Tips

- Use `npm run check` before committing to catch TypeScript errors
- Keep components modular and reusable in `src/lib/`
- Leverage Svelte's reactivity for dynamic content
- Use Tailwind's responsive utilities for mobile-first design

---

**Happy documenting! 🎉**
