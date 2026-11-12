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
| 2026-11-08 | `snippets/custom-class.liquid` (new) | Sanitizer per custom-class-policy §3 | — | B | — | Created for S03 (Dev1). Test matrix **not yet run** (no preview); canonical `sn-*` names only so far |
| 2026-11-08 | `hero` (`sections/hero.liquid`) | `custom_class` on the `.hero` root, under "Advanced" (36→37 settings) | `custom_class` | B | CLASS_PLUS_SETTINGS (expected, untested) | S03 Dev1 (`sn-home-hero`) |
| 2026-11-08 | `group` (`blocks/group.liquid`) | `custom_class` + floating position selects, passed to the existing `class` param of `snippets/group.liquid` (36→39 settings, 1 below the Theme Check warning) | `custom_class`, `float_position` (default `none`), `float_position_mobile` (default `same`, `visible_if` position ≠ none) | B | CLASS_PLUS_SETTINGS (expected, untested) | Position classes `sn-float*` are output only when set, and inert outside `.sn-home-hero-stage` (Dev1). Default output unchanged |
| 2026-11-08 | `text` (`blocks/text.liquid`) + shared `snippets/text.liquid` | Optional `mobile_text` richtext (19→20). The snippet adds a mobile sibling element + `text-block--desktop-text`/`--mobile-text` toggles at 749/750 only when it's set | `mobile_text` | D (user-approved) | Not class-bound; empty = native output | Other 9 callers have no such setting → unchanged. Mobile sibling has no editor attributes (sidebar edit only); the desktop element keeps click-to-edit. Shown only when the desktop text is non-empty. Theme Editor check pending |
| 2026-11-09 | `group` (`blocks/group.liquid`) | Optional mobile content position (39→40 settings, **at the limit**); class `sn-m-place--*` only when set; CSS in the block's `{% stylesheet %}` (≤749px, direct children) | `mobile_content_alignment` (default `same`) | B | Not class-bound; `same` = native output | S03 Dev1 refinement. Sets `align-items`/`justify-content` directly, because inline layout vars win over stylesheet vars. A full-width mobile button uses the button's native Mobile width |
| 2026-11-09 | `text` (`blocks/text.liquid`) + shared `snippets/text.liquid` | Optional mobile text alignment (20→21); class `text-block--m-align-*` only when set; CSS in the snippet stylesheet (≤749px) | `mobile_alignment` (default `same`) | D (user-requested) | Not class-bound; `same` = native output | Other `render 'text'` callers don't define it, so they're unchanged. Overrides the inline `--text-align` |
| 2026-11-09 | `section` (`sections/section.liquid`) | Optional overlap of the previous section (28→30 settings); a `{% style %}` on `#shopify-section-<id>` (negative margin, z-index 1, own `.section-background` kept below the overlap) only when a value is above 0 | `overlap_desktop` (≥990), `overlap_mobile` (<990), 0–150px, default 0 | B/D (S03 final pass) | Not class-bound; 0 = native output | S03 Trust Strip uses 58/49 (Figma). Replaced the hardcoded `:has()` margin rules in `dev1.css` |
| 2026-11-09 | `text` (`blocks/text.liquid`) | `mobile_text` + `mobile_alignment` re-added after commit `4820831` (theme sync with Dev2's S04) had dropped them; Dev2's `mobile_font_size` kept (now 22 settings) | — | restore | unchanged | Watch for theme→git syncs that overwrite shared blocks |
| 2026-11-09 | `section` (`sections/section.liquid`) | Overlap ranges corrected to 0–100 (0–150 exceeded Shopify's 101-step limit). Added `content_max_width` (number, centres `.custom-section-content`) and a `card_sizes` checkbox + 8 ranges output only as `--card-*` variables (nothing native reads them). Overlap also sets `--next-section-overlap` on the previous section. Now **40 settings (at the limit)** | `content_max_width`, `card_sizes`, `card_tile_size`, `card_padding_{top,bottom,inline}_mobile`, `card_gap_mobile`, `card_item_gap_mobile`, `card_tile_size_mobile`, `card_icon_size_mobile` | B/D (S03) | Not class-bound; empty/off = no output | Used by S03 Trust Strip CSS in `dev1.css` with Figma fallbacks |
| 2026-11-09 | `hero` (`sections/hero.liquid`) | Product stage offsets (37→40 settings, **at the limit**): `stage_offset_y`, `stage_offset_x` (desktop), `stage_offset_y_mobile`, −60…60 step 2, default 0, `visible_if` custom class; output as `--stage-offset-*` on `.hero` only when a custom class is set | `stage_offset_y`, `stage_offset_x`, `stage_offset_y_mobile` | B (S03) | Class-bound (no output and no effect without a custom class) | Read by `dev1.css` as `translate` on `.sn-home-hero-stage` |
| 2026-11-09 | `section` (`sections/section.liquid`) | Card controls reorganised (still 40): removed `card_tile_size`, `card_tile_size_mobile` (tile now = icon + padding); `card_padding_top_mobile` + `card_padding_inline_mobile` merged into `card_padding_mobile`; added `card_title_size_mobile`, `card_description_size_mobile`, `card_line_height_mobile` (`--card-*` variables) | see change | B (S03) | Not class-bound; checkbox off = no output | S03 template migrated with the same values. `hero` stage settings relabelled "…position…" (ids unchanged) |
| 2026-11-09 | `text` (`blocks/text.liquid`) + shared `snippets/text.liquid` | Optional mobile typography (22→24): class `text-block--m-size` / `--m-lh` + inline `--font-size-mobile` / `--line-height-mobile` only when > 0; ≤749px rule in the snippet stylesheet (doubled class) | `font_size_mobile`, `line_height_mobile` (0 = same as desktop) | D (S03) | Not class-bound; 0 = native output | Font size hidden where Dev2's class-bound `mobile_font_size` shows. `section`: `card_title_size_mobile`, `card_description_size_mobile`, `card_line_height_mobile` removed (37) |
| 2026-11-09 | `section` (`sections/section.liquid`) | Added `card_width_mobile` (280–390 step 2, default 346) under the Trust Strip card checkbox → `--card-width-mobile` (37→38) | `card_width_mobile` | B (S03) | Not class-bound; checkbox off = no output | Read by `dev1.css` as the mobile card width (capped at screen − 16px) |
| 2026-11-11 | `hero` / `group` / `text` / `image` / `icon` / `button` | S06 F1 Banner composition, no schema change. Custom classes `sn-home-f1-*` on hero + groups (existing `custom_class` settings); reuses the hero stage-offset settings and the text block mobile typography settings | — | C (S06) | Class-bound CSS in `dev1.css` | Decorations are empty groups whose class draws them; hide/delete the block to turn one off |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | `custom_class` (9→10) on the `.section` element | `custom_class` | B (S10) | Blank = native output | S10 uses `sn-home-choose-care` |
| 2026-11-11 | `_product-card-group` (`blocks/_product-card-group.liquid`) | `custom_class` (35→36) passed to the existing `group` snippet `class` param; `icon` added to the allowed child blocks (native icon list + image upload in product-card rows) | `custom_class` | B (S10) | Blank = native output; `icon` is only an extra option in the Add block menu | Shared by every product card group (product list, featured product…); additive only |
| 2026-11-11 | `_card` (`blocks/_card.liquid`) + `_carousel-content` | "Featured card" checkbox (25→26): outputs `sn-card-featured` + `slide-id`; `_carousel-content` passes the first featured card's index as the native `initial_slide` | `featured` (default off) | B/D (S10) | Off = native output; the class is inert without a section custom class; the start slide is functional | Only the `carousel` section uses `_card` |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | "Card sizes (custom class)" (10→14): `card_width` 300–500 (400), `featured_card_width` 360–560 (462), `card_width_mobile` 200–360 (262), `columns_gap_mobile` 0–40 (12); `visible_if` custom class, output as `--carousel-*` on `.section` only with a class | see change | B (S10) | Class-bound (no output without a custom class) | Read by the S10 CSS in `dev1.css` |
| 2026-11-11 | `slideshow.js` (`assets/slideshow.js`) | Initial-slide fix: `connectedCallback` set `current` to the initial index before `select()`, which then returned early ("same slide"), so a non-zero `initial-slide` never scrolled. Now scrolls to the initial slide directly with the native `Scroller.to()` (skipped when not displayed) | — | D (S10) | Only runs for a non-zero `initial-slide` (no stock caller) | Re-apply on Horizon updates unless fixed upstream |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | `image_fit` select (Fit = contain default, Fill = cover), 14→15, `visible_if` custom class, output as `--carousel-image-fit` only with a class | `image_fit` | B (S10) | Class-bound | The native card gallery hardcodes cover; S10 CSS applies the variable to its gallery images |
| 2026-11-11 | `carousel` + new `assets/carousel-active-card.js` | `highlight_active_card` checkbox (15→16, `visible_if` custom class): renders `<carousel-active-card hidden>` + its module script. Geometry-based active card (`is-active-card`), `--carousel-progress`, `carousel--scrollable`, Featured card centred on load. **Reverted:** the `slideshow.js` initial-slide patch and the `_carousel-content` `block.blocks` loop (both back to stock); `_card` no longer outputs `slide-id` | `highlight_active_card` | B/D (S10) | Off = no output, no script | Other carousels unaffected |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | `featured_card_width` replaced by `active_card_zoom` (100–112%, default 106, class-bound) → `--carousel-active-zoom`; still 16 settings | `active_card_zoom` | B (S10) | Class-bound | Read by the S10 active-card CSS (`scale`) |
| 2026-11-12 | `featured-blog-posts` (`sections/featured-blog-posts.liquid`) | 16→22: `view_all_label`, `view_all_link` (one link after the list; empty URL = selected blog; not class-bound, blank = no output), `custom_class`, and class-bound `show_progress` (renders `<carousel-progress>` + new `assets/carousel-progress.js`), `image_height` (→ `--blog-image-height`), `mobile_card_width` (→ `--blog-card-width-mobile`) | see change | B/D (S12) | Blank / off = native output | S12 uses `sn-home-blog` |
| 2026-11-12 | `_featured-blog-posts-card` | 12→14: `show_excerpt` (default on; off hides the description), `read_more_label` (blank = none; visual `aria-hidden` label + `icon-arrow.svg`, the card stays one article link) | `show_excerpt`, `read_more_label` | B (S12) | Defaults = native output | Only `featured-blog-posts` uses this block |
| 2026-11-12 | `featured-blog-posts` + `_featured-blog-posts-card` | **Reverted to stock**: S12 moved to manual cards on `carousel`; the two rows above for these files no longer apply | — | revert | — | — |
| 2026-11-12 | `carousel` (`sections/carousel.liquid`) | 16→20: `image_height` (class-bound → `--carousel-image-height`), `show_progress` (class-bound; `<carousel-progress>` + `assets/carousel-progress.js`), `view_all_label` + `view_all_link` (one link after the cards; label-only preview in the Theme Editor) | see change | B/D (S12) | Off / blank = no output | S12 uses `sn-home-blog`; S10 unaffected |
