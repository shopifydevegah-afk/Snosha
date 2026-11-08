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
| Current homepage state | `index.json`: `collection-list` (`collection_list_sn_home`, S04) then `product-list` (`product_list_fa6P9H`, **disabled**) (2026-11-08) |

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
| Dev2 | `assets/dev2.css` | Initialized 2026-11-08 (loaded once after `main.css`) | S04 |
| Dev3 | `assets/dev3.css` | Not initialized | — |

**Custom classes owned:** `sn-home-collections` (Dev2, S04, `collection-list` on index).
**Shared-file claims (active):** none. (Dev2 claimed and released `layout/theme.liquid`, `templates/index.json`, `snippets/custom-class.liquid` on 2026-11-08.)

## D. Section registry

Logical areas from the Figma homepage, in Figma order. A row isn't necessarily one Shopify section file. Nodes were verified with `get_metadata` on 2026-11-08.

| ID | Section | Desktop node | Mobile node | Target | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
|---|---|---|---|---|---|---|---|---|---|---|
| S01 | Announcement Bar | `190:3768` | `190:4083` | header-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |
| S02 | Header / Navigation | `190:3769` + `190:3776` | `190:4084` | header-group (global) | — | NOT_STARTED | — | — | — | Global. `header` already has 42 settings (G) |
| S03 | Hero + Trust Strip | `190:3789` | `335:3959` | index.json | — | NOT_STARTED | — | — | — | — |
| S04 | Collections | `190:3830` | `190:4133` | index.json | Dev2 | IMPLEMENTED (QA evidence collected; awaiting real collections + user review) | B | `collection-list`, preset `collections_carousel` (native name kept) | `sn-home-collections` | Merchant must pick collections in the Theme Editor |
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

## F. QA & progress

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S04 | Done (both nodes) | PASS: Theme Check 9 = baseline; schema + template JSON valid | PASS at 1480 (geometry measured in preview: heading +50, cards +142, 292w/24 gap/72 inset, arrows 44px at 50px, top 304) + 1200 | PASS at 390 (35/9 padding, 97w/10 gap/20 inset, progress 350×4, 40%→~100% on scroll); tablet 820 checked | PASS (Arabic `dir=rtl`; arrows/progress direction correct). LTR not tested | Collection image/title (native); placeholders until collections picked | `CLASS_PLUS_SETTINGS` — two-state test PASS (class cleared: all Figma CSS off, native look, no overflow, no new console errors) | Pick real collections; review with final images; user sign-off for VERIFIED. After the preset-alignment fix: Theme Check 9 = baseline, template JSON valid, 1480/820/390 geometry identical to before (screenshots), no new console errors. Two-state test not re-run (CSS unchanged); Theme Editor name not yet seen in the editor UI |
| S01–S03, S05–S15 | — | — | — | — | — | — | — | Only project-level mapping done; no section-level analysis yet |

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
| 2026-11-08 | Dev2 initialized: `assets/dev2.css` created and loaded in `layout/theme.liquid` after `main.css` | Developer CSS ownership | All | — |
| 2026-11-08 | `snippets/custom-class.liquid` created and tested (first use); `custom_class` added to `collection-list` | On-demand custom class policy | `collection-list` | Results in the registry log |
| 2026-11-08 | S04 implemented on native `collection-list` (category B), placed first in `index.json` order (before the disabled `product-list`) | Native-first reuse; Figma order (S04 precedes S05+; S01–S03 live in header-group/hero) | S04, `templates/index.json` | Merchant picks collections; hero (S03) should be inserted above S04 later |
| 2026-11-08 | S04 aligned to the native `collections_carousel` preset (Scenario B): instance name restored to `t:names.collections_carousel`, heading wrapped in the preset's `group` "Header". New Skill hard rule 12 (native preset reuse + keep native names) and a matching Stage F check | Merchant: Theme Editor showed the heading instead of Horizon's preset name | S04, `templates/index.json`, Skill | Re-check in the Theme Editor UI |
| 2026-11-08 | Preview QA tooling: `shopify theme dev` + headless system Chrome. Avoid `sed -i` on theme files while `theme dev` runs (its temp file triggers an upload-error overlay) | Lesson from S04 QA | All | — |
