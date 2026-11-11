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
| Dev2 | `assets/dev2.css` | Initialized 2026-11-08 (loaded once after `main.css`) | S04, S08 |
| Dev3 | `assets/dev3.css` | Not initialized | — |

**Custom classes owned:** `sn-home-collections` (Dev2, S04, `collection-list` on index); `sn-home-before-after` (Dev2, S08, `section` "Image compare" on index).
**Shared-file claims (active):** none. (Dev2 claimed and released `layout/theme.liquid`, `templates/index.json`, `snippets/custom-class.liquid` on 2026-11-08.)

## D. Section registry

Logical areas from the Figma homepage, in Figma order. A row isn't necessarily one Shopify section file. Nodes were verified with `get_metadata` on 2026-11-08.

| ID | Section | Desktop node | Mobile node | Target | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
|---|---|---|---|---|---|---|---|---|---|---|
| S01 | Announcement Bar | `190:3768` | `190:4083` | header-group (global) | — | NOT_STARTED | — | — | — | Global: affects all pages |
| S02 | Header / Navigation | `190:3769` + `190:3776` | `190:4084` | header-group (global) | — | NOT_STARTED | — | — | — | Global. `header` already has 42 settings (G) |
| S03 | Hero + Trust Strip | `190:3789` | `335:3959` | index.json | — | NOT_STARTED | — | — | — | — |
| S04 | Collections | `190:3830` | `190:4133` | index.json | Dev2 | IMPLEMENTED (recovered 2026-11-09; responsive refinement 2026-11-09: mobile heading size, image ratio, title length; visual QA PENDING USER REVIEW) | B | `collection-list`, preset `collections_carousel` (native name kept) | `sn-home-collections` | Merchant must pick collections in the Theme Editor |
| S05 | Featured Collection | `190:3844` | `190:4149` | index.json | — | NOT_STARTED | — | — | — | Same design as S07 |
| S06 | F1 Banner | `190:3851` | `190:4167` | index.json | — | NOT_STARTED | — | — | — | — |
| S07 | Featured Collection 2 | `190:3896` | `190:4204` | index.json | — | NOT_STARTED | — | — | — | Reuse S05's decisions |
| S08 | Before / After | `190:3903` | `190:4222` | index.json | Dev2 | IMPLEMENTED (2026-11-11; visual QA PENDING USER REVIEW) | B/D | `section` preset `t:names.image_compare` + `comparison-slider` | `sn-home-before-after` | Merchant images, tooth icon, CTA link |
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
  - Content column is 41% ≈ 566 vs 557 at 1480.
  - Tablet (750–989) keeps the desktop row at 56/41%. There is no Figma frame for it, and the content column is narrow there.
- **Checks:** Theme Check 9 = baseline. All five schemas parse. `index.json` parses, and only the S08 section and its order entry were added (S04 untouched).
- **PENDING USER REVIEW:**
  - visual QA at 1480, 1200, 820, 390 and 375, plus RTL.
  - slider drag, touch and keyboard with two real images; empty-image placeholders; label positions.
  - every new control with two values; class on/off.
  - `index.json` was edited without a pull (rule 13).

## F. QA & progress

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S04 | Done (both nodes) | PASS: Theme Check 9 = baseline; schema + template JSON valid | PASS at 1480 (geometry measured in preview: heading +50, cards +142, 292w/24 gap/72 inset, arrows 44px at 50px, top 304) + 1200 | PASS at 390 (35/9 padding, 97w/10 gap/20 inset, progress 350×4, 40%→~100% on scroll); tablet 820 checked | PASS (Arabic `dir=rtl`; arrows/progress direction correct). LTR not tested | Collection image/title (native); placeholders until collections picked | `CLASS_PLUS_SETTINGS` — two-state test PASS (class cleared: all Figma CSS off, native look, no overflow, no new console errors) | Pick real collections; review with final images; user sign-off for VERIFIED. After the preset-alignment fix: Theme Check 9 = baseline, template JSON valid, 1480/820/390 geometry identical to before (screenshots), no new console errors. Two-state test not re-run (CSS unchanged); Theme Editor name not yet seen in the editor UI. **After recovery (2026-11-09), with 5 real collections:** Theme Check 9 = baseline. 1480: cards 292, gap 24, inset 72, titles 24/40/600 on one line, image→title 18, arrows next/prev scroll and disable correctly. 820: cards 209, titles 18/30. 390 and 375: cards 97 (images 97×121, portrait ratio), gap 10, titles 11px in 40px boxes (long names wrap onto 2 compact lines), progress 350/335px, filling 40%→100% from the right. Settings at min (80/10) and max (180/20) applied on mobile only (180 → image 180×225), desktop unchanged, no overflow; defaults restored. Class off: native (320/172 cards, native arrows, no progress, no `--sn-*` vars), no errors; class restored. Theme Editor UI still not opened. **Responsive refinement (2026-11-09):** Theme Check 9 = baseline. Heading: 1480/1200/820 = 32/52 (native block size), 390/375 = 24/38; mobile set to 16/32/40 changed mobile only, desktop stayed 32. Images: mobile square 97×97 (Figma), portrait 97×121, landscape 97×55, adapt = each image's own ratio (97×97 / 97×65), "same as desktop" + size 180 = 180×225; desktop 292×364 in every case; object-fit cover, no stretching, no page overflow. Titles: 1-word (باندل, الأكسسوارات) and 2-word (الرؤوس البديلة) unchanged; 3-word names show "فرشاة الأسنان" / "منتجات العناية" on mobile and in full on desktop; 4-word and repeated-space cases checked with the same Liquid logic in a temporary template (deleted). Links and link accessible names are unchanged. RTL: mobile swipe reaches the end, progress 40%→100%; desktop next arrow scrolls (−217) and disables. Class off: native look, no short-title markup, no `--sn-*` vars. Figma values restored (template identical to the pre-test backup). **QA caveat:** dev theme #190250942577 is shared, and at about 11:36 another session pushed a `layout/theme.liquid` that loads `dev1.css` instead of `dev2.css`. QA therefore injected the synced `dev2.css` in the test browser only; the shared layout was not overwritten. Theme Editor UI still not opened |
| S08 | Done (both nodes) | PASS: Theme Check 9 = baseline; schemas + template JSON valid | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (RTL slider mirror) | Pending merchant images | PENDING USER REVIEW (`CLASS_PLUS_SETTINGS`) | Images, tooth icon, CTA link |
| S01–S03, S05–S07, S09–S15 | — | — | — | — | — | — | — | Only project-level mapping done; no section-level analysis yet |

Give a section its own row here when its work starts, and keep the S01–S15 row only for sections that haven't started.

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
| 2026-11-08 | Dev2 initialized: `assets/dev2.css` created and loaded in `layout/theme.liquid` after `main.css` | Developer CSS ownership | All | — |
| 2026-11-08 | `snippets/custom-class.liquid` created and tested (first use); `custom_class` added to `collection-list` | On-demand custom class policy | `collection-list` | Results in the registry log |
| 2026-11-08 | S04 implemented on native `collection-list` (category B), placed first in `index.json` order (before the disabled `product-list`) | Native-first reuse; Figma order (S04 precedes S05+; S01–S03 live in header-group/hero) | S04, `templates/index.json` | Merchant picks collections; hero (S03) should be inserted above S04 later |
| 2026-11-08 | S04 aligned to the native `collections_carousel` preset (Scenario B): instance name restored to `t:names.collections_carousel`, heading wrapped in the preset's `group` "Header". New Skill hard rule 12 (native preset reuse + keep native names) and a matching Stage F check | Merchant: Theme Editor showed the heading instead of Horizon's preset name | S04, `templates/index.json`, Skill | Re-check in the Theme Editor UI |
| 2026-11-09 | S04 recovered from `894eb4e` after an external working-tree rollback (see S04, area E). Mobile title/image settings added on `collection-list` | Restore committed work without touching unrelated files | S04 and its 5 files | Find out what rewrote the working tree at 2026-11-08 17:37:18 (another agent tool, `agy.exe`, is attached to this folder) before running more automated tools here |
| 2026-11-09 | S04 responsive refinement: desktop heading size from the native text block, plus section settings `mobile_heading_size`, `mobile_image_ratio` and `mobile_title_word_limit` (the last implemented in native `collection-title` Liquid, opt-in). New Skill hard rule 14: analyze Desktop and Mobile Figma independently | Merchant: mobile heading must be 24 (desktop 32), independent mobile image ratio, two-word mobile titles | S04, `collection-list`, `collection-title`, `dev2.css`, `index.json`, Skill | Agree on how the shared dev theme's `theme.liquid` loads developer CSS (area G) |
| 2026-11-08 | Preview QA tooling: `shopify theme dev` + headless system Chrome. Avoid `sed -i` on theme files while `theme dev` runs (its temp file triggers an upload-error overlay) | Lesson from S04 QA | All | **Replaced 2026-11-09** (next row) |
| 2026-11-09 | No previews, server processes, push/pull or browser automation by agents; visual QA belongs to the user (`PENDING USER REVIEW`). Rule copied from `.agents/skills/…/SKILL.md` into `.claude/skills/…/SKILL.md` (hard rule 13, Stages F/G/H); the Desktop/Mobile rule became 14. The Dev2 preview (`theme dev` on #190250942577) was stopped | User instruction | All | — |
| 2026-11-09 | Theme Editor control policy adopted (Skill hard rule 15; details in `references/schema-extension-policy.md`): every merchant-adjustable visual value gets a Theme Editor control (native first, smallest safe extension, separate Desktop/Mobile controls, Figma values as editable defaults); only listed technical exceptions stay in code. Replaces the earlier practice of putting exact Figma values in class-scoped CSS (old hard rule 5). Plan step D now records a control map; Stage F adds a hardcoded-value audit and Stage G a two-value control test | Merchant must be able to adjust the design without code | All future section work | Applies from the next task. S04 is not changed retroactively (user confirmed it is correct); its remaining literals stay as they are |
| 2026-11-11 | S08 implemented on the native `section` preset "Image compare" + `comparison-slider` (category B/D). `custom_class` added to `section` (rendered in shared `snippets/section.liquid`, opt-in). Opt-in settings added to `section`, `comparison-slider`, `text`, `group`, `button` (see S08). RTL mirror fix for the native slider under the class | Native-first reuse; Theme Editor control policy (rule 15) | S08; blocks `text`, `group`, `button`, `comparison-slider`; `snippets/section.liquid` | Visual QA by the user; merchant images, tooth icon, CTA link |
