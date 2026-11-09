# Shosha – Project Plan (permanent)
> Single source of truth for project decisions & progress. Rules: figma-to-sections-workflow skill → references/project-plan-template.md. Update incrementally; never recreate.

## A. Project overview

| Item | Value |
|---|---|
| Project / brand | Shosha / SNOSHA |
| Platform / theme | Shopify, Horizon 4.4.0 (blocks-first) |
| Language / direction | Arabic / RTL. Font: Cairo (`assets/custom-cairo.css.liquid`) |
| Target templates | `templates/index.json` (homepage). Global: `sections/header-group.json`, `sections/footer-group.json` |
| Figma file | https://www.figma.com/design/1fqyznLFgS65tTjGvBYPBm/Snosha |
| Desktop homepage | `190:3767`, https://www.figma.com/design/1fqyznLFgS65tTjGvBYPBm/Snosha?node-id=190-3767 (1480px wide) |
| Mobile homepage | `190:4082`, https://www.figma.com/design/1fqyznLFgS65tTjGvBYPBm/Snosha?node-id=190-4082 (390px wide) |
| Environment | Claude Code in the theme repo. Shopify CLI 4.9.4 (`shopify theme dev` for preview). Git; no auto commit/push/deploy |
| Delivery | Incremental: one section at a time, after the user's request with its nodes |
| Current homepage state | `index.json` has only `product-list` (`product_list_fa6P9H`), **enabled and configured as S05** since 2026-11-08 (was disabled) |

## B. Global architecture decisions

Each one is decided; the details are in the referenced Skill file.

| # | Decision | Governing reference |
|---|---|---|
| B1 | Native-first, reuse ladder A–E. A new section (E) needs justification and the user's approval | SKILL.md |
| B2 | Horizon blocks-first composition; no duplicate components or layout systems | horizon-architecture.md, native-component-registry.md |
| B3 | `custom_class` on demand, only on sections/blocks being customized. Preferred names `sn-<page>-<section>[-<part>]` | custom-class-policy.md |
| B4 | All Figma CSS scoped to the custom class, in the owner's developer file | custom-class-policy.md §5 |
| B5 | Three-level reversibility, with the result recorded per section in F | custom-class-policy.md §6 |
| B6 | Content media editable in the Theme Editor; native settings first; merchant uploads final files | schema-extension-policy.md "Media settings" |
| B7 | Use Horizon tokens and theme settings first. Exact Figma values go in class scope. Global type/color changes need approval (see G) | horizon-architecture.md |
| B8 | Breakpoints: ≤749 / 750–989 / ≥990 / ≥1440 when needed. Arabic RTL with logical properties | horizon-architecture.md |
| B9 | VERIFIED needs: Theme Check at baseline, plus desktop/mobile/RTL visual QA and the two-state test, with evidence | figma-analysis-and-qa.md |

## C. Developer ownership

| Developer | CSS file | Status | Sections assigned |
|---|---|---|---|
| Main | `assets/main.css` | Initialized 2026-11-08 (loaded once after `custom-cairo.css`) | none assigned explicitly yet |
| Dev1 | `assets/dev1.css` | Not initialized | — |
| Dev2 | `assets/dev2.css` | Not initialized | — |
| Dev3 | `assets/dev3.css` | Initialized 2026-11-08 (loaded once in `layout/theme.liquid`, right after `main.css`) | S05 |

**Custom classes owned:** `sn-home-bestsellers` (+ part classes `sn-home-bestsellers-badge`, `-desc`, `-cta` on `text` blocks) — Dev3, S05.
**Shared-file claims (active):** none.

## D. Section registry

Logical areas from the Figma homepage, in Figma order. A row isn't necessarily one Shopify section file. Nodes were verified with `get_metadata` on 2026-11-08.

| ID | Section | Desktop node | Mobile node | Target | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
|---|---|---|---|---|---|---|---|---|---|---|
| S01 | Announcement Bar | `190:3768` | `190:4083` | header-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |
| S02 | Header / Navigation | `190:3769` + `190:3776` | `190:4084` | header-group (global) | — | NOT_STARTED | — | — | — | Global. `header` already has 42 settings (G) |
| S03 | Hero + Trust Strip | `190:3789` | `335:3959` | index.json | — | NOT_STARTED | — | — | — | — |
| S04 | Collections | `190:3830` | `190:4133` | index.json | — | NOT_STARTED | — | — | — | — |
| S05 | Featured Collection | `190:3844` | `190:4149` | index.json | Dev3 | IMPLEMENTED (2026-11-08; visual QA PENDING USER REVIEW) | B + C + D (opt-in) | `product-list` (`product_list_fa6P9H`, enabled) | `sn-home-bestsellers` | Visual QA is user-owned. Data: best-seller collection, review app. Same design as S07 |
| S06 | F1 Banner | `190:3851` | `190:4167` | index.json | — | NOT_STARTED | — | — | — | — |
| S07 | Featured Collection 2 | `190:3896` | `190:4204` | index.json | — | NOT_STARTED | — | — | — | Reuse S05's decisions |
| S08 | Before / After | `190:3903` | `190:4222` | index.json | — | NOT_STARTED | — | — | — | — |
| S09 | Reels | `190:3935` | `190:4254` | index.json | — | NOT_STARTED | — | — | — | — |
| S10 | Choose Your Care | `190:3943` | `190:4265` | index.json | — | NOT_STARTED | — | — | — | — |
| S11 | Bundle | `190:3987` | `190:4318` | index.json | — | NOT_STARTED | — | — | — | — |
| S12 | Blog | `190:4018` | `190:4349` | index.json | — | NOT_STARTED | — | — | — | — |
| S13 | Why SNOSHA | `190:4024` | `190:4361` | index.json | — | NOT_STARTED | — | — | — | — |
| S14 | FAQ | `217:14604` | `217:14813` | index.json | — | NOT_STARTED | — | — | — | — |
| S15 | Footer | `190:4048` | `190:14491` | footer-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |

## E. Section decisions

Each section gets its own subsection here (with the Native Reuse Audit) when its task starts.

### S05 Featured Collection — PLANNED 2026-11-08 (Dev3, not implemented)

**Figma (read 2026-11-08 with `get_metadata` + `get_design_context`, file `1fqyznLFgS65tTjGvBYPBm`)**
- Desktop `190:3844` "06 Featured Collection": frame 1480 × 841.1. Padding top 60, bottom 91.1. Container `349:4611` 1376 wide at x 52, inline padding 20 → content 1336. Heading `190:3845` (1336 × 90) → 40 gap → Product Row `190:3846` (1336 × 560, gap 24, 4 cards `190:3847–3850` at 316 × 541.9; extra row height is room for the hover shadow).
- Mobile `190:4149`: frame 390 × 573. Padding 56 / 56. Container `387:4747` column, gap 14 between head / carousel / progress / link. Head `387:4746` inline padding 24. Carousel `190:4153` inline padding 24, block padding 11, track `387:4745` gap 12, cards 165 × 283. Progress row `387:4748` (track `190:4162` 342 × 4). Link `190:4164` centered.
- **Heading:** title Cairo SemiBold 32/52 desktop, 24/38 mobile (Mobile/H2), color `#12568d`. Title→subtitle gap 6 desktop; mobile title row has 3px block padding, then gap 14. Subtitle Regular 18/32 desktop, 15/26 mobile, `#5a5a59`. Desktop "عرض الكل": SemiBold 16/26 `#176bb0` + 18px arrow, gap 10, absolutely placed at the inline-end (left in RTL), bottom-aligned to the heading (bottom 5.9).
- **Desktop card:** white, 1px `#efeded` border, radius 20, column gap 14. Image 316 × 316 (square), top corners 16. Text area padding 0 12 12, gap 6, then a 6px spacer. Title SemiBold 16/27 `#12568d`. Description Regular 14/24 `#5a5a59`. Rating row gap 6: label Regular 12/20 `#5a5a59` + 5 stars 23.6 × 22.9. Price row padding-top 4, gap 10: price Bold 18/28 `#12568d`, compare-at Regular 14/22 line-through `#5a5a59`, discount pill SemiBold 12/18 `#176bb0` on `#f0fafe`, 1px `#dcf2fb` border, radius 8, padding 4/12. CTA "عرض المنتج" SemiBold 16/26 `#176bb0` + 18px arrow, gap 10.
- **Badge (Best Seller):** `#176bb0` bg, white SemiBold 12/18, padding 4/12, radius 8, about 13–16px from the top and the inline-end (left) corner on desktop.
- **Desktop hover (card 4 only):** drop shadow 0 12 16 `rgba(15,100,168,.1)`; Add to Cart bar over the image, inset 14 left/right/bottom, padding 12/20, radius 12, `#176bb0`, white SemiBold 16/26 "أضف إلى السلة" + 18px cart icon, gap 10. Treated as the hover/focus state, not a permanent button.
- **Mobile card:** 165 × 283, radius 20, 1px `#efeded`, overflow clipped, image 165 × 165. Cart FAB 32 × 32 circle `#176bb0`, shadow 0 6 12 `rgba(15,100,168,.35)`, 16px icon, 7px from top and inline-end (left). Best Seller badge moves to the inline-**start** (right) on mobile, about 8px from top/right.
- **⚠ Mobile card text is a 0.522× scaled copy of the desktop card:** title 8.35px, description 7.31px, price 9.4px, badges 6.27px, stars 12.3px. Unreadable on a phone and below accessibility minimums. Not implemented literally → pending decision S05-Q3.
- **Mobile carousel geometry:** RTL. Initial position shows the first card flush with the right 24px gutter, a second full card, and a sliver of the third on the left. Progress fill = gradient `#63cdff → #0f64a8`, radius 99, 168/342 (≈ 49%) wide, sitting at the inline-start (right) end at the initial position on a `#dcf2fb` track → scrollbar-thumb style (thumb width ≈ visible / total).
- Tokens used: Desktop/Product Name, Product Price, Product Price Discount, Body Small, Caption, Label Overline, Button CTA, Body Large, Mobile/H2, Shadow/Soft. All match the token table in figma-analysis-and-qa.md.
- Media: product images only (resource media). No Figma images downloaded, no image picker needed.

**Native Reuse Audit**
- Matching section: `sections/product-list.liquid` (collection picker, `max_products` 1–16, `layout_type` grid/carousel/editorial, `columns`, `mobile_columns`, `carousel_on_mobile`, `mobile_card_size`, `columns_gap`, `rows_gap`, arrows, `section_width`, `gap`, `background_color`, padding). 17 settings, so adding `custom_class` is safe. The existing disabled instance `product_list_fa6P9H` in `index.json` is reused (verified still disabled, collection `all`, header blocks `product_list_text_YFtzcL` + `product_list_button_MWeP9V`, card blocks gallery/title/price).
- Rendering chain inspected: `product-list` → `snippets/resource-list.liquid` → (grid) list items / (mobile) `snippets/resource-list-carousel.liquid` → `snippets/slideshow.liquid` + `assets/slideshow.js` (RTL via `isRTL`/`getDirectionMultiplier`, `scroll-snap-align: start`, gutters `--gutter-slide-width`). Header: `blocks/_product-list-content.liquid` (group; accepts `@theme`, `text`, `button`, `_product-list-text`, `_product-list-button`). Card: `blocks/_product-card.liquid` → `snippets/product-card.liquid` (whole card is a link via `.product-card__link`); children allowed: `_product-card-group`, `text`, `image`, `buy-buttons`, `price`, `review`, `sku`, `swatches`, `_product-card-gallery`, `product-title`, `custom-liquid`, `@app`. Gallery: `blocks/_product-card-gallery.liquid` → `snippets/card-gallery.liquid` (native Sale / Sold-out badges + `snippets/quick-add.liquid`). Price: `blocks/price.liquid` → `snippets/price.liquid` (current + compare-at from `selected_or_first_available_variant`; **no percentage**). Ratings: `blocks/review.liquid` (`product.metafields.reviews.rating` / `rating_count`; renders nothing when empty). Quick Add: `snippets/quick-add.liquid`, `quick-add-styles.liquid`, `assets/quick-add.js`, `product-form.js`.
- Native config that covers it: `layout_type: grid` + `columns: 4` + `columns_gap: 24` + `carousel_on_mobile: true` = 4-up desktop grid and a mobile swipe carousel (snap, RTL, Theme Editor re-render handled by slideshow.js). `_product-card-gallery image_ratio: square`. `_product-card` border solid 1 / radius 20 (max 32) / `product_card_gap` 14. `_product-card-group` (padding 0 12 12, gap 6) for the text area. `text_color`/type settings on text blocks. Padding top 60 / bottom 91 (max 100).
- Not native (gaps): progress bar (resource-list carousel renders no controls, `slideshow-controls` only has dots/counter/thumbnails), discount %, Best Seller badge, short description in cards (`product-description` block is not allowed in `_product-card`), a "View product" text link, mobile placement of View All, exact 1336 container, mobile spacing/card width.
- Native trade-off noted: `carousel_on_mobile` renders the card list twice (desktop grid `hidden--mobile` + mobile carousel `hidden--desktop`). This is stock Horizon behaviour, used as is; no custom duplication. The Quick Add form ID (`QuickAdd-ProductForm-<product>-<block>`) therefore appears twice in the DOM (pre-existing Horizon issue, out of scope).
- Native rule noted: `_product-list-button` only renders when `collection.products_count > max_products`. With a 4-product collection and `max_products: 4`, View All is hidden on both breakpoints (S05-Q4).

**Architecture (proposed)**
- Section: native `product-list` (name kept). One schema extension: `custom_class` (text, end of settings, after an "Advanced" header) rendered on the `.section.section-resource-list` div through a new `snippets/custom-class.liquid` (created and tested on first use per custom-class-policy.md §3).
- Header (`static-header`, `_product-list-content`): content direction column, centered. Blocks: `_product-list-text` title "الأكثر مبيعًا" (h2), `_product-list-text` subtitle "منتجات SNOSHA الأكثر مبيعًا", existing `_product-list-button` "عرض الكل" (links to `closest.collection.url` automatically). Desktop: the button is placed at the inline-end bottom of the header with class-scoped CSS. Mobile: the same button is moved below the progress bar with class-scoped CSS (single link, no duplicate). Fallback if that proves fragile in the preview: a `button` block in the section's own block area (rendered after the list) shown on mobile only.
- Card (`static-product-card`, shared by every card):
  1. `_product-card-gallery` (square) — native Quick Add lives here.
  2. `text` "الأكثر مبيعًا" (Best Seller badge), absolutely positioned over the image by class CSS. Merchant-editable; can optionally be connected to a product metafield so only some products show it (empty → renders nothing).
  3. `_product-card-group` (column, padding 0 12 12, gap 6) containing: `product-title`; `text` connected to a product metafield for the short description (proposed `custom.short_description`, multi-line text; empty → nothing); `review`; `_product-card-group` row (gap 10) with `price` (`show_sale_price_first: true`) + `custom-liquid` discount pill; `text` "عرض المنتج" + arrow (visual only; the native card overlay link handles the click).
- **SUPERSEDED 2026-11-08 → R7** (custom-liquid rejected: `closest` is not documented inside `liquid` settings). Discount pill: `custom-liquid` computing `(compare_at − price) × 100 / compare_at` (rounded) from `closest.product.selected_or_first_available_variant`, output only when `compare_at_price > price`. **Must be verified** that `closest.product` resolves inside a `liquid` setting in this context. If not → fallback D: opt-in `show_discount_badge` checkbox (default false) on `blocks/price.liquid` only (snippet `price` has 6 callers and stays untouched).
- Native Sale badge: hidden within `.sn-home-bestsellers` only (the pill carries the information); Sold-out badge kept.
- **SUPERSEDED 2026-11-08 → R5.** Ratings: native `review` block (stars from the `reviews.rating` metafield, which review apps such as Judge.me write). No fake data; with no reviews the row disappears. The literal "التقييمات" label is not added (it would show without data) → S05-Q5.
- **SUPERSEDED 2026-11-08 → R1, R6.** Quick Add: native only. Desktop = restyle the hover-revealed `button.quick-add__button` into the full-width bar (inset 14, radius 12, label visible). Mobile = restyle the same button as the 32px circular FAB at top/inline-end. Variant products keep the native "اختيار" → quick-add modal flow; cart drawer, live region, loading/added states, keyboard focus all native. Mobile visibility needs the **global** theme setting `mobile_quick_add` (currently default `false`) → S05-Q1.
- **SUPERSEDED 2026-11-08 → R2.** Progress bar: **CSS-only scroll-driven animation**, class-scoped. `scroll-timeline: --sn-bs-progress inline` on the mobile carousel's `slideshow-slides`, `timeline-scope` on the mobile `.resource-list` wrapper, track + thumb drawn with `::before`/`::after` on that wrapper (thumb width fixed ≈ 49% to match Figma, translated across the track from the inline-start; RTL handled with `[dir='rtl']`). No new JS, no second slider. Support: Chromium 115+, Safari 26+; Firefox shows the static track only (`@supports (animation-timeline: scroll())` guard) → S05-Q2. Fallback D if exact tracking in all browsers is required: a small module listening to the native scroller's scroll events (new `assets/` file + importmap entry).
- Layout / CSS (all in `assets/dev3.css` under `.sn-home-bestsellers`, native CSS nesting):
  - Container: class-scoped `--page-content-width: 83.5rem` (1336px) + `--page-width` override → 72px side margins at 1480 (52 + 20), as in Figma.
  - ≥990: 4 columns, gap 24 (native settings). 750–989: override `grid-template-columns` to 2 columns (2 × 2) so cards stay ≥ 300px; no new breakpoint (Horizon's 750/990). ≤749: carousel, slide width 165px (override `--slide-width` on the slide, since `--mobile-card-size` is inline on the wrapper), gap 12, gutters 24 (override `--gutter-slide-width` on a descendant), block padding 11.
  - Mobile section padding: override `padding-block: calc(56px + var(--section-top-offset, 0px)) 56px` (native ×0.7 scaling would give 42 / 64).
  - Typography / colors not covered by block settings, card hover shadow, badge, pill, CTA arrow (native `icon-arrow.svg` via mask; UI icon in code).
- Background: native `background_color` (white palette background). No sibling selector needed.

**SUPERSEDED 2026-11-08 → R10.** **Settings changed from default (reversibility level 3, apply in Theme Editor):** section `collection` (merchant's best-seller collection), `max_products` 4, `columns_gap` 24, `carousel_on_mobile` true, `gap` 40, padding 60 / 91, `custom_class`. Header direction/alignment, text contents and colors. Card border/radius/gap, gallery ratio, new card blocks above. Global `mobile_quick_add` if approved.
**Reversibility target:** `CLASS_PLUS_SETTINGS` (removing the class restores native look; the settings above stay). Plus `OPT_IN_STRUCTURAL: show_discount_badge` only if the D fallback is used.

**SUPERSEDED 2026-11-08 → R10.** **Files expected later:** `sections/product-list.liquid` (schema `custom_class` + one render in the class attribute), new `snippets/custom-class.liquid`, new `assets/dev3.css`, `layout/theme.liquid` (Dev3 initialization tag only, after `main.css`), `templates/index.json` (configure `product_list_fa6P9H`, enable it). Only if fallbacks are needed: `blocks/price.liquid`, one new JS asset + `snippets/scripts.liquid`. No locale, `config/*`, `base.css` or native stylesheet edits (except the global `mobile_quick_add` value if approved, which is written to `config/settings_data.json` by the Theme Editor).
**Shared-file risks:** `templates/index.json` (editor-rewritten; pull first, claim in C). `layout/theme.liquid` (initialization tag only). `product-list` also serves S07 and any future product grid; the new setting defaults to empty → existing instances unchanged. `mobile_quick_add` is global and changes every product card on the site (collection page, recommendations).
**Template integration:** reuse `product_list_fa6P9H` (keep its ID and block IDs), set `disabled: false` when S05 is approved. Final order follows Figma (after S04 Collections, before S06 F1 Banner) once those sections exist.
**S07 reuse:** a second `product-list` instance with its own collection and the same class (or `sn-home-bestsellers-2` if S07 needs differences). No new section type.
**SUPERSEDED 2026-11-08 → R10.** **Category:** B (custom_class) + C (composition of native blocks) + class-scoped CSS. D only as a documented fallback. E rejected: product-list covers source, layout, carousel and cards natively.

**ANSWERED 2026-11-08 by the user (D1–D10) → see the refinement below.** ~~Approval (pending):~~ S05-Q1 enable global `mobile_quick_add`; S05-Q2 CSS scroll-driven progress (no JS, static in Firefox) vs JS extension; S05-Q3 readable mobile card typography instead of the scaled 6–9px Figma values; S05-Q4 View All only when the collection has more than `max_products` (native) vs always shown; S05-Q5 drop the literal "التقييمات" label; S05-Q6 keep native Quick Add labels "إضافة"/"اختيار" (Figma "أضف إلى السلة" needs a locale edit, protected). Data: merchant to create the best-seller collection, the short-description metafield, and install/confirm a review app.

#### S05 refinement — user decisions D1–D10 (2026-11-08, plan only, nothing implemented)

Verified in code and docs on 2026-11-08 before deciding:
- Quick Add markup is rendered by `_product-card-gallery` when `product.available and (settings.quick_add or settings.mobile_quick_add)` (Liquid evaluates right to left). `quick_add` is on (schema default `true`; not overridden in `settings_data.json`), so the button **already exists in the DOM on mobile**. It is hidden only by CSS: `button.quick-add__button { display: var(--quick-add-mobile-display, none); opacity: var(--quick-add-mobile-opacity, 0) }`. Those two variables are written inline on `.product-card__content` in `snippets/product-card.liquid`, so any descendant can override them. `quick-add.js` is loaded globally when `settings.quick_add` is on, and already has a mobile path (`isMobileBreakpoint()` → modal).
- `snippets/quick-add.liquid` has **3 callers**: `_product-card-gallery`, `_featured-product-gallery`, `_hotspot-product`. Its add label is hardcoded to `'actions.add' | t` (ar: "إضافة"; choose: "اختيار").
- No native progress mechanism (re-confirmed). `assets/scrolling.js` `ScrollHint` already computes an RTL-safe ratio (`Math.abs(scrollLeft) / (scrollWidth − clientWidth)`, rAF-throttled scroll + ResizeObserver). The new component follows that pattern.
- shopify.dev (dynamic sources): "`closest.<type>` is accessible exclusively via theme settings and can serve as a configuration value for these settings". `liquid`-type settings have access to global and template objects only. **`closest.product` inside `custom-liquid` is not supported by the docs → not used.**
- `product-price.js`, on a variant change, replaces only `[ref="priceContainer"]` (and the volume-pricing note) inside `product-price[data-block-id]`.
- `richtext` settings accept `single_line_text_field`, `multi_line_text_field` and `rich_text_field` metafields as dynamic sources (shopify.dev compatibility table). Card blocks receive `closest.product` through `content_for 'block', closest.product: product`, which `product-title` already uses. `snippets/text.liquid` renders **nothing** when the text is blank (`elsif plain_text != blank`).
- `_product-list-button` renders only if `closest.collection.products_count > section.settings.max_products`.
- Header DOM: `.section-resource-list__header` › `.group-block` › `.group-block-content` › blocks. Both group levels are `position: relative` (base.css); no `overflow: hidden` unless a video background is set.

**R1 — Mobile Quick Add, isolated to this instance (D1).** The global `mobile_quick_add` stays off.
- New checkbox on `blocks/_product-card-gallery.liquid`: `quick_add_mobile` ("Show quick add on mobile"), default `false`, with info noting that it requires "Quick add" in theme settings.
- When it is true and `settings.quick_add` is on, the block outputs one scoped rule: `{% style %}#shopify-section-{{ section.id }} .card-gallery-{{ block.id }} { --quick-add-mobile-display: flex; --quick-add-mobile-opacity: 1; }{% endstyle %}`. The `.card-gallery-<id>` class already exists on the native root.
- No change to markup, JS, cart, variant, modal or availability logic. Unavailable products render no button (native), and variant products still open the native modal.
- Not a shared snippet. The block is hosted by product-list, product-recommendations, main-collection and the `product-card` block; it defaults off, so they're unchanged.
- The FAB look (32px circle, top inline-end, shadow) goes in `dev3.css` under the class.
- Minor: the `{% style %}` repeats once per card (static-block limitation), the same as Horizon's `review` block.
- **Isolated to S05: yes.** Reversibility: `OPT_IN_STRUCTURAL: quick_add_mobile`.

**R2 — Progress tracks real scroll (D2).**
- New reusable `<scroll-progress>` custom element:
  - `assets/scroll-progress.js`: extends `HTMLElement` like `ScrollHint`, no imports, no slider logic.
  - `snippets/scroll-progress.liquid`: markup `<scroll-progress target="…" aria-hidden="true"><span class="scroll-progress__thumb"></span></scroll-progress>`, neutral base styles in `{% stylesheet %}`, and its own `<script type="module">` tag (deduplicated by the browser). No importmap change unless another module imports it later.
- Behaviour: it finds its scroller as `closest('.shopify-section').querySelector(target)`. For product-list the target is `.resource-list__carousel > slideshow-container > slideshow-slides`, which matches the outer carousel only, not the card galleries' nested slideshows.
- On passive `scroll` (rAF-throttled) and a `ResizeObserver` on the scroller, it sets:
  - `--scroll-progress-size = clientWidth / scrollWidth` (the thumb width; Figma's 342/696 ≈ 49% is reproduced naturally);
  - `--scroll-progress-offset = |scrollLeft| / (scrollWidth − clientWidth)`.
- The thumb is positioned with `inset-inline-start: calc(offset × (100% − thumb))`, so RTL needs no direction branch and starts on the right. The element hides itself when nothing overflows or the scroller is hidden (desktop). Observers are cleaned up in `disconnectedCallback`.
- It never writes to the scroller, so native snapping, touch, arrows and keyboard focus scrolling are unaffected and simply reported. Theme Editor section re-renders create a new element, which reconnects automatically.
- Browsers: every evergreen browser, including Firefox and iOS Safari (scroll events, ResizeObserver, custom elements, logical inset). No scroll-timeline dependency.
- Wiring: `sections/product-list.liquid` gets checkbox `show_scroll_progress` (default `false`, `visible_if` carousel or carousel_on_mobile). It renders the snippet after `render 'resource-list'`, with `hidden--desktop` when the layout isn't carousel.
- Figma track `#dcf2fb`, gradient thumb and 342 × 4 size go in `dev3.css` under the class. Reusable later for S04 / S09 / S12 carousels.
- Reversibility: `OPT_IN_STRUCTURAL: show_scroll_progress`.

**R3 — Readable mobile card typography (D3, approved adaptation).** Applies at ≤749px under `.sn-home-bestsellers`. Figma (scaled) → proposed:

| Element | Figma | Proposed |
|---|---|---|
| Card | 165 × 283 | width 165 kept, **height grows** |
| Text padding / gap | 6.3 / 3.1 | 0 8 10 / 4 |
| Best Seller and discount badges | 6.27/9.4 | 11/16 SemiBold, padding 2/8, radius 6 |
| Title | 8.35/14.1 | 13/20 SemiBold |
| Description | 7.31/12.5 | 12/18, **no truncation** |
| Rating label / stars | 6.27/10.4, 12.3px | 11/16, 12px stars |
| Price | 9.4/14.6 | 14/20 Bold |
| Compare-at | 7.31/11.5 | 12/18 line-through |
| CTA + arrow | 8.35/13.6, 9.4px | 13/20 SemiBold, 14px arrow |
| Cart FAB / badge position | 32px / 7–9px | kept |

- Expected card height ≈ 330–380px: description 2–3 lines; the price row (price + compare-at + pill ≈ 190px wide in a 149px column) wraps to 2 lines (`flex-wrap`, row gap 4).
- Cards in a row stretch to equal height, and the section height grows to match.
- QA: compare structure, spacing and proportions with Figma, not the text size. Record the measured heights.

**R4 — View All always shown when a collection is selected (D4).**
- New checkbox on `blocks/_product-list-button.liquid`: `show_always` ("Show even when all products are displayed"), default `false`.
- Condition: `closest.collection != blank` and (`show_always` or `products_count > max_products`). The native URL `closest.collection.url` and `snippets/button.liquid` are unchanged.
- Only instances that enable it are affected (block-level setting).
- Placement uses the same single link:
  - Desktop: positioned absolutely at the inline-end bottom of the header.
  - Mobile (≤749): the header's `.group-block` / `.group-block-content` set to `position: static`, the section `position: relative`, the link `position: absolute; inset-block-end: 56px; inset-inline: 0; margin-inline: auto; inline-size: fit-content`, and the section bottom padding increased by 14 + 26px.
  - All of it is CSS in `dev3.css`, scoped to header descendants only.
- Caveat: screen-reader order stays "link before products" (acceptable, as in the native layout).
- Fallback if the preview shows it is fragile: a `button` block in the section's block area, shown on mobile only.
- Reversibility: `OPT_IN_STRUCTURAL: show_always` + `CLASS_ONLY` for placement.

**R5 — Ratings label only with real data (D5).**
- New text setting on `blocks/review.liquid`: `label` (default blank). It renders `<span class="rating-label">` inside `.rating-wrapper`, which exists only when `rating != blank`. No reviews → no stars and no label.
- Placed after the stars (inline-end, as in Figma). Stars and count come from the native `reviews.rating` / `rating_count` metafields.
- PDP and other hosts are unchanged while blank. Reversibility: settings-only (`label` blank = native).

**R6 — Quick Add label "أضف إلى السلة" (D6). Needs approval: multi-caller shared snippet.**
- **Shared-snippet change:** `snippets/quick-add.liquid`
  - Add an optional `@param {string} [add_label]`.
  - `assign add_to_cart_text = 'actions.add' | t` stays, followed by `if add_label != blank` → use it.
  - Only the **Add** button text changes. The **Choose** button keeps `actions.choose` ("اختيار"), so option-selection is never labelled as add-to-cart. The added and error states stay native.
- **Callers:**
  - `_product-card-gallery` passes `add_label: block.settings.quick_add_label` (new text setting, default blank).
  - `_featured-product-gallery` and `_hotspot-product` pass nothing, so their output is identical.
- **Risk:** low (an additive optional param). Test one card from each caller.
- **Fallback if not approved:** keep "إضافة". No locale edits.

**R7 — Discount badge from real pricing (D7).**
- `custom-liquid` rejected (see the verification above).
- Smallest safe extension, in `blocks/price.liquid` only (snippet `price` with 6 callers untouched):
  - New settings: `show_discount_badge` (checkbox, default `false`) and `discount_badge_label` (text, default `-[percent]%`; S05 uses `خصم [percent]%`).
  - Markup: inside `<product-price>`, after `render 'price'`, `<span class="price-discount-badge" ref="discountBadge">`.
  - Rendered only when `selected_variant.compare_at_price > selected_variant.price`, with `percent = (compare_at − price) × 100.0 / compare_at | round`, and hidden when below 1.
- Uses the same variant as the displayed price (`selected_or_first_available_variant`).
- **Limitation:** `product-price.js` refreshes only `priceContainer`, so the badge wouldn't update on a live variant switch. S05 cards have no swatches, so there's no switching; PDP instances keep it off.
- **Optional (approval):** a 4-line additive change in `assets/product-price.js` that also replaces `[ref="discountBadge"]`, mirroring the existing volume-pricing note, so it's correct wherever it's enabled.
- The native **Sale** image badge is hidden under the class only; Sold-out is kept.
- Reversibility: `OPT_IN_STRUCTURAL: show_discount_badge`.

**R8 — Short description via native dynamic source (D8).**
- A `text` block in the card group, whose `text` (richtext) is connected in the Theme Editor to *closest product › metafields › Short description*. Stored as `{{ closest.product.metafields.custom.short_description.value }}`, or as the editor writes it.
- **Definition the merchant creates later** (not now): Products › Name "Short description", namespace/key `custom.short_description`, type **Multi-line text** (single-line also works). Shown in Online Store / Liquid (no Storefront API access needed).
- Empty or undefined → the text block renders nothing (verified in `snippets/text.liquid`).
- Still to confirm in the preview: the picker lists the metafield under "closest product" for this card (expected, since `product-title` uses the same context).
- The Best Seller badge text block can optionally bind to another product metafield the same way.

**R9 — Native card preserved (D9).** No card rebuild. Images, title link, the card overlay link, price formatting, variant handling, Quick Add/cart/modal, ratings, availability and focus all stay native. The Figma look lives only in `assets/dev3.css` under `.sn-home-bestsellers`. Every behavioural or structural change is opt-in (R1, R2, R4, R5, R6, R7), with defaults equal to native.

**R10 — Updated scope, category, files, settings.**
- **Category:** B (opt-in settings) + C (composition) + D (small opt-in Liquid/JS: new `scroll-progress` component; R6 shared-snippet param). E rejected.
- **Files (later):**

  | File | Change | Shared? |
  |---|---|---|
  | `sections/product-list.liquid` | `custom_class`, `show_scroll_progress` + render (17 → 19 settings) | used by S05, S07 |
  | `blocks/_product-card-gallery.liquid` | `quick_add_mobile`, `quick_add_label`, scoped style, pass `add_label` | several section hosts |
  | `blocks/_product-list-button.liquid` | `show_always` | — |
  | `blocks/review.liquid` | `label` | PDP + cards |
  | `blocks/price.liquid` | `show_discount_badge`, `discount_badge_label` + badge markup | PDP + cards |
  | `snippets/quick-add.liquid` | optional `add_label` | **3 callers → approval** |
  | `assets/product-price.js` | optional `discountBadge` refresh | **approval (optional)** |
  | new | `snippets/scroll-progress.liquid`, `assets/scroll-progress.js`, `snippets/custom-class.liquid`, `assets/dev3.css` | — |
  | `layout/theme.liquid` | Dev3 initialization tag only | protected (routine init) |
  | `templates/index.json` | configure + enable `product_list_fa6P9H` | editor-rewritten |

  No locale, `config/*`, `base.css` or native-stylesheet edits. Global `mobile_quick_add` is **not** changed.
- **Settings changed from default (level 3):** section `collection`, `max_products` 4, `columns_gap` 24, `carousel_on_mobile` true, `icons_style` none, `gap` 40, padding 60 / 91, `custom_class`, `show_scroll_progress`. Header column/centered, texts, `show_always`. Card border 1 / radius 20 / gap 14; gallery square, `quick_add_mobile`, `quick_add_label` "أضف إلى السلة". Card group padding 0 12 12 / gap 6. Review `label` "التقييمات". Price `show_discount_badge` + `discount_badge_label`. Text-block colors.
- **Reversibility target:** `CLASS_PLUS_SETTINGS` + `OPT_IN_STRUCTURAL: show_scroll_progress, quick_add_mobile, quick_add_label, show_always, label, show_discount_badge`.
- **Approvals still required:** (1) R6 `snippets/quick-add.liquid` param; (2) optional R7 `product-price.js` refresh. Everything else is opt-in work inside single native files, within this task.
- **Remaining risks:**
  - Mobile View All absolute positioning must be checked in the preview (fallback ready).
  - The dynamic-source picker for the metafield is unconfirmed until the Theme Editor is used.
  - Ratings need a review app writing `reviews.rating`.
  - Mobile card height differs from Figma by design (R3).
  - `carousel_on_mobile` duplicates the card markup natively, including the Quick Add form IDs (pre-existing).
  - Settings counts all stay under 40.

#### S05 implementation — 2026-11-08 (Dev3) — IMPLEMENTED, visual QA PENDING

- **Figma re-check:** `190:3844` / `190:4149` metadata and the hover card `190:3850` design context are unchanged from the analysis.
- **Remote check before editing JSON:** `Snosha/dev3` theme (#190254678129) `templates/index.json` and `config/settings_data.json` were downloaded to the scratchpad only (`--only`). Both are identical to local → no editor conflicts. No `theme pull` into the repo.
- **Product data policy (user, 2026-11-08):** all product content comes from Shopify Admin. Only presentation and the collection are set in the Theme Editor.
  - **Short description = `{{ closest.product.description }}`** (native dynamic source, the same one Horizon uses in `product.json` / `product-description`). No metafield definition is needed.
  - The excerpt is CSS line-clamped (2 lines desktop, 3 mobile); media, tables and line breaks inside the description are hidden.
  - The merchant can switch the block's source to a `custom.short_description` metafield (multi-line text) in the Theme Editor later. Empty → the block renders nothing (`snippets/text.liquid`).
  - The R8 metafield proposal is optional, not required.
  - Best Seller badge = one section-level label ("الأكثر مبيعًا") on every card of the selected collection. It is not a sales ranking, and Sold out takes priority.
- **Files changed:**
  - `sections/product-list.liquid`: `custom_class` render + `show_scroll_progress` + `custom_class` settings (17 → 19).
  - `blocks/_product-card-gallery.liquid`: `quick_add_mobile`, `quick_add_label`, scoped `{% style %}`, passes `add_label` (10 → 12).
  - `blocks/_product-list-button.liquid`: `show_always` (11 → 12).
  - `blocks/review.liquid`: `label` (6 → 7).
  - `blocks/price.liquid`: `show_discount_badge`, `discount_badge_label` (17 → 19 incl. existing).
  - `blocks/text.liquid`: `custom_class` (19 → 20, through the snippet's existing `class` param).
  - `snippets/quick-add.liquid`: optional `add_label` (R6, approved).
  - `layout/theme.liquid`: Dev3 tag only.
  - `templates/index.json`: `product_list_fa6P9H` configured and **enabled**.
- **Files created:** `snippets/custom-class.liquid`, `snippets/scroll-progress.liquid`, `assets/scroll-progress.js`, `assets/dev3.css`.
- **Not modified (per instructions):** `assets/product-price.js`, locales, `config/*`, `base.css`, `main.css`, global `mobile_quick_add` / `quick_add`.
- **`index.json` configuration** (IDs kept: `product_list_fa6P9H`, `static-header`, `product_list_text_YFtzcL`, `product_list_button_MWeP9V`, `static-product-card`, `product_card_gallery_677WP3`, `product_title_YXxMTj`, `price_JQzVV4`):
  - **Section:** `collection: all` (kept; **merchant must pick the best-sellers collection**), grid, 4 columns, `carousel_on_mobile`, `max_products` 4, `columns_gap` 24, `icons_style` none, `show_scroll_progress`, `gap` 40, padding 60 / 91, `custom_class: sn-home-bestsellers`.
  - **Header:** column / centered, gap 6; title `<h2>الأكثر مبيعًا</h2>`, new subtitle `product_list_text_sn5sub`; button "عرض الكل", `show_always`.
  - **Card:** border solid 1 `#efeded`, radius 20, gap 14. Gallery square + `quick_add_mobile` + label "أضف إلى السلة". Badge `text_sn5badge`. Group `product_card_group_sn5txt` (padding 0 12 32, gap 6) → title, `text_sn5desc`, `review_sn5rate` (label "التقييمات", stars `#60c1e1` = Figma brand primary, ASSUMED from the token table), price (`show_discount_badge`, "خصم [percent]%"), `text_sn5cta` "عرض المنتج". Title and price moved into the group (IDs kept).
- **CSS (`assets/dev3.css`, all under `.sn-home-bestsellers`, native nesting, no `!important`):**
  - Container 1336 (`--page-content-width: 83.5rem` + `--page-width`, ≥750).
  - Mobile `--page-margin: 24px` (drives the heading gutters, the carousel gutters and the 342 progress track), padding 56 / 56 (+40 when View All exists), row gap 25.
  - Heading 32/52 & 18/32 (24/38 & 15/26 mobile).
  - View All absolute at the header's inline-end bottom; on mobile moved under the progress bar (group wrappers `position: static`).
  - Tablet 750–989: 2 × 2 grid.
  - Mobile slide width `(100cqw − 2 × gutter − 12px) / 2` = 165 at 390.
  - Equal-height cards, CTA pinned to the bottom, hover/focus shadow, gallery top radius 16, native Sale badge hidden (Sold out kept).
  - Typography per Figma desktop and R3 mobile.
  - Quick Add: desktop full-width bar (inset 14, radius 12, 16/26), mobile 32px circle at top inline-end with shadow.
  - Progress track `#dcf2fb` + gradient thumb. Arrows mirrored in RTL.
- **Reversibility:** `CLASS_PLUS_SETTINGS` + `OPT_IN_STRUCTURAL: show_scroll_progress, quick_add_mobile, quick_add_label, show_always, label (review), show_discount_badge, custom_class (text)`. **Not yet proven** (two-state test needs a preview).
- **Validation done:**
  - Theme Check = the 9 baseline offenses, nothing new.
  - Schema JSON of the 6 edited files parses; `index.json` parses.
  - `node --check assets/scroll-progress.js`.
  - `dev3.css` tag count = 1, Cairo line unchanged.
  - Local RTL fixture (`<scroll-progress>` + `dev3.css` in headless Chromium, 390px): thumb starts at the inline-start (right), moves to the left end at max scroll, follows wheel scrolling, hides when nothing overflows (800px), and rebinds after the section markup is replaced. `dev3.css` parses. Real Horizon markup not yet tested.
- **Preview:** port 9292 was taken; 3 other `theme dev` sessions share this machine's development theme. The user chose **Skip preview** (2026-11-08). `custom-class.liquid` test matrix not run yet (needs Liquid rendering).
- **QA to run in a preview (PENDING):**
  - 1480 / 390 vs Figma screenshots; 750, 768, 990, 1024, 1440.
  - No horizontal overflow; carousel RTL initial edge, snap, swipe, progress.
  - Mobile Quick Add only on S05 (collection page cards unchanged); add vs choose labels; modal; cart drawer.
  - Quick Add outside S05 (collection page, recommendations) unchanged.
  - Discount / no-discount products; ratings with and without data.
  - Description excerpt; View All link with fewer products; class on/off; console/404.
  - Record mobile card heights (R3).
- **Data dependencies:** select the best-sellers collection; products need images, descriptions and compare-at prices for the badge; a review app writing `reviews.rating` for stars and label (none confirmed); optional `custom.short_description` metafield.
## F. QA & progress

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S05 | PASS (2026-11-08, both nodes read; re-checked unchanged at implementation) | PASS (local only: Theme Check = 9 baseline, schemas/JSON parse, `node --check`, dev3.css tag once) | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | By design product media only (no pickers); render PENDING USER REVIEW | PENDING USER REVIEW (two-state test) | Visual QA is user-owned (skill hard rule 13). User checklist: E › S05 › Implementation "QA to run". The local fixture test of 2026-11-08 is not counted as QA evidence |
| S01–S04, S06–S15 | — | — | — | — | — | — | — | Only project-level mapping done; no section-level analysis yet |

Give a section its own row here when its work starts, and keep the S01–S15 row only for sections that haven't started.

## G. Global risks & dependencies

**Confirmed facts (2026-11-08):**
- Container: Figma's desktop content is 1376px inside a 1480px frame (52px margins). Horizon has 40px desktop margins and a 120rem (1920px) "normal" page width, so at 1480px the content is 1400px.
- Gutters: Figma mobile 24px (20px in some sections) vs Horizon 16px. Horizon scales padding ×0.7 below 990px.
- Tokens: Cairo, `#176bb0` (primary button), `#f0fafe` and `#dcf2fb` (palette) match. The theme foreground is `#000000` vs Figma `#131311`, and theme H1/H2 are 56/48px vs Figma display 56, H1 40, H2 32.
- Theme Check baseline: 9 offenses (2 errors, 7 warnings), listed in horizon-architecture.md.
- The `header` schema has 42 settings (Theme Check warning; not a platform limit).
- Media: the merchant uploads final images and videos through the Theme Editor. No Figma exports go in the code.
- Preview: Shopify CLI preview is available but hasn't been used for visual QA yet.

**Pending decisions (need the user):**
- P1: Container/gutter strategy, either per section (class-scoped) or a global change (protected setting).
- P2: Global typography and color alignment (foreground color, heading sizes), either global settings (needs approval) or class-scoped per section.

## H. Decision & change log

| Date | Change | Why | Affected | Follow-up |
|---|---|---|---|---|
| 2026-11-08 | Skill `figma-to-sections-workflow` created and refined | Shared workflow for all sessions | All | — |
| 2026-11-08 | `main.css` initialized and loaded in `layout/theme.liquid` after Cairo; Dev1–3 on demand | Developer CSS ownership | All | Dev1–3 initialize when they start |
| 2026-11-08 | Official Figma frames recorded (1480 / 390) and the 15-section map verified | Project design source | S01–S15 | Section-level analysis per task |
| 2026-11-08 | Theme Editor media policy adopted | Merchant can replace media without code | All sections with media | Apply in each section's audit |
| 2026-11-08 | Permanent project plan created (this file) | Single source of truth | All | Maintain incrementally |
| 2026-11-08 | S05 analyzed and planned by Dev3: reuse `product-list` (`product_list_fa6P9H`), class `sn-home-bestsellers` (collision check: no matches), CSS in `dev3.css` | Figma `190:3844` / `190:4149` | S05, S07 | User approval of S05-Q1…Q6, then implement |
| 2026-11-08 | S05 refined with user decisions D1–D10 (R1–R10). Per-instance mobile Quick Add, JS `scroll-progress` component, readable mobile type, opt-in View All / rating label / discount badge / Quick Add label. `custom-liquid` + `closest` rejected (not documented) | User review of the S05 plan | S05 (product-list, card blocks) | Approve R6 (`quick-add` snippet) and optional R7 (`product-price.js`), then implement |
| 2026-11-08 | S05 implemented by Dev3 (R6 approved; R7 `product-price.js` not done per user). `dev3.css` initialized + loaded. `custom-class.liquid` and the reusable `scroll-progress` component created. Description from the native product description. `index.json` section enabled | User implementation request | S05; shared: `quick-add` snippet, `text`/`price`/`review`/gallery/button blocks (all opt-in) | Visual QA by the user; merchant selects the collection |
| 2026-11-09 | Process correction: during S05 Dev3 ran CLI store commands (`theme list`, scratchpad-only `theme pull`, a failed `theme dev`), inspected other sessions' processes, and ran a local headless fixture. This is against skill hard rule 13 (`.agents/skills/…/SKILL.md`). No files were uploaded and no other session was touched | User instruction | All Dev3 work | Local, non-server code checks only from now on; visual QA = PENDING USER REVIEW |
