# Horizon 4.4 architecture: as found in this repo

Audited 2026-11-08. Paths and selector names were checked against the code. Line numbers change over time, so search by selector or setting ID.

## Rendering model

- **Sections** (`sections/*.liquid`, 40 files plus `header-group.json`/`footer-group.json`). Shopify wraps each one in `<div id="shopify-section-…" class="shopify-section {schema.class}">`. The schema `"class"` value is static, so per-instance classes have to go on an element *inside* the section.
- **Typical section root** (product-list, collection-list, carousel, media-with-content, marquee, main-collection, footer, …):
  ```liquid
  <div class="section-background color-custom-{{ section.id }}"></div>   ← sibling, paints the background
  <div class="section section--{{ section.settings.section_width }} spacing-style …" style="{% render 'spacing-style' … %}">
  ```
  The **`.section` div is where `custom_class` goes.** `.section-background` is its sibling, so descendant selectors don't reach it. It's absolutely positioned (`inset: 0`) by `.shopify-section:not(.header-section) .section-background`, so **backgrounds always fill the full width** whatever `section_width` is. Where the background sits:
  - Most sections: a direct child of `.shopify-section`, immediately followed by `.section`.
  - `main-blog`, `product-recommendations`: inside a wrapper element, still immediately followed by `.section`.
  - `main-cart`: inside a `<template>`.
  - `hero`, `header`, `product-information` and some others: none.
  Background selectors are in custom-class-policy.md §5.
- **Generic section** `sections/section.liquid` and the AI wrapper `sections/_blocks.liquid` both use `snippets/section.liquid`: `.section-background` + `.section` › `.custom-section-background` + `.custom-section-content` › **`.section-content-wrapper.spacing-style`**. Here the padding sits on the inner wrapper, not on `.section`. Adding the class to `.section` in the snippet covers both sections, and it outputs nothing where the setting isn't defined.
- **Hero:** root `.hero` (background media, overlay and blur render inside it), then the inner `.hero__container.spacing-style.section.section--full-width`. **Other roots:** `header.liquid` is a complex header component, and `product-information.liquid` / `featured-product-information.liquid` compose static blocks (`_product-media-gallery`, `_product-details`). Look at each file before adding a class.
- **Theme blocks** (`blocks/*.liquid`, 95 files). Unprefixed blocks are public (`"type": "@theme"` lets them nest anywhere). `_`-prefixed blocks are private and only used by specific parents. Blocks that accept `@theme` children: `group`, `_content`, `_card`, `_slide`, `_layered-slide`, `_product-details`, `_product-list-content`, `_collection-info`, `_accordion-row`, `featured-collection`, `popup-link`, `product-recommendations`.
- **Static blocks:** sections render fixed blocks with `{% content_for 'block', type: '…', id: '…' %}`. For example, product-list renders `_product-list-content` (header) and one `_product-card` per product, and they all share one block's settings.
- **Shared rendering snippets:** many blocks hand their markup to a snippet, so the root element lives in the snippet:
  - `snippets/text.liquid`: takes a `class` param (used by `text`, `_heading`, `product-title`, `product-description`, `collection-title`, …)
  - `snippets/group.liquid`: takes `class` and `style` params (`group`, `_content`, `_product-card-group`, `_product-details`, …)
  - `snippets/button.liquid`: **no** class param; root classes come from `block_settings.style_class`
  - `snippets/product-card.liquid`: root is `.product-card`, with no class param
- **`{% stylesheet %}`** is used in 154 sections/blocks/snippets. Shopify bundles it into one compiled stylesheet. There's only one `{% javascript %}` tag; JS lives in `assets/`.

## Layout grid & widths (`assets/base.css`)

- The body gets `page-width-{{ settings.page_width }}`. Current value: **`normal`**. Options: narrow / normal / wide.
- Tokens: `--narrow-page-width: 90rem`, `--normal-page-width: 120rem`, `--wide-page-width: 150rem`, `--normal-content-width: 42rem`.
- `--page-margin` is 16px below 750px and 40px from 750px up (or the safe-area inset if that's larger).
- `.section` is a 3-column grid (`margin | content | margin`). `.section--page-width > *` sits in column 2 and `.section--full-width > *` spans `1 / -1`. There's also `.section--full-width-margin`, `.section--mobile-full-width` and `.force-full-width`. **Don't replace this with `max-width + margin:auto`** (base.css says this explicitly).
- Section settings: `section_width` (`page-width` | `full-width`), `section_height` (+ custom svh), `content_direction`, alignment, `gap`, `vertical_on_mobile`, border, background media and overlay.

### Layout levels (use the lowest level that achieves the design)

| Level | Native mechanism | Scope |
|---|---|---|
| 1. Global page width | `settings.page_width` → body class `page-width-{narrow\|normal\|wide}` sets `--page-content-width` and `--page-width` (current: normal = 120rem) | Whole site. **Protected:** change it only with approval |
| 2. Section width | `section_width` `page-width` (content in grid column 2) or `full-width` (spans `1 / -1`), in 24 sections. Internal variants: `section--full-width-margin` (header, mega menu), `section--mobile-full-width` (slideshow), `page-width-content` (main-page, 42rem) | Per section |
| 3. Inner content width | **No per-section setting.** Use block widths (`width`/`custom_width`/`max_width` on group/text), or a class-scoped container override (below) | Per section or block |
| 4. Block layout | `group`: direction, alignment, gap, width/height, `vertical_on_mobile`. Lists: `layout_type`, `columns`, `mobile_columns`, `carousel_on_mobile` | Per block or section |
| 5. Background vs content | `.section-background` always spans the full width. Content follows levels 2–4 | — |

**Class-scoped container override.** `--page-width` is calculated on `<body>` and inherited as a fixed value, so overriding only `--page-content-width` changes the margin offset but **not** the grid's central column. Override both, on the classed `.section` element (or an ancestor such as `.hero`):
```css
.sn-x { --page-content-width: 80rem; --page-width: calc(var(--page-content-width) + var(--page-margin) * 2); }
```
This only affects `section--page-width`. Full-width content ignores it. Removing the class returns to the global width (reversibility level 1). Never replace the grid with `max-width` + `margin: auto` (base.css says this explicitly).

## Spacing

- `snippets/spacing-style.liquid` reads `padding-block-start`, `padding-block-end`, `padding-inline-start` and `padding-inline-end` (0–100px). It outputs CSS variables on `.spacing-style`.
- **Auto-scaling (affects pixel accuracy):** values above 20px are output as `max(20px, calc(var(--spacing-scale) * Npx))`. `--spacing-scale` is **0.7 below 990px** and 1.0 from 990px. So a 60px desktop padding renders as 42px on mobile. These variables are written into the element's **inline style**, so a class rule can't override them on the same element. If the Mobile Figma frame needs a different value, override the `padding-block`/`padding-inline` property instead (custom-class-policy.md §5).
- `padding-block` adds `var(--section-top-offset, 0px)`, which pushes the first section in `<main>` down under a transparent header. Keep it in any override.
- Gap tokens: `--gap-3xs` … `--gap-3xl`. `snippets/gap-style.liquid` and `layout-panel-style.liquid` render gap and flex layout.
- There are **no** separate mobile padding settings and no device-visibility settings anywhere in the theme.

## Typography

- Global: four `font_picker` roles (body / subheading / heading / accent) → `--font-{role}--family`, and per-level h1–h6 + paragraph settings (`type_size_*`, `type_line_height_*`, `type_letter_spacing_*`, `type_case_*`) → `--font-h1--size` etc. Utility sizes: `--font-size--3xs` (0.625rem) … `--font-size--6xl` (3.5rem).
- Current global setting values are Inter. **However**, `assets/custom-cairo.css.liquid` (loaded in `layout/theme.liquid` after `content_for_header`) defines the `"Cairo Custom"` @font-face (`cairo-variable.woff2`, weights 200–1000) and overrides all four `--font-*--family` variables on `:root`. **The site renders in Cairo.** Font weights come from the theme settings / type presets.
- Text-type blocks have `type_preset` plus custom `font`, `font_size`, `line_height`, `letter_spacing`, `case`, `alignment`, `width`/`max_width` and `color`. Use these before writing CSS.

## Color

- Horizon 4.4 uses a **color palette** (`settings.color_palette`: background, foreground, color1–3), **not** legacy color schemes. Sections and blocks have their own `background_color` / `text_color`. `snippets/contrast-override.liquid` scopes the computed text, border and form tokens to `.color-custom-{id}`.
- Current palette: `#ffffff`, `#000000`, `#DCF2FB`, `#dfdfdf`, `#F0FAFE`. Page background is `#FDFEFF`, and primary buttons are `#176BB0` with white text.
- Use `var(--color-foreground)`, `var(--color-background)`, `rgb(var(--color-foreground-rgb) / var(--opacity-50))` and similar instead of hex values.

## Breakpoints (counted in the code)

`min-width: 750px` (214 uses) / `max-width: 749px` (118) is the main mobile↔desktop switch, and native settings like `mobile_columns` and `carousel_on_mobile` flip there too. `990px` is the next tier (`--spacing-scale` changes there). `1200px`, `1400px` and `1600px` are used occasionally. There are no container queries in base.css, though `cqw` units show up in some settings.

**Project mapping** (follows Horizon so native and custom rules switch at the same width):
- Mobile `max-width: 749px` · Tablet `750–989px` · Small desktop `990–1439px` · Large desktop `min-width: 1440px`.
- Don't use 768px or 1150px. Between 750 and 767px the native layout is already desktop while a 768px rule would still be mobile. Only add a breakpoint if Figma needs one, and note it in the plan.

## RTL

- `layout/theme.liquid` sets `dir="{{ request.locale.direction | default: 'ltr' }}"`. Arabic (`locales/ar.json`) gives `rtl`.
- CSS has 35 `[dir='rtl']` rules (slideshow arrows in `slideshow-arrow.liquid`, `.close-button`, drawers, popovers, variant picker, pagination, …).
- JS: `isRTL(element)` and `getDirectionMultiplier(element)` in `assets/utilities.js`, used by `scrolling.js`, `slideshow.js` and `anchored-popover.js`. Reuse them; don't write new direction checks.
- base.css uses logical properties (`padding-inline` and similar) and has no physical `margin-left`/`margin-right`. Keep it that way.

## JavaScript

Plain ES modules, no bundler. The importmap in `snippets/scripts.liquid` maps `@theme/<name>` to `assets/<name>.js`. Components extend `Component` (`assets/component.js`): child elements with `ref="name"` or `ref="items[]"` show up in `this.refs`, and declarative events look like `on:click="/method"`. Before writing new JS, reuse what exists: slideshow/carousel (`slideshow.js`), scrolling, dialogs, drawers (`theme-drawer.js`), quick-add, variant picker, cart drawer, and `morph.js`/section-renderer for re-rendering.

## CSS loading order (current)

1. `snippets/stylesheets.liquid`: `overflow-list.css` (preload) and `base.css`
2. Inline style variables (`theme-styles-variables`, `color-palette`, `card-hover-effect-styles`)
3. `{{ content_for_header }}`, which includes the compiled `{% stylesheet %}` bundle
4. `custom-cairo.css` (in `layout/theme.liquid`, after `content_for_header`)

5. `main.css` (Main developer, loaded since 2026-11-08). `dev1`–`dev3.css` are added on demand in that order (see developer-css-ownership.md)

## Platform features we don't use for Figma work

The Theme Editor's per-section "Custom CSS" is stored as `custom_css` in the template JSON (currently unused). It's merchant-only, length-limited, invisible in our CSS files and can't be split by owner, so don't use it for Figma implementation.

## Tooling baseline

- Shopify CLI is installed (`shopify version` → 4.9.4).

### Theme Check baseline (re-verified 2026-11-08: 9 offenses, 2 errors, 7 warnings)

| Severity | Check | File : line | Notes |
|---|---|---|---|
| error | `UnknownFilter` (`applicable_disclosures`) | `blocks/disclosures.liquid:2` | Possibly a platform filter newer than this CLI's Theme Check data (**not verified**). If disclosures render wrong in the preview, that's this issue, not ours |
| error | `UnknownFilter` (`applicable_disclosures`) | `snippets/cart-disclosure-tooltip.liquid:28` | Same |
| warning | `ExcessiveSettingsCount` (42 > 40) | `sections/header.liquid:1274` | Adding a setting here makes the warning bigger |
| warning | `UnusedDocParam` ×5 | `snippets/divider.liquid:7,9,10,11,12` | Doc-only |
| warning | `LiquidComplexity` (125 > 120) | `snippets/product-media-gallery-content.liquid:408` | Adding any condition here raises it |

All five files are unchanged since the repo's first commit (`e00017f`). They probably come from Horizon as imported, but that isn't proven. Don't fix baseline issues as a side effect of Figma work. **Pass criterion for future work:** no offenses other than these (same check, file and count), and no worse numbers on these.

**Settings count:** `ExcessiveSettingsCount` is a Theme Check *warning* (default max 40 top-level settings). It's a maintainability guideline, **not** a confirmed Shopify platform limit; check [shopify.dev theme limits](https://shopify.dev/docs/storefronts/themes/architecture/limits) before going far beyond it. Schemas near the threshold: `header` 42, `group` 36, `hero` 36, `_product-card-group` 35, `comparison-slider` 30.
- Git: the repo has commits; the theme editor writes to the JSON templates and `settings_data.json` (there's an "auto-generated" header comment).
