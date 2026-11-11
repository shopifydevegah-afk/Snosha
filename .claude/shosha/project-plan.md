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
| S11 | Bundle | `190:3987` | `190:4318` | index.json | Dev2 | IMPLEMENTED (rebuilt 2026-11-11 as a dedicated section; visual + commerce QA PENDING USER REVIEW) | E (merchant-approved) | new `sn-product-bundle` ("Product bundle"); reuses `anchored-popover-component`, `image` snippet, cart event | `sn-home-bundle` | Merchant: bundle product, items, image |
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

## F. QA & progress

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S04 | Done (both nodes) | PASS: Theme Check 9 = baseline; schema + template JSON valid | PASS at 1480 (geometry measured in preview: heading +50, cards +142, 292w/24 gap/72 inset, arrows 44px at 50px, top 304) + 1200 | PASS at 390 (35/9 padding, 97w/10 gap/20 inset, progress 350×4, 40%→~100% on scroll); tablet 820 checked | PASS (Arabic `dir=rtl`; arrows/progress direction correct). LTR not tested | Collection image/title (native); placeholders until collections picked | `CLASS_PLUS_SETTINGS` — two-state test PASS (class cleared: all Figma CSS off, native look, no overflow, no new console errors) | Pick real collections; review with final images; user sign-off for VERIFIED. After the preset-alignment fix: Theme Check 9 = baseline, template JSON valid, 1480/820/390 geometry identical to before (screenshots), no new console errors. Two-state test not re-run (CSS unchanged); Theme Editor name not yet seen in the editor UI. **After recovery (2026-11-09), with 5 real collections:** Theme Check 9 = baseline. 1480: cards 292, gap 24, inset 72, titles 24/40/600 on one line, image→title 18, arrows next/prev scroll and disable correctly. 820: cards 209, titles 18/30. 390 and 375: cards 97 (images 97×121, portrait ratio), gap 10, titles 11px in 40px boxes (long names wrap onto 2 compact lines), progress 350/335px, filling 40%→100% from the right. Settings at min (80/10) and max (180/20) applied on mobile only (180 → image 180×225), desktop unchanged, no overflow; defaults restored. Class off: native (320/172 cards, native arrows, no progress, no `--sn-*` vars), no errors; class restored. Theme Editor UI still not opened. **Responsive refinement (2026-11-09):** Theme Check 9 = baseline. Heading: 1480/1200/820 = 32/52 (native block size), 390/375 = 24/38; mobile set to 16/32/40 changed mobile only, desktop stayed 32. Images: mobile square 97×97 (Figma), portrait 97×121, landscape 97×55, adapt = each image's own ratio (97×97 / 97×65), "same as desktop" + size 180 = 180×225; desktop 292×364 in every case; object-fit cover, no stretching, no page overflow. Titles: 1-word (باندل, الأكسسوارات) and 2-word (الرؤوس البديلة) unchanged; 3-word names show "فرشاة الأسنان" / "منتجات العناية" on mobile and in full on desktop; 4-word and repeated-space cases checked with the same Liquid logic in a temporary template (deleted). Links and link accessible names are unchanged. RTL: mobile swipe reaches the end, progress 40%→100%; desktop next arrow scrolls (−217) and disables. Class off: native look, no short-title markup, no `--sn-*` vars. Figma values restored (template identical to the pre-test backup). **QA caveat:** dev theme #190250942577 is shared, and at about 11:36 another session pushed a `layout/theme.liquid` that loads `dev1.css` instead of `dev2.css`. QA therefore injected the synced `dev2.css` in the test browser only; the shared layout was not overwritten. Theme Editor UI still not opened |
| S08 | Done (both nodes) | PASS: Theme Check 9 = baseline; schemas + template JSON valid | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (RTL slider mirror) | Pending merchant images | PENDING USER REVIEW (`CLASS_PLUS_SETTINGS`) | Images, tooth icon, CTA link |
| S11 | Done (both nodes) | PASS: Theme Check 9 = baseline; JS syntax; schema + template JSON valid | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | Pending merchant bundle product, items, image | PENDING USER REVIEW (section-level class; removing it leaves the structure unstyled) | Bundle product, items, image |
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
| 2026-11-11 | S08 desktop refinement: `section` setting `content_max_width` (row cap, default 1360); slider 57% / content 41%; content group Height Fill + Space between with a class-scoped stretch rule; content gap 20 → 14 so heading/CTA align with the 535px image | Image grew with the 1920px page width; user asked for top/bottom alignment, which Figma itself misses by 8.5px | S08 | Visual QA by the user |
| 2026-11-11 | S08 mobile wrapping: `text` block "Text wrap" gains option Normal (`wrap`, default stays Pretty); S08 heading + description set to Normal | Native `text-wrap: pretty` moved a word to avoid one-word last lines, unlike Figma's greedy wrapping | S08; block `text` | Visual QA by the user |
| 2026-11-11 | S08 desktop description wrap: investigated, no change. Code width 557.6 vs Figma 557, typography and wrap mode match | Cause needs a browser check (stale preview vs Cairo rendering width); no fragile width tweak | S08 | User console check |
| 2026-11-11 | S08 desktop wrapping, measured from the user's screenshot: benefit texts Pretty → Normal; description text given Figma's space before the comma (user approved) | Metrics and width match Figma; the differences were the wrap setting (benefits) and the text content (description) | S08 | User screenshot at 1480 / 390 |
| 2026-11-11 | S11 bundle on native `product-hotspots` with opt-in "Bundle layout" (category D): rows/total/add-all button from the hotspot blocks, `sn-bundle.js`, opt-in touch popup in `product-hotspot.js`, no checkboxes | No native bundle section; product-hotspots already links a product to each marker. User chose separate lines + Admin automatic discount and a mobile popup | S11; `product-hotspots`, `_hotspot-product`, `product-hotspot.js` | Merchant setup; visual + commerce QA by the user |
| 2026-11-11 | S11 correction: `bundle_product` picker (purchase model A = bundle product only, B = components); editor-only guidance and placeholder rows; image column hidden on the storefront without an image; `unavailable_text` replaced by Horizon translations | First version had no parent bundle picker and showed nothing until products were picked; Liquid can't enumerate bundle components | S11 | Merchant picks bundle product + components; visual + commerce QA by the user |
| 2026-11-11 | S11 rebuilt as dedicated section `sn-product-bundle` (category E, merchant-approved): bundle product = purchase (model A only), "Bundle item" blocks drive rows + hotspots + popups; native product-hotspots files restored | Native hotspots adaptation did not give the merchant a usable bundle setup | S11; `index.json` `bundle_sn_home` replaced in place | Merchant setup; visual + commerce QA by the user |
| 2026-11-11 | S11: editor-only note (bundle data box) removed at the merchant's request; placeholder rows for empty "Bundle item" blocks kept | The note cluttered the Theme Editor preview; product data is now correct (LE 2,499 / compare-at 3,100, available, 7 in stock) | S11 | — |
