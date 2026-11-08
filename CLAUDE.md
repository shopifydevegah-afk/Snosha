# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Shopify theme for the **SNOSHA** store, based on Shopify's **Horizon** theme (v4.4.0, see `config/settings_schema.json`). There is no build step, package.json, or test suite — files are uploaded to Shopify as-is. Store customizations are layered on top of stock Horizon files.

## Commands (Shopify CLI)

```bash
shopify theme dev --store <store>.myshopify.com   # local preview with hot reload
shopify theme check                               # lint Liquid/JSON (Theme Check)
shopify theme push / shopify theme pull           # sync with the store
```

Run `shopify theme pull` before editing JSON templates or `config/settings_data.json` if the merchant may have changed things in the theme editor — those files are rewritten by the editor (they carry an "auto-generated" header comment) and local edits can be overwritten or cause conflicts.

## Architecture

- **Blocks-first (Horizon) structure.** Sections are mostly thin wrappers that call `{% content_for 'blocks' %}`; most UI lives in `blocks/`. Files prefixed with `_` (e.g. `blocks/_card.liquid`) are private blocks only usable inside specific parent sections/blocks; unprefixed blocks are theme blocks usable anywhere (`"type": "@theme"`). `sections/_blocks.liquid` overrides Shopify's wrapper for AI-generated blocks.
- **Page composition is in JSON.** `templates/*.json`, `sections/header-group.json` and `sections/footer-group.json` define which sections/blocks appear and their settings. Custom Snosha templates: `templates/product.custom-snosha-product.json` and `templates/collection.custom-snosha-collection.json` (copies of the default product/collection templates, customized in the editor).
- **CSS** is mostly co-located in `{% stylesheet %}` tags inside sections/blocks/snippets, plus `assets/base.css`. Global CSS variables come from `snippets/theme-styles-variables.liquid` and `snippets/color-palette.liquid`, driven by theme settings.
- **JavaScript** is native ES modules with no bundler. `snippets/scripts.liquid` defines an importmap mapping `@theme/<name>` to `assets/<name>.js`; new shared modules must be added there. Components extend `Component` from `assets/component.js`, a custom-element base class that collects child elements with `ref="name"` / `ref="items[]"` into `this.refs` and wires declarative event attributes like `on:click="/methodName"`.
- **Translations:** schema labels use `t:` keys resolved from `locales/*.schema.json`; storefront strings come from `locales/*.json` (`en.default.json` is the source). The layout sets `dir` from `request.locale.direction`, so RTL (Arabic) is supported via the locale.

## Figma → Shopify work

All Figma implementation follows the project skill `.claude/skills/figma-to-sections-workflow/SKILL.md`: native-first reuse, an on-demand `custom_class` setting, class-scoped CSS in per-developer files, and the permanent project plan at `.claude/shosha/project-plan.md` (read it before work and update it incrementally; never recreate it).

## Snosha-specific customizations

- **Cairo font:** `assets/cairo-variable.woff2` + `assets/custom-cairo.css.liquid` define a `"Cairo Custom"` @font-face and override the `--font-*--family` CSS variables. It is loaded in `layout/theme.liquid` right after `{{ content_for_header }}` so it wins over the theme-setting fonts.
- `assets/main.css` is the Main developer's CSS file and loads right after `custom-cairo.css`. Other developers' files (`dev1.css`–`dev3.css`) are created and loaded only when that developer starts (see the skill's developer-css-ownership reference).
- When adding custom code, prefer new files (your developer CSS file, new snippets/blocks) over editing stock Horizon files, to keep future Horizon updates easier to merge.
