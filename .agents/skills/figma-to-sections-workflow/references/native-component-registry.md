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

| `collection-list` / `main-collection-list` | Collection grids/carousels. `collection-list` presets: `t:names.collections_bento`, `collections_grid`, ****`collections_carousel`**** ("Collection list: Carousel" / ar "قائمة المجموعات: عرض دائري": `group` "Header" > `text`, static `_collection-card` > `_collection-card-image` + `collection-title`, `layout_type` carousel), `collections_editorial` | `@theme`, text, image, button, group… / collection cards | `.section` div |

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

\\- ****Figma "title + text + CTA" block**** → `section` + `text` + `button`, or `group` for alignment. Don't build a new section.

\\- ****Card grid**** → `section` with `group` children (flex wrap), or `collection-list`. Product grid → `product-list`.

\\- ****Slider**** → `slideshow` / `carousel` / `product-list` with `layout_type: carousel`. Never add a slider library.

\\- ****Image + text**** → `media-with-content`.

\\- ****Accordion / FAQ**** → `section` preset "FAQ" (`accordion` + `_accordion-row`).

## Project extension log

Add a row for every schema setting added, structural change, or new component. Newest last.

| Date | Component (file) | Change | Setting IDs | Category | Reversibility (`CLASS_ONLY` / `CLASS_PLUS_SETTINGS` / `OPT_IN_STRUCTURAL` / `NOT_FULLY_REVERSIBLE`) | Notes / limitations |

|---|---|---|---|---|---|---|

| 2026-11-08 | `hero` (`sections/hero.liquid`) | `custom_class` on the `.hero` root, under "Advanced" (36→37 settings) | `custom_class` | B | CLASS_PLUS_SETTINGS (expected, untested) | S03 Dev1 (`sn-home-hero`) |

| 2026-11-08 | `group` (`blocks/group.liquid`) | `custom_class` + floating position selects, passed to the existing `class` param of `snippets/group.liquid` (36→39 settings, 1 below the Theme Check warning) | `custom_class`, `float_position` (default `none`), `float_position_mobile` (default `same`, `visible_if` position ≠ none) | B | CLASS_PLUS_SETTINGS (expected, untested) | Position classes `sn-float*` are output only when set, and inert outside `.sn-home-hero-stage` (Dev1). Default output unchanged |

| 2026-11-08 | `text` (`blocks/text.liquid`) + shared `snippets/text.liquid` | Optional `mobile_text` richtext (19→20). The snippet adds a mobile sibling element + `text-block--desktop-text`/`--mobile-text` toggles at 749/750 only when it's set | `mobile_text` | D (user-approved) | Not class-bound; empty = native output | Other 9 callers have no such setting → unchanged. Mobile sibling has no editor attributes (sidebar edit only); the desktop element keeps click-to-edit. Shown only when the desktop text is non-empty. Theme Editor check pending |

| 2026-11-08 | `snippets/custom-class.liquid` (new, shared) | Sanitizer per `custom-class-policy.md` §3. Reported sample outcomes: `␠␠a␠␠␠b␠␠` → `a b`; `SN-A` → `sn-a`; `sn_b` → `sn_b`; `sn-c"><x` → `sn-c-x`; `1abc` → `1abc`; Arabic `مرحبا` preserved; empty → nothing. | — | B | n/a | Combined the S03/Dev1 and S05/Dev3 creation reports. **Verification CONFLICT:** the Dev1 record says the test matrix was not run, and a later record reports test outcomes but disputes their verification. Treat test status as UNVERIFIED until independently checked. Arabic and leading-digit tokens remain allowed by the reported sanitizer; the `sn-*` naming convention still applies. |

| 2026-11-08 | `collection-list` (`sections/collection-list.liquid`) | `custom_class` setting appended after an "Advanced" header; rendered on the `.section` div via `custom-class` | `custom_class` | B | `CLASS_PLUS_SETTINGS` (S04: see plan area E for settings changed) | Dev2 / S04 / `sn-home-collections`. Settings count 17 → 18 |

| 2026-11-08 | `templates/index.json` S04 instance (no schema change) | Aligned with the native `collections_carousel` preset: instance `"name"` restored to `t:names.collections_carousel` (was the heading text), heading `text` wrapped in the preset's `group` "Header" block | — | B | `CLASS_PLUS_SETTINGS` (unchanged) | Section ID, `text_sn_heading` ID and all settings kept; no collections had been picked yet, so nothing was lost |

| 2026-11-08 | `sections/product-list.liquid` | `custom_class` on `.section.section-resource-list`; opt-in progress bar rendered after the resource list | `custom_class`, `show_scroll_progress` | B / D | `CLASS_ONLY` / `OPT_IN_STRUCTURAL` | S05 (`sn-home-bestsellers`). 19 settings |

| 2026-11-08 | `blocks/text.liquid` | `custom_class` passed through `snippets/text.liquid`'s existing `class` param | `custom_class` | B | `CLASS_ONLY` | Used for S05 card parts `-badge`, `-desc`, `-cta`. 20 settings |

| 2026-11-08 | `blocks/_product-card-gallery.liquid` | Per-block mobile quick add (scoped `{% style %}` overriding `--quick-add-mobile-display/opacity`); add label passed to `quick-add` | `quick_add_mobile`, `quick_add_label` | B / D | `OPT_IN_STRUCTURAL` | Needs global `quick_add` on. Global `mobile_quick_add` untouched |

| 2026-11-08 | `snippets/quick-add.liquid` (3 callers) | Optional `add_label` param for the direct Add button only; Choose untouched | param `add_label` | D (approved R6) | `OPT_IN_STRUCTURAL` | `_featured-product-gallery`, `_hotspot-product` pass nothing → unchanged output |

| 2026-11-08 | `blocks/_product-list-button.liquid` | Show link whenever a collection is selected | `show_always` | B | `OPT_IN_STRUCTURAL` | Default = native "more products than shown" rule |

| 2026-11-08 | `blocks/review\.liquid` | Label inside `.rating-wrapper` (only with rating data) | `label` | B | settings-only | Blank = native |

| 2026-11-08 | `blocks/price.liquid` | Discount badge `span.price-discount-badge[ref=discountBadge]` inside `<product-price>`, from `selected_or_first_available_variant` | `show_discount_badge`, `discount_badge_label` (`[percent]`) | B / D | `OPT_IN_STRUCTURAL` | Not refreshed on live variant change (`product-price.js` untouched by decision) |

| 2026-11-08 | `snippets/scroll-progress.liquid` + `assets/scroll-progress.js` (new) | Reusable `<scroll-progress target>` scrollbar-style indicator; read-only, RTL-safe | — | D | `OPT_IN_STRUCTURAL` (via `show_scroll_progress`) | Reusable for other carousels (S04/S09/S12). Fixture-tested; not yet in a store preview |

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

| 2026-11-09 | `blocks/review\.liquid` | Mobile size of label + count | `font_size_mobile` | B | settings-only | — |

| 2026-11-09 | `blocks/icon.liquid` | Mobile icon width | `width_mobile` | B | settings-only | `!important` to beat the inline width on uploaded images |

| 2026-11-09 | `blocks/price.liquid` | Bug fix: discount badge color/size and mobile price size were overridden by base.css `.text-block.<preset> > *`; selectors raised under `product-price.price--inline-badge` | — (existing settings now effective; sizes step 0.5) | D | `OPT_IN_STRUCTURAL` | No duplicate settings |

| 2026-11-11 | `templates/index.json` (`product_list_Rxv4hg`, S07) + `assets/dev3.css` | Second `product-list` instance reusing every S05 extension; modifier class `sn-home-bundles` sets only the mobile section spacing variables | — (no new settings) | A | `CLASS_ONLY` (modifier) | S05 values moved to CSS variables with unchanged defaults |

| 2026-11-11 | `sections/carousel.liquid` | S09 Reels: centered fixed-width mobile cards, progress bar, custom class | `mobile_centered`, `mobile_card_width`, `show_scroll_progress`, `custom_class` | B | `OPT_IN_STRUCTURAL` + `CLASS_PLUS_SETTINGS` | Reuses `scroll-progress` (target `.carousel-content slideshow-slides`); new stylesheet only applies with `mobile_centered` |

| 2026-11-11 | `sections/carousel.liquid` | S09 Reels: separate mobile gap between cards (native `columns_gap` applies to all viewports) | `mobile_gap_custom`, `columns_gap_mobile` | B | `OPT_IN_STRUCTURAL` | When on, overrides `--carousel-gap` on the slideshow track below 750px (slide gap and card-width math); off = native |

| 2026-11-12 | `sections/section.liquid` + `snippets/section.liquid` | S14 FAQ: custom class on the native `section` | `custom_class` (header "Advanced") | B | `CLASS_PLUS_SETTINGS` | Rendered on the `.section` div in the snippet via `custom-class.liquid`; `_blocks` (other caller) has no setting → outputs nothing |

| 2026-11-12 | `blocks/accordion.liquid` | S14 FAQ: rows as cards, custom question typography, icon color/size/image | `type_preset` option `custom` + `summary_font_size`/`summary_font_weight`/`summary_line_height`; `icon` option `image` + `icon_image`; `icon_color`; `row_cards`, `row_gap`, `row_background`, `row_background_open`, `row_border_color`, `row_border_width`, `row_radius`, `row_padding_block`, `row_padding_inline`, `row_padding_inline_mobile`, `summary_gap`, `content_gap`, `icon_size` | B | `OPT_IN_STRUCTURAL` | 15 → 33 settings. Block stylesheet only targets `.accordion--cards` / `--icon-color` / `--image`; with `row_cards` on, dividers are not used. Empty-answer rows keep the closed size when opened |

| 2026-11-11 | `blocks/video.liquid` | Poster and crop ratio for uploaded videos; styled play button | `uploaded_poster`, `uploaded_aspect_ratio`, `play_button_style`, `play_button_size`, `play_button_icon_size`, `play_button_radius`, `play_button_background`, `play_button_icon_color`, `play_button_icon_image` | B | `OPT_IN_STRUCTURAL` | `snippets/video.liquid` (3 callers) untouched; native deferred-media playback kept |

| 2026-11-11 | `blocks/product-card.liquid` | Render nothing on the storefront until a product is selected | `hide_when_empty` | B | `OPT_IN_STRUCTURAL` | Editor keeps the native placeholder |
