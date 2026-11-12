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
| Environment | Claude Code in the theme repo; Shopify CLI 4.9.4 installed. **Agents must not run or interact with `shopify theme dev`, previews, Shopify theme push/pull, or servers.** User owns visual QA. Git; no auto commit/push/deploy |
| Delivery | Incremental: one section at a time, after the user's request with its nodes |
| Homepage implementation snapshots (historical; different developer sessions) | Dev2 documented S04 `collection_list_sn_home`, S08 and S11/S13 work; Dev3 documented S05 `product_list_fa6P9H`, S07 `product_list_Rxv4hg`, S09 `carousel_sn9Rls` and S14 `section_sn14Faq`. These are **branch/session reports, not one verified combined `index.json` state**. Check actual file and owner before editing; do not overwrite another developer's sections. |

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

The ownership map below combines the overlapping Dev1, Dev2 and Dev3 historical records. **Initialized** refers to a developer's reported branch/session state, not a confirmed single combined worktree. Verify file existence and one stylesheet tag in the actual working tree before editing `layout/theme.liquid`.

| Developer | CSS file | Historical initialization evidence | Sections assigned |
|---|---|---|---|
| Main | `assets/main.css` | Reported initialized 2026-11-08, loaded once after Cairo | Shared foundation; no section assigned explicitly |
| Dev1 | `assets/dev1.css` | Reported initialized 2026-11-08 for S03; file created and tag counted once after `main.css`. An older/conflicting snapshot says not initialized. **Current branch: VERIFY.** | S03, S06, S10, S12 |
| Dev2 | `assets/dev2.css` | Reported initialized 2026-11-08; another snapshot says not initialized. **Current branch: VERIFY.** | S04, S08, S11, S13 |
| Dev3 | `assets/dev3.css` | Reported initialized 2026-11-08 for S05; another snapshot says not initialized. **Current branch: VERIFY.** | S05, S07, S09, S14 |

**Dev1 owned classes:** `sn-home-hero`, `sn-home-hero-content`, `sn-home-hero-overline`, `sn-home-hero-stage`, `sn-home-hero-chip`, `sn-home-trust-card`, `sn-home-trust-item`, plus the Liquid-generated position classes `sn-float`, `sn-float--*`, `sn-float-m--*` (inert outside `.sn-home-hero-stage`). Dev1 (S06, `dev1.css`): `sn-home-f1-banner`, `sn-home-f1-content`, `sn-home-f1-tag`, `sn-home-f1-specs`, `sn-home-f1-spec`, `sn-home-f1-stage`, `sn-home-f1-watermark`, `sn-home-f1-arc`, `sn-home-f1-sparkles`, `sn-home-f1-glow`, `sn-home-f1-waves` (collision check 2026-11-11: none). Dev1 (S10, `dev1.css`): `sn-home-choose-care`, `sn-home-care-head`, `sn-home-care-badge`, `sn-home-care-specs`, `sn-home-care-price`, `sn-home-care-cta`, `sn-home-care-discount` (custom Liquid markup), plus the Liquid-generated `sn-card-featured` (inert without the section class) (collision check 2026-11-11: none). Dev1 (S12, `dev1.css`): `sn-home-blog` (collision check 2026-11-12: none); component classes `featured-blog-posts__view-all`, `featured-blog-posts-card__read-more`, `carousel-progress` come from the opt-in Liquid.

**Dev2 owned classes:** `sn-home-collections` (S04); `sn-home-before-after` (S08); `sn-home-bundle` (S11); `sn-home-why` (S13).

**Dev3 owned classes:** `sn-home-bestsellers` (S05 and reused in S07; `-desc`, `-cta` part classes; `-badge` retired on 2026-11-09); `sn-home-bundles` (S07 modifier); `sn-home-reels` and `sn-home-reels-soon` (S09); `sn-home-faq` and `sn-home-faq-subtitle` (S14).

**Shared-file claims (active):** none reported in the supplied snapshots. Dev1 reports releasing S03 claims on `templates/index.json`, `blocks/group.liquid`, `blocks/text.liquid`, `snippets/text.liquid`, `snippets/custom-class.liquid`, `layout/theme.liquid` on 2026-11-08. Dev2 reports releasing claims on `layout/theme.liquid`, `templates/index.json`, and `snippets/custom-class.liquid` on 2026-11-08. **Verify live ownership before editing.**

**Branch/session caveat:** The histories report different `theme.liquid` states. CSS integration, presence of `index.json` sections, and code merges are **not confirmed across branches** by this document alone. Never start, stop or connect to another session's preview. No automatic theme pull/push, deployment, or commit.

## D. Section registry

One row per S01–S15 in Figma order. For duplicated rows, the **IMPLEMENTED** record takes precedence over an earlier `NOT_STARTED` planning placeholder. These are **developer-reported implementation states**, not evidence of Git merge, publication, or visual approval. No visual status is promoted to VERIFIED without user QA.

| ID | Section | Desktop node | Mobile node | Target | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
|---|---|---|---|---|---|---|---|---|---|---|
| S01 | Announcement Bar | `190:3768` | `190:4083` | header-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |
| S02 | Header / Navigation | `190:3769` + `190:3776` | `190:4084` | header-group (global) | — | NOT_STARTED | — | — | — | Global. `header` already has 42 settings (G) |
| S03 | Hero + Trust Strip | `190:3789` | `335:3959` | index.json | Dev1 | IMPLEMENTED | C + B + D (D4 text snippet) | `hero` (Hero) + `section` (Trust); blocks `group`, `text`, `button`, `image`, `icon` | `sn-home-hero*`, `sn-home-trust-card`/`-item`, inert `sn-float*` position classes | Implemented 2026-11-08; refined 2026-11-09 (Figma re-measured: product image box, CTA label fix, icon caps, mobile trust card, mobile alignment settings). **Visual QA: PENDING USER REVIEW** (user-owned per Skill rule 13). Shared edits: `blocks/group.liquid` (36→40, at the limit), `blocks/text.liquid` (now 22 incl. Dev2's `mobile_font_size`) + `snippets/text.liquid`, `sections/hero.liquid` (37→40, **at the limit**: product stage offsets), `sections/section.liquid` (28→40, **at the limit**: opt-in overlap, content max width, card sizes; 2026-11-09) |
| S04 | Collections | `190:3830` | `190:4133` | index.json | Dev2 | IMPLEMENTED (recovered 2026-11-09; responsive refinement 2026-11-09: mobile heading size, image ratio, title length; visual QA PENDING USER REVIEW) | B | `collection-list`, preset `collections_carousel` (native name kept) | `sn-home-collections` | Merchant must pick collections in the Theme Editor |
| S05 | Featured Collection | `190:3844` | `190:4149` | index.json | Dev3 | IMPLEMENTED (2026-11-08; visual QA PENDING USER REVIEW) | B + C + D (opt-in) | `product-list` (`product_list_fa6P9H`, enabled) | `sn-home-bestsellers` | Visual QA is user-owned. Data: best-seller collection, review app. Same design as S07 |
| S06 | F1 Banner | `190:3851` | `190:4167` | index.json | Dev1 | IMPLEMENTED | C (+ scoped CSS; no schema change) | `hero`; blocks `group`, `text`, `image`, `icon`, `button` | `sn-home-f1-banner`, `-content`, `-tag`, `-specs`, `-spec`, `-stage`, `-watermark`, `-arc`, `-sparkles`, `-glow`, `-waves` | Implemented 2026-11-11 after S03 trust (`sn_home_f1`, type `hero`; audit 2026-11-11: no custom files, product media fixed). Decorations = hideable blocks. **Visual QA: PENDING USER REVIEW**. Merchant: product image, optional background, tank/PSI icons, CTA product |
| S07 | Featured Collection 2 / Bundles | `190:3896` (container `351:4546`) | `190:4204` | index.json | Dev3 | IMPLEMENTED (2026-11-11; visual QA PENDING USER REVIEW) | A + modifier class | `product-list` (`product_list_Rxv4hg`) | `sn-home-bestsellers sn-home-bundles` | Collection left for the merchant. Same components as S05 |
| S08 | Before / After | `190:3903` | `190:4222` | index.json | Dev2 | IMPLEMENTED (2026-11-11; visual QA PENDING USER REVIEW) | B/D | `section` preset `t:names.image_compare` + `comparison-slider` | `sn-home-before-after` | Merchant images, tooth icon, CTA link |
| S09 | Reels | `190:3935` | `190:4254` | index.json | Dev3 | IMPLEMENTED (2026-11-11; template rejected on GitHub sync → fixed locally, needs commit + push; editor visibility NOT VERIFIED; visual QA PENDING USER REVIEW) | B + C (opt-in) | `carousel` (`carousel_sn9Rls`) + `_card` / `video` / `product-card` blocks | `sn-home-reels` | Merchant uploads videos and selects products; optional metafield `custom.coming_soon_label` |
| S10 | Choose Your Care | `190:3943` | `190:4265` | index.json | Dev1 | IMPLEMENTED | C + B/D (small opt-in extensions) | `carousel` → `_carousel-content` → `_card` → `product-card`; blocks `_product-card-gallery`, `product-title`, `text`, `_product-card-group`, `icon`, `price`, `custom-liquid` | `sn-home-choose-care`, `sn-home-care-head`, `-badge`, `-specs`, `-price`, `-cta`, `-discount`; inert `sn-card-featured` | Implemented 2026-11-11 (`sn_home_care`, after `sn_home_f1`). **Visual QA: PENDING USER REVIEW**. Merchant: pick the 3 products in each card, exact spec icons (drop/tank/gauge/timer use native fallbacks). Shared edits: `_card` (26), `_carousel-content`, `_product-card-group` (36, + `icon` child), `carousel` (16), `assets/carousel-active-card.js` (new, S10 opt-in); `slideshow.js` / `_carousel-content` back to stock. 2026-11-11 fix: mobile start position + generic cards |
| S11 | Bundle | `190:3987` | `190:4318` | index.json | Dev2 | IMPLEMENTED (rebuilt 2026-11-11 as a dedicated section; visual + commerce QA PENDING USER REVIEW) | E (merchant-approved) | new `sn-product-bundle` ("Product bundle"); reuses `anchored-popover-component`, `image` snippet, cart event | `sn-home-bundle` | Merchant: bundle product, items, image |
| S12 | Blog | `190:4018` | `190:4349` | index.json | Dev1 | IMPLEMENTED | A/B (native section + opt-in settings) | `featured-blog-posts` (native Grid preset configuration: Grid on tablet / desktop + "Carousel on mobile"); static blocks `_featured-blog-posts-title`, `_featured-blog-posts-card` (`_featured-blog-posts-image`, `_heading`, `_blog-post-info-text`, `_blog-post-description`) | `sn-home-blog` | Back on native blog articles 2026-11-12 (merchant choice). **Visual QA: PENDING USER REVIEW**. Merchant: select the Blog. Shared edits: `featured-blog-posts` (16→23), `_featured-blog-posts-card` (12→14), `assets/carousel-progress.js` |
| S13 | Why SNOSHA | `190:4024` | `190:4361` | index.json | Dev2 | IMPLEMENTED (2026-11-12; visual QA PENDING USER REVIEW) | B/C | `section` preset `t:names.icons_with_text` + `group`/`image`/`text` | `sn-home-why` | Merchant uploads the 4 icons |
| S14 | FAQ | `217:14604` | `217:14813` | index.json | Dev3 | IMPLEMENTED (2026-11-12; needs commit + push to reach the editor; visual QA PENDING USER REVIEW) | B + C (opt-in) | `section` (`section_sn14Faq`, native FAQ preset structure) + `group` / `text` / `accordion` / `_accordion-row` blocks | `sn-home-faq` | Merchant writes answers 1–3, 5, 6 |
| S15 | Footer | `190:4048` | `190:14491` | footer-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |

## E. Section decisions

Each section gets its own subsection here (with the Native Reuse Audit) when its task starts.

### S03 Hero + Trust Strip — IMPLEMENTED 2026-11-08 (Dev1); visual QA pending

**Figma (inspected 2026-11-08 with `get_metadata` + `get_design_context` + `get_variable_defs`; both nodes accessible).** Desktop `190:3789` (1480×550): Hero `190:3790` 1480×500 → Hero Container `347:4611` 1376 wide (x52) with 20px inline padding → Stage `190:3791` 749×500 (visual left) + Content `190:3821` 587×492 (visual right). Trust Strip instance `190:4081` at y442 (overlap 58px), card `I190:4081;190:3245` 1236×102 at x122, inside a 3px ring wrapper (1242×108). Mobile `335:3959` (390×740): Hero `335:3960` 390×689, padding-block 6/87 → Container `382:4563` column gap 12, inline 24 → Stage `335:3961` 342×330, Content `382:4562` 342×254. Trust Container `382:4564` at y640 (overlap 49px), card `335:4229` 346×100 (inline 24 visual-left / 20 visual-right).

| Element | Desktop | Mobile |
|---|---|---|
| Background | `linear-gradient(57.82deg, #63cdff 7.84%, #176bb0 50%, #0f64a8 92.16%)` | same stops, 83.14deg |
| Content box | column, gap 16, align end (RTL right), justify center, padding 34 / 40 (inline-start, visual right) / 96 / 48 | column, gap 12, centered |
| Overline pill | 275×34, bg `rgba(255,255,255,.1)`, radius 999, padding 5 / 10 (icon side) / 5 / 14, gap 8; text Cairo 12/18 SemiBold white; sparkle icon 24 | same, centered |
| H1 | Cairo 56/84 Bold white, 2 lines (499 wide); accent word `#63cdff` | 28/44, centered, forced break after «بصحة» |
| Subtitle | 18/32 Regular `rgba(255,255,255,.86)`, width 500 | 14/24, centered |
| CTA | 122×48, bg white, border 1px `rgba(255,255,255,.86)`, radius 10, padding 13/28; label 16/26 SemiBold with brand-gradient text (`160.14deg, #63cdff 0% → #0f64a8 70.71%`) | full width 342×48 |
| Stage decor | highlight ellipse 380×300 @(60,40); rings 440/600/760 concentric at stage (324,250) | highlight 240×180; rings 240/348/456 centered at (171,175) |
| Product image | 728×594 @(-9,-50) (overflows stage, clipped by hero); shadow `0 30 50 rgba(8,51,115,.35)` | 348×284 @(-3,37) |
| Chip | label pill `rgba(255,255,255,.78)` + backdrop-blur 9, border 1px `rgba(255,255,255,.95)`, radius 999, padding 7 / 20 (badge side) / 7 / 14, text 12/20 SemiBold `#12568d`; badge 32 circle `#63cdff→#0f64a8` (to bottom), border 1.5 `rgba(255,255,255,.9)`, drop-shadow `0 6 7 rgba(15,100,168,.35)`, overlaps label by 9px; icon 17; pulse ring 44 | same chip |
| Chip positions (Figma x,y in stage) | 42,000 (428,122) · battery (-29,156) · modes (-18,316) · DuPont (428,257) | 42,000 (160,37) · modes (-19,150) · battery (-7,287) · DuPont (206,155) |
| Trust card | white, border 1.5 `rgba(99,205,255,.4)`, radius 22 (ring wrapper 25, padding 3), padding 22/36, shadow `0 14 16 rgba(15,100,168,.1)`; glint ellipse 170×22 on top edge | 2px conic "border beam" ring, radius 20/18, padding 10, gap 2, shadow `0 16 34 rgba(13,64,128,.18)` |
| Trust item | row, gap 14, each 290.25 wide; text column gap 2, aligned end; title 16/27 SemiBold `#131311`; desc 14/24 `#5a5a59`; tile 58, radius 17, `#fff→#f0fafe`, border 1 `#dcf2fb`, shadow `0 8 9 rgba(15,100,168,.1)`, icon 30; dividers 1×52 `#dcf2fb` | column, centered, gap 3, flex 1; tile 38 radius 12, icon 20; title 10/19 SemiBold; desc 8/19 |

Trust order: the DOM and visual order run right to left in RTL: ضمان لمدة سنة → استبدال واسترجاع → شحن مجاني → توصيل سريع. The first item sits on the visual right, so normal RTL flow needs no DOM reversal. Copy differences: «للطلبات من 2000 جنيه فأكثر» (desktop) vs «للطلبات من 2000 جنيه» (mobile). Figma spells «علي الأجهزة»; the brief says «على». The Figma overline has a double space «بالفم␠␠تكنولوجيا».
UNVERIFIED (read at implementation from the ring/pulse/glint nodes, no download now): ring stroke colors and opacities, highlight blur, pulse opacity, and whether the product shadow follows image alpha (ASSUMED `filter: drop-shadow`, because the Figma render shows no rectangular shadow).
VERIFIED 2026-11-08 (refinement): `get_motion_context` (recursive) on `190:3789` and `335:3959` returns no animated nodes, so all decor and the mobile border beam are **static**.

**Native Reuse Audit**
- Hero candidates: `hero` ✅ (desktop+mobile background media `image_1`/`image_1_mobile` with `<picture>` fallback, overlay, `@theme` blocks, row/column + `vertical_on_mobile`, `section_width`, height, `.hero__content-wrapper--design-mode` hook; 36 settings). `slideshow` ✗ (one banner, no slider in Figma). `media-with-content` ✗ (fixed media|content split, no layered chips, no mobile media). `section` ✗ (no mobile background media).
- Trust candidates: `section` preset **"Icons with text"** ✅ (group → `icon` + group → `text` ×2; repeatable, reorderable). Block inside hero ✗: it couples the two, and `.hero__container { overflow: hidden }` would clip the overlap. New section ✗: not needed.
- Limits found: hero `background_color` is a plain `color` (no gradient). Hero with no media renders the `hero-apparel-1` placeholder **on the live store**. The `image` block renders a placeholder on the live store when it's empty. Rich text has no color markup, so the accent word uses `<em>`. `icon` width is in 2px steps (17px → CSS). Native icons: `truck`, `box`, `return` are close; there's no shield, sonic, battery, sliders or brush icon, so `image_upload` is used for exact icons.

**Final decisions (refined 2026-11-08 after the user's D1–D6 direction; implementation approval pending)**

*Hero (native `hero`, file, name and presets kept)*
- Blocks: `group.sn-home-hero-content` (`group.sn-home-hero-overline` [`icon` sparkle + `text`], `text` H1 `<h1>`, `text` subtitle, `button`) and `group.sn-home-hero-stage` (`image` product + chip groups). The content group comes first in the DOM (h1 first). In an RTL row the content sits on the visual right. When stacked (≤989) the stage gets CSS `order: -1` under the class.
- `custom_class` on `sections/hero.liquid` (36→37), rendered on the `.hero` root. A section-only file with a single caller, so it isn't a shared snippet.
- **D2 Background:** native `image_1` + `custom_mobile_media`/`image_1_mobile` (independent desktop/mobile, mobile falls back to desktop). With no image and `background_color` blank: the class-scoped Figma gradient goes on `.hero__media-grid` (`.sn-home-hero:not([class*='color-custom-'])`), and the live placeholder SVG is hidden under the class but kept in design mode (`:has(~ .hero__content-wrapper--design-mode)`). Setting `background_color` replaces the gradient.
- **Image-only mode:** a hero with **no blocks** and `section_height: auto` uses native `.hero--no-blocks-auto-height`. The media is in flow at 100% width with each `<picture>` source's natural ratio, so there's no crop and the height scales with width. No content wrapper space, stage, chips or decor (decor lives on the stage/chip groups). Overlay is off by default. The overlap rule excludes this mode (see Overlap), so the trust card sits below the image.
- **Height and cropping with blocks:** `section_height: auto` has no `--section-height-auto` token (verified), so the height is content-driven. Background media is native `object-fit: cover`, centered (Horizon ignores focal points; noted). Target heights come from the stage: desktop 500 at 1480 (scaled with `clamp()` from 990), mobile stage aspect 342:330.
- **D3 Tablet (750–989):** stacked, using the mobile composition under the class (override `flex-direction` on `.hero__content-wrapper`). The stage is capped and centered (ASSUMED max 560px), content centered (ASSUMED max 600px), chips use their mobile slots. The button keeps the native `fit-content` at ≥750 and `width_mobile: custom 100%` below 750. Side by side from 990.
- Container: class-scoped `--page-content-width: 1376px` + `--page-width` on `.sn-home-hero`. Mobile gutters 24px under the class. P1 is resolved per section only.
- Product image: native `image` block (same asset on mobile). It's removed by deleting or eye-hiding the block. An empty-image placeholder is hidden on the live store under the stage class.
- Decor: static CSS only (stage `::before`/`::after` rings + highlight, badge `::after` pulse ring). The overline sparkle is an `icon` block. No JS.
- H1 accent via rich-text `<em>`, styled under the class (normal style, `#63cdff`). Mobile break via a rich-text line break. CTA gradient label via `background-clip: text` with a solid `#176bb0` fallback.

*D1 Spec chips: Position dropdown on native `group` (no new block)*
- Chip = `group.sn-home-hero-chip` (row: `icon` badge with `image_upload` + `text` label). It can be added, deleted, reordered, edited and hidden. The hero works with zero chips.
- New `group` settings under a "Floating position (Hero product stage)" header: `float_position` select `none` (default) | `top-start` | `top-end` | `middle-start` | `middle-end` | `bottom-start` | `bottom-end`, and `float_position_mobile` select `same` (default) | `none` | same six slots, `visible_if: {{ block.settings.float_position != 'none' }}` (Horizon's `visible_if` pattern; `contains` isn't used anywhere in the theme, so the fields can't be gated by class). Labels are literal and meaningful, e.g. "Top – start side (right in Arabic)".
- Rendering: `blocks/group.liquid` appends `sn-float sn-float--<pos> sn-float-m--<pos>` to the **existing** `class` param of `snippets/group.liquid` **only when `float_position != 'none'`**. Default output is unchanged. The classes are inert unless inside `.sn-home-hero-stage` (all positioning CSS is `.sn-home-hero-stage .sn-float--…`).
- Figma mapping (stage visual right = inline-start in RTL): 42,000 → `top-start` / same · DuPont → `middle-start` / same · battery → `top-end` / mobile `bottom-end` · modes → `bottom-end` / mobile `middle-end`. Those slots use the exact Figma coordinates (as % of the stage, `inset-inline-*`). Slots unused by Figma (desktop `middle-end`, `bottom-start`; mobile `top-end`, `bottom-start`) are ASSUMED mirrored values. A chip with `none` sits in a centered wrapped row under the product. Reordering never moves a positioned chip. Two chips in one slot overlap (documented in the setting `info`).
- **Trade-off (accepted, not unsafe):** `group` is used theme-wide, so every group block shows the new fields (2 always visible + 1 conditional) with no output by default. Settings go 36 → **39** (custom_class + 2), one below the Theme Check warning of 40. Future group additions need a plan entry.

*Trust Strip: native `section` (Icons with text structure), independent of the hero*
- **No section-level class and no change to `sections/section.liquid` / `snippets/section.liquid`:** the less invasive approach is enough, so the earlier D item is withdrawn. All styling hangs on `group.sn-home-trust-card`. Section-level needs use `:has()` forms that require the class (`.shopify-section:has(.sn-home-trust-card)`, `.section-content-wrapper:has(.sn-home-trust-card)`), which the policy allows. The section keeps native settings (blank `background_color` → transparent; padding set in the editor).
- Card `group.sn-home-trust-card` (row, no mobile column) → items `group.sn-home-trust-item` (row + native `vertical_on_mobile`) holding `icon` (tile; `image_upload` for exact Figma icons, native `truck`/`box`/`return` as fallbacks) + `group` (title `text` `<h3>`, description `text`). Dividers: `border-inline-start` on item + item, so any count works. More than 4 items: desktop `flex: 1 1 0` with a min width and wrap; ≤989 wraps in rows of 4. No slider.
- ≤989: items stacked (icon over text), centered. Tablet type sizes ASSUMED (no Figma tablet frame).
- **D4 Mobile text:** native controls can't vary text by device. Options checked: (a) hiding `<em>` words on mobile is a hidden convention and misuses semantics → rejected; (b) device-visibility + two text blocks has no automatic fallback and duplicates blocks → rejected; (c) **recommended:** an optional `text_mobile` (richtext, no default) on `blocks/text.liquid` (19→20). In `snippets/text.liquid`, only when `text_mobile` isn't blank, the same element outputs two inner wrappers (desktop/mobile, switching at 749/750 through a small functional rule in the snippet's own stylesheet). When it's empty the output is byte-identical (mobile falls back to desktop). The 9 other callers (`_heading`, `product-title`, …) have no such setting, so nothing changes for them. The duplicate markup is limited to the overridden string. **Needs separate approval** (multi-caller shared snippet). Content: desktop «للطلبات من 2000 جنيه فأكثر», mobile «للطلبات من 2000 جنيه».
- **D5 Mobile type:** implement the Figma values first (title 10/19, desc 8/19). Rough cell width is about 79px at 390 and 75px at 375 (ESTIMATE). QA at 390/375 checks for no horizontal overflow, no clipping, at most 2 lines, and card height. Proposed deviation, **only if QA fails or the user asks, and applied after screenshot evidence + user sign-off**: desc 10/14, title 11/16. 8px is below common legibility guidance (Lighthouse flags <12px). Recorded as a risk.
- **D6 Border:** static (Figma confirms there's no motion). Desktop: 3px ring wrapper (radius 25/22, border `rgba(99,205,255,.4)`) + glint pseudo-element. Mobile: 2px static conic-gradient ring (radius 20/18). CSS only.

*Overlap (class-dependent, position-aware)*
- `.shopify-section:has(.sn-home-hero:not(.hero--no-blocks-auto-height)) + .shopify-section:has(.sn-home-trust-card) { margin-block-start: -58px; position: relative; z-index: 1 }` (-49px ≤749; tablet ASSUMED -49px). It only applies when trust **directly follows** a classed, block-based hero. Trust anywhere else is an ordinary section. Nothing else moves.
- Hero bottom reserve: Figma's bottom space (desktop content 96, mobile 87) = base 38px + overlap. The base is always under the class, and the overlap part is added only when trust follows (`.shopify-section:has(.sn-home-hero):has(+ .shopify-section .sn-home-trust-card) .sn-home-hero > .hero__container`), so the CTA is never under the card. The native hero padding stays 0 (it auto-scales ×0.7 and can't be conditional).

*Files expected to change (none touched yet)*
| File | Change | Status |
|---|---|---|
| `sections/hero.liquid` | `custom_class` (36→37) + render on `.hero` | approved scope |
| `blocks/group.liquid` | `custom_class`, `float_position`, `float_position_mobile` (36→39) + class composition passed to the existing `class` param | approved scope (D1) |
| `snippets/custom-class.liquid` | new sanitizer (policy §3 + test matrix) | approved scope |
| `blocks/text.liquid` + `snippets/text.liquid` | `text_mobile` (19→20) + conditional rendering | **needs approval (D4, shared snippet, 10 callers)** |
| `assets/dev1.css` | new; all S03 CSS | Dev1 init |
| `layout/theme.liquid` | one `dev1.css` tag after `main.css` | Dev1 init (routine) |
| `templates/index.json` | add hero + trust section before `product_list_fa6P9H` (pull first / Theme Editor) | approved scope |
Not changed: `sections/section.liquid`, `snippets/section.liquid`, `snippets/group.liquid`, `button`/`image`/`icon` blocks, JS, locales, config.

- Category: **C** (composition) + **B** (`hero`, `group` settings) + **D** (only for the D4 `text` snippet item). No E.
- Expected reversibility: `CLASS_PLUS_SETTINGS` (hero layout/alignment/height; group widths/gap/radius/padding/background/**float positions**; button `width_mobile`; trust section padding; `text_mobile` values stay but render natively per device) — confirm with the two-state test.
- Approved by user: architecture direction D1–D6 given 2026-11-08. Implementation start: **pending** (plus the D4 shared-snippet approval).

**Superseded 2026-11-08 (refinement):** chip position via typed class tokens `sn-chip-p1…p6` → `group` Position dropdowns (merchant-friendly, user D1). `custom_class` on `section` + edit to `snippets/section.liquid` → not needed (card-group class + `:has()`). Unconditional hero bottom reserve → reserve added only when trust follows. Mobile copy "one shared shorter text" → exact copy via optional `text_mobile` (user D4).

**Remaining risks:** (1) Whether eye-hidden blocks count in `section.blocks.size`. If they do, a hero with only hidden blocks loses the native no-blocks layout. Mitigation: a class-scoped mirror rule when `.hero__content-wrapper` has no element children; the recommended image-only setup is a hero with no blocks. (2) `group` at 39/40 settings. (3) `text_mobile` wrappers could affect Theme Editor click-to-edit for blocks that use an override (the snippet requires the attributes on the immediate parent) → verify in the editor. (4) Chip collisions at 375 and 750–989 → clamp + QA. (5) 8px mobile text legibility (D5). (6) The CTA gradient text depends on `background-clip: text` (solid fallback). (7) Background focal point not supported by native hero (center crop). (8) The Theme Editor rewrites `index.json`. (9) Ring/pulse colors still UNVERIFIED (read from Figma at implementation).

**Implementation record (2026-11-08, Dev1)**
- Figma re-inspected before coding (`get_metadata` on `190:3791`, `get_motion_context` on both nodes). Decor values read from the Figma SVG exports (scratchpad only, not in the theme): rings 1.5px white at 18/12/8%; highlight white 35% blur 55; pulse 1.5px `#63cdff` 55%; glint `#63cdff` 90% blur 7. Chip icons are white SVGs; trust icons `#176bb0` + `#60c1e1`; the sparkle is a gradient SVG.
- Remote check before editing: `shopify theme pull` of `Snosha/dev1` (#190254612593) into the scratchpad → `index.json` and `settings_data.json` identical to the repo.
- **Files changed:** `sections/hero.liquid` (`custom_class` 36→37, rendered on `.hero`). `blocks/group.liquid` (`custom_class`, `float_position`, `float_position_mobile` under an "Advanced" header, 36→39; class string passed to the existing `class` param, position classes only when a position is set). `blocks/text.liquid` (`mobile_text` richtext, 19→20). `snippets/text.liquid` (mobile variant only when `mobile_text` is set, + 2 toggle rules in its stylesheet). `layout/theme.liquid` (one `dev1.css` tag after `main.css`). `templates/index.json` (sections `sn_home_hero`, `sn_home_trust` added before `product_list_fa6P9H`, which is unchanged; additions only). **New:** `assets/dev1.css`, `snippets/custom-class.liquid`.
- **Template content:** hero = Content group (overline group [icon `star` placeholder + text], H1 `<h1>العناية <em>الذكية</em> بصحة<br/>الفم والأسنان</h1>`, subtitle, button `button-custom` → `/collections/all`, `width_mobile` custom 100%) + Product stage group (empty `image` block → native placeholder until the merchant picks the product image; 4 chip groups with positions sonic `top-start`/same, battery `top-end`/`bottom-end`, modes `bottom-end`/`middle-end`, DuPont `middle-start`/same). Trust = `section` → card group → 4 item groups in RTL order ضمان → استبدال → شحن → توصيل (icon + group [`<h3>` title, `<p>` desc]); shipping desc has `mobile_text` «للطلبات من 2000 جنيه». No background image set → gradient fallback.
- **Placeholder icons (merchant to replace via icon `image_upload` with the Figma SVGs):** chips `lightning_bolt`, `stopwatch`, `check_box`, `star`; sparkle `star`; trust `check_box` (shield), `return`, `box`, `truck`.
- **Copy notes:** the overline uses a single space (HTML collapses Figma's double space). The warranty desc uses «على الأجهزة» from the brief (Figma spells «علي»).
- **D4 safety:** all 10 `render 'text'` calls (9 blocks) checked; only `text` defines `mobile_text`. Without it: no class added, no extra element (output identical apart from whitespace). With it: the original element keeps the text and editor attributes (click-to-edit intact); the mobile sibling has the same element, classes and rich text, minus the editor attributes; the `display: none` toggle at 749/750 means it's read once. The mobile text renders only when the desktop text is non-empty.
- **Checks run:** Theme Check = 9 offenses, identical to the baseline (same checks, files, counts). Schema counts hero 37 / group 39 / text 20. `index.json` parses (CRLF kept). `dev1.css` parsed in headless Edge with `CSSStyleSheet.replaceSync`: 8 top-level blocks, all nested rules present, 533 declarations, none dropped. `dev1.css` tag count 1. No JS added.
- **PENDING USER REVIEW (user-owned per Skill rule 13):** Theme Editor load, screenshots vs Figma (1480/390/375 + tablet), RTL visual, overflow, two-state class test, `custom-class` sanitizer output, `mobile_text` click-to-edit, D5 8px readability. Final product image and icons not uploaded yet.
- **Process note (2026-11-09):** before rule 13 was in the Skill, this session ran `shopify theme list` and a read-only `shopify theme pull --only` of `index.json`/`settings_data.json` into a temporary folder (no repo or store change), and attempted one `theme dev` that failed immediately (port in use, nothing uploaded). It also listed the running processes. Under the current Skill none of these are allowed, and none will be repeated.
**Refinement record (2026-11-09, Dev1): fixes from the user's desktop/mobile comparison**
- **Figma re-inspected:** `get_design_context` on `190:3789` and `335:3959`; `get_metadata` on `190:3791` (desktop stage), `335:3961` (mobile stage), `190:3821` (desktop content). No Figma file changes.
- **Measurements rechecked:** chip sizes 182/155/133/139 × 34 (label = 14 + text + 20, badge 32 overlapping 9, pulse 44, text 12/20); chip slot coordinates in `dev1.css` already equal Figma on both frames (desktop 18.56%/24.4%, 24.3%/51.4%, -3.87%/31.2%, -2.4%/63.2%; mobile 0/11.21%, -0.88%/46.97%, -5.56%/45.45%, -2.05%/86.97%), and ring/highlight geometry matches. Content padding 34/40/96/48, gap 16, H1 56/84, subtitle 18/32 w500, CTA 122×48 padding 13/28. Trust: hero 500, wrapper at y442 + 3px padding → card at y445, 1236×102. Mobile: hero padding 6/87, stage 342×330, gap 12, trust 346×100 (2px beam + 96px card, the card clips its 102px content, so bottom padding is effectively 4).
- **Causes found and fixes:**
  1. *Product image misplaced (made the left chips collide with the brush):* CSS used Figma's photo **frame** (728×594 @-9,-50) with `contain`, so the product sat about 53px off. Now it uses the **visible image box** inside the frame (fill offsets 7.31%/5.94%, 97.2%×88.22%): desktop 707.6×524 @(44.2,-14.7) → `inset-inline-start -0.38%`, top -2.94%, 94.47%×104.81%; mobile 338.3×250.9 @(22.4,53.9) → -5.47%, 16.33%, 98.9%×76.03%.
  2. *Oversized badge/trust icons:* the icon blocks' Width setting (200 on chip badges, 30 on trust tiles) writes an inline `width` that beat the CSS `inline-size`. Now `max-inline-size`/`max-block-size` caps: chips 24 (Figma vector box), trust 30 / 24 tablet / 20 mobile. Template chip badge widths set to 24.
  3. *Invisible CTA label (root cause):* the white plate was a `::before` at `z-index:-1` inside an `isolation:isolate` button. Negative-z children paint **above** their stacking context's own background, so the plate covered the text-clipped gradient while the text colour was transparent. Fix: no pseudo-element. Two background layers (gradient clipped `text`, plate from the native `--button-background-color` clipped `padding-box`), the border from `--button-border-color`, the solid fallback from `--button-color`. Editor colours, label, link and width settings keep working.
  4. *Mobile trust card too tall:* titles wrapped at 375 (cell ≈75px), and the bottom padding was 10 instead of the effective 4. Now titles are `nowrap`, descriptions are balanced, the title/desc gap is 3 (Figma), and the padding is 10/10/4.
  5. *Desktop trust position:* computed position = Figma (card y445, overlap 58 applied once, on the trust section only; the hero has no extra bottom padding ≥990; no native inter-section spacing found). No change.
- **Mobile controls (below 750px), smallest safe extension:**
  - Reused: the button's native **Mobile width** (Custom 100% = full width; already set).
  - Added on `group`: **Content position (mobile)** `same` (default, no output) / start / center / end, which sets `align-items` (column) or `justify-content` (row) directly, because inline layout vars beat stylesheet vars. CSS lives in the block's `{% stylesheet %}`.
  - Added on `text`: **Text alignment (mobile)** `same` / start / center / end → class `text-block--m-align-*` from `snippets/text.liquid`, with CSS in its stylesheet. Other `render 'text'` callers don't define the setting, so their output is unchanged.
  - Text alignment went to `text` (not `group`) because `group` reached 41 settings, and the editor warns above 40.
  - CTA position follows the content group's mobile position.
  - Template: content group `center`; overline text, H1 and subtitle `center`. Desktop alignment is untouched (native settings).
  - Tablet 750–989 stays centred by class CSS (ASSUMED).
- **Files modified:** `assets/dev1.css`, `blocks/group.liquid` (39→40), `blocks/text.liquid` (20→21), `snippets/text.liquid`, `templates/index.json` (5 values added/changed; LF endings kept).
- **Static checks (local file checks only, no CLI or server, per the user's no-test/no-run instruction):** schema JSON parses (group 40, text 21, hero 37, no duplicate ids); CSS braces balance in `dev1.css` and both block stylesheets; template JSON parses with the new values. `shopify theme check` was not run this round.
- **Limitations:** Figma clips the photo inside its frame (right 32.8px desktop / 15.7px mobile); not replicated, because the visible product doesn't reach that area (ASSUMED from the render). The per-layer `background-clip: text, padding-box` needs current Chromium/WebKit/Firefox; older engines show the solid editor colour. `group` is now at the 40-setting limit.
- **PENDING USER REVIEW:** desktop 1480 + mobile 390/375 vs Figma (chips vs product, CTA label visible + hover, trust position), Theme Editor: new mobile alignment controls, tablet 768–989.

**Final pass record (2026-11-09, Dev1): trust mobile text, desktop overlap, editor controls**
- **Figma rechecked:** metadata `190:3789` + `335:3959`, design context `190:4081` (Trust Strip). Desktop: hero 500, Trust wrapper at Y=442 (overlap 58), 3px wrapper padding → card at 445, card 1236×102, padding 22/36, cell gap 14, title/desc gap 2, tile 58, icon 30. Mobile: hero 689, Trust at Y=640 (overlap 49), card 346×100.
- **Mobile text root cause:** commit `4820831` ("edit in first section in theme editor", on `dev1`) brought Dev2's S04 work in from the theme and in doing so (a) removed the `mobile_text` and `mobile_alignment` settings from `blocks/text.liquid` (it only kept Dev2's new `mobile_font_size`) and (b) replaced `templates/index.json` with a collection-list-only page, so S03 was no longer on the homepage. With no `mobile_text` in the schema, `block.settings.mobile_text` is nil and the snippet never renders the mobile copy. The snippet logic and CSS in `snippets/text.liquid` were intact.
- **Fix:** `mobile_text` + `mobile_alignment` re-added to `blocks/text.liquid` next to Dev2's `mobile_font_size` (20→22 settings). S03's `sn_home_hero` + `sn_home_trust` restored in `index.json` from `a96edbc` and placed before Dev2's `collection_list_sn_home` (additions only; Dev2's section untouched). The stored mobile value for the shipping description is kept.
- **Desktop overlap:** now a Theme Editor setting on the native `section` → header "Overlap previous section": `overlap_desktop` / `overlap_mobile` (0–150px, default 0 = no output). Output from `sections/section.liquid` as a `{% style %}` on `#shopify-section-<id>` (negative margin, z-index 1, own background kept below the overlap). The template sets 58 / 49 (Figma). The hardcoded margin/background rules were removed from `dev1.css`, so the overlap is applied once. Static geometry gives card top Y=445 at 1480, the same as Figma. Whether it looks higher than before is PENDING USER REVIEW; it can now be changed live in the editor.
- **Now editor-controlled (desktop):** Trust overlap (section, new), Trust card padding (native group padding 22/22/36/36), space between items (native card Gap 0), icon↔text space (native item Gap 14), title↔description space (native text group Gap 2), icon size (native icon Width 30, CSS cap 42 to fit the tile), Trust section top/bottom padding (native).
- **Kept hardcoded (Figma styling, not merchant-relevant, or no native mobile setting):** tile 58/48/38 + radii, card radius/border/shadow/glint/beam ring, dividers, type sizes; mobile/tablet card padding (10 / 10 10 4), mobile gaps (3) and mobile icon caps (24/20), because native padding/gap/width have no mobile variant and `group` is at the 40-setting limit; hero mobile bottom reserve 38 + 49 (`--sn-hero-overlap`).
- **Files:** `blocks/text.liquid` (20→22), `sections/section.liquid` (28→30), `assets/dev1.css`, `templates/index.json`.
- **Static checks:** schemas parse, no duplicate ids (section 30, text 22, group 40, hero 37); every S03 template setting exists in its schema (42 blocks, 0 unknown); `dev1.css` braces 107/107; Liquid tags balanced in `section.liquid`. No Theme Check, preview or server.
- **Note for Dev2/merge:** `dev2.css` is in the repo but not loaded by `layout/theme.liquid` on this branch (not touched by Dev1).

**Trust Strip correction record (2026-11-09, Dev1), after the user's editor check (strip wrong on desktop and mobile)**
- **Figma:** design context `190:4081` (desktop) and `335:4229` (mobile), metadata `190:3789` / `335:3959`.
  - Desktop: wrapper 108 at Y=442 (overlap 58), padding 3, radius 25, drop shadow 0 14 16 rgb(15 100 168/.1), glint 170×22. Card 1236×102, white, 1.5px inside stroke #63cdff 40%, radius 22, padding 22/36. 4 cells 290.25 wide, centred, tile↔text 14; 1×52 #dcf2fb dividers. Text column start-aligned, gap 2, title 16/27 SemiBold #131311, description 14/24 Regular #5a5a59, no wrap. Tile 58, r17, 1px #dcf2fb, white→#f0fafe, shadow 0 8 9 /.1; icon 30.
  - Mobile: outer 346×100, r20, clipped; beam ring 2px (conic). Card 342×96, r18, padding 10 (content 102 clipped to 96 → effective bottom 4), gap 2, items top-aligned, shadow 0 16 34 rgb(13 64 128/.18) clipped by the outer frame. Cells flex 1 / min-width 1px (≈79px), column, centred, gap 3. Tile 38, r12; icon 20. Title 10/19 SemiBold, description 8/19 Regular, centred, wrap allowed (break-word).
  - RTL order: warranty, exchange, shipping, delivery from the right, which matches the template order.
- **Desktop root causes:**
  1. Previous pass bug: `overlap_desktop`/`overlap_mobile` were ranges 0–150 step 1 = 150 steps. Shopify rejects ranges above 101 steps, so `sections/section.liquid` could not be saved to the theme. The old section (no overlap) stayed live while the old `dev1.css` overlap rules were already removed, so the card sat at the hero's bottom edge. Fixed: 0–100.
  2. The hero stage was vertically centred. When the text column is taller than the stage (desktop below 1480 / the editor preview), the hero grows and empty blue appears under the product. Fixed: stage `align-self: flex-end` on desktop.
  - The DOM path itself is fine: the overlap no longer uses adjacency selectors. It's output for `#shopify-section-<id>` by the section and also gives the previous section `--next-section-overlap`.
- **Mobile root causes:** cells were flex items with `min-inline-size: calc(25% - 2px)` and titles `white-space: nowrap`. Any title wider than its column grew that item and pushed an item to a new row, and nowrap stopped the text from wrapping inside its column. Fixed: the card is a grid of equal `minmax(0, 1fr)` columns (5+ items → rows of four), items `min-inline-size: 0`, the copy group fills its column, nowrap removed (balanced wrapping, break-word).
- **Mobile Text verified (static):** `blocks/text.liquid` has `mobile_text` → the snippet renders a second element only when it's filled. The desktop copy is `display: none` below 750 and the mobile copy above 750, so the hidden copy takes no space, creates no flex gap and isn't announced. The mobile copy carries no editor attributes, so click-to-edit stays on the desktop element. In the trust template it's filled on shipping/description only.
- **Settings:**
  - Reused native: card Padding (22/22/36/36), card Gap (0), card Corner radius (now 22, previously hardcoded), card Border (none → Figma 1.5px stroke; any native border replaces it and the mobile beam ring), card Background colour (white fallback), item Gap (14), copy group Gap (2), icon Width (30), copy group alignment, text "Text alignment (mobile)" (now center on all 8 trust texts), group "Content position (mobile)" (center on items + copy groups).
  - New on `section` (28→40, at the limit, all no-output at defaults): `content_max_width` (number, 1236), `card_sizes` checkbox, then `card_tile_size` 58, `card_padding_top_mobile` 10, `card_padding_bottom_mobile` 4, `card_padding_inline_mobile` 10, `card_gap_mobile` 2, `card_item_gap_mobile` 3, `card_tile_size_mobile` 38, `card_icon_size_mobile` 20. They are output as `--card-*` CSS variables, and `dev1.css` falls back to the same Figma values.
- **Still in code (and why):**
  - Typography 16/27, 14/24, 10/19, 8/19 and colours: the text preset sizes stop at 10px, and Dev2's `mobile_font_size` starts at 12.
  - Shadows, glint, beam ring, dividers, tile gradient and border: Figma decoration.
  - Mobile radius = native − 2.
  - Tablet text sizes (ASSUMED).
  - Hero mobile room under the CTA = 38 + the overlap (now read from the setting).
  - `group` (40) and `section` (40) are both at the setting limit.
- **Files:** `sections/section.liquid`, `assets/dev1.css` (trust block rewritten, stage `align-self`), `templates/index.json` (trust values only).
- **Static checks:** every range in the touched schemas ≤101 steps with defaults in range; schemas parse, no duplicate ids (section 40, text 22, group 40); 42 S03 blocks, 0 unknown settings; `dev1.css` braces balanced (113/113); Liquid if/style tags balanced. No Theme Check, preview or server.
- **PENDING USER REVIEW:**
  - Desktop 1480 and the editor preview: the card overlaps the product bottom by about 58px; no blank space below the strip; glint band.
  - Mobile 390/375: one row of 4, text wraps inside columns with no overflow, card about 346×100.
  - Shipping mobile text.
  - The section's "Card sizes" controls.
  - Whether `overflow-clip-margin` keeps the glint on Safari (degrades to no glint).

**Stage positioning + trust gap record (2026-11-09, Dev1), after the merchant's editor review**
- **Figma rechecked:** design context `190:3791` (desktop stage) and `335:3961` (mobile stage), which include the product photos `190:3796` / `335:3966`. Earlier this round: `190:4081`, `335:4229`, metadata `190:3789` / `335:3959`.
  - Desktop stage 749×500. Photo frame 728×594 at (-9,-50), clipped; image fill left 7.31% / top 5.94% / 97.2% × 88.22% → visible image 707.6×524 at (44.2,-14.7), bottom at 509.3 (9px past the 500px hero edge), shadow 0 30 50 rgb(8 51 115/.35). Chips at (428,122), (-29,156), (-18,316), (428,257); badge 32 overlapping by 9, pulse 44. Rings 440/600/760, highlight 380×300 at (60,40).
  - Mobile stage 342×330. Frame 348×284.4 at (-3,37) → image 338.3×250.9 at (22.4,53.9). Chips centred offsets +80/37, -123.5/150, -100.5/287, +104.5/155.
  - The existing CSS percentages already equal these numbers, so the chip slots and rings were not changed.
- **Why the product looked too high (root cause):** the image box matches Figma, but it uses `object-fit: contain` centred. When the uploaded file's proportions differ from Figma's 707.6×524 box (the merchant's own PNG; its size could not be read without the store), the spare room is split above and below and the product floats up. Fix: `object-position: 50% 100%`, so the product sits on the bottom of its box as in Figma. Nothing changes if the proportions match.
- **Stage offsets (new, on `hero`, 37→40, at the limit; shown only when the hero has a custom class):** "Product stage vertical offset — Desktop" / "horizontal offset — Desktop" / "vertical offset — Mobile", −60…60 step 2, default 0 (= Figma). Output as `--stage-offset-*` on `.hero` (only with a custom class) and read by `dev1.css` as `translate` on the stage group.
  - `translate` moves the stage box with its image, chips, ::before glow and ::after rings as one unit. It doesn't change layout, so the chip slots stay stage-relative and the hero height / Trust overlap are unaffected.
  - No mobile horizontal offset: the mobile stage is full-width, so a sideways shift pushes chips off-screen; also no setting room left.
  - Large down offsets are clipped at the hero's bottom edge (native `overflow: hidden`), which is also under the Trust card.
- **Trust item gap — Mobile:** the existing section setting `card_gap_mobile` was relabelled "Trust item gap — Mobile" (Figma 2). CSS: `column-gap: min(var, 6%)` on equal `minmax(0, 1fr)` grid columns, so a large value can't make columns unreadably narrow and nothing overflows. Row gap 12 (only for 5+ items, no Figma value). Desktop gap = card group Gap (0), icon↔text = item Gap (14), title↔description = copy group Gap (2), mobile inside-item gaps = `card_item_gap_mobile` (3). No new duplicates.
- **Mobile width/wrapping check (static):** at 390 the inner width is 322 and the columns are (322 − 3×2)/4 = 79 = Figma. The copy group fills its column, text wraps inside it (no nowrap), and the text max-width is 32.5em (≈260px at 8px), so it doesn't limit.
- **Card geometry check (static):** 346 = 358 − 4 − 8 gutters; height 2 + 10 + 38 + 3 + 19 + 3 + 19 + 4 + 2 = 100 when each text fits on one line.
- **Files:** `sections/hero.liquid` (3 settings + 3 inline vars), `sections/section.liquid` (one label/info), `assets/dev1.css` (stage translate, image object-position, mobile column-gap cap), `templates/index.json` (3 offsets = 0).
- **Static checks:** schemas parse, no duplicate ids (hero 40, section 40, group 40, text 22); every range ≤101 steps with on-step defaults; Liquid block tags balanced in the touched files; 42 S03 blocks, 0 unknown settings; `dev1.css` braces balanced; each new CSS variable has exactly one output and one consumer.
- **Note:** the merchant's editor save `f582eb0` removed Dev2's `collection_list_sn_home` from `index.json` on this branch (not touched by Dev1).
- **PENDING USER REVIEW:** desktop product position vs Figma (expected lower now if the file's proportions differ); offsets ±20 move image + chips + rings together; no clipping at the top; mobile gap 2 → 12 stays readable; trust card 346×100.

**Product position + mobile trust typography record (2026-11-09, Dev1)**
- **Figma rechecked:** design context `190:3796` (desktop product photo) and `335:4229` (mobile Trust Strip); `190:3791` / `335:3961` earlier the same day. The Figma product PNG was downloaded to measure it (scratch only, not added to the theme): 1537×1023, transparent, product content rows 60–894, x 168–1475.
- **Root cause (desktop "too low", earlier "too high"):** Figma stretches the PNG into a 707.6×524 box (aspect 1.35 vs the file's 1.50, so +11% height). The CSS keeps the real proportions (`contain`), so 53px of the box is spare height (mobile 25.7px). With `object-position` centred, the product base was at y 423 (Figma 443, 20px too high); with bottom anchoring (previous round) it was at 450 (7px too low). Fix: `object-position: 50% 87.4%`, which puts the base exactly at Figma's 443/500 desktop and 273/330 mobile. Single rule in `dev1.css`; nothing else offsets the image. This assumes the uploaded file has the same proportions as the Figma PNG (the store file couldn't be read: the connected Shopify tool points at a different store).
- **Stage position controls clarified (same IDs, saved values kept at 0):** renamed "Product stage vertical position — Desktop" / "horizontal position — Desktop" / "vertical position — Mobile". The info text says negative = UP / LEFT, 0 = Figma position, positive = DOWN / RIGHT. They were confusing because they were named "offset", only said "positive = down", and sit under Advanced after "Custom CSS class" (they only show when the hero has a custom class). They're implemented once, as `translate` on the stage group, so image, chips and rings move together; nothing else transforms the stage.
- **Mobile typography:** Figma 335:4229 = title Cairo SemiBold 10/19 #131311, description Cairo Regular 8/19 #5a5a59, centred, gap 3, tile 38, icon 20. Static check: no Horizon rule overrides the S03 rule (the rte `h3` / `p` base rules have lower specificity), and Cairo comes from `--font-body--family`, so the rendered size was already Figma's 10/8. It looks small because that is Figma's size at 390. Wrapping changed from `balance` to normal wrapping (as in Figma).
- **New section settings (section stays at 40):**
  - Added: "Trust title font size — Mobile" (10), "Trust description font size — Mobile" (8), "Trust text line height — Mobile" (19).
  - Made room by merging "padding top" + "sides" into "Card padding top & sides — Mobile" (10) and by removing both tile-size settings: the tile now wraps the icon (desktop icon + 28 via the icon block's Width, mobile icon + 18 via "Icon size — Mobile"), so it is still controlled.
  - Header renamed "Trust Strip card", checkbox "Trust Strip card controls".
  - Template migrated with the same values (10/4/2/3/20; tiles 58/38 now derived).
- **Files:** `sections/hero.liquid` (labels/info), `sections/section.liquid` (card settings + variables), `assets/dev1.css` (image position, tile padding model, mobile padding/typography variables, wrap), `templates/index.json` (trust settings migrated).
- **Static checks:** hero 40 / section 40, no duplicate ids; ranges ≤101 steps with on-step defaults; Liquid if/style/comment balanced; every `section.settings.*` used in section.liquid exists (hero's `border*` references are stock Horizon); `--card-*` variables: every output is used and every use is output; 42 S03 blocks, 0 unknown settings; no leftover references to the removed ids; CSS braces balanced.
- **PENDING USER REVIEW:** desktop product base vs Figma (if the uploaded PNG differs from the Figma export, fine-tune with the vertical position setting); mobile text at 10/8 vs larger merchant values (card height grows with larger text by design); 375px wrapping; tile sizes 58/38.

**Mobile trust typography controls fix (2026-11-09, Dev1)**
- **Figma:** `335:4229` (design context earlier the same day): title Cairo SemiBold 10/19 #131311, description Cairo Regular 8/19 #5a5a59. No new measurements.
- **Root cause (merchant's text-size changes had no effect):** the merchant edits the trust items' Title/Description text blocks, but:
  1. Those blocks use the Default (rte) preset, which hides Horizon's Size setting (it only shows for Custom).
  2. Dev2's text-block "Mobile size" (`mobile_font_size`) only shows when the section has a custom class (the `section` section has none) and nothing in S03 reads it.
  3. `dev1.css` set the trust sizes (desktop 16/14, tablet 14/12) with class-level specificity, so even a Custom preset Size would have been overridden.
  4. The only working mobile controls were the section-level "Trust title/description font size — Mobile", which is not where a merchant looks.
- **Fix:**
  - `blocks/text.liquid` (22→24): "Font size — Mobile" (`font_size_mobile`) and "Line height — Mobile" (`line_height_mobile`), 0 = same as desktop (default, no output). "Font size — Mobile" is hidden only where Dev2's class-bound "Mobile size" already shows.
  - `snippets/text.liquid`: when set, adds `text-block--m-size` / `text-block--m-lh` plus inline `--font-size-mobile` / `--line-height-mobile`; a ≤749px rule with a doubled class (beats presets and section CSS) applies them to the block and its h1–h6/p.
  - `dev1.css`: no trust font sizes at class level any more. Figma desktop/tablet sizes, line heights, family and colours are fallbacks scoped with `:where()` to element-level specificity and skipped when the block uses Custom size / typography / Text color, so native settings always win. Only the Figma weights (600/400) stay fixed (the text block has no weight setting).
  - Section-level "Trust title/description font size — Mobile" and "Trust text line height — Mobile" removed (section 40→37) so there is one control per value.
- **S03 values:** all 8 trust text blocks set to titles 10 / descriptions 8, line height 19 (Figma); the template's section keys were removed.
- **Fallback:** mobile value 0 → the block's desktop size (native Custom size, or the Figma 16/14 fallback for Default). Desktop is unaffected by the mobile settings.
- **Files:** `blocks/text.liquid`, `snippets/text.liquid`, `sections/section.liquid`, `assets/dev1.css`, `templates/index.json`.
- **Static checks:** text 24 / section 37 / hero 40, no duplicate ids; ranges valid; Liquid tags balanced in the touched files; `--card-*` and `--*-mobile` variables each output and consumed; no leftover references to the removed ids; no other block defines the new ids (7 other `render 'text'` callers get nil → no output); 42 S03 blocks, 0 unknown settings; CSS braces balanced.
- **PENDING USER REVIEW:** change a trust title/description "Font size — Mobile" in the editor (mobile preview) and confirm it updates; desktop unchanged; larger sizes wrap inside the 4 columns and grow the card without horizontal scroll; Default 390 look = Figma.

**Mobile Trust card width fix (2026-11-09, Dev1), after the merchant's mobile screenshot (card narrow, titles wrapping)**
- **Figma rechecked:** metadata `382:4564` (Trust Container 390×100 at y 640) and design context `335:4229`.
  - Outer 346×100 at x 24 → gutters 24 (left) / 20 (right); radius 20, clipped.
  - 2px beam ring, inner card 342×96, radius 18, padding 10, shadow 0 16 34 rgb(13 64 128/.18).
  - Four `flex: 1 0 0` cells, gap 2 → 79px each; tile 38, icon 20; title 10/19 SemiBold, description 8/19 Regular, centred, one line each.
- **Root cause:** below 750px the card had `inline-size: auto` (so its margins could set the gutters). The Trust section's content wrapper is a centred column flex (`align-items: center`, native Horizontal alignment = Center), so an auto-width item is shrink-to-fit, not stretched. The card took its content's width, and with `minmax(0, 1fr)` columns that can be far less than 346, which squeezed the columns and wrapped the titles.
- **Fix:**
  - Explicit width `--sn-card-w: min(var(--card-width-mobile, 346px), 100vw - 16px)` with `align-self: flex-start`.
  - `margin-inline-start: calc((100% - W) / 2 - 2px)`: centred in the content column, then shifted 2px to the start edge = Figma 24/20 at 390. A width above the column (358 at 390) extends into the page margins, but never past the screen.
- **New setting:** "Trust card width — Mobile" (`card_width_mobile`, 280–390 step 2, default 346) on the Trust strip section under "Trust Strip card" (checkbox on); `--card-width-mobile`. Section 37→38. Template set to 346.
- **Inner layout (unchanged, now gets the full width):** padding 10/10/4 ("Card padding …"), ring 2, four equal grid columns, gap 2 ("Trust item gap — Mobile").
  - 390: card 346 → inner 322 → columns 79 (Figma).
  - 375: 346 (gutters about 16.5/12.5) → 79.
  - 360: 344 (about 10/6) → about 78.5.
  - No horizontal overflow (width ≤ screen − 16).
- **Typography:** unchanged (text-block "Font size — Mobile" 10/8, "Line height — Mobile" 19). With 79px columns the Figma titles fit on one line again.
- **Desktop/tablet:** untouched (rule is inside ≤749px).
- **Files:** `assets/dev1.css`, `sections/section.liquid`, `templates/index.json`.
- **Static checks:** section 38 / text 24, no duplicate ids; range valid (55 steps, default on step); `--card-*` produced = consumed; 42 S03 blocks, 0 unknown settings; CSS braces balanced; Liquid tags balanced.
- **PENDING USER REVIEW:** mobile at 390 / 375 / 360: card width 346, gutters, one-line titles, no horizontal scroll; "Trust card width — Mobile" changes the card live.

- Expected reversibility (untested): `CLASS_PLUS_SETTINGS`: trust section overlap 58/49, content max width 1236, trust card padding 22/36 and radius 22 stay when the class is removed (card-size variables become unused); hero content_direction row / gap 0 / height auto; content group padding 34/96/40/48 and gap 16; chip float positions; button `button-custom` colors + `width_mobile`; text colors; trust section padding 0. `mobile_text` is not tied to a class (renders natively per device).

### S06 F1 Banner — IMPLEMENTED 2026-11-11 (Dev1); visual QA pending

**Figma (inspected 2026-11-11: metadata + design context of `190:3851` and `190:4167`; decoration SVG/PNG assets downloaded to scratch only, to measure them; nothing from Figma is stored in the theme).**

| Item | Desktop `190:3851` | Mobile `190:4167` |
|---|---|---|
| Frame | 1480×520, bg `linear-gradient(68.2deg, #fff 5.73%, #f0fafe 94.27%)` | 390×714, same gradient at 85.61deg |
| Container | 1376 (x 52), inner padding 20, copy right-aligned | gutters 24; stage first (full-bleed 390×330), then content, bottom padding 36 |
| Copy | 584 wide (x 772 in container) incl. 24 start padding → text 560; column gap 18; vertically centred (y 46, 428 high) | tag/heading/description gap 12, specs +18, CTA +32 |
| Tag | 95×32, padding 7/16, pill, `to right #63cdff → #0f64a8`, shadow 0 8 18 rgb(15 100 168/.3), 12/18 SemiBold white | same |
| Heading | Cairo Bold 40/64 `#12568d`, accent "بخطوة أسهل" `#176bb0`, 2 lines in 560 | SemiBold 24/38, 1 line in 342 |
| Description | Regular 16/28 `#5a5a59`, 2 lines | 13/22, 3 lines |
| Specs | wrap, gap 10, right-aligned: row 1 = PSI, modes, tank (right → left), row 2 = heads | gap 8/10, row 1 = modes, tank; row 2 = heads, PSI |
| Spec chip | 38 high, white, 1px `#dcf2fb`, radius 12, padding 6 / 10 (badge side) / 6 / 12, gap 8; label 12/20 SemiBold `#12568d`; badge 26 radius 8 `to bottom #63cdff → #0f64a8`; icon 15 white | same |
| CTA | 157×54, radius 10, padding 14/32, `to right #63cdff → #0f64a8`, shadow 0 10 22 rgb(15 100 168/.35), 16/26 SemiBold white; right-aligned | same, right-aligned |
| Product image | layer 438 at (213, 22); PNG 558 square at (153, -8) | layer 280 at (55, 40); PNG 400 square at (-5, 10) |
| Dotted circle | 510 at (165, 5), layer opacity 50%, PNG 143 dashes, `#56bdf1 → #1e76b5` diagonal at 50% alpha | 320 at (35, 20), 87 dashes |
| F1 watermark | Cairo Bold 380, `rgba(23,107,176,.05)`, tracking -2%, at (31, -100) | 210 at (-20, 354) (behind the content) |
| Glow | ellipse 320×280 `#63cdff` 20%, blur 75, centre (680, 0) | 260×220, right -70, top -90 |
| Waves | back 1480×170 from y 390; front 1480×407 from y 203 (above the circle, below watermark/product) | back 390×44.8 on the bottom edge; no front wave |
| Sparkles / bubbles | 3 sparkles (22/16/22, 70/50/70%) + 9 bubbles (fill `#63cdff` 22% or 1.5px ring 30%) | 2 sparkles + 4 bubbles |

**Native Reuse Audit → category C (composition) + scoped CSS; no schema change.**
- `hero` (chosen): independent background media with an optional separate mobile image and desktop fallback, native Background colour + overlay/gradient, and an image-only mode that keeps the image's natural height when there are no blocks (`hero--no-blocks-auto-height`). It already has the S03 "Product stage … position" settings. It takes any theme blocks.
- `media-with-content`: rejected. Media and content are side by side; there is no independent full-width background layer under both.
- `section`: rejected. No separate mobile background image, and no natural-height image-only mode.
- New section: not needed.
- `hero` and `group` are both at 40 settings, so nothing was added. Every optional element is a block the merchant can hide (eye icon) or delete.

**Structure (`templates/index.json` → `sn_home_f1`, type `hero`, custom class `sn-home-f1-banner`, after `sn_home_trust`):**
- `f1_content` group `sn-home-f1-content`: column, gap 18, Width Custom 44% (≈ 584 of 1336), start padding 24. Contains:
  - Product tag group `sn-home-f1-tag` (padding 7/16) with text "SNOSHA F1".
  - Heading text `<h2>` with `<em>` accent; Font size — Mobile 24, Line height — Mobile 38.
  - Description text; mobile 13/22.
  - Specs group `sn-home-f1-specs` (row, gap 10) with 4 chip groups `sn-home-f1-spec`, using native Background, Border, Corner radius, Padding and Gap; each chip is icon + text.
  - CTA: native button, `button-custom`, bg `#0f64a8`, text white, **link empty** (merchant picks the product).
- `f1_stage` group `sn-home-f1-stage` contains:
  - Watermark group `sn-home-f1-watermark` (editable text "F1", Text color `#176bb0`).
  - Dotted circle group `sn-home-f1-arc` (empty).
  - Product image block (empty: merchant uploads).
  - Sparkles group `sn-home-f1-sparkles` (empty).
- `f1_glow` / `f1_waves`: empty switch groups `sn-home-f1-glow` / `sn-home-f1-waves` (`display: none`). The glow and waves are drawn on `.hero__container::after` (above the background image, below the content) only while the switch block is present.
- **Icons:** PSI = native `stopwatch`, tank = native `bottle` (placeholders until the merchant uploads the Figma icons). Modes and heads reuse the merchant's S03 uploads (sliders SVG, brush-head PNG). Icon Width 16 (Figma 15; the setting steps by 2).

**CSS (`dev1.css`, appended after S03, every selector depends on a `sn-home-f1-*` class):**
- **Decorations:** exact Figma SVG shapes as data URIs. The dotted circle is redrawn as an SVG with `pathLength` and the measured dash count / gradient. Positions are stage-relative %, and the watermark size is in `cqi` (stage is an inline-size container), so the whole stage scales and moves as one unit.
- **Stage:**
  - Desktop: `flex: 1` with aspect 752/520; content `flex: 0 0` its native Width.
  - Tablet 750–989 (ASSUMED): stacked, stage max 560 centred.
  - ≤749: full-bleed 390/330 with `order: -1`.
  - The hero "Product stage … position" settings apply (`translate`).
- **Product image box:** 558/752 of the stage, centred where Figma has it, `object-fit: contain`. Size = the image block's native Width (Fill = Figma; Custom % scales it).
- **Typography:** Figma values at element-level specificity (`:where` wrapper), so native Custom size / line height / text colour and the per-block mobile size settings win. Weights are fixed (Bold / SemiBold mobile heading).
- **Empty states:** an empty stage or content group collapses (`display: none`), and a single remaining column is centred. With no blocks at all the hero is native (image-only).
- **Background fallback:** Figma gradient when no Background colour is set.

**Reusability scenarios:**
- A full = template as shipped.
- B image-only = delete all blocks.
- C product + background = delete/hide the content group.
- D text + background = delete/hide the stage (or its children).
- E product promotion = hide the tag / description.
- F minimal = keep heading + button.

**Kept in code (and why):**
- Tag / chip / CTA gradients and shadows, the badge style, mobile spacing rhythm (12 / 18 / 32, chip row gap 8) and the tablet heading size 32/50: no native gradient, shadow or mobile gap settings, and `group` / `hero` are at 40.
- Watermark opacity (5%).
- Background image position: the native hero hardcodes `object-position: center`.

**Limitations / ASSUMED:**
- The arc's lower half is faded with a mask to imitate the front wave covering it (the wave is drawn behind the content wrapper).
- Mobile spec order follows the desktop order (row 1 PSI, modes / row 2 tank, heads), because one DOM order can't produce both Figma orders.
- The watermark "F1" is real text, so screen readers can read it.
- The merchant must still upload the background image (optional), the product image and the tank/PSI icons, and pick the CTA product.
- S04/S05 (above S06 in Figma) aren't on this branch; when added they go between `sn_home_trust` and `sn_home_f1`.

**Architecture + media audit (2026-11-11, Dev1), after the merchant's Theme Editor review**
- **Figma rechecked:** product image layers `190:3859` (desktop: PNG 558 square around the 438 layer) and `190:4173` (mobile: PNG 400 square around the 280 layer). Decorations as recorded above.
- **Actual section type:** `templates/index.json` → `sn_home_f1` has `"type": "hero"`, the native `sections/hero.liquid`.
  - No section, block or snippet file was created for S06 (S06 is only `index.json` + `dev1.css`).
  - It looked like a new section because the instance carried the display name "F1 Banner". That name is removed, so the editor shows the native "Hero" (the merchant can rename it).
- **Candidates rechecked:** `hero` stays.
  - `media-with-content` has media beside the content and no background layer under both.
  - `section` has no mobile background image and no natural-height image-only mode.
  - No migration needed, no data lost.
- **Media root causes:**
  1. The empty product image block renders Horizon's sample t-shirt (`placeholder_svg_tag 'detailed-apparel-1'`) on the editor **and the storefront**.
  2. The product box was forced to a square (`aspect-ratio: 1`), ignoring the image block's native Aspect ratio setting (a setting overridden by CSS).
  3. The hero's own Media pickers (generic "Image" labels, two slots) are the **background**. The product picker is the Image block inside "Product stage", so a product uploaded to the hero Media becomes a full-bleed `cover` background (cropped). If both hero slots are filled, the background splits into two columns (native two-media layout).
- **Fixes (`dev1.css` only):**
  - Product box sized by height to Figma (desktop 107.31% of the stage = 558/520, mobile 121.21% = 400/330), width from the native Aspect ratio (`--ratio`, Adapt = file's own ratio), scale from the native Width / Mobile width, `object-fit: contain`.
  - Empty state: the sample illustration is never shown; in the editor a dashed circle marks the slot; on the storefront an empty product block (and a stage left with only empty image blocks) is hidden (`.hero__content-wrapper--design-mode` = editor).
- **Background:** hero Media ("Image" under Media, desktop) + "Custom mobile media" → mobile Image (falls back to desktop), `cover` centred (native). Background colour (native) or the Figma gradient fallback; native overlay available. Use only the first media slot for this banner.
- **Not added (and why):**
  - Background position control: the native hero hardcodes `center center` and is at 40 settings.
  - A separate mobile product image: the same cutout scales; the mobile size comes from Mobile width.
- **Files:** `assets/dev1.css` (S06 product image / empty state), `templates/index.json` (removed the S06 display name only).
- **Static checks:** Theme Check 9 = baseline (stock files only); 27 S06 blocks, 0 unknown or invalid settings; CSS braces balanced; template classes = CSS classes.
- **PENDING USER REVIEW:**
  - Upload the background (hero Media) and the product (Product stage → Image) and compare with Figma at 1480 / 390.
  - Empty states: editor dashed circle; storefront shows nothing.
  - Aspect ratio Adapt vs Square.
  - Decoration blocks on/off.

**Product image size fix (2026-11-11, Dev1), after the merchant uploaded the product (`ce3a9d78…png`)**
- **Figma rechecked:** `190:3859` / `190:4173`, plus the Figma product PNGs measured (scratch only).
  - Desktop: the "Product Image" layer is 438×438 at stage (141, 22); its image fill is a 558 square (2x file 1116²) at (81, -8). The visible flosser is about 114×476 inside it, clipped at the bottom by the 438 circle layer (visible to about y 458 of 520).
  - Mobile: layer 280×280 at (55, 40); fill 400 square (2x 800²) at (-5, 10); flosser about 83×312.
- **Root cause:**
  - The CSS sized the box as Figma's internal 558 / 400 image-fill square (box height = 107% / 121% of the stage), not the 438 / 280 product layer a merchant exports.
  - Any file other than that exact padded fill rendered too big. For example, a 438 layer export renders 27% too large; a tight cutout ends up 558px tall and runs past the bottom.
  - The native Width setting was used as a hidden multiplier of that height, so the editor controls didn't behave like widths.
- **Fix (CSS + native settings, no new settings):**
  - Box = the Figma product layer, centred at 47.87% / 46.35% (desktop) and 50% / 54.55% (mobile).
  - Width = the image block's native **Width** / **Mobile width**, literally % of the stage. S06: Custom 58% (≈ 438px) and 72% (≈ 281px).
  - Height = native Aspect ratio (Adapt = the file's proportions).
  - `object-fit: contain`.
  - Stage geometry is unchanged (752×520 / 390×330 = Figma).
- **Not added:** a separate product-only vertical offset. The hero's "Product stage … position" settings move the product together with the circle and watermark (keeps the Figma relationship), and the image block has no room for a meaningful native offset. The hero is at 40 settings.
- **If the uploaded file is not a 438-layer export:** a tight cutout needs about 15% (desktop) / 21% (mobile); Figma's padded fill image needs about 74% / 100%.
- **Files:** `assets/dev1.css` (S06 product image rule), `templates/index.json` (product image Width / Mobile width only; the uploaded image is kept).
- **Static checks:** Theme Check 9 = baseline; 27 S06 blocks, 0 invalid settings; CSS braces balanced.
- **PENDING USER REVIEW:** product size and position vs Figma at 1480 and 390; tune Width / Mobile width if the uploaded file's padding differs from the Figma layer export.

### S10 Choose Your Care — IMPLEMENTED 2026-11-11 (Dev1); visual QA pending

**Figma (inspected 2026-11-11 with `get_metadata` + `get_design_context`; both nodes accessible).** The layer is named "08 Choose Your Care"; the registry ID stays S10.

| Element | Desktop `190:3943` (1480×1072) | Mobile `190:4265` (390×695) |
|---|---|---|
| Section | gradient `#f7fbfe → #dcf2fb` (top→bottom), padding 60/60, container 1376 + 20 inline | same gradient, padding 56/40 |
| Heading | column, gap 6, centred; H2 Cairo 32/52 SemiBold `#12568d`; text 18/32 `#5a5a59` | 24/38 and 15/38, inline padding 24 |
| Heading → cards | 56 | 22 |
| Cards row | 1336 wide, gap 40, centred, cards vertically centred: 400×672 / 462×806 / 400×672 | carousel, track gap 12, cards 262 wide (440.16 / 460.89 / 440.16), featured centred at x 64 with both neighbours peeking |
| Regular card | white, radius 24, shadow `0 12 32 rgba(15,100,168,.1)`, padding 24/24/13/24, space-between (info top, purchase bottom); gap 16 | radius 15.72, padding 15.72/15.72/4.06, gap 10.48, shadow 0 7.86 20.96 |
| Featured card | 3px conic-gradient ring (radius 27) + shadow `0 24 48 rgba(15,100,168,.18), 0 0 36 rgba(99,204,255,.45)`; inner 456, radius 24, padding 24, gap 16 | ring 1.7, radius 15.31; inner padding 13.61, gap 9.07 |
| Image box | 352×240 (featured 408×300), border 1 `#dcf2fb`, radius 16 | 230.56×157.2 radius 10.48 (featured 231.4×170.13 radius 9.07), same ratios |
| Badge (featured) | «الأكثر مبيعًا» `#176bb0`, white 12/18 SemiBold, radius 8, padding 4/12, at image top-start +13 | 6.8/10.2, padding 2.27/6.8 |
| Title | 24/40 SemiBold `#131311` (featured 32/52) | 15.72/26.2 (featured 18.15/29.49) |
| Description | 14/24 `#5a5a59` | 9.17/15.72 (featured 7.94/13.61) |
| Spec rows | column gap 10, padding-top 4; row gap 10: icon 20 (start side) + text 14/24 `#131311` | icon 13.1 (featured 11.34), text 9.17 (7.94), gaps 6.55 (5.67) |
| Price | regular 18/28 Bold; featured row (pt 6, gap 10): price 24/40 SemiBold, compare-at 14/22 struck `#5a5a59`, pill «خصم 20%» `#f0fafe` / border `#dcf2fb` / `#176bb0` 12/18 radius 8 | 11.79/18.34; featured 13.61/22.68, 7.94/12.48, pill 6.8 |
| Button «عرض المنتج» | full width, padding 13/28, radius 12, 16/26 SemiBold; regular white + border 1.5 `#60c1e1` + `#176bb0` text; featured filled `#176bb0` + white | padding 8.52/18.34 radius 7.86, 10.48/17.03; featured 7.37/15.88 radius 6.8, 9.07/14.75 |
| Progress | — | track 342×4 white radius 99 at 24 inline, 22 below the carousel; fill `#63cdff → #0f64a8` covering the start half (middle card) |

Tongue cleaner specs (desktop Figma): «يزيل مصدر 90% من رائحة الفم» (sparkle), «فولاذ مقاوم للصدأ 420J2» (shield-check), «تصميم مزدوج: فرشاة + مكشطة» (brush-head), «حافظة سفر + ضمان سنة» (package). The mobile Figma tongue card still has 4 × «مواصفة معتمدة — Placeholder» and a different description, so the desktop texts are used. The Figma copy has «متكامل ,»; the brief's «متكامل،» is used.

**Native Reuse Audit**
- `product-list` ✗: one collection or a product list feeding a single shared card template, so specs can't differ per product and no card can be singled out as featured.
- `featured-product` / `product-recommendations` ✗: one product, or algorithmic.
- `section` + `product-card` ✗: no carousel on mobile.
- **`carousel` ✅ (selected, category C):** native slideshow (swipe, RTL scroll maths, arrows that hide when disabled, `initial-slide`). Each slide is a `_card` that can hold a `product-card` theme block. `product-card` has its own **product picker** and per-card child blocks (`closest.product` drives gallery, title, price and dynamic sources).
- Gaps closed with small opt-in extensions (defaults keep native output):
  - B: `custom_class` on `carousel`.
  - B: `custom_class` + `icon` child type on `_product-card-group` (specs need native icons + image upload).
  - B/D: "Featured card" checkbox on `_card`; when on, it outputs `sn-card-featured` and `slide-id`.
  - D: `_carousel-content` passes the first featured card's index as the native `initial_slide`. The native carousel never set `slide-id` on `_card`, so a non-zero initial slide was impossible.

**Final decisions**
- Structure per card: `_card` (Featured card) → `product-card` (product, white, radius 24, padding) →
  - `_product-card-gallery` (Image ratio **Landscape** → Figma 352:240 / 408:300 via CSS; border `#dcf2fb`, radius 16).
  - [featured only] group `.sn-home-care-badge` → `text` (native background).
  - `product-title`.
  - `text` = `{{ closest.product.description }}` (the native dynamic source; CSS shows a 2-line excerpt and hides media).
  - group `.sn-home-care-specs` → row groups (`icon` + `text`).
  - group `.sn-home-care-price` → `price` (sale price first) + `custom-liquid` discount pill.
  - group `.sn-home-care-cta` → `text` (native background / colour / radius).
- **Product data:** image, title, description, price / compare-at / ranges / currency (native `price` snippet) and link (native `product-card` overlay link + title link) all come from the selected product. Nothing is hardcoded. The cards ship with **no product selected** (product handles unknown: the Shopify tool points to another store); the merchant picks F1, N2 and the tongue cleaner.
- **Discount pill:** `custom-liquid` computes `round((compare_at − price) × 100 / compare_at)` from `closest.product.selected_or_first_available_variant`, the same variant the price block shows. No compare-at price = no pill. The native gallery "Sale" badge is hidden under the class so the sale isn't shown twice. UNVERIFIED: that `closest.product` resolves inside a `liquid` setting; if it doesn't, the pill simply doesn't render.
- **Featured:** per-card checkbox, so it stays with its card when reordered and doesn't depend on DOM index. If none is featured, the carousel starts at the first card and no card is highlighted. Ring, glow, size, filled button and larger type all come from `.sn-card-featured` under the section class. The badge is a removable text block (eye icon / edit text). Button colours use the CTA text block's native background / text colour.
- **Desktop (≥990):** cards 400 / 462 (Figma), gap = native Horizontal gap (40), vertically centred (Card position: Center), centred with auto margins. Regular cards have a min height of 672 with the price + button pinned to the bottom, so longer content grows the card instead of overlapping. More than 3 products → native scroll + arrows (hidden while all fit).
- **Tablet (750–989, no Figma frame; ASSUMED):** swipe carousel, cards 340 / 380, featured centred.
- **Mobile (≤749):**
  - Cards 262, gap 12; side gutters (100cqi − 262)/2, so the featured card is centred and both neighbours peek; snap centre; arrows hidden.
  - Card typography from the Figma mobile frame: per-text-block native "Font size — Mobile" / "Line height — Mobile"; title, price, pill and icon sizes in CSS. Figma mobile text is the desktop card scaled ×0.655 (desc 9.17, featured 7.94, badge 6.8), recorded as a readability risk as in S03 D5.
- **Progress bar:** CSS scroll-driven animation (`scroll-timeline` on the native scroller, `timeline-scope` on the wrapper). It reflects the real scroll position with no JS. Browsers without `animation-timeline` (Firefox today) show **no** bar, rather than a static fake one.
- Background: the Figma gradient on `.section-background` while the section Background colour is blank.

*Files changed*
| File | Change |
|---|---|
| `sections/carousel.liquid` | `custom_class` (9→10), rendered on `.section` |
| `blocks/_carousel-content.liquid` | `initial_slide` = index of the first featured card (0 when none = native) |
| `blocks/_card.liquid` | `featured` checkbox (25→26); when on: class `sn-card-featured` + `slide-id` |
| `blocks/_product-card-group.liquid` | `custom_class` (35→36) passed to the existing `group` snippet `class` param; `icon` added to allowed children |
| `assets/dev1.css` | S10 block appended (S03 / S06 untouched) |
| `templates/index.json` | `sn_home_care` (type `carousel`) appended after `sn_home_f1`; nothing else changed |

*Reversibility:* removing `sn-home-choose-care` turns off all S10 CSS (the featured class becomes inert). The native carousel still starts on a featured card (functional, not visual). Settings that stay when the class is removed: card white background / radius / padding, gallery border, text colours and backgrounds, per-block mobile sizes, Landscape image ratio.
- **Static checks:** Theme Check 9 = baseline; 81 S10 blocks, every setting exists in its schema, selects / ranges / checkboxes valid, child types allowed by parent schemas, block_order consistent; edited schemas parse; `dev1.css` braces balanced; classes in template = classes in CSS.
- **PENDING USER REVIEW:** select products; 1480 / 1024 / 768 / 390 / 375 / 360 vs Figma; featured card on another position; reorder; 2 and 4+ products; product without compare-at (no pill / no strike) and with variants (price range); discount pill renders; progress bar moves with swipe (Chrome / Safari) and is absent in Firefox; RTL swipe direction; card link + focus; class on/off.

**Mobile carousel fix + generic cards (2026-11-11, Dev1).** Figma `190:3943` / `190:4265` re-checked (metadata; mobile track: cards 262 at x 0 / 274 / 548, gap 12; the track sits at x −210, so the featured card is at x 64 = centred; progress 342×4 at y 595).
- **Root cause (3 parts):**
  1. **Native slideshow bug:** `connectedCallback` sets `current = initial-slide` and only then calls `select({ id })`. `select()` returns early when the requested slide is already current, so with any non-zero initial slide the scroller never moved and the first card was shown. No stock caller passes a non-zero `initial_slide`, which is why it never surfaced.
  2. **S10 CSS:** cards used `scroll-snap-align: center` while Horizon sets a one-sided `scroll-padding-inline-start` (= gutter). The snapport centre was therefore shifted half a gutter (≈32px at 390), and on tablet the featured and regular cards had different widths.
  3. **RTL order:** Figma is drawn left to right (F1 left, tongue cleaner right). In RTL the first DOM card renders on the right, so the order was mirrored.
- **Fixes:**
  1. `assets/slideshow.js` (one branch): when the initial slide isn't 0, scroll to it directly with the native `Scroller.to()` (RTL-aware), skipped if that card isn't displayed.
  2. ≤989: every card has the same width; gutters = (track width − card width) / 2; `scroll-snap-align: start` matches the native scroll padding, so the featured card is centred with both neighbours peeking. Mobile 262 / gap 12 (section settings), tablet 340 / 16 (ASSUMED).
  3. Card order reversed in the template (block IDs kept). Desktop (≥990): 400 / 462 from settings, scaled down together when three cards don't fit, `justify-content: safe center` (replaces the auto margins, which broke when a card was hidden).
- **Progress bar:** unchanged mechanism (CSS scroll timeline on the native scroller). Because the scroller now really starts at the featured card, it opens at ≈50% for the middle card, filled from the start (right) side as in Figma. Hidden with a single card; absent in browsers without scroll-driven animations.
- **Generic cards:**
  - Labels: cards "Product card", "Product description", "Product specifications" → "Specification item", "Price", "Discount badge", "Button", "Featured badge". No product names in labels, schema, CSS or Liquid. Block IDs kept (internal, not shown in the editor; they still contain the original prefixes `care_f1_…`).
  - Every card now has a "Featured badge" block (new: `care_card_1_badge`, `care_card_3_badge`). It is shown only while the card is featured.
  - All "Button" text blocks share the regular settings (white, `#176bb0`). The featured card fills the button with the theme primary button colours via CSS, so moving "Featured card" moves the whole treatment: ring, glow, size, badge, filled button and start position.
  - Empty product: card kept with native placeholders in the Theme Editor, hidden on the live store; the placeholder price is never shown.
  - Spec texts remain card-level template data (not product data) and can be edited independently.
- **New section settings** (`carousel`, 10→14, visible only with a custom class, output as `--carousel-*` only with a class): Card width — Desktop (400), Featured card width — Desktop (462), Card width — Mobile (262), Horizontal gap — Mobile (12). Desktop gap = native Horizontal gap.
- **Card shadow** moved to the product card (follows its native corner radius); the featured ring stays on the slide.
- **Files:** `assets/slideshow.js`, `sections/carousel.liquid`, `assets/dev1.css` (S10 block rewritten; S03 / S06 untouched), `templates/index.json` (S10 only: labels, order, 2 badge blocks, CTA colours, 4 settings).
- **Static checks:** Theme Check 9 = baseline; 85 S10 blocks valid; `node --check assets/slideshow.js` OK; CSS braces balanced.
- **PENDING USER REVIEW:** 390 / 375 / 360 start position (featured centred, neighbours peeking on both sides); swipe both ways; progress bar; tablet 768; desktop 1480 / 1024; move "Featured card" to card 1 or 3 and check the centring; 1, 2 and 4+ cards; empty product card in the editor vs live; products with or without compare-at price, description, image; theme editor card selection; RTL. **UNVERIFIED:** `block.blocks[].settings` in `_carousel-content` (if Shopify doesn't expose child settings, the start falls back to the first card), and `closest.product` inside the discount Custom Liquid.

**Image fit, arrows, mobile centring, active card (2026-11-11, Dev1).** Figma `190:3943` / `190:4265` re-checked (metadata). The merchant had selected the products (`snosha-n2`, `snosha-f1-1`, `منظف-اللسان-snosha`) and removed the extra badges; all of that is kept, as is the card order.
- **Image cropping, root cause:** the native card gallery hardcodes `--product-media-fit: cover` inline (`_product-card-gallery` has no fit setting), so a tall product in the landscape image box was cropped. **Fix:** new section setting "Product image fit" (Fit = contain, default; Fill = cover) → `--carousel-image-fit`, applied under the class to the gallery images only.
- **Arrows:** the native section setting Icon = **None** (template), so arrows aren't rendered at all. A class rule keeps them hidden if re-enabled. Swipe, drag, trackpad and keyboard/focus scrolling are untouched.
- **Mobile shift, root cause:** cards snapped by their start edge against Horizon's one-sided `scroll-padding-inline-start` (the gutter). The snapped card is only centred if gutter, card width and scroller width agree exactly; any mismatch (and the earlier centre-snap version) pushed the card off centre, and the first or last card could not centre symmetrically. **Fix:** ≤989 `scroll-padding-inline: 0` and `scroll-snap-align: center`, so the snap target is the true centre of the full-width scroller, every time (load, swipe, resize, reorder). Gutters stay (track width − card width) / 2, so the first and last cards can reach the centre. All cards have the same width (Card width — Mobile 262, gap 12). No transforms or negative inline margins. RTL: logical scroll padding, native RTL-aware `Scroller.to()` for the start position, `scroll-snap` is direction-agnostic. DOM order kept (merchant order).
- **Start position:** native `initial-slide` (fixed in `slideshow.js`, see the previous record) + CSS `scroll-initial-target: nearest` on the "Featured card" as a second path where supported.
- **Active card = centred card (≤989):**
  - Each slide has a CSS view timeline in the native scroller. Between 44% and 56% (centred) the slide shows the ring (`::before` opacity), glow (box-shadow) and filled button (primary button colours); it is off before 36% and after 64%. At rest exactly one card, the snapped one, is active.
  - The progress bar is a scroll timeline on the same scroller, so position, active card and bar can't disagree; no JavaScript, no race with carousel initialisation.
  - Only paint properties change (no size or padding change: every slide reserves the 1.7 / 3px ring space), so the track never reflows.
  - Trade-off: the Figma height difference of the featured mobile card (461 vs 440) is not reproduced dynamically; cards are sized by their own content. On mobile every card uses the regular Figma metrics (N2 mobile text sizes aligned to 9/16 and button 10/17).
  - Browsers without scroll-driven animations (Firefox today): the "Featured card" keeps the look statically.
- **Desktop (≥990):** unchanged three-card composition. The featured design follows the "Featured card" checkbox (all three are visible, so there is no single "centred" card).
- **Badge:** a product claim («الأكثر مبيعًا»), so it stays with its own card (shown whenever that card has the badge block) and never moves with the active state.
- **Files:** `assets/dev1.css` (S10 block rewritten; S03 / S06 untouched), `sections/carousel.liquid` (`image_fit`, 14→15, class-bound), `templates/index.json` (S10 only: Icon None, image fit, N2 mobile text sizes).
- **Static checks:** Theme Check 9 = baseline; 81 S10 blocks valid; CSS braces balanced.
- **PENDING USER REVIEW:** 390 / 375 / 360: featured card centred on load, symmetric peeks, swipe to the first and last card (both centre), active ring / glow / button follow the centred card and switch as it snaps, bar in sync; resize; tablet 768; desktop 1480 / 1024; full product images (tongue cleaner); Firefox fallback; RTL.

**Active card + mobile start, functional rework (2026-11-11, Dev1).** The merchant confirmed on the storefront that the featured look stayed on one card and the mobile track was still off centre. Current data kept: 4 cards (tongue cleaner, N2 = Featured card, F1, a second F1 card added in the editor), products, Icon None, Fit.
- **Why the earlier fixes failed:**
  - The active look relied on CSS scroll-driven animations (`view()` timelines). Where they aren't supported (iOS Safari before 26, Firefox) the CSS fell back to the static "Featured card", and desktop always used it. No code ever measured which card was centred.
  - The mobile start position depended on two unverified links: Liquid reading child settings through `block.blocks` in `_carousel-content`, and a patch inside Horizon's `slideshow.js`. If either fails, the scroller stays at 0: the first card is centred, the gutter on the other side is empty, and the track looks shifted.
- **Actual scroll viewport:** `slideshow-slides` (`ref="scroller"`, `overflow-x: scroll`, `scroll-snap-type: x mandatory`), inside `slideshow-container` (`overflow-x: clip`, inline-size container) → `slideshow-component.carousel-content` → `.force-full-width` (spans the full section grid, i.e. the screen width on mobile).
- **New mechanism:** `assets/carousel-active-card.js`, a custom element `<carousel-active-card hidden>` rendered by `sections/carousel.liquid` only when the custom class is set and the new setting "Highlight centred card" is on (S10: on). In one rAF-throttled update per scroll / resize / child change, it:
  - measures every displayed `.card` with `getBoundingClientRect()` and marks the one whose centre is closest to the scroller's centre `is-active-card` (exactly one; when nothing scrolls, the Featured card, else the most central);
  - writes `--carousel-progress` = |scrollLeft| / (scrollWidth − clientWidth) and toggles `carousel--scrollable` on the section.
  - On load (after two frames) it centres the Featured card with `scrollBy` by the physical delta between the two centres, which is direction-independent (no reliance on the RTL sign of `scrollLeft`). Theme Editor: selecting a block inside a card centres that card. Listeners use an AbortController, observers are disconnected in `disconnectedCallback` (editor re-renders), and the element is defined once.
- **CSS:** every card reserves the ring space (3px, mobile 1.7px) and carries the shadow; ring (`::before` opacity), glow and filled button switch on `.is-active-card` (0.25s, none with reduced motion). Before the script runs, the Featured card shows the look (`:not(:has(.is-active-card))`). Desktop Featured card keeps its larger size (layout only). Badges stay with their own product.
- **Centring geometry (unchanged from the previous fix, kept):** ≤989 equal widths (262 / gap 12), gutters (track − card) / 2, `scroll-padding-inline: 0`, `scroll-snap-align: center`; first and last cards can centre.
- **Progress:** the bar width is `max(8%, --carousel-progress)`, from the same scroller in the same frame as the active card. At rest it equals active index / (cards − 1). Shown ≤989 only while the cards scroll.
- **Removed (obsolete or conflicting):** all `view()` / `scroll()` timeline CSS and keyframes, `scroll-initial-target`, the static featured ring / glow / button rules, the `slide-id` output on `_card`, the `block.blocks` loop in `_carousel-content` (back to stock), and the `slideshow.js` patch (back to stock Horizon).
- **Files:** new `assets/carousel-active-card.js`; `sections/carousel.liquid` (`highlight_active_card`, 15→16, + element / script); `blocks/_card.liquid` (`slide-id` removed, info text); `blocks/_carousel-content.liquid` and `assets/slideshow.js` reverted to stock; `assets/dev1.css` (S10 block); `templates/index.json` (`highlight_active_card: true` only).
- **Static checks:** Theme Check 9 = baseline; `node --check` on the new script; 104 S10 blocks valid; CSS braces balanced. State transitions traced on paper only (390px, 3 or 4 cards, RTL): load → Featured card centred (delta −274 → scrollLeft −274), active = Featured, progress 0.5 (3 cards); swipe → snap → nearest centre becomes the only active card, progress follows; 1 card → not scrollable → that card active, no bar; desktop with 3 cards → nothing scrolls → Featured card active.
- **NOT VERIFIED (no browser run):** all runtime behaviour, i.e. start position, active switching, progress, resize, Theme Editor re-render and block selection, iOS Safari and Firefox.

**Overflow, desktop containment, active zoom (2026-11-11, Dev1).** From the merchant's screenshots after the active-card script: on mobile, active switching and centring work (the centred card has ring + filled button, symmetric peeks), but there is a strip of page background beside the section. On desktop (4 cards) the row runs full-bleed to the screen edges, and the wide N2 (Featured card) and the ringed F1 (active) disagree.
- **Root causes:**
  1. **Desktop overflow / broken layout:** native `_carousel-content` wraps the slideshow in `.force-full-width` (full-bleed grid column 1 / -1). With 4 cards the track overflowed and cards ran to and past the screen edges.
  2. **Conflicting featured layout:** the Featured card kept its own desktop width (462 setting), image ratio and type sizes (layout), while the ring / glow / button followed the active card (paint). Two cards looked "featured".
  3. **Mobile strip:** section content wider than its `.section-background` (absolute `inset: 0` on `.shopify-section`), the RTL signature of a grid item forcing the grid wider. Which child does it could not be measured without a browser.
- **Fixes:**
  - Desktop (≥990): `.force-full-width` placed in the centre column (1376 container); every card has one width = min(Card width — Desktop 400, (container − 2 gaps) / 3), so three always fit. ≤3 cards: centred, no scrolling (active = Featured card or the most central). 4+ cards: gutters = (container − card) / 2, `scroll-padding-inline: 0`, centre snap (first and last can centre); the script centres the Featured card on load and follows the centred card.
  - All layout differences of the Featured card removed (the `featured_card_width` setting is gone; image ratio / price / title sizes are the same for every card). Emphasis = paint + zoom only: `.is-active-card` gets `scale: var(--sn-care-zoom)` (new "Active card zoom", 106%, phones 75% of that), `z-index: 1`, ring, glow, filled button; transitions are off with reduced motion. Transform only, so no reflow, no track-width change and no snap shift (the scale is centred).
  - Overflow: `.sn-home-choose-care` and its grid items get `min-width: 0` (no grid blow-out), and `.shopify-section:has(> .sn-home-choose-care) { overflow-x: clip }`, a scoped containment that adds no scroll container and doesn't affect sticky elements.
  - Progress bar: shown at any width while the cards scroll, centred 342px track (24px sides at 390, Figma).
  - Arrows: native Icon = None (unchanged) + class rule.
- **Schema:** `carousel` `featured_card_width` replaced by `active_card_zoom` (100–112%, default 106) → `--carousel-active-zoom` (still 16 settings, class-bound). Template: `featured_card_width` removed, `active_card_zoom: 106`.
- **Files:** `assets/dev1.css` (S10 block), `sections/carousel.liquid`, `templates/index.json` (S10 settings only). `sections/header-group.json` / `footer-group.json` show unrelated uncommitted changes that are not Dev1's; left untouched.
- **Static checks:** Theme Check 9 = baseline; 104 S10 blocks valid; CSS braces balanced.
- **NOT VERIFIED (no browser):** whether the mobile strip is gone (the guards contain it, the offending child is unidentified), desktop 4-card centring and scrolling, zoom overlap with neighbours (desktop 400 card + 6% = 12px into each 40px gap; phone 4.5% = 6px into each 12px gap), Theme Editor behaviour.
- **Manual checks:** mobile 390 / 375 / 360 (no white strip, no sideways page scroll, centred active card, zoom + ring move on swipe, bar); desktop 1480 / 1280 / 1024 with 3 and with 4 cards (contained, nothing cut at the screen edge, Featured card centred on load, highlight follows when scrolling); RTL; Theme Editor block select.

**Desktop bar, last card, mobile centring, mobile CTA spacing (2026-11-11, Dev1).**
- **Root causes:**
  1. **Desktop bottom bar:** the S10 custom progress bar (not a browser scrollbar: `slideshow-slides` hides its scrollbar natively). The previous round enabled it at every width while the cards scroll, and with 4 cards the desktop row scrolls.
  2. **Last card (far left in RTL) never becomes current on mouse drag:** the native slideshow's drag release computes the index from the visible slide closest to the scroller's START edge (when more than one slide is visible) and scrolls that slide to the start. In the centred layout that is one card before the centred one, so every drag lands one card short and the last card can't be reached. A second risk: the side gutters were scroller `padding-inline`, and inline-end padding of a flex scroll container is not reliably part of the scroll range.
  3. **Mobile CTA on the card edge:** the S10 mobile card padding copied Figma's regular mobile card bottom padding (4.06px).
  4. **Mobile off-centre:** not reproducible from the code. The carousel geometry is measured against its own scroller, and the heading sits in the section's centre column; no `100vw` in the S10 chain. The earlier screenshot showed the section's content wider than its background (the RTL signature of an overflowing box). Causes outside S10, or a desktop-browser RTL scrollbar on the left in responsive mode, can't be ruled out without a browser.
- **Fixes:**
  - Desktop bar: progress bar limited to ≤989 again (Figma desktop has none).
  - Mouse drag (`carousel-active-card.js`): a capture-phase `mousedown` on the scroller's parent stops the native start-aligned drag for this carousel only. The drag scrolls the scroller with snap paused; on release, snap is restored and the card nearest the centre is centred (`#settle`); the click that ends a drag is swallowed; `dragstart` is prevented while scrollable. Touch, trackpad and wheel stay native scroll + CSS centre snap.
  - Gutters: native scroller padding replaced by `::before` / `::after` flex spacers of (gutter − gap), so the first and last cards are always within the scroll range and can centre. Hidden on desktop with ≤3 cards.
  - Mobile CTA: card bottom padding = max(15.72px, native Padding bottom × 0.655), so it equals the side padding by default and grows with the product card's native bottom padding.
- **Files:** `assets/carousel-active-card.js` (drag + settle), `assets/dev1.css` (S10: spacers, desktop bar off, mobile bottom padding). No schema change.
- **Static checks:** `node --check` OK; Theme Check 9 = baseline; S10 template valid; CSS braces balanced.
- **NOT VERIFIED (no browser):** mouse drag to every card incl. the last (far left) on desktop; the click after a drag doesn't open the product but a plain click does; touch swipe on a phone; mobile centring on a real 390 device (if still shifted, inspect which element is wider than `.shopify-section` in DevTools); CTA spacing.

**Mobile off-centre: root cause found (2026-11-11, Dev1).** Figma `190:4265` re-checked (track at x −210, cards 262 at 0 / 274 / 548, gap 12 → centred card at x 64–326).
- **Root cause:** the S10 rule `.sn-home-choose-care.gap-style { gap: 56px / 22px }`. Native carousel sets only `row-gap` (`.section-carousel { row-gap: var(--gap) }`), but the `gap` shorthand also set **column-gap** on the section grid (margin | content | margin).
  - On mobile the content column is 100% − 2 × 16px, so the two 22px column gaps made the grid 44px wider than the screen. The overflow goes to the inline end (left in RTL), so every child (heading, full-bleed carousel, progress bar) sat 22px left of centre. The strip of page background beside the section in the merchant's screenshot was that overflow.
  - On wide desktops the flexible margin columns absorbed the 2 × 56px.
- **Why the earlier attempts failed:** they all corrected geometry inside the carousel (snap, padding, start position), which was already symmetric relative to a mis-sized parent grid. The previous round's `min-width: 0` / `overflow-x: clip` guards only hid the overflow.
- **Fix:** `row-gap` instead of `gap` (56 desktop / 22 mobile). Removed the obsolete guards (`min-width: 0`, `max-width: 100%` and `> * { min-width: 0 }` on the section; `overflow-x: clip` on `.shopify-section`). Audit of the S10 block: the remaining `gap` declarations are flex containers (cards, specs, price); the only negative margin is the vertical shadow room on the scroller; no transforms or left / right offsets used for positioning.
- **Expected geometry at 390 (formulas; not measured in a browser):** section grid 16 | 358 | 16, no column gaps; `.force-full-width` = scroller = 390 wide, centre 195; card 262; gutter G = (390 − 262) / 2 = 64; spacer = G − 12 = 52; card i spans 64 + 274i … 326 + 274i from the inline start; centre snap → scroll offset 274i (|scrollLeft| in RTL); max = 274 × (n − 1); every card i (first, middle, last) reaches centre 195; progress = i / (n − 1).
- **Files:** `assets/dev1.css` (S10 block only).
- **Static checks:** Theme Check 9 = baseline; `node --check` on the S10 script; S10 template valid; CSS braces balanced.
- **NOT VERIFIED:** the rendered measurements above (no browser). Manual: 390 / 375 / 360 phone, centred card centre = screen centre on load and after every swipe, symmetric peeks, no strip / sideways scroll, heading and bar centred; desktop unchanged.

### S12 Blog — IMPLEMENTED 2026-11-12 (Dev1); visual QA pending

**Figma (inspected 2026-11-12 with `get_design_context` on `190:4018` and `190:4349`).** The layer is named "13 Blog"; the registry ID stays S12.

| Element | Desktop `190:4018` (1480×664) | Mobile `190:4349` (390×734) |
|---|---|---|
| Section | padding 60/60, container 1376 with 20 inner → 1336; column gap 40 (heading → cards) | padding 56/40; column gap 14 (heading, carousel, progress, link) |
| Heading | centred; title 32/52 SemiBold `#12568d`; subtitle 18/32 `#5a5a59`; gap 6 | 24/38 and 13/22; inline 24 |
| View all | «عرض الكل» 16/26 SemiBold `#176bb0` + arrow-left 18, gap 10; absolute at the heading bottom-left (6px, 5.91px) | centred under the progress bar |
| Cards | 3 × 429.33, gap 24; card column gap 16; image 268 high, radius 16 | track: start padding 24, cards 280, gap 12, carousel bottom padding 24 |
| Card text | column gap 8, inline padding 4; date 12/18 SemiBold `#176bb0`; title 20/34 SemiBold `#12568d`; excerpt 16/28 `#5a5a59`; read more «اقرأ المزيد» 16/26 SemiBold `#176bb0` + arrow 18 | same text styles as desktop |
| Progress | — | track 342×4 `#dcf2fb` radius 99 (24 sides); fill `#63cdff → #0f64a8` = 43.86% at the start side (= visible share of the track: scrollbar-like thumb) |

**Native Reuse Audit**
- `featured-blog-posts` ✅ (selected):
  - native `blog` picker, Post count (2–10), layout grid / carousel / editorial;
  - "Carousel on mobile": Horizon renders the list a second time as a slideshow, start snap, page gutters;
  - icon style (none);
  - static title block (richtext);
  - static card: article image (ratio + radius), `_heading` title (`closest.article.title`), details (date / author toggles, colour), description (`article.excerpt` or `article.content`, HTML stripped, 30 words); the whole card links to `article.url`.
- Per-article nested blocks: **not supported natively**. The card is one static template shared by every article; presentation is configurable, content per article comes from Shopify. No parallel system built.
- Missing natively → minimal opt-in extensions (defaults = native output):
  - `_featured-blog-posts-card`: "Show excerpt" (default on), "Read more label" (blank = none). The label is visual (`aria-hidden`) because the card is already one article link (no duplicate link).
  - `featured-blog-posts`: "View all link" label + URL (empty URL = selected blog), `custom_class`, and class-bound "Show progress bar", "Image height" (268), "Card width — Mobile" (280).
  - Progress: native carousels have dots / counter only, no progress bar. New `assets/carousel-progress.js` (`<carousel-progress>`) reads the displayed native scroller and sets thumb size (clientWidth / scrollWidth) and position (|scrollLeft| / max). It never scrolls, hides while nothing scrolls, and cleans up on disconnect (editor re-render).

**Decisions**
- Desktop: native grid (3 columns, Horizontal gap 24, Gap 40), container 1336 (class-scoped `--page-content-width`); "View all" on the heading row at the inline end (grid row 1, end / end) on ≥750, centred after the progress bar below 750. A single link element in both cases.
- Mobile: native carousel kept (start snap, `--gutter-slide-width: 24px`, gap 12, card width from the setting, `min(280px, 100cqi − 48px)`); no arrows (Icon None); no centring workarounds. The S10 lessons are applied: only `row-gap` on the section grid, no transforms or negative inline margins.
- Card: image → text gap 16; image height from the setting (aspect ratio switched off under the class, cover crop), radius = native 16; date moved first with `order: -1` (DOM order unchanged); excerpt clamped to 2 lines; arrows mirrored in RTL.
- Template: `sn_home_blog` (type `featured-blog-posts`) after `sn_home_care` (S11 not built). Blog **not selected** (handle unknown; the Shopify tool points to another store), so native placeholders show until the merchant picks it. Read more «اقرأ المزيد», View all «عرض الكل», date on, author off.
- **Files:** `sections/featured-blog-posts.liquid`, `blocks/_featured-blog-posts-card.liquid`, new `assets/carousel-progress.js`, `assets/dev1.css` (S12 block appended), `templates/index.json`.
- **Static checks:** Theme Check 9 = baseline; S12 template 6 blocks, every setting valid; `node --check` on the script; CSS braces balanced; card block callers: `featured-blog-posts` only.
- **PENDING USER REVIEW:** select the Blog; 1480 / 1024 / 768 (heading row with View all on the left, 3 cards, image height 268, Read more); 390 / 375 / 360 (first card 24 from the right edge, next peeking, swipe to the last card, progress thumb moves right → left, View all centred below); article without image / excerpt; 1 and 5+ articles; hidden excerpt / empty Read more label; RTL arrows; editor re-render.

**Native "Blog post carousel" audit (2026-11-12, Dev1).**
- **Native component found:** "Blog posts: Carousel" (`t:names.blog_posts_carousel`) is not a separate section. It is one of three presets (Grid / Carousel / Editorial) of the native section **`featured-blog-posts`** (`sections/featured-blog-posts.liquid`). Its structure: static `_featured-blog-posts-title` + static `_featured-blog-posts-card` (`image` → `_featured-blog-posts-image`, `title` → `_heading`, `blog-post-info-text` → `_blog-post-info-text`, `blog-post-description` → `_blog-post-description`); `resource-list` → `resource-list-carousel` → `slideshow` snippets; preset settings `layout_type: carousel`, `columns: 3`.
- **Section type used by S12:** `featured-blog-posts` (instance `sn_home_blog`), i.e. the same native file and type. No custom section or block was created; nothing renamed. **No migration needed.**
- **Change:** the instance had been configured like the Grid preset (`layout_type: grid` + "Carousel on mobile"). It now uses the Carousel preset configuration (`layout_type: carousel`, columns 3, Horizontal gap 24, Icon None): one native slideshow list at every width, instead of a desktop grid plus a hidden mobile copy.
- **CSS:** the native desktop carousel reserves a 3rem next-slide peek, which would make cards 413px; `--peek-next-slide-size: 0px` on `.sn-home-blog` (≥750) gives Figma's 3 × 429.33 + 2 × 24 = 1336. Mobile rules (280 cards, 12 gap, 24 gutter, start snap) and the progress bar are unchanged (they target `.resource-list__carousel`, present in both layouts).
- **Final decision:** keep native `featured-blog-posts` with the Carousel preset configuration plus the opt-in extensions recorded above. Desktop with more than 3 articles scrolls natively (drag / trackpad, no arrows).
- **Files:** `templates/index.json` (`layout_type`), `assets/dev1.css` (peek, comment).
- **Static checks:** Theme Check 9 = baseline; S12 template valid; CSS braces balanced.

**Manual cards (2026-11-12, Dev1), merchant request:** "upload the media and the text from the Theme Editor and add several blocks". `featured-blog-posts` takes image, title, date, excerpt and link from Shopify articles, so per-card media / text can't be edited there.
- **Decision:** `sn_home_blog` (same key and position) is now the native **`carousel`** section (the one S10 uses):
  - one `_card` block per post (add / remove / reorder) with an `image` block (upload in the Theme Editor), text blocks Date (custom 12px, `#176bb0`, bold), Title (`<h3>`, `#12568d`), Description (`#5a5a59`), and a row `group` "Read more" (text + native `icon` "arrow", 18, `#176bb0`);
  - the card's native **Link** makes the whole card clickable;
  - cards no longer update from blog articles.
- **Native settings used:** Columns 3, Horizontal gap 24, Icon None, Top / Bottom 60, Card width — Mobile 280, Horizontal gap — Mobile 12 (S10 settings), image block Corner radius 16, text colours / presets.
- **New `carousel` settings (16→20):** "Card image height" (268, class-bound → `--carousel-image-height`), "Show progress bar" (class-bound; renders `<carousel-progress>`, same script as before), "View all link" Label + Link (one link after the cards; in the Theme Editor the label shows even before a link is chosen; on the live store it needs the link). All default off / blank, so S10 is unaffected.
- **Reverted:** the earlier `featured-blog-posts` and `_featured-blog-posts-card` extensions (both files back to stock; nothing of the merchant's used them).
- **CSS (`dev1.css`, S12 block rewritten):**
  - 1336 container, desktop peek 0 (3 × 429.33 + 2 × 24); row-gap 40 / 14 only (no column gaps);
  - View all on the heading row at the inline end (≥750) / centred under the bar (<750);
  - mobile cards 280 / gap 12 / gutter 24, start snap;
  - image 268 high, cover, 16px to the text;
  - an empty image block hidden on the live store;
  - progress thumb (`#dcf2fb` track, gradient fill, mobile only);
  - right-pointing arrows mirrored in RTL;
  - typography by element (`h2` / `p` heading, `h3` title, `p` description / read more, 12px date).
- **Template:** 3 cards with the Figma texts as editable starting content; images empty (merchant uploads); card Links and the View all link empty (unknown URLs).
- **Files:** `sections/carousel.liquid`, `assets/carousel-progress.js` (unchanged), `assets/dev1.css`, `templates/index.json`; `sections/featured-blog-posts.liquid` and `blocks/_featured-blog-posts-card.liquid` restored to stock.
- **Static checks:** Theme Check 9 = baseline; S12 27 blocks valid; S10 still valid (104 blocks); `node --check` OK; CSS braces balanced.
- **PENDING USER REVIEW:** upload 3 images, set card links and the View all link; desktop 1480 / 1024 / 768 (3 cards 429 wide, 268px images, View all left of the heading); mobile 390 / 375 / 360 (280 cards from 24px, swipe to the last, progress thumb, View all centred under the bar); add a 4th card; RTL arrows.

**Back to native articles + fixes (2026-11-12, Dev1).** The merchant chose automatic Shopify articles over the manual cards. The manual-card instance (committed in `7b79052` / `77fc6a7`) used uploaded files that stay in Shopify Files: `55fd21da…3c.png`, `23cc6616…96.jpg`, `7712a0cc…e3.jpg` (twice), and icons `arrow-left.svg` / `arrow-left_4b2462a5….svg`.
- **Architecture:** `sn_home_blog` is native `featured-blog-posts` again, with the native Grid preset configuration: `layout_type: grid`, columns 3, Horizontal gap 24, Post count 3 (tablet / desktop: static grid, no scroll, no arrows, no bar) + native "Carousel on mobile" (<750: Horizon renders the same articles as its slideshow). No custom section; the `carousel` section is back to its S10 state (16 settings), and the stale keys it had written into the S10 instance (`image_height`, `show_progress`, `view_all_*`, defaults only) were removed from `sn_home_care`.
- **Read more root cause:** the manual cards had no article binding (each card's Link was empty or typed by hand), so "Read more" could not open the post. **Fix:** the card's "Read more label" now renders a real link to that card's `article.url` (the card overlay link stays the keyboard / screen-reader link; the Read more link is `tabindex="-1" aria-hidden="true"`, so there's no duplicate stop). Placeholder cards get a plain span.
- **Arrow root cause:** the label came first and the arrow second, so in RTL the arrow sat on the left of the text. Figma puts the arrow on the right of the label (before it in Arabic reading order), pointing left. **Fix:** the arrow is first in the DOM (normal RTL flow puts it on the right) and the right-pointing `icon-arrow.svg` is mirrored only under `:dir(rtl)`; gap 10, 18px; S12 links only.
- **View all:** one link to the selected blog's `blog.url`. New setting "Show": When the blog has more posts than shown (default; `blog.articles_count > Post count`, so 1–3 articles hide it with Post count 3) / Always / Never. Hidden without a blog. Desktop / tablet: grid row 1, inline end (left), bottom-aligned with the subtitle, taken out of the flow (no shift, no reserved space). Mobile: centred under the progress bar.
- **Mobile heading gap root cause:** Horizon's `.rte :is(h1…h6) { margin-block: … var(--font-heading--spacing) }` (0,1,1) beat the S12 margin rules, which were wrapped in `:where()` (0,0,1), so the heading kept the theme heading spacing under it. **Fix:** margins set with normal specificity (h2 margin 0, subtitle `margin-top`); desktop 6px (Figma), mobile from the new setting "Heading and subtitle gap — Mobile" (default 6, class-bound → `--blog-heading-gap-mobile`). The same rule was zeroed for the card title.
- **Section settings now (16→23):** `view_all_label`, `view_all_visibility`, `custom_class`, `show_progress`, `image_height` (268), `mobile_card_width` (280), `heading_gap_mobile` (6). Card (12→14): `show_excerpt`, `read_more_label`.
- **Files:** `sections/featured-blog-posts.liquid`, `blocks/_featured-blog-posts-card.liquid`, `sections/carousel.liquid` (S12 additions removed), `assets/dev1.css` (S12 block rewritten), `templates/index.json` (S12 instance; S10 stale keys removed); `assets/carousel-progress.js` unchanged.
- **Static checks:** Theme Check 9 = baseline; S12 template 6 blocks valid; S10 template valid (104 blocks); `node --check` OK; CSS braces balanced.
- **PENDING USER REVIEW:** select the Blog; Read more opens each card's own article; View all hidden with ≤3 articles and shown with 4+ (Show = automatic), opens the blog page; desktop 1480 / 1024 / 768: 3 static cards 429 wide, 268px images, no scroll, View all left of the heading with the arrow on its right pointing left; mobile 390 / 375 / 360: heading-subtitle gap 6, 280 cards from 24px, swipe to the last, progress thumb, View all centred under it.
### S04 — Collections carousel ("مجموعات SNOSHA") · Dev2 · 2026-11-08

**Figma (read with `get_design_context`, both nodes accessible):**
- Desktop `190:3830` (1480): padding 50 / 101; heading Cairo SemiBold 32/52 `#12568d`, centred; heading → carousel 40. Cards 292 wide, gap 24, start inset 72 (RTL right), 4 full cards + peek of the 5th. Image square, radius 12; image → title 18; title SemiBold 24/40 `#12568d`, inline padding 4. Card frame 368 tall (content 350). Arrows 44px circles, `rgb(255 255 255/.97)`, 1px `#dcf2fb`, shadow `0 8px 18px rgb(13 64 128/.16)`, 50px from the frame edges, top 304; chevron 22px, stroke 2 `#176BB0`.
- Mobile `190:4133` (390): padding 35 / 9; heading 24/38; gap 20 + carousel padding 8. Cards 97, gap 10, start inset 20 (≈3.5 visible). Title 11/40. No arrows. Progress bar: inline padding 20, 4px, track `#dcf2fb`, radius 999, fill gradient `#63cdff → #0f64a8` anchored at the inline start, 40% at rest.

**Native Reuse Audit**

| Candidate | Fit | Verdict |
|---|---|---|
| `collection-list` (layout `carousel`, = native "Collections carousel" preset) | `collection_list` picker (add/remove/reorder/choose), card image + title from the collection, `image_ratio` square, image `border_radius`, `collection_card_gap`, `columns_gap`, chevron/circle arrows, `@theme` text block for the heading, padding/gap settings | **Chosen** |
| `collection-links` | Text list of collection names with a hover image; not a carousel | Rejected |
| `carousel` | Generic `_card` content carousel, no collection data | Rejected |
| Repeatable `collection-card` blocks | `collection-list` doesn't render `@theme` blocks inside the carousel; would need Liquid changes (D) for no gain over the native picker | Rejected |

Category **B**: native section + on-demand `custom_class` setting. No Liquid/JS behaviour changed. The mobile progress bar is a class-scoped `::after` on the native `slideshow-component`, driven by a CSS scroll timeline (no JS). Fallback where scroll timelines aren't supported (e.g. Firefox): a static 40% fill.

**Content & media:** collections come from the native `collection_list` picker; image = the collection's own image (set in Shopify admin → Collections), title = collection title. Per media policy option 1 (resource media), no extra `image_picker` was added. Placeholders show until collections are picked.

**Theme Editor settings changed from defaults (reversibility level 3):** section `layout_type` carousel, `columns` 4, `columns_gap` 24, `icons_style` chevron, `icons_shape` circle, `gap` 40, `padding-block-start` 50, `padding-block-end` 100 (Figma 101; max setting step), `mobile_card_size` 44cqw; card `placement` below_image, alignment center, `collection_card_gap` 18; image `image_ratio` square, `border_radius` 12; title custom preset, heading font, 1.5rem, 100% width, centred, `text_color` #12568d, inline padding 4; heading `text` block custom preset, heading font, 2rem, centred, `text_color` #12568d.

**Class-scoped CSS (`assets/dev2.css`, `.sn-home-collections`):** exact type sizes/weights per breakpoint, carousel start inset (page margin + 32 desktop; 20 mobile), card widths (`clamp(220px, (100cqw − 168px)/4.5, 292px)` ≥990; `(100cqw − page margin − 48px)/3.5` tablet; `(100cqw − 50px)/3.5` mobile), 18px card bottom slack on desktop (matches the 368 frame and centres the arrows), arrow look and placement, arrows always visible on hover-capable devices with the disabled one dimmed (Figma shows both), arrows hidden ≤749, progress bar ≤989, mobile padding-bottom 9 and row-gap 28.

**Tablet (750–989, no Figma frame):** interpolated: heading 28/44, title 18/30, gap 16, 3.5 cards, progress bar shown; arrows on hover-capable devices only (Horizon clips them on touch).

**Known differences / limitations:** desktop bottom padding 100 vs Figma 101 (setting step). Mobile card renders 155px tall vs Figma frame 152 (Figma's 40px title line box overflows its frame). Progress bar's rest fill is the Figma 40%, not the real visible ratio. LTR rules (`[dir='ltr']` gradient/anchor flip) written but not visually tested (store renders Arabic only in preview).

**Architecture audit & correction (2026-11-08, Scenario B):** Native source = `sections/collection-list.liquid`, preset `t:names.collections_carousel` (en "Collection list: Carousel", ar "قائمة المجموعات: عرض دائري"; schema `presets[2]`, `layout_type` carousel; blocks: `group` "Header" > `text`, static `_collection-card` > `_collection-card-image` + `collection-title`). Audit found S04 already on the correct native type and carousel, with no custom section, Liquid copy or JS change, but configured by hand: (1) instance `"name": "مجموعات SNOSHA"` replaced the native name in the Theme Editor; (2) the heading `text` sat directly in the section instead of inside the preset's `group` "Header". Fix (in `templates/index.json` only): `"name"` → `t:names.collections_carousel`; `text_sn_heading` wrapped in new `group_sn_header` (`name` `t:names.header`, preset settings except width fill + centred column alignment); text block name → `t:names.text`. Kept: section ID `collection_list_sn_home`, block IDs `text_sn_heading` / `static-collection-card` and its children, every section/card/title setting, `custom_class`, homepage order. `collection_list` was still empty, so there was no merchant content to migrate. `dev2.css` unchanged (selectors are descendant-based and still match). Figma nodes re-read (`get_metadata`): unchanged.

**Merchant Theme Editor state adopted (2026-11-08):** the dev theme's `index.json` (pulled to scratch, then copied locally) had: 5 collections picked (`مجموعات-snosha`, `الأكسسوارات`, `منتجات-العناية-بالفم`, `باندل`, `الرؤوس-البديلة`), card image `image_ratio` **portrait (4:5)** (Figma is square, kept as a merchant choice), title `font` body, header group gap 24 / radius 12, and the disabled `product-list` section deleted. Figma differences to confirm with the merchant: image ratio.

**Title typography + mobile sizing (2026-11-08/09, `get_design_context` 190:3834 / 190:4137):** Figma title = Cairo SemiBold 24/40 desktop, 11/40 mobile, centred, inline padding 4, image→title 18; images 292×292 desktop, 97×97 mobile (card 97, gap 10). Desktop already rendered 24/40/600. Mobile wrapped badly because long names (e.g. "فرشاة الأسنان الكهربائية", ≈115px at 11px) exceed the 89px text width, and the 40px line-height put 40px between wrapped lines. Changes: desktop size now follows the native `collection-title` `font_size` (1.5rem = 24px) instead of a hardcoded 24px; tablet = 75% of it; mobile title box `min-block-size: 40px` (flex-centred) with `line-height: 1.5`, so one line = Figma's 40px box and two lines fit inside it (no nowrap or ellipsis). New `collection-list` settings (category B, `CLASS_PLUS_SETTINGS`; CSS vars are only output when `custom_class` is set): `mobile_image_size` range 80–180 px, step 1, default 97 (Figma), visible for the carousel layout, sets `--sn-mobile-image-size`, which drives the ≤749 `--slide-width` (slide, not image, so gaps, snapping and the progress bar follow; the image keeps its ratio); `mobile_title_size` range 10–20 px, step 1, default 11 (Figma), sets `--sn-mobile-title-size`. Native `mobile_card_size` (60/44cqw, min 150px) can't reach 97px, so it was not reused.

**Recovery (2026-11-09):** At 2026-11-08 17:37:18.78, 12 s after commit `894eb4e` ("start section 2"), an external operation rewrote the working tree to the pre-S04 commit `f137c9b`: `dev2.css` and `custom-class.liquid` deleted; `theme.liquid`, `collection-list.liquid` and `index.json` reverted (5 more files were rewritten with line-ending changes only). There was no git reset, checkout or commit (reflog shows only the commit), so the cause is outside git and unidentified. The running `theme dev` then mirrored the rollback to dev theme #190250942577. Recovery: verified no newer content in any affected file (all identical to `f137c9b`, and the remote also equalled `f137c9b`), then `git restore --source=894eb4e` on exactly those 5 files, then `shopify theme push --theme 190250942577 --only` those 5 files (verified by pulling them back). The 3 `dev2.css` edits from 17:37:14–16 postdated the commit and were re-applied by hand. Section ID, preset name, heading, 5 collections and custom class are back. No history rewritten; untracked `.agents/` and `AGENTS.md` (new, not ours) left untouched.

**Responsive refinement (2026-11-09): heading sizes, mobile image ratio, mobile title length.** Figma re-read for both nodes. Desktop `190:3830`: H2 Cairo SemiBold 32/52, cards 292 wide with square (500/500) images, titles 24/40, full names. Mobile `190:4133`: H2 24/38, cards 97 wide with square images (97×97), titles 11px; the Figma render shows long names cut to their first two words. Desktop and mobile values were compared one by one (Skill rule 14).
- **Heading:** desktop (≥750) size now comes from the native heading `text` block's **Font size** (2rem = 32px). The hardcoded 32px desktop and 28px tablet values were removed from `dev2.css`, which only keeps weight 600 and line-height ratio 1.625 (52/32). New section setting `mobile_heading_size` (16–40 px, default 24) applies at ≤749 (line-height ratio 38/24). A section-level setting was chosen over a new `text`-block setting because `text` is used across the whole theme and rendered by a shared snippet with 8 callers. The new setting sits next to the other S04 phone settings and is opt-in through the class. The 32px mobile heading in the merchant's 2026-11-09 screenshot could not be reproduced on dev theme #190250942577: before this change it already measured 24px at 390. It was probably taken from another theme or copy.
- **Mobile image ratio:** new section setting `mobile_image_ratio` with Horizon's own ratio set: `desktop` (default, "Same as desktop" = native `--ratio`), `square` 1/1, `portrait` 4/5, `landscape` 16/9, `adapt` (auto = the image's own ratio). It is output as `--sn-mobile-image-ratio` only when the class is set. `dev2.css` ≤749 sets `aspect-ratio: var(--sn-mobile-image-ratio, var(--ratio))` + `block-size: auto` on `.collection-card__image` and its image (the same elements and property Horizon uses), with native `object-fit: cover`. The desktop ratio stays on the `_collection-card-image` block (merchant: portrait). The width still comes from `mobile_image_size` (default 97). Horizon has no 3:4 or 4:3 option, so none was added.
- **Mobile title length:** new section setting `mobile_title_word_limit` (`full` default / `two`). `blocks/collection-title.liquid` (native block, no schema change) splits the title in Liquid (`split: ' '` collapses repeated spaces) only when the setting is `two`, the class is set and the name has more than two words. It then outputs `<span class="sn-collection-title__full">full</span><span class="sn-collection-title__short" aria-hidden="true" hidden>first two</span>`. `dev2.css` ≤749 shows the short copy and visually hides the full name, so screen readers read the full name once. Desktop and the class-off state show only the full name. The card link keeps its native visually hidden full title and the collection URL. No shared snippet (`text`, `resource-image`) was changed. Collection data untouched.
- **Figma values set on the S04 instance:** `mobile_heading_size` 24, `mobile_image_size` 97, `mobile_image_ratio` square, `mobile_title_size` 11, `mobile_title_word_limit` two. The desktop image ratio stays portrait (merchant choice; Figma is square).
- **Files changed:** `sections/collection-list.liquid` (3 settings + 3 schema headers, CSS vars), `blocks/collection-title.liquid`, `assets/dev2.css`, `templates/index.json`.

**Four independent font sizes (2026-11-09, revised the same day: mobile controls moved into the blocks).**

| Element | Desktop (≥750) | Mobile (≤749) |
|---|---|---|
| Heading | Native `text` block "Size" (`font_size`, 2rem = 32px) | Same block, new "Mobile size" right below it: `mobile_font_size` (12–64 px, step 1, default 24) |
| Collection title | Native `collection-title` "Size" (`font_size`, 1.5rem = 24px) | Same block, new "Mobile size" right below it: `mobile_font_size` (10–32 px, step 1, default 11) |

- **Blocks extended (category B + small D):** `blocks/text.liquid` and `blocks/collection-title.liquid` each get one `range` after `font_size`. `visible_if` = `type_preset == 'custom'` (same as the native Size; the section condition was dropped, see below). Each block outputs `{% style %} .text-block--<block.id> { --sn-mobile-font-size: Npx } {% endstyle %}` only under the same condition. Native output is unchanged everywhere else. The shared `text` snippet is not touched.
- **Removed duplicates:** the section-level `mobile_heading_size` and `mobile_title_size` (and the `--sn-mobile-heading-size` / `--sn-mobile-title-size` vars) were removed from `collection-list` and from `index.json`. The "Mobile heading" schema header was removed.
- **Values in `index.json`:** `text_sn_heading.mobile_font_size` 24, `collection-title.mobile_font_size` 11.
- **CSS isolation (`dev2.css`, scoped to `.sn-home-collections`):** at ≤749, heading and title use `var(--sn-mobile-font-size, 24px / 11px)`, set on each block's own element, so the two can't affect each other. Desktop uses only the native `--font-size` from "Size". Tablet titles are 75% of the desktop size. Title line height is the Figma ratio `calc(40 / 24)`, not a fixed px value. Without the class, no rule reads the var, so the look is native.
- **Likely cause of "desktop affects mobile" (not verified):** dev theme #190250942577 has another session's `theme.liquid`, which loads `dev1.css` but not `dev2.css`, and without `dev2.css` the native desktop size shows on phones. The branch theme Snosha/dev2 only gets what's committed and pushed.
- **Checks:** Theme Check 9 = baseline (no `visible_if` offense); all three schemas parse; no leftover references to the removed settings. `index.json` was edited locally without pulling the remote first (pull is not allowed under rule 13).
- **Theme Editor checks — `PENDING USER REVIEW` (hard rule 13):**
  - two values per setting
  - 390/1480
  - heading vs title independence
  - same size on every card
  - RTL, scrolling, progress bar
  - class on/off
  - (resolved 2026-11-09: `section.settings` removed from the block `visible_if`, since theme blocks are not tied to one section; "Mobile size" now shows whenever the preset is Custom. The CSS var is still output only when the section has a custom class, so other sections stay native.)

### S08 — Before / After ("روتينك اليومي ممكن يغير شكل ابتسامتك.") · Dev2 · 2026-11-11

**Figma (read with `get_design_context`, both nodes accessible):**

| Property | Desktop `190:3903` (1480) | Mobile `190:4222` (390) |
|---|---|---|
| Section padding | 60 / 60 | 56 / 40 |
| Content area / gutters | max 1376 + inline padding 20 (items overflow; measured: image starts at x 50) | 24 |
| Layout | row: content right (RTL), image left, gap 27, vertically centred | column: image first, gap 20 |
| Comparison image | 774 × 535 (height 69% of width), radius 18 | 342 × 248.38 (72.6%), radius 24 |
| Divider / handle | 3px white line · white pill 34×58, radius 17, three 2×16 grips `#131311d9`, Shadow/Soft | same line · pill 29×48 |
| Labels | "قبل" right, "بعد" left · 13/18 SemiBold `#12568d`, white chip, padding 6/16, radius 10, inset 16, Shadow/Soft | 12/18, chip 45×21, radius 20, top 12 |
| Content column | width 557, gap 20 | gap 14 |
| Heading | 32/52 SemiBold `#12568d` | 24/38 |
| Description | 18/32 Regular `#5a5a59` | 18/32 |
| Benefits | gap 14, padding-top 6, bottom 8 · row gap 12 · text gap 2 · title 16/27 SemiBold `#131311` · text 14/24 `#5a5a59` | same |
| Icon tile | 40×40, radius 13, border 1 `#dcf2fb`, gradient white → `#f0fafe`, icon 22, stroke `#176bb0` (tooth, sparkle, timer, heart) | same |
| CTA | "اكتشف SNOSHA N2", white, border 1.5 `#60c1e1`, radius 12, padding 13/28, 16/26 SemiBold `#176bb0`, aligned right | same, aligned right |

**Native Reuse Audit:** inspected `section` (and its presets), `media-with-content`, block `comparison-slider` + `assets/comparison-slider.js`, `group`, `text`, `icon`, `button`, `snippets/section.liquid`, `snippets/group.liquid`, `snippets/button.liquid`.
- Horizon 4.4 has no `comparison-slider` *section*; it's a theme block. The native `section` section has the preset **`t:names.image_compare`** ("Image compare": a content group plus a `comparison-slider`). Chosen: same type, same preset name, same block hierarchy (content `group` + slider).
- `media-with-content` rejected: its media is the static `_media-without-appearance` (image/video only), so it can't hold the slider.
- Category **B/D**: schema extensions on `section`, `comparison-slider`, `text`, `group` and `button`, plus one opt-in class render in the shared `snippets/section.liquid` (callers `section` and `_blocks`; `_blocks` has no `custom_class`, so its output is unchanged). No new section, block, JS or library.

**Decisions:**
- Class `sn-home-before-after` (collision check: none). CSS is in `assets/dev2.css`, all selectors under the class.
- **Composition (Theme Editor):** section (row, space-between, gap 27) contains:
  - `group` "Content" (custom width 41%) with: heading `text`, description `text`, `group` "Benefits", and `button`.
    - "Benefits" holds 4× `group` "Benefit" (row). Each has `group` "Icon tile" → `icon`, and `group` "Text" → title `text` + description `text`.
  - `comparison-slider` (custom width 56%).
  - Benefits are group blocks, so they can be added, removed and reordered.
- **RTL slider fix:** the native range input follows the page direction (its value grows right → left), but the handle, divider and clipping are positioned from the left, so in RTL the handle moved opposite to the drag.
  - Under the class, in RTL, the visuals are mirrored: `left: (100 − compare)%` and the clip-paths are swapped.
  - The handle now follows pointer, touch and keyboard, and image 1 sits on the inline-start side under its "قبل" label (as in Figma).
  - The native JS was not changed.
- **Image alignment:** both images stay in the same grid cell and frame (`object-fit: cover`, same aspect ratio). Only `clip-path` changes, so nothing shifts or re-crops while dragging.
- **Settings added.** All are opt-in. Their CSS vars are output only when the section has a custom class, unless marked "works everywhere".
  - `section` (28 → 36 settings):
    - `padding-inline-start/end`: native spacing pattern, default 0, works everywhere.
    - Header "Mobile layout": `padding-block-start-mobile`, `padding-block-end-mobile`, `padding-inline-mobile`, `gap_mobile`, `mobile_reverse_order`.
    - Header "Advanced": `custom_class`.
  - `comparison-slider` (30 → **40**, the Theme Check limit):
    - `before_image_mobile`, `after_image_mobile`: optional, `<picture>` falls back to the desktop image, works everywhere.
    - `image_ratio` option "Custom" + `custom_ratio` (works everywhere) and `custom_ratio_mobile`.
    - `border_radius_mobile`.
    - Labels: `text_size`, `text_size_mobile`, `text_padding_block`, `text_padding_block_mobile`, `text_padding_inline`.
  - `text` (20 → 22): `font_weight` (default = theme weight) and `line_height_exact` (% of size). The existing `mobile_font_size` is reused.
  - `group` (36 → 37): `gap_mobile`.
  - `button` (12 → 18): header "Button shape" with `font_size`, `font_weight`, `border_width` (step 0.5), `border_radius`, `padding_block`, `padding_inline`.
- **Native settings reused:**
  - section: direction, alignment, gap, padding, width.
  - group: gap, width, padding, border, radius, background, gradient overlay (gives the icon tile gradient).
  - text: Size, colour, alignment.
  - icon: `heart`, `stopwatch`, `star`, `width` 22, colour `#176bb0`.
  - button: label, link, `button-custom` colours.
  - slider: labels, colours, radius, handle colours.
- **Fixed in CSS (exceptions, each commented):**
  - handle pill size and grips, 3px divider, Shadow/Soft.
  - label weight 600, label line box 18px, label inset 16 (12 from the top on mobile).
  - The slider block is at 40/40 settings, so no more label controls fit.
- **Template:**
  - `before_after_sn_home` was appended to `templates/index.json` after S04. S05–S07 aren't on the page yet; move it when they are added.
  - Images are empty: the merchant uploads them, and the editor shows placeholders until then.
  - The CTA link is empty: the merchant picks it.
  - Benefit 1 icon = none: Horizon has no tooth icon, so upload one through the icon block's image setting. Sparkle = native `star` (closest match).
- **Known deviations:**
  - Figma's CTA is right-aligned on mobile. The task text said centred; Figma was followed.
  - Mobile heading line height is 1.63 × 24 = 39 vs Figma 38, because one ratio covers both devices.
  - Mobile label chip is about 50×22 vs Figma 45×21.
  - (Resolved 2026-11-11: row capped at 1360, so content is 558 vs 557.)
  - Tablet (750–989) keeps the desktop row at 56/41%. There is no Figma frame for it, and the content column is narrow there.
- **Desktop refinement (2026-11-11), after user feedback "image too large, heading/CTA not aligned with the image":**
  - **Figma re-read** (`get_metadata` 190:3903): row 1358 = image 774×535 + gap 27 + content 557×552. Figma centres both columns, so **in Figma itself** the heading starts 8.5px above the image and the CTA ends 8.5px below it.
  - **Cause of the oversized image:** the row had no maximum width. It followed Horizon's 1920px "normal" page width, so the 56% image grew with the screen: about 773 wide at 1480, about 1020×704 at 1920.
  - **Fix: width.**
    - New section setting `content_max_width` (800–1800 px, step 10, default 1360; var only with the class) caps the row and centres it.
    - Section side padding 10 → 0.
    - Slider width 56% → 57%; content stays 41%.
    - Result at ≥1440: image 775×535 (Figma 774×535), content 558 (Figma 557), gap 27.
  - **Fix: alignment.**
    - Content group set to native Height "Fill" + Vertical alignment "Space between".
    - `dev2.css` (≥750, under the class) lets a Height-Fill group stretch to the row height. That native setting drives it, so there are no offsets, no transforms and no absolute positioning.
    - Heading top = image top, CTA bottom = image bottom whenever the content is no taller than the image.
    - To fit Figma's 552px of content into the 535px image, the content gap is **14** (Figma 20). Set it back to 20 to restore Figma's exact gaps; the column is then 8.5px taller on each side, as in Figma.
  - **Narrower widths** (1200, tablet): the text is taller than the image. The row grows, nothing is clipped, and the image stays centred at its ratio.
  - **Mobile unchanged:** stacked, mobile gap 14, the stretch rule is desktop-only.
  - **Files:** `sections/section.liquid` (setting + var), `assets/dev2.css`, `templates/index.json` (S08 values only; the merchant's images were kept).
  - **Theme Check:** 9 = baseline.
  - **Visual QA:** PENDING USER REVIEW (rule 13).
- **Mobile text wrapping (2026-11-11):**
  - **Symptom (user, 390px):**
    - Heading broke as "…ممكن يغير / شكل ابتسامتك." instead of Figma's "…ممكن يغير شكل / ابتسامتك.".
    - The description's last line held "وأكثر انتعاشًا." instead of only "انتعاشًا.".
  - **Root cause (confirmed in code):**
    - Both S08 text blocks had the native **Text wrap = Pretty**.
    - `snippets/typography-style.liquid` outputs `--text-wrap: pretty`.
    - `base.css` `.custom-typography > *` applies `text-wrap: pretty` to the `<h2>`/`<p>`.
    - `pretty` deliberately pulls a word down so the last line isn't a single word. That is exactly the "شكل" / "وأكثر" move.
    - Figma breaks lines greedily.
    - The block is `text-block--full-width` (width 100%, max width none), so no other native wrap rule applies.
    - The native select offered only Pretty / Balance / None, so no setting could reproduce Figma.
  - **Ruled out (from code + Figma, not a browser):**
    - **Width:** 390 − 2×16 page margin − 2×8 section "Mobile side padding" = 342, the same as the Figma text nodes 190:4225 / 190:4226 (342 wide). Content group mobile width Fill; text width 100%, max width none.
    - **Typography:** Cairo Custom; 24/600 and 18/400; letter spacing normal; case none. Line height 163% (39.1 vs Figma 38) and 178% (32.04) don't affect breaks.
    - **Text:** identical, except Figma has "الوقت ، لابتسامة" (a space before the comma). Ours has no space, which makes that line shorter, so it is not the cause. Kept as merchant content.
  - **Fix (category B, native-first):**
    - `blocks/text.liquid` "Text wrap" select gains an option **Normal** (`wrap`, label `t:options.normal`). The default stays Pretty, so other text blocks are unchanged.
    - `templates/index.json`: S08 heading + description wrap pretty → wrap.
    - No CSS, no `<br>`, no nbsp, no font-size change. The merchant can switch it back in the Theme Editor.
  - **Desktop:** greedy wrapping never produces more lines than `pretty`, so the heading (1 line) and description (3 lines) can't grow. Image/CTA alignment is unaffected.
  - **Theme Check:** 9 = baseline.
  - **Browser-computed values and visual QA (375/390/430/820/1480):** NOT measured. Rule 13 forbids preview/DevTools. PENDING USER REVIEW.
- **Desktop description wrapping (2026-11-11), investigation only, no code change:**
  - **Report:** at 1480, "انتعاشًا." shares the last line with earlier words. In Figma it is alone.
  - **Figma 190:3907:**
    - Box 557×96: 3 lines, Cairo Regular 400, 18/32, letter spacing 0, right-aligned.
    - Lines: "…بقايا الطعام" / "والتصبغات … تبدو أنظف وأكثر" / "انتعاشًا.".
    - Parent 190:3905 is 557 wide with no padding; row 1376 (image 774 + gap 27 + content 557).
  - **Code values at 1480 (computed from code, not measured in a browser):**
    - Row 1360 (`content_max_width`, section side padding 0). Content group 41% = **557.6**; image 57% + gap 27, so nothing shrinks.
    - Group padding 0; description width 100%, max width none, padding 0.
    - 1.125rem = **18px** (no root font-size change); weight 400; letter spacing 0em.
    - Font "Cairo Custom" (`cairo-variable.woff2`).
    - `text-wrap: wrap` from the Normal option (desktop and mobile; the setting has no breakpoint). The description is `text-block--full-width`, so the native `.paragraph`/`.rte` pretty/balance rules don't apply. No dev2/main CSS touches text-wrap or spacing.
  - **Text:** same as Figma except Figma's "الوقت ، لابتسامة" (space before the comma). That makes Figma's line 2 longer, not ours, so it can't push "وأكثر" down. Content not changed.
  - **Conclusion:** width, padding, size, weight, spacing and wrap mode all match Figma in code. That leaves two possible causes, and only a browser can tell them apart:
    - (a) The preview showed a version from before the Normal wrap option, i.e. still `pretty`.
    - (b) The browser renders Cairo's variable font slightly wider than Figma, so line 2 overflows 557.6 and "وأكثر" drops.
  - **Not confirmed:** no preview/DevTools (rule 13), and no offline font-shaping tool available. No fix applied, to avoid a fragile width tweak.
  - **Next step:** the user runs the console check in the S08 report. If it shows `pretty`, sync. If it shows `wrap` + 557.6 + Cairo, the cause is (b); decide then whether a ~1% content-width change in the Theme Editor is acceptable (it shifts image/text proportions).
  - **Mobile fix intact. Theme Check:** 9 = baseline.
  - **Follow-up (2026-11-11):** the user reports the desktop break is still wrong after the Normal wrap change. The user declined a browser exception (rule 13 kept), so the cause is still unconfirmed and no layout edit was made. Waiting for the console check results (computed text-wrap, width, font, line count).
- **Desktop wrapping, screenshot analysis (2026-11-11):**
  - **Evidence:** the user's Shopify screenshot (1900 px, Windows 125% scaling; CTA 242 device px = 194 CSS) and Figma's screenshot (0.639×; CTA 124 px), measured pixel by pixel with an offline PNG script. No browser was opened (rule 13 kept).
  - **Converted to CSS px:**

    | | Figma | Shopify |
    |---|---|---|
    | Heading | 551 | 551 |
    | Description line 1 | 487 | 488 |

    The row cap (1360), the column (~557) and the Cairo metrics render the same as Figma.
  - **Benefit 2 ("إشراقًا." not alone):**
    - **Cause:** all 8 benefit text blocks still had native Text wrap **Pretty**; the earlier fix only covered the heading and description.
    - Figma line 1 including "أكثر" = 474 px. The text width is ~505, so greedy wrapping keeps it on line 1; Pretty moved it down.
    - **Fix:** the 8 benefit titles and descriptions set to Normal (`wrap`).
  - **Description ("انتعاشًا." not alone):**
    - **Cause:** a content difference. Figma's text is "الوقت ، لابتسامة" (space before the comma); ours had "الوقت، لابتسامة".
    - Shopify line 2 with "انتعاشًا." = 554 px, under the 557.6 column. Figma's extra space (~5 px) makes the same line overflow 557.
    - My earlier note ("the space can't be the cause") was wrong: the longer Figma line is exactly what pushes the word down.
    - **Fix (user approved):** the description text now matches Figma, with the space. Margin is small (~1–5 px), so wrapping can flip with tiny width changes.
  - **Files:** `templates/index.json` (S08 only: 8 wrap values + 1 description text).
  - **Theme Check:** 9 = baseline.
  - **Visual result at 1480 / 390:** PENDING USER REVIEW (needs a new screenshot).
- **Checks:** Theme Check 9 = baseline. All five schemas parse. `index.json` parses, and only the S08 section and its order entry were added (S04 untouched).
- **PENDING USER REVIEW:**
  - visual QA at 1480, 1200, 820, 390 and 375, plus RTL.
  - slider drag, touch and keyboard with two real images; empty-image placeholders; label positions.
  - every new control with two values; class on/off.
  - `index.json` was edited without a pull (rule 13).

### S11 — Bundle ("باقات العناية المناسبة لروتينك") · Dev2 · 2026-11-11
> **Superseded 2026-11-11:** the `product-hotspots` "Bundle layout" approach below is history only. Native files were restored to HEAD; see "Rebuild (category E)" at the end of this entry.
- **Figma:**
  - Desktop `190:3987`: container 1376, inner padding 20, image 640×481.7 (744/560), gap 56, content 640.
    - Rows: 92 tall = 64 thumbnail + 14 padding, gap 16, `#dcf2fb` bottom border.
    - Text: title/price 16/27 600 `#12568d`, subtitle 12/20 `#5a5a59`.
    - Total: pt 16, gap 34; badge 12/18 600 `#176bb0` on `#f0fafe`; old price 14/22 struck through.
    - Button: `#176bb0`, 13/28 padding, radius 12, 16/26.
    - Content gap 18.
  - Mobile `190:4318`: image 342×257 at 24px gutters, gap 20, content gap 14, H2 24/38, body 15/26.
    - Hotspot: 32px white disc, 1.5px `#60c1e1` ring, 10px dot, soft shadow.
- **Native reuse audit:**
  - `product-hotspots` + `_hotspot-product`: image + product-picker markers + popup (`product-hotspot.js`).
  - The cart drawer renders Shopify Bundles lines (`cart-items__bundle`).
  - Ruled out: `media-with-content` / `section` (no product picker per row, no hotspots over an image) and `featured-product` (one product).
  - No native bundle or add-all button exists.
- **Decision:** category **D**. Native `product-hotspots` keeps its name and preset. One opt-in setting, **Bundle layout** (default off = native), adds:
  - The two-column layout and the static text blocks `bundle_heading` and `bundle_description`.
  - Product rows, the total and the button (`snippets/sn-bundle-panel.liquid`), plus `assets/sn-bundle.js`, loaded by the section only in bundle mode, with no importmap change.
  - Each hotspot block's product picker is the single source for its marker, row, popup and cart line.
- **User decisions (2026-11-11):**
  - **Cart:** separate cart lines plus an automatic discount set up in Admin; no Shopify Bundles app.
  - **Mobile:** tap opens the small popup (not native quick-add).
- **Checkboxes:** removed, per the merchant. Every configured product is in the bundle.
- **Section settings added** (15 → 40/40):
  - Toggle and media: `bundle_layout`, `image_mobile`.
  - Layout: `media_width` (50), `column_gap` (56), `content_max_width` (1340; step 10, Figma 1336).
  - Mobile: `mobile_padding_top` (56), `mobile_padding_bottom` (40), `mobile_padding_inline` (8), `mobile_gap` (20).
  - Rows: `thumb_size` (64), `row_padding` (14), `title_size` (16), `subtitle_size` (12), `accent_color`, `border_color`.
  - Total: `total_label`, `discount_enabled`, `discount_percent`, `discount_badge` ("[percent]" token).
  - Button and markers: `button_label`, `button_color`, `button_radius`, `hotspot_size` (32), `unavailable_text`.
  - `custom_class`.
- **Hotspot block settings added:** `subtitle`, `quantity` (1–10), `show_hotspot`, `mobile_position`, `x-position-mobile`, `y-position-mobile`.
- **Commerce:**
  - **Prices:** row = variant price × quantity; total = sum (`money` filter).
  - **Discount:** shown only when "Show bundle discount" is ticked; then now = total × (100 − %) / 100. Default is **off**, so the page never shows a discount checkout won't honour.
  - **Button:** one `/cart/add.js` request with `items[]` (all-or-nothing; Shopify rejects the whole request if any item fails). Each line carries the hidden property `_bundle: <section id>`. Then the native `CartLinesUpdateEvent` fires, so the drawer, its auto-open setting and the count refresh.
  - **Unavailable products:** a sold-out or short stock (tracked + deny) variant disables the button and shows `unavailable_text`.
  - **Inventory:** Shopify deducts it at order time. The theme never touches inventory.
- **JS change to a native file:** `assets/product-hotspot.js` `handleHotspotClick`. Only markers with `data-popup-on-touch` (bundle mode) open the popup on touch; a second tap closes it. All other hotspots are unchanged.
- **Popup:** the native dialog. In bundle mode quick-add is removed (no single-item add) and a close button is added.
- **CSS:**
  - Structure, scoped to `.section-product-hotspots--bundle`, in the section stylesheet.
  - Figma look in `assets/dev2.css` under `.sn-home-bundle`, with literals commented: content gap 18/14, thumbnail radius 8, badge/button paddings, `#5a5a59` secondary text.
  - Hotspot: in this class, the native "Hotspot color" is the **ring** and "Bullseye color" the dot (on a white disc).
- **Template:** `bundle_sn_home` after S08 with the Figma texts and 3 hotspot blocks without products. Positions from Figma: 78/68, 51/54, 23/65 %. Discount off; no image.
- **Variant:** the first available variant of each product (no variant picker per product).
- **Limitations:**
  - **Cart grouping:** lines are separate and grouped only by the hidden `_bundle` property. Visible grouping needs a cart template change (shared, needs approval). It is not a native Shopify bundle line.
  - **Discount scope:** a Shopify automatic discount isn't limited to "this exact bundle". The merchant should use "Amount off products" on these products with a minimum quantity; buying them separately can also qualify.
  - **Rounding:** Shopify rounds per line, so the shown discounted total can differ by a few piastres.
  - **Settings:** at 40/40 the content gaps (18/14) and badge/button paddings are fixed CSS.
- **Correction (2026-11-11, "bundle product + component rows"):**
  - **Audit of the first version:**
    - **Base:** native `product-hotspots` with Bundle layout on, uncommitted locally.
    - **Why it looked like a plain hotspot image:**
      - There was no parent "Bundle product" picker.
      - The component pickers live inside the "Hotspot product" blocks, which wasn't obvious in the editor.
      - Rows render only for picked products, so with 3 empty blocks the list, total and button were all hidden. No fake data was shown.
      - The schema had no unconnected settings.
  - **Fixes:**
    - **Bundle product:** new section setting `bundle_product` (type `product`; resource settings can't use `visible_if`).
    - **Purchase model**, set only by that setting (never mixed):
      - **A** (picked): the button adds the bundle product's variant only. Price = its real price. Old price = its compare-at, else the components' total when higher. Badge % = saving rounded down. The admin discount settings are hidden.
      - **B** (empty): adds all component variants × quantity, as before. A discount is shown only when the merchant confirms an admin automatic discount.
    - **Component source:** the Hotspot product blocks, picked explicitly. Liquid can't list a Shopify bundle's components; only the Storefront API's `ProductVariant.components` can, and that needs a token.
    - **Editor-only help:** a note naming the active purchase model and where to pick products, plus one placeholder row per empty block ("Product N — pick a product…"). Customers never see these.
    - **Storefront without an image:** the image column and its markers are not output, so no markers sit over a placeholder.
    - **`unavailable_text` removed** (40/40 budget): uses Horizon's translations `content.product_badge_sold_out` / `content.unavailable`.
  - **Risk:**
    - **Model A:** the merchant must list the same products as the bundle's real components; the theme can't verify they match.
    - **Variants:** the first available variant only.
- **Checks:** Theme Check 9 = baseline. JS `node --check` OK. Schemas parse. `index.json` diff is additions only.
- **Visual, Theme Editor and commerce QA:** PENDING USER REVIEW (rule 13; no browser, no test purchases).

- **Rebuild (category E), 2026-11-11, merchant-approved:**
  - **Why:** the merchant never got a clear bundle setup from the native hotspots section. The product pickers were hidden inside "Hotspot product" blocks, the image was a placeholder, and the list stayed empty. They asked for a dedicated bundle section.
  - **Native files restored to HEAD:** `sections/product-hotspots.liquid`, `blocks/_hotspot-product.liquid`, `assets/product-hotspot.js`. `snippets/sn-bundle-panel.liquid` removed.
  - **New section** `sections/sn-product-bundle.liquid` ("Product bundle"; 39 settings + custom class). It reuses:
    - Horizon's page-width grid and `image` snippet (image focal point = crop position).
    - `anchored-popover-component` (native popover: top layer, light dismiss, Escape, click/tap), already loaded globally.
    - `assets/sn-bundle.js` (Horizon's `CartLinesUpdateEvent` refreshes the drawer and count).
    - Horizon translations.
  - **Bundle product** (`bundle_product`): the purchase entity, model A only.
    - The button adds its first available variant × 1.
    - Price = that variant's price.
    - Old price = its compare-at, else the items' total when higher; badge % = real saving rounded down (`show_discount`, `discount_badge`).
    - No bundle product = no price and no button. Components are never added separately, and there is no visual-only discount.
  - **Bundle item blocks** (`component`, max 12): `product`, `quantity`, `subtitle`, `image` override, `show_hotspot`, `x_position`/`y_position`, `x_position_mobile`/`y_position_mobile`. One block drives its row (with `shopify_attributes`, so clicking it selects the block), its hotspot and its popup (image, title, price, link, close).
  - **Image:** `image` → else the bundle product's featured image; `image_mobile` optional; heights `image_ratio`/`image_ratio_mobile` (75% = Figma 744:560 and 342:257); `image_radius`. The storefront shows no image column when there is no image; the editor shows a placeholder.
  - **Editor-only:** a note (the active bundle product, or what to pick) and placeholder rows for empty blocks.
  - **Template:** `bundle_sn_home` was replaced in place (same key and order position; it had no merchant data). It has 3 empty items with Figma hotspot positions; there are no other `product-hotspots` instances.
  - **CSS:** structure in the section stylesheet; Figma look in `assets/dev2.css` under `.sn-home-bundle` (the old S11 CSS was removed).
  - **Limits:**
    - Liquid can't read a Shopify bundle's real components (Storefront API `ProductVariant.components` only), so the theme can't verify the item blocks match the bundle; the editor note reminds the merchant.
    - First available variant only.
    - The cart shows one bundle line, with components shown by Horizon only if it is a real Shopify Bundles product.
  - **Checks:** Theme Check 9 = baseline; `node --check` OK; `dev2.css` braces balanced; S08 CSS unchanged.
  - **QA:** visual, editor and add-to-cart PENDING USER REVIEW.
- **Fix: sold out / 100% / hotspots (2026-11-11):**
  - **Data limit:** the product picks were made in the online editor; local `index.json` has none, and rule 13 bars `theme pull`. The connected Shopify MCP store is "Peace Lily Australia", not SNOSHA, so it was not queried. The real product values are unverified.
  - **"نفد المخزون":** the button and message depend only on the bundle variant's `available`, never on the items. So Shopify itself reports the picked bundle variant as unavailable. Possible causes (unconfirmed): no stock with "stop selling", not Active / not published to Online Store, or Shopify Bundles components out of stock. Not a code bug; nothing was hidden or forced.
  - **100% / LE 0.00:**
    - **Data:** the bundle variant's price is 0 in Shopify.
    - **Code bug:** I compared the items' total (7,497) against that 0 and showed a 100% saving.
    - **Fix:** a saving or badge is shown only when 0 < bundle price < comparison price. A 0-priced variant that is also unavailable gets no price at all (treated as not set up yet). A 0-priced variant that is available shows its real 0 price, with no discount.
  - **Editor diagnostic:** the note now shows the variant, price, compare-at, availability and inventory (tracked/quantity/policy), plus the likely cause in plain words. Customers never see it.
  - **Hotspot geometry, from Figma:**
    - Both frames draw the bundle photo at 113.09% width, offset −9.47% (photo ratio ≈ 1.5025 vs frame 744:560).
    - Marker centres, % of the frame: desktop 22.31/64.29, 50.54/53.57, 77.42/67.86; mobile 24.86/67.70, 52.93/57.20, 79.83/71.20.
    - Markers: desktop 27.5px, mobile 32px; 1.5px `#60c1e1` ring; white; 10px `#176bb0` dot; Shadow/Soft.
  - **Old implementation:** eyeballed frame-% coordinates (78/68, 51/54, 23/65) on a centre-cropped image, a 32px marker everywhere, and a dot scaled with the marker.
  - **New coordinate system:** X/Y are % of the uploaded picture. The section maps them through the frame's cover crop (k = picture/frame overflow factor, p = image focal point): left = k·x − (k−1)·p, separately for desktop and mobile (each image keeps its own focal point; two `<img>` when a mobile image is set).
    - Figma converted to picture %: desktop 77/68, 53/54, 28/64; mobile 79/71, 55/57, 30/68 (blocks 1–3, rounded to the 1% step).
    - Setting the image focal point to x ≈ 72% reproduces Figma's exact crop; the markers stay on the products either way.
  - **Defaults:** `hotspot_size` 32 → 28 (phones use at least 32); `image_radius` 0 → 16 (Figma desktop; mobile Figma 7.4 is not separate, no setting left). The dot is a fixed 10px.
  - **Files:** `sections/sn-product-bundle.liquid`, `assets/dev2.css`, `templates/index.json` (S11 positions and defaults only).
  - **Theme Check:** 9 = baseline.
  - **QA:** browser and editor QA PENDING USER REVIEW.
  - **Warning:** pushing local `index.json` would overwrite the online editor's product picks. Pull or re-apply first.
- **Mobile description typography (2026-11-11):**
  - **Figma 190:4329:** Cairo Regular 15/26, right-aligned, 342 wide; 14px gap below the 24/38 heading (190:4328). Desktop 190:3997 is 18/32.
  - **Code before the change** (from code and settings; no browser):
    - 15px (`description_size_mobile` = 15), line height 1.733 × 15 = 26px, weight 400, inherited Cairo Custom.
    - Width 390 − 2×16 − 2×8 = 342; gap 14 (`content_gap_mobile`).
    - No text-wrap, letter-spacing or word-spacing rule applies; Horizon's base paragraph rule only targets `body`/`.paragraph`.
  - **Result:** no code-level mismatch found. The "too small" report is unconfirmed; it needs a screenshot.
  - **Change:**
    - New settings `description_line_height` (32) and `description_line_height_mobile` (26), in px, read by `dev2.css` instead of fixed ratios.
    - `show_discount` removed (settings cap): an empty `discount_badge` now hides the old price and badge.
    - Values are unchanged, so rendering is the same as before.
  - **Theme Check:** 9 = baseline (40/40 settings).
  - **QA:** PENDING USER REVIEW.

### S13 — Why SNOSHA ("لماذا SNOSHA؟") · Dev2 · 2026-11-12
- **Figma:**
  - Desktop `190:4024`: padding 60/60, container 1376, inner padding 20.
    - Heading 32/52 600 `#12568d` + subtitle 18/32 `#5a5a59`, centered, gap 6. Heading → grid 26.
    - Grid: 4 × 310, gap 32.
    - Item: tile 96, radius 26, border 1 `#dcf2fb`, gradient white → `#f0fafe` (downward), drop shadow 0 10 11 rgb(15 100 168 / 0.08), inner highlight 0 2 2 white 0.9. Art 64. Tile → text 14; title 18/30 600 `#12568d`; description 13/22 `#5a5a59`; title → description 6.
  - Mobile `190:4361`: padding 60/48, gutters 24; heading 24/38; subtitle 13/22 **right-aligned**; heading → grid 18; 2 × 2 grid of 165, gaps 12; items as desktop.
  - The two sparkles sit outside the heading frame and don't show in Figma's render (on mobile at x 777, off-frame), so they are not implemented.
- **Native audit:**
  - The `section` presets "Icons with text" and "Multicolumn" (groups of icon/text) are the closest. No dedicated multicolumn section exists.
  - The native `icon` block only offers theme glyphs, so the custom illustrations use the native `image` block (merchant upload).
  - Category **B/C**: native `section` with preset name `t:names.icons_with_text`, composed of `group`/`image`/`text` blocks. No new section.
- **Structure:**
  - Section (column, gap 26 / mobile 18):
    - Heading group (gap 6): heading + subheading text blocks.
    - Grid group: `columns` 4 / `columns_mobile` 2, gap 32 / 12. It holds 4 card groups (gap 14), each with:
      - A tile group (fit, padding 15, border, radius 26, white background + gradient overlay `#f0fafe`) holding an image block (square, fixed 64px).
      - A text group (gap 6): title + description.
  - Cards can be added, removed and reordered in the editor.
- **Opt-in extensions** (settings take effect only when the section has a custom class; defaults keep native behaviour):
  - `group`: `columns` and `columns_mobile` (0 = native flex; >0 = equal-column grid via class `sn-group--cols` / `sn-group--cols-mobile`). 37 → 39 settings.
  - `text`: `line_height_exact_mobile` (0 = same), `alignment_mobile` (same / start / center / end), and a new "13px" (0.8125rem) size option. 22 → 24 settings.
  - `image`: `fixed_width` and `fixed_width_mobile` (px, 0 = native). With the class, an empty image renders nothing on the live store (the editor still shows the placeholder). 17 → 19 settings.
- **Section settings** (S08 extensions reused): background `#f0fafe`, padding 60/60, side padding 20, `content_max_width` 1380 (step 10; Figma 1376), mobile 60/48/8, `gap_mobile` 18, `custom_class` `sn-home-why`.
- **CSS:** `assets/dev2.css` under `.sn-home-why`: row cap, text weight/line height, desktop/mobile grids, fixed icon size, mobile overrides. The tile shadows are the only literals (no shadow setting); the tile is targeted with `:has(> .group-block-content > .image-block--sn-fixed)`.
- **Order:**
  - Desktop follows Figma right → left: تقنية أذكى · مصممة لاحتياجاتك · تفاصيل تصنع الفرق · روتين أبسط.
  - Figma's mobile rows are the other way round (row 1 = تفاصيل · روتين), which one block order can't reproduce at the same time. Mobile shows row 1 = تقنية · مصممة. Reordering the blocks fixes mobile but flips desktop.
- **Template:** `why_sn_home` added after `bundle_sn_home`; the 4 icons are empty (merchant uploads them).
- **Checks:** Theme Check 9 = baseline; schemas and `index.json` parse; `dev2.css` braces balanced.
- **Visual QA:** PENDING USER REVIEW (rule 13).
- **Mobile card order (2026-11-12):**
  - New `group` setting `mobile_order` (0–12, 0 = block order); group 39 → 40/40.
  - It outputs `--sn-order-mobile` on the card (custom-class sections only).
  - `dev2.css` (≤749, `.sn-group--cols-mobile > .group-block-content > *`) applies CSS `order`, registered with `@property` (`inherits: false`, initial 0) so a card never picks up a parent group's value.
  - Desktop keeps the editor block order.
  - Ties keep block order; cards left at 0 come before numbered cards.
  - **Visual order only:** Tab and screen readers follow the block order; Liquid can't reorder `content_for 'blocks'` output, and JS was not wanted.
  - **Template:** تفاصيل 1 · روتين 2 · تقنية 3 · مصممة 4 → RTL grid: row 1 تفاصيل (right) · روتين; row 2 تقنية · مصممة = Figma 190:4361. Desktop unchanged: تقنية · مصممة · تفاصيل · روتين.
  - **Checks:** Theme Check 9 = baseline. Visual QA PENDING USER REVIEW.
### S05 Featured Collection — Dev3 (initial plan 2026-11-08; later implemented, see subsections below)

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

#### S05 Figma fidelity corrections — 2026-11-09 (Dev3) — IMPLEMENTED, visual QA PENDING USER REVIEW

- **Figma re-inspected** (design context + screenshots) for `190:3844` and `190:4149`. Measured:
  - Desktop card 316 wide, radius 20, border 1 `#efeded`, gap 14. Image 316 square with top corners 16, bottom 0. Text padding 0 12 12, gap 6.
  - Mobile card 165, radius 20, image 165 square with top corners **8.354**.
  - **Image crop:** the photo is portrait. The layer is 100% wide × 174.73% tall, offset −21.09% (desktop and the first mobile card). The visible window starts 12.07% down, so vertical `object-position` ≈ **28%**. Other mobile cards use −22.55 / −14.38 / −11.66% (per-image crops); 28% is used as the single value.
  - **Best Seller badge:**
    - Desktop: inline-end (left in RTL), top 16.23 / inline 13 (hover card 13.23 / 13). Padding 4/12, radius 8, `#176bb0`, 12/18 600 white.
    - Mobile: inline-start (right), top ≈ 9 / 8. The cart button takes inline-end.
  - **Price row:** one horizontal row with gap 10 and `pt` 4. RTL visual order: price (18/28 700 `#12568d`), compare-at (14/22 line-through), discount badge (`#f0fafe` with 1px `#dcf2fb`, radius 8, 4/12, 12/18 600 `#176bb0`).
  - **CTA:** "عرض المنتج" + 18px `arrow-left` icon, inline, gap 10, centered. **View All** is the same component.
  - **Desktop Add to cart:** inset 14 left/right/bottom, padding 12/20, radius 12, `#176bb0`, gap 10, text 16/26 600 white.
    - Icon: an 18px **cart (trolley)** stroke icon, after the text (left in RTL).
    - Card shadow: `0 12 16 rgba(15,100,168,.1)`; the token reads Shadow/Soft blur 32.
  - **Mobile Cart FAB:** 32px circle at top 7 / left 7 (inline-end in RTL), 16px trolley icon at 8 / 8, shadow `0 6 12 rgba(15,100,168,.35)`.
  - Icon SVGs were read into the scratchpad only. The trolley path was added as the theme UI icon `assets/icon-cart-trolley.svg`; no Figma URLs are referenced.
- **Root causes found:**
  - **Image crop:** card images use `object-fit: cover` at the default centered position, so tall toothbrush photos lose their heads (top). Figma crops from about 28% down. Shopify always outputs `--focal-point` (50% 50% by default), so the position comes from a setting.
  - **Discount badge below the prices:** `<product-price>` is a `.text-block` (`flex-direction: column`, `snippets/text.liquid` CSS), and `[ref=priceContainer]` was a nested flex.
  - **CTA arrow below the text:** the same `.text-block` column direction applied to the `-cta` `::after` arrow.
  - **Mobile FAB icon partly hidden:** a 32px button with `justify-content: center` centers the icon together with the overflowing label, which pushes the icon off-center and clips it.
  - **Mobile View All arrow:** a CSS `::after` arrow is always at the inline-end, so it can't be moved per breakpoint.
- **Changes (all opt-in; defaults = native output, no CSS emitted at defaults):**
  - `blocks/_product-card-gallery.liquid` (12 → 40 settings, at the Theme Check limit, so the schema is full):
    - **Image:** `image_fit` (cover/contain), `image_position_y`, `border_radius_corners` (all/top).
    - **Mobile image:** `media_mobile_custom`, `image_ratio_mobile` (same/portrait/square/landscape), `image_position_y_mobile`, `border_radius_mobile`.
    - **Quick add:** `quick_add_style` (default/full-width bar), `quick_add_icon` (default/cart/custom) + `quick_add_icon_image`, `quick_add_icon_position` (before/after), `quick_add_icon_size`, `quick_add_radius`, `quick_add_background`, `quick_add_text_color`, `quick_add_mobile_position` (default/top-start/top-end/bottom-start/bottom-end), `quick_add_mobile_size`, `quick_add_mobile_icon_size`, `quick_add_mobile_offset`.
    - **Product badge:** `custom_badge_source` (none / product metafield / same text), `custom_badge_metafield` (default `custom.product_badge`), `custom_badge_text` (fallback), `custom_badge_position` + `_mobile`, `custom_badge_offset` + `_mobile`, `custom_badge_background`, `custom_badge_text_color`.
    - Badge shape, padding and font reuse the global theme badge settings (`badge_corner_radius` = 8, matching Figma; font family and transform).
    - Rules are output in one scoped `{% style %}` (`#shopify-section-… .card-gallery-<block>`) only when some option differs from native. The badge uses a small `{% stylesheet %}` keyed on the new `product-badges--custom` class.
    - The Quick Add icon is swapped with a CSS mask over the native `.add-to-cart-icon` span, so `quick-add`, `add-to-cart-button` and the JS stay unchanged.
    - Removed for the 40 limit: horizontal position, mobile fit, badge padding and radius (theme badge settings are used instead), bar inset (native `--quick-add-offset`).
  - `blocks/_product-card.liquid` (11 → 13): `border_radius_mobile_custom` + `border_radius_mobile`.
  - `blocks/_product-card-group.liquid`: native `icon` block allowed (blocks list only).
  - `blocks/price.liquid` (19 → 25):
    - With `show_discount_badge` on, the class `price--inline-badge` gives a wrapping row, and `priceContainer` gets `display: contents`, so `product-price.js` still finds and replaces it.
    - New settings: `discount_badge_background`, `_text_color`, `_border_color`, `_radius`, `price_row_gap`, `price_row_gap_mobile`. The row justification follows the native alignment setting.
  - `blocks/_product-list-button.liquid` (12 → 19): `icon` (none/arrow), `icon_image`, `icon_position`, `icon_position_mobile` (same/before/after), `icon_size`, `icon_gap`, `icon_mirror_rtl`.
    - The icon renders with the native `icon-or-image` snippet **inside** the `<a>`, injected into the captured `button` snippet output. The shared `button` snippet is not edited.
  - `assets/icon-cart-trolley.svg` (new UI icon from the Figma "Icon / cart" geometry).
  - `assets/dev3.css`:
    - Removed: the hardcoded radius, badge, quick-add geometry and colors, and the `::after` arrows plus the `--sn-bs-arrow` data URI.
    - Kept, class-scoped: Figma typography and padding for the badge, discount pill, CTA and Quick Add label; desktop `--quick-add-offset: 14px`; FAB shadow; mobile CTA icon 14 / gap 6; RTL mirror of the Horizon arrow in the CTA group only.
  - `templates/index.json` (S05 only; the user's editor values `collection`, title color and `show_always: false` are kept):
    - **Gallery:** radius 16 top / mobile 8; position Y 28 / 28; bar style, cart icon after the text, size 18, radius 12, `#176bb0` / `#fff`; mobile top-end 32 / 16 / 7.
    - **Badge:** metafield `custom.product_badge` with fallback "الأكثر مبيعًا"; top-end 13 desktop, top-start 8 mobile; `#176bb0` / `#fff`.
    - **Card:** mobile radius 20.
    - **Price:** badge `#f0fafe` / `#176bb0` / `#dcf2fb`, radius 8, gap 10 / 6.
    - **CTA:** new `product_card_group_sn5cta` (row, gap 10, center, fit) → `text_sn5cta` + `icon_sn5arrow` (arrow, 18, `#176bb0`).
    - **View All:** arrow, after the text on desktop, **before the text (right) on mobile per the user**, 18 / 10.
    - **Removed:** the `text_sn5badge` block and the `sn-home-bestsellers-badge` part class.
- **Badge data:**
  - The merchant creates the product metafield definition `custom.product_badge` (single line text, Products) and fills it per product. **The definition is not verified to exist.**
  - With no value, the fallback text shows; clear it to hide the badge. The badge is never shown on sold-out products.
- **Open mismatch:** Figma mobile shows the View All arrow on the left (after the text). The user asked for the right side. Set with the `icon_position_mobile` setting and easy to switch back.
- **Static validation:** Theme Check = 9 baseline offenses (no new ones; `ExcessiveSettingsCount` on the gallery was hit at 47 and reduced to 40); schema JSON of 5 edited blocks and `index.json` parse; `dev3.css` braces balanced; `index.json` diff confined to `product_list_fa6P9H`.
- **Visual QA — PENDING USER REVIEW:**
  - Toothbrush heads fully visible at 1480 / 390.
  - Badge sides and offsets.
  - Price + compare + discount on one row on desktop; wrapping on mobile.
  - CTA and View All arrows inline and in the right direction.
  - Bar icon and label; the mobile FAB not clipped and the icon centered; the trolley icon mask renders (Safari included).
  - Collection page and other product cards unchanged.

#### S05 final visual alignment — 2026-11-09 (Dev3) — IMPLEMENTED, visual QA PENDING USER REVIEW

- **Figma re-read:** hover card `190:3850` design context, mobile card `387:4634` design context, `190:4149` metadata.
  - **Desktop:** price row gap 10, `pt` 4; price 18/28 Bold; compare 14/22; discount badge 12/18 SemiBold, padding 4/12, radius 8; text padding 0 12 12, gap 6; card gap 14; bottom spacer 6.
  - **Mobile:** card 165 × 283, gap 7.31; text padding 6.27 (bottom 6.27 + spacer 3.13), text gap 3.13; price row gap 5.22.
    - Mobile type sizes: price 9.4/14.62, compare 7.31/11.49, discount badge 6.27/9.4 with padding 2.09/6.27 and radius 4.18; description 7.31/12.53; Best Seller badge 6.27/9.4 with padding 2.09/6.27 and radius 4.18 at top 8.93 / right 7.83.
    - Carousel: track at x 24, gap 12, 11px vertical padding. Progress 342 × 4. Link 18px icon, gap 10.
  - Badge padding and radius are exactly 0.333em / 1em / 0.667em of the text size on both breakpoints, so they are now em-based.
- **Desktop discount badge root cause:** `snippets/text.liquid` CSS `.text-block > * { width: var(--width, 100%) }`. The price block width is "Fill" (100%), so every direct child of `<product-price>` (the badge span) was 100% wide, and the row change alone could not fit it.
  - **Fix (price block stylesheet, opt-in class only):** `product-price.price--inline-badge > * { width: auto }`. No markup or JS change.
- **CTA icon order (user request, deviates from Figma):** arrow BEFORE the text, visually on the right in RTL. Done with native block order (`icon_sn5arrow` before `text_sn5cta` in `product_card_group_sn5cta`), reordering is the native Theme Editor control. The arrow keeps the Figma `arrow-left` direction (Horizon arrow mirrored in RTL in the CTA group).
- **New / changed settings:**
  - `price`: `discount_badge_font_size`, `discount_badge_font_size_mobile`, `price_font_size_mobile` (0 = same; class `price--mobile-size`).
    - Badge padding is now `0.333em 1em` with line-height 1.5; the mobile radius scales with the mobile text size.
    - (25 → 28 inputs.)
  - `text`: `max_lines`, `max_lines_mobile`, `font_size_mobile`, `line_height_mobile` (all 0 = native, no CSS output).
    - Clamping turns rich text into one inline excerpt, and the text alignment is kept.
    - Scoped `#shopify-section-… .text-block--<id>`. (20 → 24.)
  - `_product-card`: `badge_font_size` (default 13 = theme badge size `--font-size--xs`).
    - `border_radius_mobile_custom` relabeled "Customize mobile card" (same ID) and now also controls `product_card_gap_mobile` and `badge_font_size_mobile` (radius scale). (13 → 16.)
  - `_product-card-group`: `mobile_spacing_custom`, `gap_mobile`, `padding_inline_mobile`, `padding_block_end_mobile`. The class `group-block--<id>` is passed to the `group` snippet only when enabled (its existing `class` param). (35 → 39.)
  - `_product-card-gallery`: custom badge font size from the card variables, em padding, mobile radius scale. No new settings (still 40).
- **Reused native controls:** group gap and padding (desktop), text padding (spacing below the title / above the price), text alignment, price alignment, icon block icon/size/color, block order for the icon side.
- **`dev3.css`:** removed the description clamp and its mobile size, the badge and discount-pill sizes and padding, and the mobile card gap and group padding/gaps (now settings).
  - Mobile prices are em-based (`.price` 1em/1.5, compare 0.8em ≈ the Figma 0.78 ratio), so the price block's mobile size drives them.
  - Kept: Figma weights and colors, desktop typography, mobile title 13/20, mobile CTA text 13/20, mobile CTA icon 14 (the icon block has one size setting).
- **`index.json` (S05):**
  - **Card:** badge 12 / mobile 10, mobile gap 7, mobile radius 20.
  - **Details group:** mobile gap 4, sides 7, bottom 16 (Figma 6.27 + 3.13 + 7.31).
  - **Description:** 2 lines desktop/mobile, mobile 11/17.
  - **Price:** badge 12 / mobile 10, mobile price 13, mobile gap 5.
  - **CTA group:** icon first, mobile gap 5.
- **Intentional readability deviations:**
  - Mobile sizes are readable rather than the scaled Figma values: badge 10 (Figma 6.27), description 11/17 (7.31/12.53), price 13 (9.4) with compare ≈ 10.4, discount 10 (6.27), title 13/20 (8.35/14.1), CTA 13 (8.35).
  - So the mobile price row may still wrap the discount pill onto a second line at 165px. It now wraps as a compact pill, not full width.
  - The mobile card will be taller than 283 (estimated ~320–340 with real data). Cards stretch to equal height and the CTA stays at the bottom.
- **Data-dependent:** stars and the "التقييمات" label render only with real `reviews.rating` data (none confirmed). Price format comes from the store's currency settings.
- **Static validation:** Theme Check = 9 baseline offenses; 5 schemas parse with no duplicate IDs; settings ≤ 40; `index.json` parses; `dev3.css` braces balanced.
- **Visual QA — PENDING USER REVIEW:**
  - Desktop: price, compare and discount on one row.
  - Mobile: price row grouping and wrap.
  - Arrow on the right of "عرض المنتج".
  - Mobile badge size vs the cart button (no overlap).
  - Description 2 lines on both breakpoints.
  - Mobile card height and spacing.
  - Other product cards and text blocks unchanged.

#### S05 mobile Figma accuracy + discount color fix — 2026-11-09 (Dev3) — IMPLEMENTED, visual QA PENDING USER REVIEW

- **User decision:** the mobile card uses the **actual Figma mobile sizes**. This supersedes R3 and the readable sizes of the previous pass. Accessibility trade-off: 6.5–9.5px text on mobile cards is below common legibility minimums; accepted by the user.
- **Figma re-read:** `190:4149` design context, card `387:4634` metadata, `190:3844` metadata.
  - **Section:** 390 × 573 = 56 + header 84 (title row 44 incl. 3/3 padding, gap 14, subtitle 26) + 14 + carousel 305 (11 + 283 + 11) + 14 + progress 4 + 14 + link 26 + 56.
  - **Card:** 165 × 283, image 165, card gap 7.31.
    - Text frame: padding 6.27 / bottom 6.27, gap 3.13; 102.84 tall. Name 15, description 26 (2 lines), rating 12, price row 17.09 (`pt` 2.09), CTA 14.
    - Spacer 3.13; the card clips at 283, so about 14 visible below the CTA.
  - **Type (size / line height):**
    - Title 8.354 / 14.098 (600); description 7.31 / 12.532.
    - Price 9.399 / 14.62 (700); compare-at 7.31 / 11.487.
    - Discount badge 6.27 / 9.399 (600), padding 2.089 / 6.266, radius 4.177, border 0.522.
    - Best Seller badge 6.27 / 9.399, padding 2.089 / 6.266, radius 4.177, top 8.93 / right 7.83.
    - Rating label 6.266 / 10.443; stars 12.32. CTA 8.35 / 13.576, arrow 9.399, gap 5.222. Price row gap 5.222.
- **Discount badge color root cause:**
  - The setting path (`discount_badge_text_color` / `_background` / `_border_color` → inline `--discount-badge-*` on `<product-price>` → `.price-discount-badge`) was correct.
  - But `assets/base.css` `.text-block.h6 > *` (specificity 0,2,0; the price block uses the h6 preset) sets `color: var(--color)`, `font-size`, `line-height`, weight and family on every direct child of `<product-price>`, including the badge. It outranked `.price-discount-badge` (0,1,0), so the text color and the badge text-size settings never applied.
  - The same rule pinned `[ref=priceContainer]` to the h6 size, so "Mobile price size" did not reach the prices either.
- **Fix (price block stylesheet, opt-in class only):**
  - Badge rules moved under `product-price.price--inline-badge > .price-discount-badge` (0,2,1).
  - `priceContainer` gets `font-size` / `line-height: inherit`; mobile size is set on `product-price.price--inline-badge.price--mobile-size` (0,2,1 > `.h6.h6` 0,2,0).
  - The color fallback is now `var(--color)`. No duplicate setting was added.
  - Not tested in the Theme Editor color picker (no preview was run). The fix was verified by tracing the code path and comparing selector specificity.
- **Settings added / changed:**
  - New `snippets/text-responsive-style.liquid` holds the text-block line limit and mobile size logic, now shared. `text.liquid` renders it; `product-title.liquid` renders it and gets `font_size_mobile` and `line_height_mobile` (18 → 20).
  - `text` mobile size and line height step 0.5 (line height max 50).
  - `review`: `font_size_mobile` (label and count, line height 1.67) (7 → 8).
  - `icon`: `width_mobile` (0 = same; `!important` because `icon-or-image` writes an inline width on uploaded images) (6 → 7).
  - `price`: discount badge sizes min 5 step 0.5, mobile price step 0.5.
  - `_product-card`: badge sizes min 5 step 0.5.
- **`dev3.css`:** removed the mobile title (13/20), CTA (13/20), CTA icon 14 and rating label (11/16) rules, and the price top padding (now the price block's native top padding, 4).
  - Mobile `.price` 1em / 1.55 and compare 0.78em / 1.57 are Figma ratios driven by the price block's mobile size.
  - Discount weight selector raised to `product-price > .price-discount-badge`.
- **`index.json` (S05):**
  - **Card:** mobile badge 6.5, mobile gap 7.
  - **Details group:** mobile gap 3, sides 6, bottom 14.
  - **Title:** mobile 8.5 / 14.
  - **Description:** mobile 7.5 / 12.5, 2 lines.
  - **Review label:** mobile 6.5.
  - **Price:** mobile 9.5, discount mobile 6.5, mobile gap 5, top padding 4.
  - **CTA:** text mobile 8.5 / 13.5, arrow mobile 9.5, gap 5.
  - Ranges use 0.5px steps, so Figma's fractional values round to the nearest 0.5.
- **Estimated mobile card height:** without reviews ≈ 268 (165 + 7 + 14 + 3 + 25 + 3 + 4 + ~16 + 3 + 13.5 + 14); about 283 with a rating row.
- **Section:** spacing already matched Figma in `dev3.css` (56 / 25 / 25 / 14 / 56; header 24/38, 15/26, gap 14) and is unchanged.
- **Remaining mismatches:**
  - Mobile price top padding 4 (Figma 2.09; the native padding setting is not responsive).
  - The CTA arrow is the merchant-uploaded `arrow-left.svg`, so it is not mirrored by CSS.
  - Stars are data-dependent.
- **Static validation:** Theme Check = 9 baseline offenses; 6 edited schemas parse, no duplicate IDs, ranges ≤ 101 steps with defaults on-step; `index.json` parses; `dev3.css` braces balanced.
- **Visual QA — PENDING USER REVIEW:**
  - Change the discount badge text and background colors in the Theme Editor and confirm the badge updates.
  - Mobile card height ≈ Figma at 390.
  - Price row on one line at 165.
  - Badge vs cart button.
  - Desktop unchanged, apart from the discount badge now using its own 12px size and colors instead of the h6 preset.

### S07 Bundles — IMPLEMENTED 2026-11-11 (Dev3), visual QA PENDING USER REVIEW

- **Figma read:**
  - Desktop: section `190:3896` (1480 × 823) and container `351:4546`. Heading `190:3897` design context.
  - Mobile: `190:4204`, design context and metadata.
  - **Desktop = S05:**
    - Container 1376 / content 1336, section padding 60 / 91.1, heading 90 tall.
    - Title 32/52 SemiBold and subtitle 18/32, gap 6; View All at the heading's inline-end bottom (6 / 5.91).
    - Heading → products gap 40. Four cards 316 × 541.9 with 24 gaps.
  - **Mobile differs from S05 only in outer spacing:**
    - Frame 390 × 545, padding 56 top / **40** bottom.
    - Title row 44 (3/3 + 24/38) → **11** → subtitle 15/26.
    - Head → carousel **11** (+ 11 carousel padding). Carousel 305 (cards 165 × 283, gap 12, gutters 24).
    - **11** → progress 342 × 4 → **11** → link 26. S05 uses 56 / 56 and 14 gaps.
  - Cards are identical to S05.
- **Native section:** type `product-list`, file `sections/product-list.liquid`, schema name `t:names.product_list`.
  - Horizon's own locale translates that key to **"Featured collection"** (en) / **"مجموعة مميزة"** (ar). Presets are "Featured collection: Grid / Carousel / Editorial".
  - That label is native Horizon naming, not a custom rename. Nothing renamed; no new section file; locales untouched.
- **Instance:** `product_list_Rxv4hg`, placed right after S05. S06 doesn't exist yet; when it is built, S06 goes between them (Figma order S05 → S06 → S07 → S08).
- **Composition reuse:**
  - S05's full block tree and settings were copied with **new unique block IDs** (static `static-header` / `static-product-card` keep their required static IDs).
  - New block IDs:
    - Header: `product_list_text_0264pQ` (title), `product_list_text_xxdfAx` (subtitle), `product_list_button_gXF9Gw`.
    - Card: `product_card_gallery_rHvwew`, `product_card_group_kgOOkQ`, `product_title_674K9w`, `text_sn5desc_Dk2Yfw`, `review_sn5rate_PUrgfA`, `price_SnxctA`.
    - CTA: `product_card_group_DBXzIQ` → `icon_sn5arrow_2fW6Ag`, `text_JqRMAx`.
  - Instance-specific changes:
    - Title `<h2>الباندلز</h2>`, subtitle `<p>كمّل روتينك في باقة واحدة بسعر أفضل</p>`, View All "عرض الكل".
    - **`collection` removed** (unselected → native editor placeholders until the merchant picks the Bundles collection).
    - `custom_class: sn-home-bestsellers sn-home-bundles`.
  - Kept from S05 (same design):
    - Badge source `custom.product_badge` with fallback "الأكثر مبيعًا" (Figma S07 shows the same badge).
    - `show_always: false` on View All (as the user set on S05).
    - The merchant-uploaded `arrow-left.svg` CTA icon.
  - S05's section object was verified byte-identical before/after.
- **No new code paths:** no new settings, snippets, JS or section files. It reuses `scroll-progress`, Quick Add, the price/discount extensions, the product badge, the text and title mobile settings, and the View All icon settings.
- **CSS (`assets/dev3.css`):** the S05 mobile section values (56/56, gap 14) became variables `--sn-bs-m-pad-top`, `--sn-bs-m-pad-bottom` and `--sn-bs-m-gap` with the same S05 defaults (computed S05 values unchanged).
  - `.sn-home-bestsellers.sn-home-bundles` sets 40 / 11 for S07.
  - Removing `sn-home-bundles` gives S05 spacing; removing both classes gives native Horizon.
- **Merchant to do:** select the Bundles collection on S07. Bundle products are ordinary products (no bundle app or pricing logic).
- **Static validation:**
  - `index.json` parses; order `[product_list_fa6P9H, product_list_Rxv4hg]`; no duplicate block IDs inside or across sections; all `block_order` refs resolve.
  - Theme Check = 9 baseline offenses; `dev3.css` braces balanced.
  - git diff: `index.json` additions only, plus one comma in `order`.
- **Visual QA — PENDING USER REVIEW:**
  - With a collection selected: desktop matches S05 and the heading shows the S07 texts.
  - Mobile at 390: 56 / 40 padding, 11 gaps, progress and View All positions (total ≈ 545 with View All shown).
  - S05 unchanged; empty-collection placeholders in the editor.

### S09 Reels — IMPLEMENTED 2026-11-11 (Dev3), visual QA PENDING USER REVIEW

- **Figma read (2026-11-11, `get_metadata` + `get_design_context` with screenshots, both nodes accessible):**
  - **Desktop `190:3935` "12 Reels"** (1480 × 719):
    - Padding 60 / 60. Container `354:4625` 1376 wide at x 52, inline padding 20 → content 1336, column gap 24.
    - Heading `360:7397` "اكتشف عالم SNOSHA": Cairo SemiBold 32/52 (Desktop/H2), `#12568d`, centered.
    - Carousel `190:3937` 1336 × 523: 5 Reel Cards (`190:3938–3942`), 248 × 523 each, gap 24.
    - Card: column, gap 12. Video 248 × 440 (≈ 9:16), radius 18, poster cover-cropped.
    - Play button: 52 × 52, `#176bb0` (brand-secondary), radius 26, white play vector 24 inside a 22 frame, centered.
    - Product row `…;190:2978`: padding 10, gap 14, items centered. Thumbnail 43 × 43, radius 6, border 1px `rgba(220,242,251,.4)`, fill `#f0fafe`; it sits on the right (inline-start in RTL).
    - Info column gap 3: title Regular 14/24 `#12568d`, one line with ellipsis on desktop; price Bold 14/24 `#176bb0` ("EGP 1,299" is sample data).
  - **Mobile `190:4254`** (390 × 820):
    - Padding 48.5 top / 40 bottom; container column gap 23.
    - Head `190:4255`: inline padding 24, bottom padding 20.5 → heading 24/38 (Mobile/H2), centered.
    - Carousel `190:4257`: inline padding 24; track `398:4817` with 5 cards 290 × 623, gap 12.
    - The third card is centered (x 50–340), with 38px of each neighbor visible.
    - Video 290 × 516 (≈ 9:16), radius 18. Same play button and product row; the title wraps onto 2 lines.
    - Progress `190:4263` 342 × 4, `#dcf2fb`, radius 99. Fill `190:4264` is 68 wide at the inline-start (right), gradient `#63cdff → #0f64a8`.
  - "قريبًا" on mobile cards 1 and 3 replaces the price → treated as a product-level state, not a fixed label.
- **Native Reuse Audit:**
  - Inspected:
    - Sections: `carousel`, `product-list`, `slideshow`, `hero`, `media-with-content`, `section`.
    - Blocks: `_carousel-content`, `_card`, `video`, `product-card`, `_product-card-group`, `product-title`, `price`, `image`, `text`, `group`.
    - Snippets: `video`, `slideshow`, `slideshow-styles`, `scroll-progress`, `product-card`, `deferred-media-video-styles`, `video-placeholder-styles`.
    - JS: `media.js` (`DeferredMedia`), `slideshow.js`, `scroll-progress.js`.
  - **Match: native `carousel` section** (`sections/carousel.liquid`, schema name `t:names.carousel`, presets kept).
    - Static `group` header plus static `_carousel-content`, which renders the native `slideshow` (RTL, swipe, Theme Editor re-render).
    - Repeatable `_card` blocks, one card = one Reel: add, remove, reorder and duplicate natively.
    - `_card` accepts `video` and `product-card`.
  - **Video:** the native `video` block → `snippets/video.liquid` → `<deferred-media>`. The poster is a real `<button>` with a localized aria-label. The video loads only on click (from a `<template>`) and plays muted with native controls (no autoplay with sound). The `mediaStartedPlaying` event pauses every other `deferred-media`, so only one Reel plays at a time. YouTube/Vimeo `video_url` is kept.
  - **Product:** the native `product-card` theme block has a product picker. Its whole content is a link to `product.url` (`product-card__link`, aria-label = title). Children use `closest.product`: `product-title`, `price` (real variant price), and an `image` block bound to `{{ closest.product.featured_image }}` (dynamic source).
  - **Progress:** the reusable `scroll-progress` from S05 (target `.carousel-content slideshow-slides`). It is RTL-safe, follows resizes and editor re-renders, and hides itself when there is no overflow.
  - **Gaps:**
    - Uploaded videos had no custom poster or crop ratio (only the file's ratio and preview image).
    - No play-button styling.
    - No centered fixed-width mobile card.
    - No progress-bar option on `carousel`.
    - No `custom_class`.
    - An empty `product-card` renders placeholder data on the storefront.
    - Reels do not pause when scrolled off-screen. This is not supported by the slideshow; only the "one plays at a time" rule exists natively.
  - **Category B + C** (opt-in schema extensions + native composition). No new section; A–D are sufficient, E not needed.
- **Schema extensions (all opt-in; defaults = native output):**
  - `sections/carousel.liquid` (9 → 15 settings):
    - `mobile_gap_custom` + `columns_gap_mobile` (0–100, default 12), added 2026-11-11 (gap correction). The native `columns_gap` applied to all viewports, so S09 mobile had 24 instead of Figma's 12. When on, `--carousel-gap` is overridden on the slideshow track below 750px, so the slide gap and the native card-width calculation both use it. Desktop keeps the native `columns_gap`.
    - `mobile_centered` + `mobile_card_width` (200–360, default 290): fixed-width cards that snap to the center on mobile. Scroller padding `(100% − width) / 2`, so the first card starts centered with its neighbor visible.
    - `show_scroll_progress`: renders `scroll-progress`.
    - `custom_class`, rendered with `custom-class.liquid`.
    - New `{% stylesheet %}` for the centered mode.
  - `blocks/video.liquid` (19 → 28 settings):
    - `uploaded_poster` (image_picker; falls back to the video's own preview image).
    - `uploaded_aspect_ratio` (video / 9:16 / 4:5 / 1:1 / 16:9; the poster button follows it).
    - Play button: `play_button_style` (default/custom), `play_button_size`, `play_button_icon_size`, `play_button_radius`, `play_button_background`, `play_button_icon_color`, `play_button_icon_image` (custom icon, native `icon-play.svg` fallback).
    - `snippets/video.liquid` (3 callers) is untouched.
    - Poster position = the image's focal point (Shopify Files), which `image_tag` outputs natively.
  - `blocks/product-card.liquid` (16 → 17 settings): `hide_when_empty`. On the storefront it renders nothing while no product is selected; the editor keeps the placeholder.
  - No template has an existing `video` block. `carousel` and `product-card` had no instances. Existing behavior is unchanged.
- **Instance `carousel_sn9Rls`** (`index.json`, after S07; Figma order S07 → S08 → S09, S08 not built):
  - Section:
    - `columns` 5, `columns_gap` 24 (desktop), `mobile_gap_custom` true + `columns_gap_mobile` 12, `mobile_columns` 1, `mobile_centered` true / 290, `section_width` page-width.
    - `icons_style` none (Figma has no arrows), `show_scroll_progress` true, padding 60 / 60, `custom_class: sn-home-reels`.
  - Header `static-header` (group, column, centered, gap 0, padding 0) → `text_sn9Head` `<h2>اكتشف عالم SNOSHA</h2>`.
  - 5 Reel cards (`card_r9Ka1Q`, `card_r9Lb2W`, `card_r9Mc3E`, `card_r9Nd4R`, `card_r9Oe5T`). Each card: column, gap 12, padding 0, containing:
    - `video_<id>`: uploaded, **no video** (merchant uploads), no poster, ratio 9:16, radius 18, loop. Custom play button 52 / icon 24 / radius 26 / `#176bb0` / `#ffffff`.
    - `product_card_<id>`: **no product** (merchant selects), `hide_when_empty` true, gap 0, containing:
      - `group_info_<id>` (row, gap 14, padding 10):
        - `image_thumb_<id>`: `{{ closest.product.featured_image }}`, square, 1px `#dcf2fb` at 40%, radius 6.
        - `group_text_<id>` (column, gap 3): `product_title_<id>`, `price_<id>` (discount badge off) and `text_soon_<id>` (part class `sn-home-reels-soon`; text **left empty** since the 2026-11-11 visibility fix, so it renders nothing until the merchant connects it to the metafield in the editor).
  - Nothing is hardcoded: no video files, posters, titles or prices. Empty slots show native placeholders in the editor.
- **Coming soon:** proposed product metafield **`custom.coming_soon_label`** (single line text, e.g. "قريبًا").
  - When filled, the label shows and the price is hidden (class CSS `.product-card:has(.sn-home-reels-soon) product-price`). When empty, the real price shows.
  - Sold-out products keep their native price (not treated as coming soon).
  - The merchant creates the definition (Settings → Custom data → Products), then in the Theme Editor connects each "Coming soon label" text block to it with "Connect dynamic source". It must not be written into the template before the definition exists (see the visibility incident). No product records changed.
- **CSS (`assets/dev3.css`, `.sn-home-reels`, collision check: no matches):**
  - Container 1336 and desktop `--peek-next-slide-size: 0` → 5 × 248 cards.
  - Gaps:
    - Between cards: 24 desktop and 12 mobile (Figma re-checked 2026-11-11: desktop cards at x 0/272/544, mobile at 0/302/604). Both are section settings; no CSS.
    - Mobile vertical spacing: 23, plus 20.5 under the heading.
  - Mobile: padding 48.5 / 40, gutters 24.
  - Heading 32/52 → 24/38. Title 14/24 (one-line ellipsis desktop, 2-line clamp mobile). Price Bold 14/24 `#176bb0`.
  - Thumbnail 43 / `#f0fafe`; progress colors.
  - Removing the class gives the native carousel look; playback, product links and the opt-in settings keep working.
- **Behaviour notes:**
  - Mobile starts with the first Reel centered (RTL start). Figma shows card 3 of 5 centered as an illustration; no initial-slide setting was added.
  - Desktop shows a progress bar only if there are more Reels than columns.
- **Files:** `sections/carousel.liquid`, `blocks/video.liquid`, `blocks/product-card.liquid`, `assets/dev3.css`, `templates/index.json` (additions + one comma in `order`).
- **Static validation:**
  - Theme Check = 9 baseline offenses (no new ones).
  - `index.json` parses (round-trip identical before the edit). Order `[product_list_fa6P9H, product_list_Rxv4hg, carousel_sn9Rls]`.
  - Every setting key exists in its schema; every child block type is allowed by its parent; all `block_order` refs resolve; no duplicate block IDs.
  - `dev3.css` braces balanced, CRLF kept. No JS changed.
- **Merchant to do:**
  - Upload each Reel's video (and an optional poster) and select its product.
  - Create the `custom.coming_soon_label` definition if needed.
  - Delete or add Reel cards as needed.
- **Editor visibility incident (2026-11-11) — local fix applied, remote sync PENDING (needs user's commit + push):**
  - **Symptom:** the user couldn't see S09 in the Theme Editor.
  - **Sync model:** theme "Snosha/dev3" (shop Internal-AH) is connected to GitHub branch `dev3` (`origin` = `shopifydevegah-afk/Snosha`). Changes reach it only through commit + push. The theme editor writes back as `shopify[bot]` "Update from Shopify" commits. No Shopify CLI session is involved.
  - **Evidence:**
    - S09 was committed and pushed in `05242e7` ("start section 7").
    - Bot commit `b56ecb5` (2026-11-11 19:07 UTC, header/footer edits in the editor) re-committed `carousel.liquid`, `video.liquid`, `product-card.liquid` and `dev3.css` unchanged. So the theme accepted the S09 code files.
    - The same commit replaced `index.json` with a copy byte-identical to the pre-S09 version (−821 lines, S09 removed). The theme never accepted the S09 template.
    - `b56ecb5` was pulled locally (fast-forward, 21:07 local), which removed S09 from the working copy.
  - **Root cause (most likely):** Shopify rejected the S09 `index.json` on GitHub sync. Probable invalid values:
    - The `text` richtext setting held a metafield dynamic source `{{ closest.product.metafields.custom.coming_soon_label }}`. That metafield has no definition, and the source was not wrapped in `<p>`. Shopify requires dynamic sources to match a compatible definition.
    - Empty-string resource pickers (`"video": ""`, `"uploaded_poster": ""`, `"product": ""`), which no Shopify-written template uses.
    - Not confirmed from the store: the Shopify connector in this session is linked to another store, and no CLI was run. The sync error itself is visible in Shopify admin → Online Store → Themes (theme "Snosha/dev3").
  - **Local fix:**
    - `carousel_sn9Rls` restored into `index.json` from `05242e7`, identical except for 20 removed values: per Reel, `video`, `uploaded_poster`, `product` and the `text_soon` `text`.
    - Kept the file's CRLF line endings; the diff versus HEAD only adds S09 plus one comma.
    - Theme Check = 9 baseline. Template parses; S09 type `carousel`, enabled, in `order` after S07; 5 cards; heading present; all `block_order` refs resolve; S05/S07 unchanged.
  - **Remaining:**
    1. The user commits and pushes `templates/index.json` to `dev3` (remote write; not done by Claude).
    2. Check the theme's GitHub sync status in admin for errors.
    3. Confirm S09 "Reels" appears in the editor.
    4. Avoid saving the homepage in an editor tab opened before the sync, or it may write the old template back.
  - **Status:** code IMPLEMENTED; editor visibility NOT VERIFIED.
- **Visual QA — PENDING USER REVIEW:**
  - Desktop 1480: 5 × 248 cards, 440 video, 24 gaps, centered heading.
  - Mobile 390: 290 × 516 centered card with neighbors visible, swipe and snap in RTL, progress 342 × 4 following the scroll.
  - Play button, playback, and pausing when another Reel starts. Product row (thumbnail on the right, title, price or "قريبًا").
  - Empty product hides the row on the storefront. Two-state test (class off).

### S14 FAQ — IMPLEMENTED 2026-11-12 (Dev3), visual QA PENDING USER REVIEW

- **Figma read (2026-11-12, `get_design_context` with screenshots, both nodes accessible):**
  - **Desktop `217:14604`** (1480 × 498):
    - Padding 60 / 60. Container `365:4594` max 1376, inline padding 20 → content 1336. Heading → columns gap 61.
    - Heading: title Cairo SemiBold 32/52 `#12568d` and subtitle Regular 18/32 `#5a5a59`, centered, gap 6.
    - Columns `217:14606`: 2 × 656, gap 24, each a column with gap 12.
    - Figma's first column `217:14607` holds questions 1–3 and is drawn on the **left**. The second, `217:14620`, holds 4–6 (warranty expanded) on the right.
  - **Mobile `217:14813`** (390 × 630):
    - Padding 56 / 40, inline 20 → content 350. Heading → list gap 12.
    - Title 24/38, subtitle 13/22, gap 6.
    - One list 1 → 6, gap 12. Card padding 14 / 20.
  - **FAQ Item component:**
    - Border 1px `#dcf2fb`, radius 14, padding 14 / 16 (mobile 20).
    - Closed background white; open `#f0fafe` with a 10 gap question → answer.
    - Question Cairo SemiBold 16/27 `#131311`. Answer Regular 16/28 `#5a5a59`.
    - Chevron-down 18px, stroke `#176bb0` 1.6 on a 24 viewBox, on the left (inline-end in RTL), 12 gap from the question, pointing up when open.
  - Only the warranty answer exists in Figma.
- **Native Reuse Audit:**
  - Inspected:
    - Sections: `section` (native FAQ preset `t:names.faq_section`), `_blocks`.
    - Blocks: `accordion`, `_accordion-row`, `group`, `text`.
    - Snippets: `section`, `group`, `accordion-styles`, `accordion-custom-component`, `summary-icon-styles`, `layout-panel-style`, `gap-style`, `custom-class`.
    - JS: `accordion-custom.js` (open-by-default per viewport).
  - **Match:** the native FAQ preset is a `section` with a heading `text` block and an `accordion` block of `_accordion-row` items, each with a `text` answer.
    - Rows use `<details>`/`<summary>`: the whole question is the toggle, natively keyboard-accessible with open/closed state exposed, and several rows can be open at once.
    - `open_by_default` per row.
    - Native caret (`icon-caret.svg`, same chevron-down shape) turns 180° when open and sits at the inline-end (left in RTL).
  - **Gaps:**
    - No per-row card styling (only dividers or one border around the whole accordion).
    - No custom question typography (theme presets only).
    - No icon color or size; no uploaded icon.
    - No `custom_class` on `section`.
  - **Category B + C** (opt-in schema extensions + native composition). No new section; E not needed.
- **Schema extensions (all opt-in; defaults = native output):**
  - `sections/section.liquid` + `snippets/section.liquid`: `custom_class` (header "Advanced"). Rendered on the `.section` div with `custom-class.liquid`, as custom-class-policy §5 prescribes. `_blocks` (the other caller) has no setting, so it outputs nothing.
  - `blocks/accordion.liquid` (15 → 33 settings; callers are only presets in `section` / `_product-details`, no template instances before S14):
    - `type_preset` gains option `custom` with `summary_font_size`, `summary_font_weight` (400–700) and `summary_line_height`. Body font family.
    - `icon` gains option `image` + `icon_image` (falls back to the caret; turns 180° when open). `icon_color` (blank = native).
    - "Row cards": `row_cards` (each row a card; dividers are off in this mode), `row_gap`, `row_background`, `row_background_open`, `row_border_color`, `row_border_width`, `row_radius`, `row_padding_block`, `row_padding_inline`, `row_padding_inline_mobile`, `summary_gap`, `content_gap`, `icon_size`.
    - New block stylesheet scoped to `.accordion--cards`, `.accordion--icon-color` and `.accordion--image` only.
    - The card padding sits on the `<summary>`, so the whole question row (55px) stays the click target (≥ 44px touch target).
    - A row with no answer yet keeps its closed size when opened (`:not(:has(.details-content *))`), so no empty panels appear.
- **Instance `section_sn14Faq`** (`index.json`, appended to `order`; S10–S13 not built, footer is the footer group):
  - Section: column, centered, gap 61, page-width, padding 60 / 60, `custom_class: sn-home-faq`.
  - `group_faqHead` (column, centered, gap 6):
    - `text_faqTitle` `<h2>الأسئلة الشائعة</h2>`.
    - `text_faqSub` subtitle: custom preset 1.125rem, mobile 13 / 22, `#5a5a59`, part class `sn-home-faq-subtitle`.
  - `group_faqCols` "FAQ columns" (row, gap 24, vertical on mobile) holds two `accordion` blocks:
    - `accordion_faqA` "FAQ column 1": rows `row_faq1Pay`, `row_faq2Cod`, `row_faq3Orig`.
    - `accordion_faqB` "FAQ column 2": rows `row_faq4Warr` (open by default), `row_faq5Ret`, `row_faq6Ship`.
  - Both accordions:
    - Caret, icon `#176bb0`, 18px; question custom 16 / 600 / 27, `#131311`.
    - Cards: white / open `#f0fafe`, border 1 `#dcf2fb`, radius 14, padding 14 / 16 (mobile 20), gaps 12 / 10, row gap 12.
  - Each row has an "Answer" `text` block (`#5a5a59`). Only the warranty answer is filled, from Figma. The other five are **left blank** (no invented policy text); they render nothing and their cards don't open into empty panels.
- **Ordering strategy:**
  - DOM and tab order = 1 → 6 (column 1 then column 2), the Figma mobile list.
  - Desktop: `dev3.css` swaps the two columns visually with `row-reverse`, so 1–3 sit on the left and 4–6 on the right as in Figma. Keyboard order still goes 1 → 6; on desktop that starts in the left column.
  - One set of content blocks serves both layouts. New questions are added to either column in the editor.
- **CSS (`assets/dev3.css`, `.sn-home-faq`, collision check: no matches):**
  - Container 1336 (desktop); mobile gutters 20, padding 56 / 40, heading gap 12.
  - Title 32/52 → 24/38 `#12568d`. Subtitle desktop line height 32.
  - Columns `row-reverse` (desktop) and gap 12 (mobile).
  - Answer text 16/28 Regular.
  - Card look, question typography and the icon are accordion settings, not CSS.
  - Removing the class gives the native section layout. The cards and icon stay because they're settings.
- **Files:** `snippets/section.liquid`, `sections/section.liquid`, `blocks/accordion.liquid`, `assets/dev3.css`, `templates/index.json` (additions + one comma in `order`).
- **Static validation:**
  - Theme Check = 9 baseline.
  - The template, checked against the real schemas: every setting key exists, select values are valid options, range values are in range and on step, child block types are allowed, `block_order` refs resolve, no duplicate IDs, no `""` pickers.
  - The diff only adds S14 plus one comma. S05 / S07 / S09 unchanged.
  - `dev3.css` braces balanced, CRLF kept. No JS changed.
- **Merchant to do:**
  - Write the answers for questions 1–3, 5 and 6: select each "Answer" text block in the editor.
  - Add, remove or reorder questions inside either column.
- **Sync:** reaches the Theme Editor only after the user commits and pushes (GitHub-connected theme).
- **Visual QA — PENDING USER REVIEW:**
  - Desktop 1480: 2 × 656 columns, 1–3 left / 4–6 right, 24 gap, cards 55 tall closed, warranty open in `#f0fafe`, chevron left pointing up when open.
  - Mobile 390: one list 1 → 6, 350 wide, 12 gaps, padding 14 / 20.
  - Keyboard: Tab / Enter / Space toggle; focus ring visible.
  - Empty-answer rows don't show an empty panel. Two-state test (class off).

## F. QA & progress

One QA row per Section ID. `PASS (local)` describes **historical, developer-reported checks on the corresponding branch**, not checks rerun during this documentation merge. Only the user can verify visual desktop/mobile/RTL behavior. Historical preview-based S04 observations are explicitly marked below and do **not** mean current visual QA is signed off.

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S01 | Project-level mapping only | — | — | — | — | — | — | Not started in supplied plan |
| S02 | Project-level mapping only | — | — | — | — | — | — | Not started in supplied plan |
| S03 | PASS (both nodes re-inspected 2026-11-08 and again 2026-11-09 for the refinement; no motion) | PASS (local only): 2026-11-08 Theme Check at baseline (9); 2026-11-09 refinement + final pass: schema JSON/counts, template keys vs schemas, CSS braces (Theme Check not re-run). PENDING USER REVIEW: console/404, sanitizer output | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (final product image + icons not uploaded; placeholders in place) | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS`, see E) | User's manual checklist: Figma comparison at 1480 / 390 / 375 and tablet 768–989; image-only, text-only, no chips, trust alone, 3 and 5+ trust items; D5 8px readability; `mobile_text` click-to-edit; class on/off. Assisted review once the user sends screenshots |
| S04 | Done (both nodes) | PASS: Theme Check 9 = baseline; schema + template JSON valid | **HISTORICAL ONLY:** PASS at 1480 (geometry measured in preview: heading +50, cards +142, 292w/24 gap/72 inset, arrows 44px at 50px, top 304) + 1200; final USER QA PENDING | **HISTORICAL ONLY:** PASS at 390 (35/9 padding, 97w/10 gap/20 inset, progress 350×4, 40%→~100% on scroll); tablet 820 checked; final USER QA PENDING | **HISTORICAL ONLY:** PASS (Arabic `dir=rtl`; arrows/progress direction correct). LTR not tested; final USER QA PENDING | Collection image/title (native); placeholders until collections picked | `CLASS_PLUS_SETTINGS` — two-state test PASS (class cleared: all Figma CSS off, native look, no overflow, no new console errors) | Pick real collections; review with final images; user sign-off for VERIFIED. After the preset-alignment fix: Theme Check 9 = baseline, template JSON valid, 1480/820/390 geometry identical to before (screenshots), no new console errors. Two-state test not re-run (CSS unchanged); Theme Editor name not yet seen in the editor UI. **After recovery (2026-11-09), with 5 real collections:** Theme Check 9 = baseline. 1480: cards 292, gap 24, inset 72, titles 24/40/600 on one line, image→title 18, arrows next/prev scroll and disable correctly. 820: cards 209, titles 18/30. 390 and 375: cards 97 (images 97×121, portrait ratio), gap 10, titles 11px in 40px boxes (long names wrap onto 2 compact lines), progress 350/335px, filling 40%→100% from the right. Settings at min (80/10) and max (180/20) applied on mobile only (180 → image 180×225), desktop unchanged, no overflow; defaults restored. Class off: native (320/172 cards, native arrows, no progress, no `--sn-*` vars), no errors; class restored. Theme Editor UI still not opened. **Responsive refinement (2026-11-09):** Theme Check 9 = baseline. Heading: 1480/1200/820 = 32/52 (native block size), 390/375 = 24/38; mobile set to 16/32/40 changed mobile only, desktop stayed 32. Images: mobile square 97×97 (Figma), portrait 97×121, landscape 97×55, adapt = each image's own ratio (97×97 / 97×65), "same as desktop" + size 180 = 180×225; desktop 292×364 in every case; object-fit cover, no stretching, no page overflow. Titles: 1-word (باندل, الأكسسوارات) and 2-word (الرؤوس البديلة) unchanged; 3-word names show "فرشاة الأسنان" / "منتجات العناية" on mobile and in full on desktop; 4-word and repeated-space cases checked with the same Liquid logic in a temporary template (deleted). Links and link accessible names are unchanged. RTL: mobile swipe reaches the end, progress 40%→100%; desktop next arrow scrolls (−217) and disables. Class off: native look, no short-title markup, no `--sn-*` vars. Figma values restored (template identical to the pre-test backup). **QA caveat:** dev theme #190250942577 is shared, and at about 11:36 another session pushed a `layout/theme.liquid` that loads `dev1.css` instead of `dev2.css`. QA therefore injected the synced `dev2.css` in the test browser only; the shared layout was not overwritten. Theme Editor UI still not opened; historical preview checks do not count as user sign-off |
| S05 | PASS (2026-11-08, both nodes read; re-checked unchanged at implementation) | PASS (local only: Theme Check = 9 baseline, schemas/JSON parse, `node --check`, dev3.css tag once) | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | By design product media only (no pickers); render PENDING USER REVIEW | PENDING USER REVIEW (two-state test) | Visual QA is user-owned (skill hard rule 13). User checklist: E › S05 › Implementation "QA to run" + Fidelity corrections "Visual QA". The local fixture test of 2026-11-08 is not counted as QA evidence. 2026-11-09 fidelity pass and final alignment pass: static checks PASS (Theme Check 9 baseline) |
| S06 | PASS (`190:3851` + `190:4167` design context + metadata 2026-11-11; no motion) | PASS (local): Theme Check 2026-11-11 = 9 offenses = baseline (all stock files); template: 27 S06 blocks, every setting exists in its schema, selects/ranges valid, block_order consistent; CSS braces balanced, 25 SVG data URIs well-formed; classes in template = classes in CSS | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (product image, background, tank/PSI icons not uploaded; CTA product not set) | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS`: chip background/border/radius/padding, content width/padding, button colours stay when the class is removed) | Manual: 1480 / 390 / 375 / 360 vs Figma; tablet 768–989; scenarios A–F; hide each decoration block; RTL order; CTA hover/focus |
| S07 | Done (Figma nodes reported; S05 architecture reused) | Local checks reported in E/H; verify current branch before claiming pass | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | Merchant selects Bundles collection | PENDING USER REVIEW (`CLASS_ONLY` modifier; S05 shared rules) | Check branch synchronization and editor content |
| S08 | Done (both nodes) | PASS: Theme Check 9 = baseline; schemas + template JSON valid | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (RTL slider mirror) | Pending merchant images | PENDING USER REVIEW (`CLASS_PLUS_SETTINGS`) | Images, tooth icon, CTA link |
| S09 | PASS (2026-11-11, both nodes read) | PASS (local only: Theme Check = 9 baseline, schemas/template validated, CSS braces) | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | Video/poster/product pickers in the editor; render PENDING USER REVIEW | PENDING USER REVIEW (two-state test) | Checklist: E › S09 › Visual QA |
| S10 | PASS (`190:3943` + `190:4265` design context + metadata 2026-11-11) | PASS (local): Theme Check 2026-11-11 (after the mobile/generic fix) = 9 = baseline; `node --check` slideshow.js; template: 85 S10 blocks valid against schemas incl. allowed child types; edited schemas parse; CSS braces balanced | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (products not selected; exact spec icons for drop / tank / gauge / timer not uploaded) | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS`; featured start slide is functional and stays) | Manual: see S10 E "PENDING USER REVIEW" |
| S11 | Done (both nodes) | PASS: Theme Check 9 = baseline; JS syntax; schema + template JSON valid | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | Pending merchant bundle product, items, image | PENDING USER REVIEW (section-level class; removing it leaves the structure unstyled) | Bundle product, items, image |
| S12 | PASS (`190:4018` + `190:4349` design context 2026-11-12) | PASS (local): Theme Check 2026-11-12 = 9 = baseline; template 6 S12 blocks valid; `node --check` carousel-progress.js; CSS braces balanced | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (Blog not selected) | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS`: View all label, Read more label, date colour, image radius stay) | See S12 E "PENDING USER REVIEW" |
| S13 | Done (both Figma nodes reported) | Local checks reported in S13 implementation details; compare with actual branch | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | Merchant supplies 4 icons | PENDING USER REVIEW (`CLASS_PLUS_SETTINGS`) | Mobile order and centred subheading are merchant decisions |
| S14 | PASS (2026-11-12, both nodes read with screenshots) | PASS (local only: Theme Check = 9 baseline, template checked against schemas, CSS braces) | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | Optional icon image picker on the accordion; render PENDING USER REVIEW | PENDING USER REVIEW (two-state test) | Checklist: E › S14 › Visual QA |
| S15 | Project-level mapping only | — | — | — | — | — | — | Not started in supplied plan |

**QA provenance:** The original document included historical agent-operated S04 preview checks from before the no-preview policy. Those claims remain in the row above solely as historic observations; all final visual QA is `PENDING USER REVIEW` absent explicit user evidence. Do not run a preview to reconcile them.

## G. Global risks & dependencies

**Confirmed facts (2026-11-08):**
- Container: Figma's desktop content is 1376px inside a 1480px frame (52px margins). Horizon has 40px desktop margins and a 120rem (1920px) "normal" page width, so at 1480px the content is 1400px.
- Gutters: Figma mobile 24px (20px in some sections) vs Horizon 16px. Horizon scales padding ×0.7 below 990px.
- Tokens: Cairo, `#176bb0` (primary button), `#f0fafe` and `#dcf2fb` (palette) match. The theme foreground is `#000000` vs Figma `#131311`, and theme H1/H2 are 56/48px vs Figma display 56, H1 40, H2 32.
- Theme Check baseline: 9 offenses (2 errors, 7 warnings), listed in horizon-architecture.md.
- The `header` schema has 42 settings (Theme Check warning; not a platform limit).
- Media: the merchant uploads final images and videos through the Theme Editor. No Figma exports go in the code.
- Preview: agents must not run, attach to or sync with any Shopify preview/dev server, or run browser automation (Skill hard rule 13, 2026-11-09). Visual QA belongs to the user and stays `PENDING USER REVIEW` until the user supplies evidence. Earlier S04 QA used a preview; per the user it is not accepted as sign-off.
- Shared dev theme (2026-11-09): #190250942577 is the CLI development theme for more than one developer session. At about 11:36 another session's `layout/theme.liquid` (loading `dev1.css` but not `dev2.css`) replaced Dev2's, so developer CSS links in the shared layout can overwrite each other. Needed: one agreed `theme.liquid` that loads every initialized developer file, or a separate development theme per developer.

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
| 2026-11-08 | S03 analyzed and planned by Dev1: native `hero` + `section` (Icons with text) composition, `custom_class` on hero/group/section, CSS in `dev1.css` | Native-first; Hero and Trust stay independent | S03; `hero`, `group`, `section` schemas; `snippets/section.liquid` | User approval + S03-D1…D6 before implementation |
| 2026-11-08 | S03 plan refined with the user's D1–D6: `group` Position dropdowns (no new block), gradient fallback + native desktop/mobile images, stacked ≤989, optional `text_mobile` on `text`, static border; `section` snippet change withdrawn (card-group class + `:has()`) | User direction; less invasive shared changes | S03; `hero`, `group`, `text` schemas; `snippets/text.liquid` | Go-ahead + D4 snippet approval |
| 2026-11-08 | S03 implemented by Dev1 (approved architecture); `dev1.css` initialized and loaded; `index.json` gets hero + trust before the disabled product list | User approval of S03 implementation | S03; `hero`, `group`, `text`, `snippets/text.liquid`, `layout/theme.liquid`, `index.json` | User-owned visual QA + two-state test (PENDING USER REVIEW); merchant uploads product image and icons |
| 2026-11-09 | S03 refinement by Dev1 after the user's screenshot comparison: product image box re-measured, CTA invisible-label root cause fixed, icon size caps, mobile trust card, new opt-in mobile alignment (`group` Content position, `text` Text alignment; button reuses native Mobile width) | Figma re-inspection + user feedback | S03; `dev1.css`, `group` (40), `text` (21), `snippets/text.liquid`, `index.json` | User-owned visual QA (PENDING USER REVIEW) |
| 2026-11-09 | S03 final pass by Dev1: commit `4820831` (Dev2's S04 from the theme) had dropped `text` `mobile_text`/`mobile_alignment` and removed S03 from `index.json`; both restored additively next to Dev2's work. Trust overlap moved to new opt-in `section` settings (58/49); trust padding/gaps/icon size now follow native settings on desktop | Trust mobile text not applying; user wants editor controls | S03; `text` (22), `section` (30), `dev1.css`, `index.json` | User-owned visual QA; avoid theme→git syncs that overwrite other developers' files |
| 2026-11-09 | S03 Trust Strip correction by Dev1: overlap ranges fixed to ≤101 steps (0–150 made section.liquid unsavable, so no overlap was live); hero stage bottom-anchored on desktop; mobile cells → equal grid columns, nowrap removed; card radius/border/background/padding via native settings; new opt-in section settings content max width + Card sizes (section at 40) | User editor check: strip wrong on desktop + mobile | S03; `section` (40), `dev1.css`, `index.json` | User-owned visual QA (PENDING USER REVIEW) |
| 2026-11-09 | S03 stage/trust refinement by Dev1: hero stage offsets (desktop X/Y, mobile Y) via `translate` on the stage group; product image anchored to the bottom of its box (`object-position`); mobile trust gap relabelled + capped at 6% | Merchant editor review | S03; `hero` (40), `section` label, `dev1.css`, `index.json` | User-owned visual QA (PENDING USER REVIEW) |
| 2026-11-09 | S03 product position + mobile trust typography by Dev1: image `object-position` 87.4% measured from the Figma PNG (Figma stretches it +11%); stage position settings renamed with clear up/down help; new mobile trust title/description size + line-height settings (tile sizes now derived from icon size, mobile padding top+sides merged; section stays 40) | Merchant review: product too low, mobile trust text off | S03; `hero` labels, `section`, `dev1.css`, `index.json` | User-owned visual QA (PENDING USER REVIEW) |
| 2026-11-09 | S03 mobile trust typography controls fixed by Dev1: per-text-block "Font size — Mobile" / "Line height — Mobile" (text 24, snippet output, 0 = desktop size); trust Figma sizes in dev1.css lowered to element specificity so native Size/Color win; section-level typography settings removed (section 37) | Merchant: mobile trust text size not adjustable | S03; `text`, `snippets/text.liquid`, `section`, `dev1.css`, `index.json` | User-owned visual QA (PENDING USER REVIEW) |
| 2026-11-09 | S03 mobile Trust card width fixed by Dev1: `auto` width in the centred section column made the card shrink-to-fit; now explicit width from new "Trust card width — Mobile" (346, capped at screen − 16) with Figma 24/20 gutters | Merchant mobile screenshot: card narrow, text wrapping | S03; `section` (38), `dev1.css`, `index.json` | User-owned visual QA (PENDING USER REVIEW) |
| 2026-11-11 | S06 F1 Banner implemented by Dev1 on the native `hero` (category C, no schema change): content/stage/decoration groups + text/image/icon/button blocks; decorations as hideable blocks drawn with exact Figma SVG shapes in `dev1.css`; inserted after `sn_home_trust` | Figma `190:3851` / `190:4167`; native-first audit (hero > section > media-with-content) | S06; `dev1.css` (appended), `index.json` | User-owned visual QA; merchant media; S04/S05 to be inserted before S06 |
| 2026-11-11 | S06 audit by Dev1: confirmed native `hero` (no custom files; the "F1 Banner" instance name removed); product image box now follows the image block's native Aspect ratio + Width (height-led, contain), sample t-shirt placeholder replaced by an editor-only dashed slot and hidden on the storefront; background = hero Media (+ mobile) | Merchant: placeholder, image behaviour, apparent custom section | S06; `dev1.css`, `index.json` | User-owned visual QA |
| 2026-11-11 | S06 product image size fixed by Dev1: box = Figma product layer (438 / 280) instead of the internal 558 / 400 fill square; native image Width / Mobile width now literally % of the stage (S06 58% / 72%), height from Aspect ratio, contain | Merchant: uploaded product rendered at the wrong scale | S06; `dev1.css`, `index.json` | User-owned visual QA |
| 2026-11-11 | S10 Choose Your Care implemented by Dev1 on the native `carousel` section (`_card` → `product-card` per product, category C): product picker per card, dynamic description, native price + custom-Liquid discount pill, spec rows as `_product-card-group` (icon + text); opt-in extensions: `custom_class` on `carousel` / `_product-card-group`, `icon` allowed in `_product-card-group`, `_card` "Featured card" → initial slide + featured style; CSS scroll-driven progress bar | Figma `190:3943` / `190:4265`; `product-list` can't vary specs per product or feature one card | S10; `carousel`, `_carousel-content`, `_card`, `_product-card-group`, `dev1.css`, `index.json` | Merchant selects products; user-owned visual QA |
| 2026-11-11 | S10 mobile carousel + generic cards by Dev1: native `slideshow.js` initial-slide fix (select() no-op), start-snap with equal card widths ≤989, RTL card order, generic block labels, featured badge/button follow the "Featured card" checkbox, carousel card-size settings (14), empty-product handling | Merchant: wrong mobile start composition; product-specific card names | S10; `slideshow.js`, `carousel`, `dev1.css`, `index.json` | User-owned visual QA |
| 2026-11-11 | S10 image fit / arrows / mobile centring / active card by Dev1: section "Product image fit" (contain), native Icon None, centre snap with zero scroll padding (symmetric, first/last centre), active look follows the centred card via CSS view timelines (desktop keeps the Featured card checkbox), badge stays with its product | Merchant review: cropped image, arrows, shifted mobile track, static featured look | S10; `carousel` (15), `dev1.css`, `index.json` | User-owned visual QA |
| 2026-11-11 | S10 active card + mobile start reworked by Dev1: new opt-in `carousel-active-card.js` (geometry: centred card → `is-active-card`, `--carousel-progress`, centres the Featured card on load); scroll-driven CSS and both core patches (`slideshow.js`, `_carousel-content`) removed | Merchant: featured look static, mobile still off centre | S10; `carousel` (16), new asset, `_card`, `dev1.css`, `index.json` | Runtime NOT VERIFIED; user-owned QA |
| 2026-11-11 | S10 overflow / desktop / active zoom by Dev1: desktop carousel contained in the 1376 column with equal cards (centre-snap gutters only for 4+), Featured card layout differences removed (`featured_card_width` → `active_card_zoom`), active card zoom via transform, grid `min-width: 0` + scoped `overflow-x: clip` | Merchant screenshots: desktop row full-bleed / cut cards, two "featured" cards, mobile strip | S10; `dev1.css`, `carousel`, `index.json` | Runtime NOT VERIFIED; user-owned QA |
| 2026-11-11 | S10 desktop bar / last card / mobile CTA by Dev1: progress bar ≤989 only; S10-only mouse drag in `carousel-active-card.js` (native drag release is start-aligned → one card short, last card unreachable); gutters as flex spacers; mobile card bottom padding ≥ side padding | Merchant: desktop bar visible, last RTL card not current, mobile shifted, CTA too low | S10; `carousel-active-card.js`, `dev1.css` | Runtime NOT VERIFIED; user-owned QA |
| 2026-11-11 | S10 mobile off-centre fixed at the root by Dev1: the S10 `gap` shorthand added column gaps to the section's 3-column grid (+44px on mobile, overflow to the left in RTL); now `row-gap` like native; obsolete overflow guards removed | Merchant: mobile still shifted after several attempts | S10; `dev1.css` | Rendered geometry NOT VERIFIED; user-owned QA |
| 2026-11-12 | S12 Blog implemented by Dev1 on native `featured-blog-posts` (grid + native mobile carousel); opt-in card "Show excerpt" / "Read more label", section "View all" link + custom class + class-bound progress / image height / mobile card width; new `carousel-progress.js` | Figma `190:4018` / `190:4349`; native-first audit | S12; `featured-blog-posts` (22), `_featured-blog-posts-card` (14), new asset, `dev1.css`, `index.json` | Merchant selects the Blog; user-owned visual QA |
| 2026-11-12 | S12 audit by Dev1: "Blog posts: Carousel" is a preset of native `featured-blog-posts`, the type S12 already uses (no custom section, no migration); instance switched from grid + mobile carousel to the Carousel preset layout; desktop peek 0 under the class | Merchant: reuse the native Blog Post Carousel | S12; `index.json`, `dev1.css` | User-owned visual QA |
| 2026-11-12 | S12 switched by Dev1 to manual cards on the native `carousel` section (image / text blocks per card, add / remove cards); `carousel` +4 opt-in settings (image height, progress bar, View all label / link); `featured-blog-posts` extensions reverted to stock | Merchant: upload media and text in the Theme Editor and add several blocks | S12; `carousel` (20), `dev1.css`, `index.json` | User-owned visual QA |
| 2026-11-12 | S12 back on native `featured-blog-posts` by Dev1 (merchant choice): Grid desktop + native Carousel on mobile; Read more → `article.url`; arrows before the label (RTL); View all → `blog.url`, automatic when more posts than shown; mobile heading gap setting (root cause `.rte` heading margin); `carousel` S12 additions removed and S10 stale keys cleaned | Merchant review: arrows, Read more destination, desktop carousel, View all, mobile heading gap | S12; `featured-blog-posts` (23), `_featured-blog-posts-card` (14), `carousel` (16), `dev1.css`, `index.json` | User-owned visual QA |
| 2026-11-08 | Dev2 initialized: `assets/dev2.css` created and loaded in `layout/theme.liquid` after `main.css` | Developer CSS ownership | All | — |
| 2026-11-08 | `snippets/custom-class.liquid` created and tested (first use); `custom_class` added to `collection-list` | On-demand custom class policy | `collection-list` | Results in the registry log |
| 2026-11-08 | S04 implemented on native `collection-list` (category B), placed first in `index.json` order (before the disabled `product-list`) | Native-first reuse; Figma order (S04 precedes S05+; S01–S03 live in header-group/hero) | S04, `templates/index.json` | Merchant picks collections; hero (S03) should be inserted above S04 later |
| 2026-11-08 | S04 aligned to the native `collections_carousel` preset (Scenario B): instance name restored to `t:names.collections_carousel`, heading wrapped in the preset's `group` "Header". New Skill hard rule 12 (native preset reuse + keep native names) and a matching Stage F check | Merchant: Theme Editor showed the heading instead of Horizon's preset name | S04, `templates/index.json`, Skill | Re-check in the Theme Editor UI |
| 2026-11-09 | S04 recovered from `894eb4e` after an external working-tree rollback (see S04, area E). Mobile title/image settings added on `collection-list` | Restore committed work without touching unrelated files | S04 and its 5 files | Find out what rewrote the working tree at 2026-11-08 17:37:18 (another agent tool, `agy.exe`, is attached to this folder) before running more automated tools here |
| 2026-11-09 | S04 responsive refinement: desktop heading size from the native text block, plus section settings `mobile_heading_size`, `mobile_image_ratio` and `mobile_title_word_limit` (the last implemented in native `collection-title` Liquid, opt-in). New Skill hard rule 14: analyze Desktop and Mobile Figma independently | Merchant: mobile heading must be 24 (desktop 32), independent mobile image ratio, two-word mobile titles | S04, `collection-list`, `collection-title`, `dev2.css`, `index.json`, Skill | Agree on how the shared dev theme's `theme.liquid` loads developer CSS (area G) |
| 2026-11-08 | **SUPERSEDED (historical only):** Preview QA tooling: `shopify theme dev` + headless system Chrome. Avoid `sed -i` on theme files while `theme dev` runs (its temp file triggers an upload-error overlay) | Lesson from S04 QA | All | **Replaced 2026-11-09** (next row) |
| 2026-11-09 | No previews, server processes, push/pull or browser automation by agents; visual QA belongs to the user (`PENDING USER REVIEW`). Rule copied from `.agents/skills/…/SKILL.md` into `.claude/skills/…/SKILL.md` (hard rule 13, Stages F/G/H); the Desktop/Mobile rule became 14. The Dev2 preview (`theme dev` on #190250942577) was stopped | User instruction | All | — |
| 2026-11-09 | Theme Editor control policy adopted (Skill hard rule 15; details in `references/schema-extension-policy.md`): every merchant-adjustable visual value gets a Theme Editor control (native first, smallest safe extension, separate Desktop/Mobile controls, Figma values as editable defaults); only listed technical exceptions stay in code. Replaces the earlier practice of putting exact Figma values in class-scoped CSS (old hard rule 5). Plan step D now records a control map; Stage F adds a hardcoded-value audit and Stage G a two-value control test | Merchant must be able to adjust the design without code | All future section work | Applies from the next task. S04 is not changed retroactively (user confirmed it is correct); its remaining literals stay as they are |
| 2026-11-11 | S08 implemented on the native `section` preset "Image compare" + `comparison-slider` (category B/D). `custom_class` added to `section` (rendered in shared `snippets/section.liquid`, opt-in). Opt-in settings added to `section`, `comparison-slider`, `text`, `group`, `button` (see S08). RTL mirror fix for the native slider under the class | Native-first reuse; Theme Editor control policy (rule 15) | S08; blocks `text`, `group`, `button`, `comparison-slider`; `snippets/section.liquid` | Visual QA by the user; merchant images, tooth icon, CTA link |
| 2026-11-11 | S08 desktop refinement: `section` setting `content_max_width` (row cap, default 1360); slider 57% / content 41%; content group Height Fill + Space between with a class-scoped stretch rule; content gap 20 → 14 so heading/CTA align with the 535px image | Image grew with the 1920px page width; user asked for top/bottom alignment, which Figma itself misses by 8.5px | S08 | Visual QA by the user |
| 2026-11-11 | S08 mobile wrapping: `text` block "Text wrap" gains option Normal (`wrap`, default stays Pretty); S08 heading + description set to Normal | Native `text-wrap: pretty` moved a word to avoid one-word last lines, unlike Figma's greedy wrapping | S08; block `text` | Visual QA by the user |
| 2026-11-11 | S08 desktop description wrap: investigated, no change. Code width 557.6 vs Figma 557, typography and wrap mode match | Cause needs a browser check (stale preview vs Cairo rendering width); no fragile width tweak | S08 | User console check |
| 2026-11-11 | S08 desktop wrapping, measured from the user's screenshot: benefit texts Pretty → Normal; description text given Figma's space before the comma (user approved) | Metrics and width match Figma; the differences were the wrap setting (benefits) and the text content (description) | S08 | User screenshot at 1480 / 390 |
| 2026-11-11 | S11 bundle on native `product-hotspots` with opt-in "Bundle layout" (category D): rows/total/add-all button from the hotspot blocks, `sn-bundle.js`, opt-in touch popup in `product-hotspot.js`, no checkboxes | No native bundle section; product-hotspots already links a product to each marker. User chose separate lines + Admin automatic discount and a mobile popup | S11; `product-hotspots`, `_hotspot-product`, `product-hotspot.js` | Merchant setup; visual + commerce QA by the user |
| 2026-11-11 | S11 correction: `bundle_product` picker (purchase model A = bundle product only, B = components); editor-only guidance and placeholder rows; image column hidden on the storefront without an image; `unavailable_text` replaced by Horizon translations | First version had no parent bundle picker and showed nothing until products were picked; Liquid can't enumerate bundle components | S11 | Merchant picks bundle product + components; visual + commerce QA by the user |
| 2026-11-11 | S11 rebuilt as dedicated section `sn-product-bundle` (category E, merchant-approved): bundle product = purchase (model A only), "Bundle item" blocks drive rows + hotspots + popups; native product-hotspots files restored | Native hotspots adaptation did not give the merchant a usable bundle setup | S11; `index.json` `bundle_sn_home` replaced in place | Merchant setup; visual + commerce QA by the user |
| 2026-11-11 | S11: editor-only note (bundle data box) removed at the merchant's request; placeholder rows for empty "Bundle item" blocks kept | The note cluttered the Theme Editor preview; product data is now correct (LE 2,499 / compare-at 3,100, available, 7 in stock) | S11 | — |
| 2026-11-12 | S13 on native `section` preset "Icons with text" (B/C): opt-in `group` columns, `text` mobile line height/alignment + 13px option, `image` fixed width + no live placeholder | Closest native composition; custom illustrations need image uploads | S13; blocks `group`, `text`, `image` | Icons from the merchant; visual QA by the user |
| 2026-11-12 | S13: `group` "Mobile display order" (`mobile_order`, CSS order on phones) set to the Figma mobile order | Figma mobile and desktop card orders differ | S13; block `group` | Visual QA by the user |
| 2026-11-12 | S13: mobile subheading alignment start → center (text block "Mobile alignment") at the merchant's request (Figma mobile was right-aligned) | Merchant prefers a centred subheading on phones, including the last line | S13 | — |
| 2026-11-08 | S05 analyzed and planned by Dev3: reuse `product-list` (`product_list_fa6P9H`), class `sn-home-bestsellers` (collision check: no matches), CSS in `dev3.css` | Figma `190:3844` / `190:4149` | S05, S07 | User approval of S05-Q1…Q6, then implement |
| 2026-11-08 | S05 refined with user decisions D1–D10 (R1–R10). Per-instance mobile Quick Add, JS `scroll-progress` component, readable mobile type, opt-in View All / rating label / discount badge / Quick Add label. `custom-liquid` + `closest` rejected (not documented) | User review of the S05 plan | S05 (product-list, card blocks) | Approve R6 (`quick-add` snippet) and optional R7 (`product-price.js`), then implement |
| 2026-11-08 | S05 implemented by Dev3 (R6 approved; R7 `product-price.js` not done per user). `dev3.css` initialized + loaded. `custom-class.liquid` and the reusable `scroll-progress` component created. Description from the native product description. `index.json` section enabled | User implementation request | S05; shared: `quick-add` snippet, `text`/`price`/`review`/gallery/button blocks (all opt-in) | Visual QA by the user; merchant selects the collection |
| 2026-11-09 | S05 Figma fidelity corrections by Dev3: image crop position, responsive card/image radius, metafield product badge, inline price row, native icon-block CTA, Quick Add bar/FAB icon and geometry, View All icon settings. All values moved from CSS to opt-in Theme Editor settings | User fidelity request (Figma re-inspected) | S05; shared opt-in: `_product-card-gallery`, `_product-card`, `_product-card-group` (icon allowed), `price`, `_product-list-button` | Visual QA by the user; merchant creates the `custom.product_badge` metafield definition |
| 2026-11-09 | S05 final visual alignment by Dev3: discount badge inline (root cause `.text-block > *` width 100%), CTA arrow before the text (user request), mobile badge/description/price/card spacing via new opt-in settings on `price`, `text`, `_product-card`, `_product-card-group` | User request + Figma re-read | S05; shared opt-in blocks | Visual QA by the user |
| 2026-11-09 | S05 mobile switched to exact Figma type sizes (supersedes R3, user decision). Discount badge color/size bug fixed (base.css `.text-block.h6 > *` outranked the badge rules). Shared `text-responsive-style` snippet; mobile size settings on `product-title`, `review`, `icon` | User request + Figma re-read | S05; shared opt-in blocks | Visual QA by the user, incl. the color picker |
| 2026-11-11 | S07 Bundles implemented by Dev3 as a second native `product-list` instance (`product_list_Rxv4hg`) cloned from S05 with new IDs; collection left for the merchant; mobile spacing via modifier `sn-home-bundles` (S05 values moved to CSS variables, unchanged) | User request + Figma `351:4546` / `190:4204` | S07; `dev3.css` shared rule set | Merchant selects the Bundles collection; visual QA by the user |
| 2026-11-11 | S09 Reels implemented by Dev3 with the native `carousel` section (`carousel_sn9Rls`): one `_card` per Reel holding a `video` block and a `product-card` block (title, price, featured-image thumbnail from the product). Opt-in extensions: carousel `mobile_centered`/`mobile_card_width`/`show_scroll_progress`/`custom_class`; video `uploaded_poster`/`uploaded_aspect_ratio`/play-button settings; product-card `hide_when_empty`. Reuses `scroll-progress` | User request + Figma `190:3935` / `190:4254` | S09; shared opt-in: `carousel`, `video`, `product-card` | Merchant uploads videos and selects products; optional `custom.coming_soon_label` definition; visual QA by the user |
| 2026-11-11 | S09 missing from the Theme Editor. Theme "Snosha/dev3" syncs from GitHub `dev3`; its bot commit `b56ecb5` showed the theme kept the pre-S09 `index.json` (code files were accepted). Likely cause: a metafield dynamic source without a definition, plus empty-string resource pickers. S09 restored locally from `05242e7` without those values. **Rule:** never write metafield dynamic sources into templates before the definition exists, and omit empty resource pickers instead of writing `""` | User report + git history | S09; all future template edits | User commits + pushes `index.json`; checks the theme's GitHub sync status; confirms S09 in the editor |
| 2026-11-12 | S14 FAQ implemented by Dev3 with the native `section` in the FAQ-preset structure (`section_sn14Faq`): heading group + a row group holding two `accordion` blocks (questions 1–3 / 4–6). Desktop columns swapped with `row-reverse` in `dev3.css`; DOM and tab order 1 → 6 = mobile. Opt-in extensions: `section` `custom_class` (via `snippets/section.liquid`); accordion "Row cards", custom question typography, icon color / size / image | User request + Figma `217:14604` / `217:14813` | S14; shared opt-in: `section` (+ snippet), `accordion` | Merchant writes answers 1–3, 5, 6; commit + push; visual QA by the user |
| 2026-11-09 | Process correction: during S05 Dev3 ran CLI store commands (`theme list`, scratchpad-only `theme pull`, a failed `theme dev`), inspected other sessions' processes, and ran a local headless fixture. This is against skill hard rule 13 (`.agents/skills/…/SKILL.md`). No files were uploaded and no other session was touched | User instruction | All Dev3 work | Local, non-server code checks only from now on; visual QA = PENDING USER REVIEW |
| 2026-11-12 | S11 mobile vs Figma 190:4318: total row on one centred line (gap 20, desktop keeps 34); prices without trailing zeros (2,499 not 2,499.00, as in Figma); description keeps "متكاملة للعناية" together (non-breaking space in the text) so line 1 ends at "اختيارات" | User screenshot: description wrapped differently and the total split over two lines | S11; `sn-product-bundle.liquid` money filter, `dev2.css`, `index.json` description text | Visual QA by the user |

## Merge reconciliation note — 2026-11-12 (documentation only)

- Consolidated overlapping Dev1/Dev2/Dev3 ownership snapshots into four developer rows, preserving each developer's classes, section assignments, and reported initialization history. Conflicting initialization observations are not resolved as facts without checking the actual worktree.
- Consolidated the section registry to **15 unique S-IDs** in Figma order and retained each implemented record over older `NOT_STARTED` placeholders.
- Consolidated QA to **15 unique S-IDs**, keeping each section's specific evidence and not treating historic pre-policy preview results as user sign-off.
- Preserved **all detailed Section Decisions in E** and the chronological change log in H without rewriting historical decisions or removing superseded approaches.
- This edit is confined to the project-plan document. It does **not** validate the current `index.json`, shared Liquid schema, remote Theme Editor state, CSS load tags or merged Git branches.
