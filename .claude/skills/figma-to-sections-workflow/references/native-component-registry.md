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
| `collection-list` / `main-collection-list` | Collection grids/carousels. `collection-list` presets: `t:names.collections_bento`, `collections_grid`, **`collections_carousel`** ("Collection list: Carousel" / ar "قائمة المجموعات: عرض دائري": `group` "Header" > `text`, static `_collection-card` > `_collection-card-image` + `collection-title`, `layout_type` carousel), `collections_editorial` | `@theme`, text, image, button, group… / collection cards | `.section` div |
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
| 2026-11-08 | `snippets/custom-class.liquid` (new, shared) | Sanitizing snippet created per custom-class-policy §3. Tested in preview: `␠␠a␠␠␠b␠␠` → `a b`; `SN-A` → `sn-a`; `sn_b` → `sn_b` (underscore kept); `sn-c"><x` → `sn-c-x` (no `"`/`<` output); `1abc` → `1abc`; Arabic `مرحبا` → `مرحبا` (kept); empty → nothing | — | B | n/a | Arabic and leading-digit tokens pass through unchanged, so §1 naming still matters |
| 2026-11-08 | `collection-list` (`sections/collection-list.liquid`) | `custom_class` setting appended after an "Advanced" header; rendered on the `.section` div via `custom-class` | `custom_class` | B | `CLASS_PLUS_SETTINGS` (S04: see plan area E for settings changed) | Dev2 / S04 / `sn-home-collections`. Settings count 17 → 18 |
| 2026-11-08 | `templates/index.json` S04 instance (no schema change) | Aligned with the native `collections_carousel` preset: instance `"name"` restored to `t:names.collections_carousel` (was the heading text), heading `text` wrapped in the preset's `group` "Header" block | — | B | `CLASS_PLUS_SETTINGS` (unchanged) | Section ID, `text_sn_heading` ID and all settings kept; no collections had been picked yet, so nothing was lost |
| 2026-11-08 | `collection-list` (`sections/collection-list.liquid`) | Two mobile settings after `custom_class`; output as CSS vars on the `.section` div **only when `custom_class` is set** (native output unchanged otherwise) | `mobile_image_size` (range 80–180 px, step 1, default 97, visible when `layout_type == carousel`) → `--sn-mobile-image-size`; `mobile_title_size` (range 10–20 px, step 1, default 11) → `--sn-mobile-title-size` | B | `CLASS_PLUS_SETTINGS` | Dev2 / S04. Consumed only by `dev2.css` ≤749. Native `mobile_card_size` (60/44cqw, clamp min 150px) can't express 97px. Settings count 18 → 20 |
| 2026-11-09 | `collection-list` (`sections/collection-list.liquid`) | Three more phone settings under schema headers "Mobile heading" / "Mobile collection images" / "Mobile collection titles"; CSS vars output **only when `custom_class` is set** | `mobile_heading_size` (range 16–40 px, default 24) → `--sn-mobile-heading-size`; `mobile_image_ratio` (select: `desktop` default = native `--ratio`, `square`, `portrait` 4/5, `landscape` 16/9, `adapt`) → `--sn-mobile-image-ratio`; `mobile_title_word_limit` (select `full` default / `two`) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S04. Desktop heading size = the native `text` block "Font size" (not duplicated). Section-level because `text` / `resource-image` are shared multi-caller files. Settings count 20 → 23 |
| 2026-11-09 | `collection-title` (`blocks/collection-title.liquid`) | Opt-in Liquid: when the parent section has `mobile_title_word_limit == 'two'` **and** a `custom_class`, and the title has more than 2 words, output `span.sn-collection-title__full` + `span.sn-collection-title__short[aria-hidden][hidden]` (first 2 words). Otherwise the output is unchanged (native) | — (reads section setting) | D | `CLASS_PLUS_SETTINGS` | Without the class CSS, `[hidden]` keeps the native look. Other sections that use `collection-title` don't have the setting, so they stay native. No schema change |
| 2026-11-09 | `text` (`blocks/text.liquid`) + `collection-title` (`blocks/collection-title.liquid`) | "Mobile size" range right after native `font_size`; when the section has a `custom_class` and the type preset is Custom, the block outputs `.text-block--<block.id> { --sn-mobile-font-size }` in a `{% style %}` tag | `mobile_font_size`: text 12–64 px (default 24), collection-title 10–32 px (default 11); `visible_if` needs `type_preset == 'custom'` and `section.settings.custom_class != blank` | B (+ minimal D output) | `CLASS_PLUS_SETTINGS` | Dev2 / S04. Replaces the section-level `mobile_heading_size` / `mobile_title_size` (removed; `collection-list` settings 23 → 21). Hidden and no output in sections without a class. Shared `text` snippet untouched |
| 2026-11-11 | `section` (`sections/section.liquid`) + shared `snippets/section.liquid` | `custom_class` rendered on the snippet's `.section` div (opt-in; `_blocks` has no setting, so its output is unchanged). Inline padding uses the native spacing pattern (works everywhere, default 0). Mobile settings output as `--sn-*` vars on `#shopify-section-<id>` **only when `custom_class` is set** | `padding-inline-start`, `padding-inline-end`, `padding-block-start-mobile`, `padding-block-end-mobile`, `padding-inline-mobile`, `gap_mobile`, `mobile_reverse_order`, `custom_class` (28 → 36) | B/D | `CLASS_PLUS_SETTINGS` (S08) | Dev2 / S08 |
| 2026-11-11 | `comparison-slider` (`blocks/comparison-slider.liquid`) | Optional phone images in a `<picture>` (falls back to the desktop image; same frame). `image_ratio` gets a "Custom" option (height % of width, works everywhere). Phone ratio/radius and label size/padding are output as `--sn-*` vars on `.comparison-slider--<block id>` only with a section custom class. **Now 40/40 settings** | `before_image_mobile`, `after_image_mobile`, `custom_ratio`, `custom_ratio_mobile`, `border_radius_mobile`, `text_size`, `text_size_mobile`, `text_padding_block`, `text_padding_block_mobile`, `text_padding_inline` | B/D | `CLASS_PLUS_SETTINGS` (S08). RTL drag fix lives in `dev2.css` under the class | Dev2 / S08 |
| 2026-11-11 | `text` (`blocks/text.liquid`) | Weight and exact line height next to the native typography settings. Output as `--sn-font-weight` / `--sn-line-height` with `--sn-mobile-font-size` (only with a section custom class); only CSS that reads them is affected (S04 doesn't) | `font_weight`, `line_height_exact` (20 → 22) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `group` (`blocks/group.liquid`) | `gap_mobile` after `gap`; passed as `--sn-gap-mobile` through the snippet's existing `style` param only with a section custom class | `gap_mobile` (36 → 37) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `button` (`blocks/button.liquid`) | Header "Button shape". Output as `--sn-button-*` vars on `.<style_class>--<block id>` only with a section custom class | `font_size`, `font_weight`, `border_width`, `border_radius`, `padding_block`, `padding_inline` (12 → 18) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `section` (`sections/section.liquid`) | Row cap, output as `--sn-content-max-width` only with a custom class (S08 desktop refinement) | `content_max_width` (800–1800 px, step 10, default 1360) (36 → 37) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `text` (`blocks/text.liquid`) | "Text wrap" select: new option Normal (`wrap`, label `t:options.normal`) for Figma-like greedy wrapping; default unchanged (Pretty) | none (option added; settings count unchanged) | B | `CLASS_PLUS_SETTINGS` (removing the class does not reset wrap; set S08 heading + description back to Pretty) | Dev2 / S08 |
| 2026-11-11 | `product-hotspots` (`sections/product-hotspots.liquid`) | Opt-in "Bundle layout": two columns, static text blocks `bundle_heading`/`bundle_description`, renders `snippets/sn-bundle-panel.liquid` + loads `assets/sn-bundle.js`; `custom_class` rendered on `.section` | `bundle_layout`, `image_mobile`, `media_width`, `column_gap`, `content_max_width`, `mobile_padding_top`, `mobile_padding_bottom`, `mobile_padding_inline`, `mobile_gap`, `thumb_size`, `row_padding`, `title_size`, `subtitle_size`, `accent_color`, `border_color`, `total_label`, `discount_enabled`, `discount_percent`, `discount_badge`, `button_label`, `button_color`, `button_radius`, `hotspot_size`, `unavailable_text`, `custom_class` (15 → 40, at the limit) | D | `OPT_IN_STRUCTURAL` (turn off "Bundle layout" for the native section) | Dev2 / S11 |
| 2026-11-11 | `_hotspot-product` (`blocks/_hotspot-product.liquid`) | Bundle mode: position via `--hx/--hy` (+ mobile), marker can be hidden, empty markers not output on the storefront, no quick-add in the popup, close button | `subtitle`, `quantity`, `show_hotspot`, `mobile_position`, `x-position-mobile`, `y-position-mobile` (3 → 9) | D | `OPT_IN_STRUCTURAL` | Dev2 / S11 |
| 2026-11-11 | `product-hotspot.js` (`assets/product-hotspot.js`) | `handleHotspotClick`: markers with `data-popup-on-touch` open/close the popup on touch instead of quick add | none | D | `OPT_IN_STRUCTURAL` (attribute only output in bundle mode) | Dev2 / S11 |
| 2026-11-11 | `product-hotspots` (`sections/product-hotspots.liquid`) | Bundle correction: parent product picker decides the purchase model; `unavailable_text` removed | `bundle_product` added, `unavailable_text` removed (stays 40/40) | D | `OPT_IN_STRUCTURAL` | Dev2 / S11 |
| 2026-11-11 | `product-hotspots`, `_hotspot-product`, `product-hotspot.js` | **Reverted**: S11 bundle extensions removed, files back to HEAD (S11 moved to the custom section `sn-product-bundle`) | the earlier rows for these files no longer apply | — | — | Dev2 / S11 |
| 2026-11-11 | `sn-product-bundle` (`sections/sn-product-bundle.liquid`) | Description line heights per breakpoint (px vars read by dev2.css); discount toggle folded into the badge text (empty = hidden) | `description_line_height`, `description_line_height_mobile` added; `show_discount` removed (40/40) | E | `CLASS_PLUS_SETTINGS` | Dev2 / S11 |
| 2026-11-12 | `group` (`blocks/group.liquid`) | Equal-column grid per breakpoint (class `sn-group--cols`/`-mobile` + vars), only with a section custom class | `columns`, `columns_mobile` (37 → 39) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S13 |
| 2026-11-12 | `text` (`blocks/text.liquid`) | Mobile line height + mobile alignment vars; font size option 13px (0.8125rem) | `line_height_exact_mobile`, `alignment_mobile` (22 → 24) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S13 |
| 2026-11-12 | `image` (`blocks/image.liquid`) | Fixed px width per breakpoint; no stock placeholder on the live store when empty (with a custom class) | `fixed_width`, `fixed_width_mobile` (17 → 19) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S13 |
