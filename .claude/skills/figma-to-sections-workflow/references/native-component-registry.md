# Native component registry

This is development documentation only. Nothing here runs. Start the Native Reuse Audit with this file, then confirm in the source, since files change.

****`custom_class` status:**** stock Horizon 4.4 has ****no**** custom-class setting on any section or block. Every addition is listed in the extension log at the bottom.

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

| `section` (13 presets: custom, rich text, FAQ, video, …) | ****Default choice for any freeform Figma layout**** (heading/text/buttons/media/groups) | `@theme`, `@app`, `_divider` | `.section` in `snippets/section.liquid` (shared with `_blocks`). Padding sits on the inner `.section-content-wrapper` |

| `hero` | Banner with background media, overlay, height | `@theme`, text, button, logo, jumbo-text, group, `_marquee` | `.hero` root (no `.section-background`; padding on `.hero__container`) |

| `slideshow` / `layered-slideshow` | Hero sliders | `_slide` / `_layered-slide` (max 6), which accept `@theme` | `.section` div |

| `carousel` | Horizontal scroller of content cards | static `_carousel-content` + `group` | `.section` div |

| `media-with-content` | Image/video next to text | static `_media-without-appearance` + `_content-without-appearance` | `.section` div |

| `product-list` | Product grid / carousel / editorial from a collection (`layout_type`, `columns`, `mobile_columns`, `carousel_on_mobile`, `max_products`) | static `_product-list-content` header, `_product-card` per product | `.section.section-resource-list` |

| `collection-list` / `main-collection-list` | Collection grids/carousels. `collection-list` presets: `t:names.collections_bento`, `collections_grid`, _**_****`collections_carousel`****** ("Collection list: Carousel" / ar "قائمة المجموعات: عرض دائري": `group` "Header" > `text`, static `_collection-card` > `_collection-card-image` + `collection-title`, `layout_type` carousel), `collections_editorial` | `@theme`, text, image, button, group… / collection cards | `.section` div |

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

| `group` | ****Layout container****: flex direction, alignment, gap, width/height, padding, background, border, link, background media (36 settings) | `snippets/group.liquid` `.group-block`, pass `class:` |

| `text` | Rich text with type presets and custom font, size, line height, spacing, case, width, color | `snippets/text.liquid` `.text-block`, pass `class:` |

| `button` | Link button (primary/secondary style via `style_class`) | `snippets/button.liquid` `<a>`. ****No class param****, so adding a class here is a Liquid change (category D) |

| `image`, `video`, `icon`, `logo`, `jumbo-text`, `spacer`, `accordion`, `comparison-slider`, `popup-link`, `custom-liquid` | Content primitives | inline in each block file |

| `product-card`, `collection-card`, `featured-collection`, `product-recommendations` | Resource cards/lists inside any section | `product-card` root is `.product-card` in `snippets/product-card.liquid` (no class param) |

| `product-title`, `price`, `sku`, `review`, `swatches`, `variant-picker`, `buy-buttons`, `quantity`, `add-to-cart`, `accelerated-checkout`, `product-description`, `product-inventory`, `product-custom-property`, `disclosures` | PDP / card details | mostly through `text` or their own snippets. ****Don't change their JS hooks**** |

| `menu`, `email-signup`, `social-links`, `payment-icons`, `footer-copyright`, `footer-policy-list`, `follow-on-shop`, `contact-form`, `filters`, `page`, `page-content`, `collection-title` | Footer, forms, pages | per file |

****Private blocks**** (`_` prefix) belong to one parent: `_card` and `_slide` (accept `@theme`), `_content`, `_product-card` with `_product-card-gallery`/`_product-card-group`, `_product-details`, `_product-list-*`, `_header-*`, `_heading`, `_inline-text`, `_divider`, `_marquee`, `_accordion-row`, and others.

## Native media capabilities (from schemas, 2026-11-08)
| Component | Media settings |

|---|---|

| `hero` | `image_1`, `image_2`, `video_1`, `video_2` ****plus mobile variants**** `image_1_mobile`, `image_2_mobile`, `video_1_mobile`, `video_2_mobile` (the only native desktop/mobile media pair) |

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
- ****Figma "title + text + CTA" block**** → `section` + `text` + `button`, or `group` for alignment. Don't build a new section.

- ****Card grid**** → `section` with `group` children (flex wrap), or `collection-list`. Product grid → `product-list`.

- ****Slider**** → `slideshow` / `carousel` / `product-list` with `layout_type: carousel`. Never add a slider library.

- ****Image + text**** → `media-with-content`.

- ****Accordion / FAQ**** → `section` preset "FAQ" (`accordion` + `_accordion-row`).

## Project extension log

Add a row for every schema setting added, structural change, or new component. Newest last. Historical changes and reversions are retained as audit history and do not imply the associated code is still active.

| Date | Component (file) | Change | Setting IDs | Category | Reversibility (`CLASS_ONLY` / `CLASS_PLUS_SETTINGS` / `OPT_IN_STRUCTURAL` / `NOT_FULLY_REVERSIBLE`) | Notes / limitations |
|---|---|---|---|---|---|---|
| 2026-11-08 | `snippets/custom-class.liquid` (new, shared) | Created sanitizer per `custom-class-policy.md` §3 for S03 (Dev1); separately recorded as a shared helper for other sections. One source reports preview results: `␠␠a␠␠␠b␠␠` → `a b`; `SN-A` → `sn-a`; `sn_b` → `sn_b`; `sn-c"><x` → `sn-c-x`; `1abc` → `1abc`; Arabic `مرحبا` → `مرحبا`; empty → nothing | — | B | n/a | **Conflicting test reports:** Dev1 says sanitizer test matrix not yet run; Dev2/Dev3 source reports preview outcomes but notes test status disputed. Do not mark VERIFIED without evidence. Arabic and leading-digit tokens pass through, so canonical naming still applies |
| 2026-11-08 | `hero` (`sections/hero.liquid`) | `custom_class` on the `.hero` root, under "Advanced" (36→37 settings) | `custom_class` | B | CLASS_PLUS_SETTINGS (expected, untested) | S03 Dev1 (`sn-home-hero`) |
| 2026-11-08 | `group` (`blocks/group.liquid`) | `custom_class` + floating position selects, passed to the existing `class` param of `snippets/group.liquid` (36→39 settings, 1 below the Theme Check warning) | `custom_class`, `float_position` (default `none`), `float_position_mobile` (default `same`, `visible_if` position ≠ none) | B | CLASS_PLUS_SETTINGS (expected, untested) | Position classes `sn-float*` are output only when set, and inert outside `.sn-home-hero-stage` (Dev1). Default output unchanged |
| 2026-11-08 | `text` (`blocks/text.liquid`) + shared `snippets/text.liquid` | Optional `mobile_text` richtext (19→20). The snippet adds a mobile sibling element + `text-block--desktop-text`/`--mobile-text` toggles at 749/750 only when it's set | `mobile_text` | D (user-approved) | Not class-bound; empty = native output | Other 9 callers have no such setting → unchanged. Mobile sibling has no editor attributes (sidebar edit only); the desktop element keeps click-to-edit. Shown only when the desktop text is non-empty. Theme Editor check pending |
| 2026-11-08 | `collection-list` (`sections/collection-list.liquid`) | `custom_class` setting appended after an "Advanced" header; rendered on the `.section` div via `custom-class` | `custom_class` | B | `CLASS_PLUS_SETTINGS` (S04: see plan area E for settings changed) | Dev2 / S04 / `sn-home-collections`. Settings count 17 → 18 |
| 2026-11-08 | `templates/index.json` S04 instance (no schema change) | Aligned with the native `collections_carousel` preset: instance `"name"` restored to `t:names.collections_carousel` (was the heading text), heading `text` wrapped in the preset's `group` "Header" block | — | B | `CLASS_PLUS_SETTINGS` (unchanged) | Section ID, `text_sn_heading` ID and all settings kept; no collections had been picked yet, so nothing was lost |
| 2026-11-08 | `collection-list` (`sections/collection-list.liquid`) | Two mobile settings after `custom_class`; output as CSS vars on the `.section` div _**_****only when `custom_class` is set****** (native output unchanged otherwise) | `mobile_image_size` (range 80–180 px, step 1, default 97, visible when `layout_type == carousel`) → `--sn-mobile-image-size`; `mobile_title_size` (range 10–20 px, step 1, default 11) → `--sn-mobile-title-size` | B | `CLASS_PLUS_SETTINGS` | Dev2 / S04. Consumed only by `dev2.css` ≤749. Native `mobile_card_size` (60/44cqw, clamp min 150px) can't express 97px. Settings count 18 → 20 |
| 2026-11-08 | `sections/product-list.liquid` | `custom_class` on `.section.section-resource-list`; opt-in progress bar rendered after the resource list | `custom_class`, `show_scroll_progress` | B / D | `CLASS_ONLY` / `OPT_IN_STRUCTURAL` | S05 (`sn-home-bestsellers`). 19 settings |
| 2026-11-08 | `blocks/text.liquid` | `custom_class` passed through `snippets/text.liquid`'s existing `class` param | `custom_class` | B | `CLASS_ONLY` | Used for S05 card parts `-badge`, `-desc`, `-cta`. 20 settings |
| 2026-11-08 | `blocks/_product-card-gallery.liquid` | Per-block mobile quick add (scoped `{% style %}` overriding `--quick-add-mobile-display/opacity`); add label passed to `quick-add` | `quick_add_mobile`, `quick_add_label` | B / D | `OPT_IN_STRUCTURAL` | Needs global `quick_add` on. Global `mobile_quick_add` untouched |
| 2026-11-08 | `snippets/quick-add.liquid` (3 callers) | Optional `add_label` param for the direct Add button only; Choose untouched | param `add_label` | D (approved R6) | `OPT_IN_STRUCTURAL` | `_featured-product-gallery`, `_hotspot-product` pass nothing → unchanged output |
| 2026-11-08 | `blocks/_product-list-button.liquid` | Show link whenever a collection is selected | `show_always` | B | `OPT_IN_STRUCTURAL` | Default = native "more products than shown" rule |
| 2026-11-08 | `blocks/review\\.liquid` | Label inside `.rating-wrapper` (only with rating data) | `label` | B | settings-only | Blank = native |
| 2026-11-08 | `blocks/price.liquid` | Discount badge `span.price-discount-badge[ref=discountBadge]` inside `<product-price>`, from `selected_or_first_available_variant` | `show_discount_badge`, `discount_badge_label` (`[percent]`) | B / D | `OPT_IN_STRUCTURAL` | Not refreshed on live variant change (`product-price.js` untouched by decision) |
| 2026-11-08 | `snippets/scroll-progress.liquid` + `assets/scroll-progress.js` (new) | Reusable `<scroll-progress target>` scrollbar-style indicator; read-only, RTL-safe | — | D | `OPT_IN_STRUCTURAL` (via `show_scroll_progress`) | Reusable for other carousels (S04/S09/S12). Fixture-tested; not yet in a store preview |
| 2026-11-09 | `group` (`blocks/group.liquid`) | Optional mobile content position (39→40 settings, ****at the limit****); class `sn-m-place--*` only when set; CSS in the block's `{% stylesheet %}` (≤749px, direct children) | `mobile_content_alignment` (default `same`) | B | Not class-bound; `same` = native output | S03 Dev1 refinement. Sets `align-items`/`justify-content` directly, because inline layout vars win over stylesheet vars. A full-width mobile button uses the button's native Mobile width |
| 2026-11-09 | `text` (`blocks/text.liquid`) + shared `snippets/text.liquid` | Optional mobile text alignment (20→21); class `text-block--m-align-*` only when set; CSS in the snippet stylesheet (≤749px) | `mobile_alignment` (default `same`) | D (user-requested) | Not class-bound; `same` = native output | Other `render 'text'` callers don't define it, so they're unchanged. Overrides the inline `--text-align` |
| 2026-11-09 | `section` (`sections/section.liquid`) | Optional overlap of the previous section (28→30 settings); a `{% style %}` on `#shopify-section-<id>` (negative margin, z-index 1, own `.section-background` kept below the overlap) only when a value is above 0 | `overlap_desktop` (≥990), `overlap_mobile` (<990), 0–150px, default 0 | B/D (S03 final pass) | Not class-bound; 0 = native output | S03 Trust Strip uses 58/49 (Figma). Replaced the hardcoded `:has()` margin rules in `dev1.css` |
| 2026-11-09 | `text` (`blocks/text.liquid`) | `mobile_text` + `mobile_alignment` re-added after commit `4820831` (theme sync with Dev2's S04) had dropped them; Dev2's `mobile_font_size` kept (now 22 settings) | — | restore | unchanged | Watch for theme→git syncs that overwrite shared blocks |
| 2026-11-09 | `section` (`sections/section.liquid`) | Overlap ranges corrected to 0–100 (0–150 exceeded Shopify's 101-step limit). Added `content_max_width` (number, centres `.custom-section-content`) and a `card_sizes` checkbox + 8 ranges output only as `--card-*` variables (nothing native reads them). Overlap also sets `--next-section-overlap` on the previous section. Now ****40 settings (at the limit)**** | `content_max_width`, `card_sizes`, `card_tile_size`, `card_padding_{top,bottom,inline}_mobile`, `card_gap_mobile`, `card_item_gap_mobile`, `card_tile_size_mobile`, `card_icon_size_mobile` | B/D (S03) | Not class-bound; empty/off = no output | Used by S03 Trust Strip CSS in `dev1.css` with Figma fallbacks |
| 2026-11-09 | `hero` (`sections/hero.liquid`) | Product stage offsets (37→40 settings, ****at the limit****): `stage_offset_y`, `stage_offset_x` (desktop), `stage_offset_y_mobile`, −60…60 step 2, default 0, `visible_if` custom class; output as `--stage-offset-*` on `.hero` only when a custom class is set | `stage_offset_y`, `stage_offset_x`, `stage_offset_y_mobile` | B (S03) | Class-bound (no output and no effect without a custom class) | Read by `dev1.css` as `translate` on `.sn-home-hero-stage` |
| 2026-11-09 | `section` (`sections/section.liquid`) | Card controls reorganised (still 40): removed `card_tile_size`, `card_tile_size_mobile` (tile now = icon + padding); `card_padding_top_mobile` + `card_padding_inline_mobile` merged into `card_padding_mobile`; added `card_title_size_mobile`, `card_description_size_mobile`, `card_line_height_mobile` (`--card-*` variables) | see change | B (S03) | Not class-bound; checkbox off = no output | S03 template migrated with the same values. `hero` stage settings relabelled "…position…" (ids unchanged) |
| 2026-11-09 | `text` (`blocks/text.liquid`) + shared `snippets/text.liquid` | Optional mobile typography (22→24): class `text-block--m-size` / `--m-lh` + inline `--font-size-mobile` / `--line-height-mobile` only when > 0; ≤749px rule in the snippet stylesheet (doubled class) | `font_size_mobile`, `line_height_mobile` (0 = same as desktop) | D (S03) | Not class-bound; 0 = native output | Font size hidden where Dev2's class-bound `mobile_font_size` shows. `section`: `card_title_size_mobile`, `card_description_size_mobile`, `card_line_height_mobile` removed (37) |
| 2026-11-09 | `section` (`sections/section.liquid`) | Added `card_width_mobile` (280–390 step 2, default 346) under the Trust Strip card checkbox → `--card-width-mobile` (37→38) | `card_width_mobile` | B (S03) | Not class-bound; checkbox off = no output | Read by `dev1.css` as the mobile card width (capped at screen − 16px) |
| 2026-11-09 | `collection-list` (`sections/collection-list.liquid`) | Three more phone settings under schema headers "Mobile heading" / "Mobile collection images" / "Mobile collection titles"; CSS vars output _**_****only when `custom_class` is set****** | `mobile_heading_size` (range 16–40 px, default 24) → `--sn-mobile-heading-size`; `mobile_image_ratio` (select: `desktop` default = native `--ratio`, `square`, `portrait` 4/5, `landscape` 16/9, `adapt`) → `--sn-mobile-image-ratio`; `mobile_title_word_limit` (select `full` default / `two`) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S04. Desktop heading size = the native `text` block "Font size" (not duplicated). Section-level because `text` / `resource-image` are shared multi-caller files. Settings count 20 → 23 |
| 2026-11-09 | `collection-title` (`blocks/collection-title.liquid`) | Opt-in Liquid: when the parent section has `mobile_title_word_limit == 'two'` _**_****and****** a `custom_class`, and the title has more than 2 words, output `span.sn-collection-title__full` + `span.sn-collection-title__short[aria-hidden][hidden]` (first 2 words). Otherwise the output is unchanged (native) | — (reads section setting) | D | `CLASS_PLUS_SETTINGS` | Without the class CSS, `[hidden]` keeps the native look. Other sections that use `collection-title` don't have the setting, so they stay native. No schema change |
| 2026-11-09 | `text` (`blocks/text.liquid`) + `collection-title` (`blocks/collection-title.liquid`) | "Mobile size" range right after native `font_size`; when the section has a `custom_class` and the type preset is Custom, the block outputs `.text-block--<block.id> { --sn-mobile-font-size }` in a `{% style %}` tag | `mobile_font_size`: text 12–64 px (default 24), collection-title 10–32 px (default 11); `visible_if` needs `type_preset == 'custom'` and `section.settings.custom_class != blank` | B (+ minimal D output) | `CLASS_PLUS_SETTINGS` | Dev2 / S04. Replaces the section-level `mobile_heading_size` / `mobile_title_size` (removed; `collection-list` settings 23 → 21). Hidden and no output in sections without a class. Shared `text` snippet untouched |
| 2026-11-09 | `blocks/_product-card-gallery.liquid` | Image fit + vertical crop position, top-only corners, mobile ratio/position/radius; Quick Add bar style, icon (default/cart/custom via CSS mask), icon side/size, colors, mobile FAB position/size/offset; product badge from a product metafield with text fallback (hidden when sold out) | `image_fit`, `image_position_y`, `border_radius_corners`, `media_mobile_custom`, `image_ratio_mobile`, `image_position_y_mobile`, `border_radius_mobile`, `quick_add_style`, `quick_add_icon`, `quick_add_icon_image`, `quick_add_icon_position`, `quick_add_icon_size`, `quick_add_radius`, `quick_add_background`, `quick_add_text_color`, `quick_add_mobile_position`, `quick_add_mobile_size`, `quick_add_mobile_icon_size`, `quick_add_mobile_offset`, `custom_badge_*` (8) | B / D | `OPT_IN_STRUCTURAL` | Schema at the 40-setting Theme Check limit: no more settings fit. Scoped `{% style %}` emitted only when a value differs from native |
| 2026-11-09 | `blocks/_product-card.liquid` | Mobile card corner radius | `border_radius_mobile_custom`, `border_radius_mobile` | B | `OPT_IN_STRUCTURAL` | Off = native radius on all breakpoints |
| 2026-11-09 | `blocks/_product-card-group.liquid` | Native `icon` block allowed inside card groups (icon + text rows such as "View product →") | — (blocks list) | C | settings-only | Existing cards unaffected |
| 2026-11-09 | `blocks/price.liquid` | Prices and discount badge on one wrapping row (`price--inline-badge`, `priceContainer` `display: contents`); badge colors/radius, row gaps | `discount_badge_background`, `discount_badge_text_color`, `discount_badge_border_color`, `discount_badge_radius`, `price_row_gap`, `price_row_gap_mobile` | B | `OPT_IN_STRUCTURAL` (with `show_discount_badge`) | `product-price.js` untouched |
| 2026-11-09 | `blocks/_product-list-button.liquid` | Icon inside the View All link (native `icon-or-image`), side per breakpoint, size, gap, RTL mirror | `icon`, `icon_image`, `icon_position`, `icon_position_mobile`, `icon_size`, `icon_gap`, `icon_mirror_rtl` | B / D | `OPT_IN_STRUCTURAL` | Shared `button` snippet not edited (icon injected into its captured output) |
| 2026-11-09 | `assets/icon-cart-trolley.svg` (new) | Cart (trolley) UI icon, used by the gallery `quick_add_icon: cart` option | — | D | settings-only | Geometry from Figma "Icon / cart" |
| 2026-11-09 | `blocks/price.liquid` | Inline row fix (`> * { width: auto }` under `price--inline-badge`); em-based discount badge padding; desktop/mobile badge text size; mobile price size | `discount_badge_font_size`, `discount_badge_font_size_mobile`, `price_font_size_mobile` | B | `OPT_IN_STRUCTURAL` (with `show_discount_badge`) | Root cause: `.text-block > *` width 100% from `text.liquid` |
| 2026-11-09 | `blocks/text.liquid` | Line limit (desktop/mobile) as a flowing excerpt; mobile text size and line height | `max_lines`, `max_lines_mobile`, `font_size_mobile`, `line_height_mobile` | B | settings-only (0 = native, no CSS) | Scoped to `#shopify-section-… .text-block--<id>` |
| 2026-11-09 | `blocks/_product-card.liquid` | Product badge text size (desktop/mobile, via CSS variables to the image block badge); mobile card gap | `badge_font_size`, `product_card_gap_mobile`, `badge_font_size_mobile` (`border_radius_mobile_custom` relabeled "Customize mobile card") | B | `OPT_IN_STRUCTURAL` | Default 13 = theme badge size |
| 2026-11-09 | `blocks/_product-card-group.liquid` | Mobile gap and padding; `group-block--<id>` class through the `group` snippet's `class` param when enabled | `mobile_spacing_custom`, `gap_mobile`, `padding_inline_mobile`, `padding_block_end_mobile` | B | `OPT_IN_STRUCTURAL` | 39 settings |
| 2026-11-09 | `snippets/text-responsive-style.liquid` (new) | Shared opt-in line limit + mobile font size / line height for blocks rendering the `text` snippet (`.text-block--<id>`) | reads `max_lines`, `max_lines_mobile`, `font_size_mobile`, `line_height_mobile` | D | settings-only (0 = no CSS) | Used by `text`, `product-title` |
| 2026-11-09 | `blocks/product-title.liquid` | Mobile title size / line height | `font_size_mobile`, `line_height_mobile` | B | settings-only | Via `text-responsive-style` |
| 2026-11-09 | `blocks/review\\.liquid` | Mobile size of label + count | `font_size_mobile` | B | settings-only | — |
| 2026-11-09 | `blocks/icon.liquid` | Mobile icon width | `width_mobile` | B | settings-only | `!important` to beat the inline width on uploaded images |
| 2026-11-09 | `blocks/price.liquid` | Bug fix: discount badge color/size and mobile price size were overridden by base.css `.text-block.<preset> > *`; selectors raised under `product-price.price--inline-badge` | — (existing settings now effective; sizes step 0.5) | D | `OPT_IN_STRUCTURAL` | No duplicate settings |
| 2026-11-11 | `hero` / `group` / `text` / `image` / `icon` / `button` | S06 F1 Banner composition, no schema change. Custom classes `sn-home-f1-*` on hero + groups (existing `custom_class` settings); reuses the hero stage-offset settings and the text block mobile typography settings | — | C (S06) | Class-bound CSS in `dev1.css` | Decorations are empty groups whose class draws them; hide/delete the block to turn one off |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | `custom_class` (9→10) on the `.section` element | `custom_class` | B (S10) | Blank = native output | S10 uses `sn-home-choose-care` |
| 2026-11-11 | `_product-card-group` (`blocks/_product-card-group.liquid`) | `custom_class` (35→36) passed to the existing `group` snippet `class` param; `icon` added to the allowed child blocks (native icon list + image upload in product-card rows) | `custom_class` | B (S10) | Blank = native output; `icon` is only an extra option in the Add block menu | Shared by every product card group (product list, featured product…); additive only |
| 2026-11-11 | `_card` (`blocks/_card.liquid`) + `_carousel-content` | "Featured card" checkbox (25→26): outputs `sn-card-featured` + `slide-id`; `_carousel-content` passes the first featured card's index as the native `initial_slide` | `featured` (default off) | B/D (S10) | Off = native output; the class is inert without a section custom class; the start slide is functional | Only the `carousel` section uses `_card` |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | "Card sizes (custom class)" (10→14): `card_width` 300–500 (400), `featured_card_width` 360–560 (462), `card_width_mobile` 200–360 (262), `columns_gap_mobile` 0–40 (12); `visible_if` custom class, output as `--carousel-*` on `.section` only with a class | see change | B (S10) | Class-bound (no output without a custom class) | Read by the S10 CSS in `dev1.css` |
| 2026-11-11 | `slideshow\.js` (`assets/slideshow\.js`) | Initial-slide fix: `connectedCallback` set `current` to the initial index before `select()`, which then returned early ("same slide"), so a non-zero `initial-slide` never scrolled. Now scrolls to the initial slide directly with the native `Scroller.to()` (skipped when not displayed) | — | D (S10) | Only runs for a non-zero `initial-slide` (no stock caller) | Re-apply on Horizon updates unless fixed upstream |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | `image_fit` select (Fit = contain default, Fill = cover), 14→15, `visible_if` custom class, output as `--carousel-image-fit` only with a class | `image_fit` | B (S10) | Class-bound | The native card gallery hardcodes cover; S10 CSS applies the variable to its gallery images |
| 2026-11-11 | `carousel` + new `assets/carousel-active-card.js` | `highlight_active_card` checkbox (15→16, `visible_if` custom class): renders `<carousel-active-card hidden>` + its module script. Geometry-based active card (`is-active-card`), `--carousel-progress`, `carousel--scrollable`, Featured card centred on load. ****Reverted:**** the `slideshow\.js` initial-slide patch and the `_carousel-content` `block.blocks` loop (both back to stock); `_card` no longer outputs `slide-id` | `highlight_active_card` | B/D (S10) | Off = no output, no script | Other carousels unaffected |
| 2026-11-11 | `carousel` (`sections/carousel.liquid`) | `featured_card_width` replaced by `active_card_zoom` (100–112%, default 106, class-bound) → `--carousel-active-zoom`; still 16 settings | `active_card_zoom` | B (S10) | Class-bound | Read by the S10 active-card CSS (`scale`) |
| 2026-11-11 | `section` (`sections/section.liquid`) + shared `snippets/section.liquid` | `custom_class` rendered on the snippet's `.section` div (opt-in; `_blocks` has no setting, so its output is unchanged). Inline padding uses the native spacing pattern (works everywhere, default 0). Mobile settings output as `--sn-*` vars on `#shopify-section-<id>` _**_****only when `custom_class` is set****** | `padding-inline-start`, `padding-inline-end`, `padding-block-start-mobile`, `padding-block-end-mobile`, `padding-inline-mobile`, `gap_mobile`, `mobile_reverse_order`, `custom_class` (28 → 36) | B/D | `CLASS_PLUS_SETTINGS` (S08) | Dev2 / S08 |
| 2026-11-11 | `comparison-slider` (`blocks/comparison-slider.liquid`) | Optional phone images in a `<picture>` (falls back to the desktop image; same frame). `image_ratio` gets a "Custom" option (height % of width, works everywhere). Phone ratio/radius and label size/padding are output as `--sn-*` vars on `.comparison-slider--<block id>` only with a section custom class. _**_****Now 40/40 settings****** | `before_image_mobile`, `after_image_mobile`, `custom_ratio`, `custom_ratio_mobile`, `border_radius_mobile`, `text_size`, `text_size_mobile`, `text_padding_block`, `text_padding_block_mobile`, `text_padding_inline` | B/D | `CLASS_PLUS_SETTINGS` (S08). RTL drag fix lives in `dev2.css` under the class | Dev2 / S08 |
| 2026-11-11 | `text` (`blocks/text.liquid`) | Weight and exact line height next to the native typography settings. Output as `--sn-font-weight` / `--sn-line-height` with `--sn-mobile-font-size` (only with a section custom class); only CSS that reads them is affected (S04 doesn't) | `font_weight`, `line_height_exact` (20 → 22) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `group` (`blocks/group.liquid`) | `gap_mobile` after `gap`; passed as `--sn-gap-mobile` through the snippet's existing `style` param only with a section custom class | `gap_mobile` (36 → 37) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `button` (`blocks/button.liquid`) | Header "Button shape". Output as `--sn-button-*` vars on `.<style_class>--<block id>` only with a section custom class | `font_size`, `font_weight`, `border_width`, `border_radius`, `padding_block`, `padding_inline` (12 → 18) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `section` (`sections/section.liquid`) | Row cap, output as `--sn-content-max-width` only with a custom class (S08 desktop refinement) | `content_max_width` (800–1800 px, step 10, default 1360) (36 → 37) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S08 |
| 2026-11-11 | `text` (`blocks/text.liquid`) | "Text wrap" select: new option Normal (`wrap`, label `t:options.normal`) for Figma-like greedy wrapping; default unchanged (Pretty) | none (option added; settings count unchanged) | B | `CLASS_PLUS_SETTINGS` (removing the class does not reset wrap; set S08 heading + description back to Pretty) | Dev2 / S08 |
| 2026-11-11 | `product-hotspots` (`sections/product-hotspots.liquid`) | Opt-in "Bundle layout": two columns, static text blocks `bundle_heading`/`bundle_description`, renders `snippets/sn-bundle-panel.liquid` + loads `assets/sn-bundle.js`; `custom_class` rendered on `.section` | `bundle_layout`, `image_mobile`, `media_width`, `column_gap`, `content_max_width`, `mobile_padding_top`, `mobile_padding_bottom`, `mobile_padding_inline`, `mobile_gap`, `thumb_size`, `row_padding`, `title_size`, `subtitle_size`, `accent_color`, `border_color`, `total_label`, `discount_enabled`, `discount_percent`, `discount_badge`, `button_label`, `button_color`, `button_radius`, `hotspot_size`, `unavailable_text`, `custom_class` (15 → 40, at the limit) | D | `OPT_IN_STRUCTURAL` (turn off "Bundle layout" for the native section) | Dev2 / S11 |
| 2026-11-11 | `_hotspot-product` (`blocks/_hotspot-product.liquid`) | Bundle mode: position via `--hx/--hy` (+ mobile), marker can be hidden, empty markers not output on the storefront, no quick-add in the popup, close button | `subtitle`, `quantity`, `show_hotspot`, `mobile_position`, `x-position-mobile`, `y-position-mobile` (3 → 9) | D | `OPT_IN_STRUCTURAL` | Dev2 / S11 |
| 2026-11-11 | `product-hotspot.js` (`assets/product-hotspot.js`) | `handleHotspotClick`: markers with `data-popup-on-touch` open/close the popup on touch instead of quick add | none | D | `OPT_IN_STRUCTURAL` (attribute only output in bundle mode) | Dev2 / S11 |
| 2026-11-11 | `product-hotspots` (`sections/product-hotspots.liquid`) | Bundle correction: parent product picker decides the purchase model; `unavailable_text` removed | `bundle_product` added, `unavailable_text` removed (stays 40/40) | D | `OPT_IN_STRUCTURAL` | Dev2 / S11 |
| 2026-11-11 | `product-hotspots`, `_hotspot-product`, `product-hotspot.js` | _**_****Reverted******: S11 bundle extensions removed, files back to HEAD (S11 moved to the custom section `sn-product-bundle`) | the earlier rows for these files no longer apply | — | — | Dev2 / S11 |
| 2026-11-11 | `sn-product-bundle` (`sections/sn-product-bundle.liquid`) | Description line heights per breakpoint (px vars read by dev2.css); discount toggle folded into the badge text (empty = hidden) | `description_line_height`, `description_line_height_mobile` added; `show_discount` removed (40/40) | E | `CLASS_PLUS_SETTINGS` | Dev2 / S11 |
| 2026-11-11 | `templates/index.json` (`product_list_Rxv4hg`, S07) + `assets/dev3.css` | Second `product-list` instance reusing every S05 extension; modifier class `sn-home-bundles` sets only the mobile section spacing variables | — (no new settings) | A | `CLASS_ONLY` (modifier) | S05 values moved to CSS variables with unchanged defaults |
| 2026-11-11 | `sections/carousel.liquid` | S09 Reels: centered fixed-width mobile cards, progress bar, custom class | `mobile_centered`, `mobile_card_width`, `show_scroll_progress`, `custom_class` | B | `OPT_IN_STRUCTURAL` + `CLASS_PLUS_SETTINGS` | Reuses `scroll-progress` (target `.carousel-content slideshow-slides`); new stylesheet only applies with `mobile_centered` |
| 2026-11-11 | `sections/carousel.liquid` | S09 Reels: separate mobile gap between cards (native `columns_gap` applies to all viewports) | `mobile_gap_custom`, `columns_gap_mobile` | B | `OPT_IN_STRUCTURAL` | When on, overrides `--carousel-gap` on the slideshow track below 750px (slide gap and card-width math); off = native |
| 2026-11-11 | `blocks/video.liquid` | Poster and crop ratio for uploaded videos; styled play button | `uploaded_poster`, `uploaded_aspect_ratio`, `play_button_style`, `play_button_size`, `play_button_icon_size`, `play_button_radius`, `play_button_background`, `play_button_icon_color`, `play_button_icon_image` | B | `OPT_IN_STRUCTURAL` | `snippets/video.liquid` (3 callers) untouched; native deferred-media playback kept |
| 2026-11-11 | `blocks/product-card.liquid` | Render nothing on the storefront until a product is selected | `hide_when_empty` | B | `OPT_IN_STRUCTURAL` | Editor keeps the native placeholder |
| 2026-11-12 | `featured-blog-posts` (`sections/featured-blog-posts.liquid`) | 16→22: `view_all_label`, `view_all_link` (one link after the list; empty URL = selected blog; not class-bound, blank = no output), `custom_class`, and class-bound `show_progress` (renders `<carousel-progress>` + new `assets/carousel-progress.js`), `image_height` (→ `--blog-image-height`), `mobile_card_width` (→ `--blog-card-width-mobile`) | see change | B/D (S12) | Blank / off = native output | S12 uses `sn-home-blog` |
| 2026-11-12 | `_featured-blog-posts-card` | 12→14: `show_excerpt` (default on; off hides the description), `read_more_label` (blank = none; visual `aria-hidden` label + `icon-arrow\.svg`, the card stays one article link) | `show_excerpt`, `read_more_label` | B (S12) | Defaults = native output | Only `featured-blog-posts` uses this block |
| 2026-11-12 | `featured-blog-posts` + `_featured-blog-posts-card` | ****Reverted to stock****: S12 moved to manual cards on `carousel`; the two rows above for these files no longer apply | — | revert | — | — |
| 2026-11-12 | `carousel` (`sections/carousel.liquid`) | 16→20: `image_height` (class-bound → `--carousel-image-height`), `show_progress` (class-bound; `<carousel-progress>` + `assets/carousel-progress.js`), `view_all_label` + `view_all_link` (one link after the cards; label-only preview in the Theme Editor) | see change | B/D (S12) | Off / blank = no output | S12 uses `sn-home-blog`; S10 unaffected |
| 2026-11-12 | `carousel` | S12 additions (`image_height`, `show_progress`, `view_all_label`, `view_all_link`) ****removed**** (back to 16 settings); S12 returned to `featured-blog-posts` | — | revert | — | — |
| 2026-11-12 | `featured-blog-posts` + `_featured-blog-posts-card` | Re-applied for S12 (16→23 / 12→14): `view_all_label` + `view_all_visibility` (auto = `blog.articles_count > post_limit`; link = `blog.url`, arrow first), `custom_class`, class-bound `show_progress`, `image_height`, `mobile_card_width`, `heading_gap_mobile`; card `show_excerpt`, `read_more_label` (real link to `article.url`, `tabindex -1` + `aria-hidden`, arrow first) | see change | B/D (S12) | Blank / off / defaults = native output | Supersedes the earlier "reverted" row |
| 2026-11-12 | `group` (`blocks/group.liquid`) | Equal-column grid per breakpoint (class `sn-group--cols`/`-mobile` + vars), only with a section custom class | `columns`, `columns_mobile` (37 → 39) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S13 |
| 2026-11-12 | `text` (`blocks/text.liquid`) | Mobile line height + mobile alignment vars; font size option 13px (0.8125rem) | `line_height_exact_mobile`, `alignment_mobile` (22 → 24) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S13 |
| 2026-11-12 | `image` (`blocks/image.liquid`) | Fixed px width per breakpoint; no stock placeholder on the live store when empty (with a custom class) | `fixed_width`, `fixed_width_mobile` (17 → 19) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S13 |
| 2026-11-12 | `group` (`blocks/group.liquid`) | Mobile display order: `--sn-order-mobile` (CSS order, visual only) for cards inside a mobile-columns grid | `mobile_order` (39 → 40, at the limit) | B | `CLASS_PLUS_SETTINGS` | Dev2 / S13 |
| 2026-11-12 | `sections/section.liquid` + `snippets/section.liquid` | S14 FAQ: custom class on the native `section` | `custom_class` (header "Advanced") | B | `CLASS_PLUS_SETTINGS` | Rendered on the `.section` div in the snippet via `custom-class.liquid`; `_blocks` (other caller) has no setting → outputs nothing |
| 2026-11-12 | `blocks/accordion.liquid` | S14 FAQ: rows as cards, custom question typography, icon color/size/image | `type_preset` option `custom` + `summary_font_size`/`summary_font_weight`/`summary_line_height`; `icon` option `image` + `icon_image`; `icon_color`; `row_cards`, `row_gap`, `row_background`, `row_background_open`, `row_border_color`, `row_border_width`, `row_radius`, `row_padding_block`, `row_padding_inline`, `row_padding_inline_mobile`, `summary_gap`, `content_gap`, `icon_size` | B | `OPT_IN_STRUCTURAL` | 15 → 33 settings. Block stylesheet only targets `.accordion--cards` / `--icon-color` / `--image`; with `row_cards` on, dividers are not used. Empty-answer rows keep the closed size when opened |
