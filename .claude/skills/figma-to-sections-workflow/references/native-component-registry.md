# Native component registry

This is development documentation only. Nothing here runs. Start the Native Reuse Audit with this file, then confirm in the source, since files change.

**`custom_class` status:** stock Horizon 4.4 has **no** custom-class setting on any section or block. Every addition is listed in the extension log at the bottom.

## Currently used by the Snosha templates

| Template | Sections | Notable blocks |
|---|---|---|
| `templates/index.json` | `product-list` (disabled) | `_product-list-content`, `_product-list-text`, `_product-list-button`, `_product-card`, `_product-card-gallery`, `product-title`, `price` |
| `templates/product.custom-snosha-product.json` | `product-information`, `product-recommendations` | `_product-media-gallery`, `_product-details`, `group`, `text`, `price`, `variant-picker`, `buy-buttons`, `quantity`, `add-to-cart`, `accelerated-checkout`, `disclosures`, `_divider` |
| `templates/collection.custom-snosha-collection.json` | `section`, `main-collection` | `text`, `filters`, `_product-card`, `_product-card-gallery`, `product-title`, `price` |
| `sections/header-group.json` | `header-announcements`, `header` | `_announcement`, `_header-logo`, `_header-menu` |
| `sections/footer-group.json` | `footer`, `footer-utilities` | `footer-copyright` |

## Sections: where to put `custom_class`, and what to reuse them for

Root = the element that gets the class. "Static" = fixed blocks rendered by `content_for 'block'`.

| Section | Use for | Children | Class goes on |
|---|---|---|---|
| `section` (13 presets: custom, rich text, FAQ, video, …) | **Default choice for any freeform Figma layout** (heading/text/buttons/media/groups) | `@theme`, `@app`, `_divider` | `.section` in `snippets/section.liquid` (shared with `_blocks`). Padding sits on the inner `.section-content-wrapper` |
| `hero` | Banner with background media, overlay, height | `@theme`, text, button, logo, jumbo-text, group, `_marquee` | `.hero` root (no `.section-background`; padding on `.hero__container`) |
| `slideshow` / `layered-slideshow` | Hero sliders | `_slide` / `_layered-slide` (max 6), which accept `@theme` | `.section` div |
| `carousel` | Horizontal scroller of content cards | static `_carousel-content` + `group` | `.section` div |
| `media-with-content` | Image/video next to text | static `_media-without-appearance` + `_content-without-appearance` | `.section` div |
| `product-list` | Product grid / carousel / editorial from a collection (`layout_type`, `columns`, `mobile_columns`, `carousel_on_mobile`, `max_products`) | static `_product-list-content` header, `_product-card` per product | `.section.section-resource-list` |
| `collection-list` / `main-collection-list` | Collection grids/carousels | `@theme`, text, image, button, group… / collection cards | `.section` div |
| `collection-links` | Collection names list with image | static | `.section` div |
| `featured-product` / `featured-product-information` | Single product spotlight | static `_featured-product`, media | check the file |
| `product-hotspots` | Shoppable image | `_hotspot-product` | `.section` div |
| `featured-blog-posts` | Blog grid | `_featured-blog-posts-*` | `.section` div |
| `marquee` | Scrolling text/logos | text, icon, logo, `_divider` | `.section` div |
| `product-information` | PDP (gallery + details + extra blocks; sticky ATC) | static `_product-media-gallery`, `_product-details` (`@theme` inside) | check the file (composes static blocks) |
| `product-recommendations` | Related products | `@theme`, `@app`, text, group… | `.section` div |
| `main-collection` | Collection page grid, filters, sorting | static | `.section` div |
| `header`, `header-announcements`, `footer`, `footer-utilities` | Global chrome | various | `header`: complex. Read the file, treat it as shared, and note it is already at 42 settings |
| `divider`, `logo`, `custom-liquid` | Utility | none | `.section` div |
| Main templates: `main-cart`, `main-blog`, `main-blog-post`, `main-page`, `main-404`, `search-*`, `password*`, `predictive-search*`, `quick-order-list`, `cart-drawer-section`, `section-rendering-product-card` | Page-type logic | — | Only customize if Figma covers that page. Several are rendered through the Section Rendering API, so keep their markup and IDs intact |

## Public theme blocks (nestable with `@theme`)

| Block | Purpose | Root / class hook |
|---|---|---|
| `group` | **Layout container**: flex direction, alignment, gap, width/height, padding, background, border, link, background media (36 settings) | `snippets/group.liquid` `.group-block`, pass `class:` |
| `text` | Rich text with type presets and custom font, size, line height, spacing, case, width, color | `snippets/text.liquid` `.text-block`, pass `class:` |
| `button` | Link button (primary/secondary style via `style_class`) | `snippets/button.liquid` `<a>`. **No class param**, so adding a class here is a Liquid change (category D) |
| `image`, `video`, `icon`, `logo`, `jumbo-text`, `spacer`, `accordion`, `comparison-slider`, `popup-link`, `custom-liquid` | Content primitives | inline in each block file |
| `product-card`, `collection-card`, `featured-collection`, `product-recommendations` | Resource cards/lists inside any section | `product-card` root is `.product-card` in `snippets/product-card.liquid` (no class param) |
| `product-title`, `price`, `sku`, `review`, `swatches`, `variant-picker`, `buy-buttons`, `quantity`, `add-to-cart`, `accelerated-checkout`, `product-description`, `product-inventory`, `product-custom-property`, `disclosures` | PDP / card details | mostly through `text` or their own snippets. **Don't change their JS hooks** |
| `menu`, `email-signup`, `social-links`, `payment-icons`, `footer-copyright`, `footer-policy-list`, `follow-on-shop`, `contact-form`, `filters`, `page`, `page-content`, `collection-title` | Footer, forms, pages | per file |

**Private blocks** (`_` prefix) belong to one parent: `_card` and `_slide` (accept `@theme`), `_content`, `_product-card` with `_product-card-gallery`/`_product-card-group`, `_product-details`, `_product-list-*`, `_header-*`, `_heading`, `_inline-text`, `_divider`, `_marquee`, `_accordion-row`, and others.

## Native media capabilities (from schemas, 2026-11-08)

| Component | Media settings |
|---|---|
| `hero` | `image_1`, `image_2`, `video_1`, `video_2` **plus mobile variants** `image_1_mobile`, `image_2_mobile`, `video_1_mobile`, `video_2_mobile` (the only native desktop/mobile media pair) |
| `section`, `_blocks`, `group`, `_card`, `_product-card-group`, `_product-details`, `_product-list-content`, `password` | `background_image` (image_picker) + `video` (background) |
| `_slide`, `_layered-slide` | `image_1`, `video_1` |
| `image` block | `image` (+ `image_ratio`) |
| `video` block | `video`, `video_url`, `cover_image` (poster) |
| `_media-without-appearance` (media-with-content) | `image`, `video` |
| `comparison-slider` | `before_image`, `after_image` |
| `product-hotspots` | `image` (+ `_hotspot-product` → `product`) |
| `icon`, `_accordion-row` | `image_upload` (custom image icon) |
| Resource media | `product-list`/`featured-collection` → `collection`; `collection-list`/`collection-links` → `collection_list`; `collection-card`/`_collection-image` → `collection`; `product-card`, `featured-product`, `product-recommendations` → `product`; `featured-blog-posts` → `blog` |

## Shared rendering snippets and their callers (from `grep "render '<name>'"`)

| Snippet | `class` param? | Callers |
|---|---|---|
| `section` | n/a (reads `section.settings`) | `sections/section.liquid`, `sections/_blocks.liquid` |
| `text` | ✅ `[class]` | blocks `text`, `_heading`, `product-title`, `product-description`, `collection-title`, `_blog-post-title`, `_featured-blog-posts-title`, `_product-list-text` |
| `group` | ✅ `[class]`, `[style]` | blocks `group`, `_content`, `_content-without-appearance` (already passes `class: 'media-with-content__content'`), `_product-card-group`, `_product-details`, `_product-list-content` |
| `button` | ❌ | blocks `button`, `_product-list-button` |
| `product-card` | ❌ | blocks `product-card`, `_product-card`, `_featured-product` |

Any change to these snippets must follow the shared-snippet rules in custom-class-policy.md §4. Record it in the log below.

## Reuse shortcuts

- **Figma "title + text + CTA" block** → `section` + `text` + `button`, or `group` for alignment. Don't build a new section.
- **Card grid** → `section` with `group` children (flex wrap), or `collection-list`. Product grid → `product-list`.
- **Slider** → `slideshow` / `carousel` / `product-list` with `layout_type: carousel`. Never add a slider library.
- **Image + text** → `media-with-content`.
- **Accordion / FAQ** → `section` preset "FAQ" (`accordion` + `_accordion-row`).

## Project extension log

Add a row for every schema setting added, structural change, or new component. Newest last.

| Date | Component (file) | Change | Setting IDs | Category | Reversibility (`CLASS_ONLY` / `CLASS_PLUS_SETTINGS` / `OPT_IN_STRUCTURAL` / `NOT_FULLY_REVERSIBLE`) | Notes / limitations |
|---|---|---|---|---|---|---|
| 2026-11-11 | `snippets/custom-class.liquid` (new) | Sanitizing class helper (§3 of custom-class-policy) | — | — | n/a | Sanitizer test matrix not run yet (needs a render) |
| 2026-11-11 | `sections/header-announcements.liquid` | `custom_class` rendered on the `<aside class="announcement-bar …">` root | `custom_class` | B | `CLASS_PLUS_SETTINGS` (expected; untested) | S01 |
| 2026-11-11 | `blocks/_announcement.liquid` | Optional icon before the text (default `assets/icon-sparkle-brand.svg`, override by image picker) plus mobile size/weight; setting-driven `{% stylesheet %}` | `show_icon`, `icon_image`, `font_size_mobile`, `weight_mobile` | B | `OPT_IN_STRUCTURAL: show_icon` (defaults = native) | S01. Icon mode forces a flex row over the native `.text-block` column (fixed 2026-11-11) |
| 2026-11-11 | `sections/header.liquid` | `custom_class` appended to the `<header-component>` class (via `snippets/custom-class.liquid`); schema now 43 settings | `custom_class` | B | `CLASS_PLUS_SETTINGS: drawer_accordion, drawer_dividers` (expected; untested; `search_position` no longer needed after fix round 1) | S02. Figma glyphs painted over the native SVGs with CSS masks from `main.css` (`icon-header-*.svg`); no markup or JS changes to actions, search or drawer |
| 2026-11-11 | `blocks/_header-menu.liquid` | Added a `15px` (`0.9375rem`) option to the existing "Top level size" select (user request; Figma nav is 15px) | `type_font_primary_size` (option only) | B | n/a (default unchanged at `1rem`; existing instances unaffected) | S02. Used only for the desktop menu size (`--menu-top-level-font-size-desktop`) |
| 2026-11-11 | `sections/footer.liquid` | `custom_class` on the `.section` element (via `snippets/custom-class.liquid`) | `custom_class` | B | `CLASS_PLUS_SETTINGS` (expected; footer padding, composed blocks) | S15 |
| 2026-11-11 | `sections/footer-utilities.liquid` | `custom_class` on the `.section` element | `custom_class` | B | `CLASS_PLUS_SETTINGS` (expected; utilities padding) | S15 |
| 2026-11-11 | `blocks/email-signup.liquid` | Optional input placeholder; blank falls back to the `blocks.email_signup.placeholder` translation | `placeholder` | B | n/a (blank = native) | S15. Shared block used outside the footer too; form logic untouched |
| 2026-11-11 | `blocks/footer-copyright.liquid` | Optional text after the store name (the year stays dynamic) | `suffix_text` | B | n/a (blank = native) | S15 |
| 2026-11-11 | `sections/footer.liquid` | "Menu typography": 8 settings output as `--footer-menu-*` variables on `.footer-content` (consumed only under `.sn-footer-main`) | `menu_heading_size`, `menu_heading_weight`, `menu_heading_size_mobile`, `menu_heading_weight_mobile`, `menu_link_size`, `menu_link_weight`, `menu_link_size_mobile`, `menu_link_weight_mobile` | B | n/a (no visual effect without the class) | S15 fix round 1 |
| 2026-11-11 | `blocks/footer-copyright.liquid` | Optional brand name replaces `shop.name` | `brand_text` | B | n/a (blank = native) | S15 fix round 1 |
| 2026-11-11 | `blocks/footer-copyright.liquid` | Year and name isolated with `<bdi>`; optional `dir` on the block root; weight and mobile size/weight output as variables (consumed under `.sn-footer-utilities`) | `font_weight`, `font_size_mobile`, `font_weight_mobile`, `text_direction` | B | n/a (`text_direction` blank = page direction; the `<bdi>` isolation doesn't change the order in a plain RTL or LTR line) | S15 fix round 2 |
