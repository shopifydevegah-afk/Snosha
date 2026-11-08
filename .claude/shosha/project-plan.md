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
| Dev1 | `assets/dev1.css` | Initialized 2026-11-08 (file created; loaded once in `layout/theme.liquid` after `main.css`, tag count 1, Cairo line unchanged) | S03 |
| Dev2 | `assets/dev2.css` | Not initialized | — |
| Dev3 | `assets/dev3.css` | Not initialized | — |

**Custom classes owned:** Dev1 (S03, `dev1.css`): `sn-home-hero`, `sn-home-hero-content`, `sn-home-hero-overline`, `sn-home-hero-stage`, `sn-home-hero-chip`, `sn-home-trust-card`, `sn-home-trust-item`, plus the Liquid-generated position classes `sn-float`, `sn-float--*`, `sn-float-m--*` (inert outside `.sn-home-hero-stage`).
**Shared-file claims (active):** none. (Dev1/S03 claims on `templates/index.json`, `blocks/group.liquid`, `blocks/text.liquid`, `snippets/text.liquid`, `snippets/custom-class.liquid`, `layout/theme.liquid` released 2026-11-08 after implementation.)

## D. Section registry

Logical areas from the Figma homepage, in Figma order. A row isn't necessarily one Shopify section file. Nodes were verified with `get_metadata` on 2026-11-08.

| ID | Section | Desktop node | Mobile node | Target | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
|---|---|---|---|---|---|---|---|---|---|---|
| S01 | Announcement Bar | `190:3768` | `190:4083` | header-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |
| S02 | Header / Navigation | `190:3769` + `190:3776` | `190:4084` | header-group (global) | — | NOT_STARTED | — | — | — | Global. `header` already has 42 settings (G) |
| S03 | Hero + Trust Strip | `190:3789` | `335:3959` | index.json | Dev1 | IMPLEMENTED | C + B + D (D4 text snippet) | `hero` (Hero) + `section` (Trust); blocks `group`, `text`, `button`, `image`, `icon` | `sn-home-hero*`, `sn-home-trust-card`/`-item`, inert `sn-float*` position classes | Implemented 2026-11-08; Theme Check at baseline. **Visual QA PENDING**: no safe preview (3 other `theme dev` sessions share the dev theme; the user chose to skip) and final media not uploaded yet. Shared edits: `blocks/group.liquid` (36→39), `blocks/text.liquid` (19→20) + `snippets/text.liquid`. `section` files not touched |
| S04 | Collections | `190:3830` | `190:4133` | index.json | — | NOT_STARTED | — | — | — | — |
| S05 | Featured Collection | `190:3844` | `190:4149` | index.json | — | NOT_STARTED | — | — | — | Same design as S07 |
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
- **Not run (PENDING):** storefront preview, Theme Editor load, screenshots vs Figma (1480/990/768/390/375/1920), RTL visual, overflow check, two-state class test, `custom-class` sanitizer test matrix, `mobile_text` click-to-edit check, D5 8px readability check. Reason: 3 other `theme dev` sessions (ports 9292/9393/9400) share the CLI development theme; the user chose to skip the preview rather than overwrite them. Final product image and icons are not uploaded yet.
- Expected reversibility (untested): `CLASS_PLUS_SETTINGS`: hero content_direction row / gap 0 / height auto; content group padding 34/96/40/48 and gap 16; chip float positions; button `button-custom` colors + `width_mobile`; text colors; trust section padding 0. `mobile_text` is not tied to a class (renders natively per device).

## F. QA & progress

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S01–S02, S04–S15 | — | — | — | — | — | — | — | Only project-level mapping done; no section-level analysis yet |
| S03 | PASS (both nodes re-inspected 2026-11-08; decor values measured; no motion) | PASS: Theme Check at baseline (9), schema counts, template JSON, CSS parse (Edge). PENDING: storefront console/404, sanitizer matrix | PENDING | PENDING | PENDING | PENDING (final product image + icons not uploaded; placeholders in place) | PENDING (expected `CLASS_PLUS_SETTINGS`, see E) | Needs a safe preview (dedicated theme or an agreed slot on the shared dev theme), then: screenshots 1480/990/768/390/375/1920; image-only, text-only, no chips, trust alone, 3 and 5+ trust items; D5 8px readability at 390/375; `mobile_text` click-to-edit; two-state test |

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
| 2026-11-08 | S03 implemented by Dev1 (approved architecture); `dev1.css` initialized and loaded; `index.json` gets hero + trust before the disabled product list | User approval of S03 implementation | S03; `hero`, `group`, `text`, `snippets/text.liquid`, `layout/theme.liquid`, `index.json` | Visual QA + two-state test once a safe preview exists; merchant uploads product image and icons |
