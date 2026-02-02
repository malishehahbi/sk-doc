---
title: Customization
summary: Adjust colors, typography, and layout to fit your brand.
order: 6
category: Authoring
---

# Customization

You can tailor the visual system without touching the docs data.

## Colors

Edit theme tokens in `src/routes/layout.css`:

- `:root` for light mode
- `.dark` for dark mode

Keep contrast high and avoid overly saturated colors to preserve the Swiss layout tone.

## Typography

The base font stack is defined in `layout.css` under `html` and heading styles. You can:

- Swap the font families
- Adjust heading letter-spacing
- Modify line-height for body text

## Components

Core classes:

- `.card` for containers
- `.tag` for buttons and pills
- `.doc-body` for markdown typography

Change spacing and border radius to alter the mood while keeping the grid intact.
