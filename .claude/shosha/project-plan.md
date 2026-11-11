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
| Current homepage state | `index.json` has only `product-list` (`product_list_fa6P9H`), **disabled** (verified 2026-11-08) |

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
| Dev1 | `assets/dev1.css` | Initialized 2026-11-08 (file created; loaded once in `layout/theme.liquid` after `main.css`, tag count 1, Cairo line unchanged) | S03, S06 |
| Dev2 | `assets/dev2.css` | Not initialized | — |
| Dev3 | `assets/dev3.css` | Not initialized | — |

**Custom classes owned:** Dev1 (S03, `dev1.css`): `sn-home-hero`, `sn-home-hero-content`, `sn-home-hero-overline`, `sn-home-hero-stage`, `sn-home-hero-chip`, `sn-home-trust-card`, `sn-home-trust-item`, plus the Liquid-generated position classes `sn-float`, `sn-float--*`, `sn-float-m--*` (inert outside `.sn-home-hero-stage`). Dev1 (S06, `dev1.css`): `sn-home-f1-banner`, `sn-home-f1-content`, `sn-home-f1-tag`, `sn-home-f1-specs`, `sn-home-f1-spec`, `sn-home-f1-stage`, `sn-home-f1-watermark`, `sn-home-f1-arc`, `sn-home-f1-sparkles`, `sn-home-f1-glow`, `sn-home-f1-waves` (collision check 2026-11-11: none).
**Shared-file claims (active):** none. (Dev1/S03 claims on `templates/index.json`, `blocks/group.liquid`, `blocks/text.liquid`, `snippets/text.liquid`, `snippets/custom-class.liquid`, `layout/theme.liquid` released 2026-11-08 after implementation.)

## D. Section registry

Logical areas from the Figma homepage, in Figma order. A row isn't necessarily one Shopify section file. Nodes were verified with `get_metadata` on 2026-11-08.

| ID | Section | Desktop node | Mobile node | Target | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
|---|---|---|---|---|---|---|---|---|---|---|
| S01 | Announcement Bar | `190:3768` | `190:4083` | header-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |
| S02 | Header / Navigation | `190:3769` + `190:3776` | `190:4084` | header-group (global) | — | NOT_STARTED | — | — | — | Global. `header` already has 42 settings (G) |
| S03 | Hero + Trust Strip | `190:3789` | `335:3959` | index.json | Dev1 | IMPLEMENTED | C + B + D (D4 text snippet) | `hero` (Hero) + `section` (Trust); blocks `group`, `text`, `button`, `image`, `icon` | `sn-home-hero*`, `sn-home-trust-card`/`-item`, inert `sn-float*` position classes | Implemented 2026-11-08; refined 2026-11-09 (Figma re-measured: product image box, CTA label fix, icon caps, mobile trust card, mobile alignment settings). **Visual QA: PENDING USER REVIEW** (user-owned per Skill rule 13). Shared edits: `blocks/group.liquid` (36→40, at the limit), `blocks/text.liquid` (now 22 incl. Dev2's `mobile_font_size`) + `snippets/text.liquid`, `sections/hero.liquid` (37→40, **at the limit**: product stage offsets), `sections/section.liquid` (28→40, **at the limit**: opt-in overlap, content max width, card sizes; 2026-11-09) |
| S04 | Collections | `190:3830` | `190:4133` | index.json | — | NOT_STARTED | — | — | — | — |
| S05 | Featured Collection | `190:3844` | `190:4149` | index.json | — | NOT_STARTED | — | — | — | Same design as S07 |
| S06 | F1 Banner | `190:3851` | `190:4167` | index.json | Dev1 | IMPLEMENTED | C (+ scoped CSS; no schema change) | `hero`; blocks `group`, `text`, `image`, `icon`, `button` | `sn-home-f1-banner`, `-content`, `-tag`, `-specs`, `-spec`, `-stage`, `-watermark`, `-arc`, `-sparkles`, `-glow`, `-waves` | Implemented 2026-11-11 after S03 trust (`sn_home_f1`, type `hero`; audit 2026-11-11: no custom files, product media fixed). Decorations = hideable blocks. **Visual QA: PENDING USER REVIEW**. Merchant: product image, optional background, tank/PSI icons, CTA product |
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

## F. QA & progress

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S01–S02, S04–S05, S07–S15 | — | — | — | — | — | — | — | Only project-level mapping done; no section-level analysis yet |
| S06 | PASS (`190:3851` + `190:4167` design context + metadata 2026-11-11; no motion) | PASS (local): Theme Check 2026-11-11 = 9 offenses = baseline (all stock files); template: 27 S06 blocks, every setting exists in its schema, selects/ranges valid, block_order consistent; CSS braces balanced, 25 SVG data URIs well-formed; classes in template = classes in CSS | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (product image, background, tank/PSI icons not uploaded; CTA product not set) | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS`: chip background/border/radius/padding, content width/padding, button colours stay when the class is removed) | Manual: 1480 / 390 / 375 / 360 vs Figma; tablet 768–989; scenarios A–F; hide each decoration block; RTL order; CTA hover/focus |
| S03 | PASS (both nodes re-inspected 2026-11-08 and again 2026-11-09 for the refinement; no motion) | PASS (local only): 2026-11-08 Theme Check at baseline (9); 2026-11-09 refinement + final pass: schema JSON/counts, template keys vs schemas, CSS braces (Theme Check not re-run). PENDING USER REVIEW: console/404, sanitizer output | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (final product image + icons not uploaded; placeholders in place) | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS`, see E) | User's manual checklist: Figma comparison at 1480 / 390 / 375 and tablet 768–989; image-only, text-only, no chips, trust alone, 3 and 5+ trust items; D5 8px readability; `mobile_text` click-to-edit; class on/off. Assisted review once the user sends screenshots |

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
