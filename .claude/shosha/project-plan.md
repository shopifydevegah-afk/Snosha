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
| Main | `assets/main.css` | Initialized 2026-11-08 (loaded once after `custom-cairo.css`) | S01 (2026-11-11), S02 header (2026-11-11) |
| Dev1 | `assets/dev1.css` | Not initialized | — |
| Dev2 | `assets/dev2.css` | Not initialized | — |
| Dev3 | `assets/dev3.css` | Not initialized | — |

**Custom classes owned:** `sn-header-announcement` (Main, S01), `sn-header-main` (Main, S02).
**Shared-file claims (active):** none.

## D. Section registry

Logical areas from the Figma homepage, in Figma order. A row isn't necessarily one Shopify section file. Nodes were verified with `get_metadata` on 2026-11-08.

| ID | Section | Desktop node | Mobile node | Target | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
|---|---|---|---|---|---|---|---|---|---|---|
| S01 | Announcement Bar | `190:3768` | `190:4083` | header-group (global) | Main | IMPLEMENTED | B | `header-announcements` + `_announcement` | `sn-header-announcement` | Global: affects all pages. Visual QA pending user review |
| S02 | Header / Navigation | `190:3769` + `190:3776` | `190:4084` | header-group (global) | Main | IMPLEMENTED (header row + desktop nav active state) | B | `header` (+ `_header-logo`, `_header-menu`, `header-actions`, `search`, `header-drawer`) | `sn-header-main` | Global. Desktop nav: only the Default/Active states done; nav typography (15px/500) and spacing not changed yet. `header` now has 43 settings (G). Visual QA pending user review |
| S03 | Hero + Trust Strip | `190:3789` | `335:3959` | index.json | — | NOT_STARTED | — | — | — | — |
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

### S01 Announcement Bar
- Figma: desktop `190:3768` (bar `190:2895`, container `345:4596`), mobile `190:4083`. Read with `get_design_context` 2026-11-11.
- Spec:
  - bar: `#176bb0` background, 10px vertical padding, 44px tall on both, no divider;
  - container: max 1376px with 20px side padding;
  - group: centered row, 10px gap, text never wraps at frame width;
  - text: white Cairo, desktop 14px / 500 / 24px line height, mobile 12px / 400 / 19px;
  - icon: `sparkle-brand`, 24×24 white, visually to the right of the text in RTL.
- Matching Horizon: section `header-announcements` (name `t:names.announcement_bar`, kept) with block `_announcement`, already in `header-group.json` (`header_announcements_9jGBFp` / `announcement_BxgCk9`). Reused as-is; no new section, preset or rename.
- Native settings reused: block `text` (exact Figma text, already set), `font_size` 14px, `weight` → 500, `font` (all families resolve to Cairo); section `background_color` `#176bb0`, padding → 10/10, `divider_width` → 0, `section_width` page-width.
- Text color: white comes natively from `contrast-override` (black on `#176bb0` is under 4.5:1, so it falls back to the palette's lightest, `#ffffff`), so `text_color` is left empty. ~~The block's `text_color` setting isn't used (Horizon quirk)~~ **Corrected 2026-11-11:** it does work, through `.text-block { color: var(--color, …) }` in `snippets/text.liquid`.
- Fix 2026-11-11 (icon stacked above the text): the slide also has `.text-block`, which `snippets/text.liquid` styles as `flex-direction: column` with `> * { width: var(--width, 100%) }`, and the slide sets `--width: 100%`. The icon-mode CSS in `_announcement` now forces `flex-direction: row` / `nowrap`, `width: auto` on the children and a fixed 24px icon (`flex: 0 0 auto`), using doubled-class selectors. No change to `main.css`.
- Missing settings added (category B):
  - section: `custom_class`;
  - block: `font_size_mobile`, `weight_mobile` (empty = same as desktop), `show_icon` (default off), `icon_image` (`image_picker`, optional override).
- Media / icon:
  - Horizon has no sparkle icon (its `star` icon is a different shape), so the exact Figma SVG was downloaded once into `assets/icon-sparkle-brand.svg` (24×24, white, no scripts) as the **default**.
  - The merchant can replace it with `icon_image` in the Theme Editor. It renders as `<img alt="">` inside `aria-hidden="true"`, and comes before the text in the DOM so it sits at inline-start (right in RTL).
- Liquid changes:
  - `sections/header-announcements.liquid`: renders the class on the `<aside>` root;
  - `blocks/_announcement.liquid`: optional icon markup and modifier classes, plus a `{% stylesheet %}` for icon layout (flex, `--gap-xs`, `--icon-size-lg` = 24px) and mobile typography. All of it is setting-driven; with defaults the native output is unchanged.
  - New `snippets/custom-class.liquid` (first use).
  - JS changes: none.
- CSS (`assets/main.css`, owner Main, under `.sn-header-announcement`): 10px gap, line height 24px, and 19px at ≤749px.
- Background: native setting. No sibling selector needed.
- Settings changed from their previous values (Level 3): block `weight` 300→500, `font_size_mobile` ""→0.75rem, `weight_mobile` ""→400, `show_icon` false→true; section `divider_width` 1→0, padding 15/15→10/10, `custom_class` ""→`sn-header-announcement`.
- Shared files touched: `sections/header-group.json` (only the announcement instance; header untouched), `snippets/custom-class.liquid` (new). Claimed and released by Main 2026-11-11.
- Narrow screens: text may wrap below about 330px instead of overflowing; the icon doesn't shrink. Not forced to nowrap.
- Category: **B**. Approved by user: task request 2026-11-11.

### S02 Header (header row; desktop navigation `190:3776` not done)
- Figma: desktop `190:3769`, mobile `190:4084`. Read with `get_design_context` 2026-11-11.
- Desktop spec:
  - row: 88px tall (33px padding + 22px icons), white, no border;
  - container: max 1376px with 20px padding;
  - icons: 22px frames, 22px apart, on the visual right; order from the visual right is cart, search, account;
  - logo: frame 184×37.18 (artwork 178×36), centre 18px right of the frame centre.
- Mobile spec:
  - row: 64px tall, white, 1px `#dcf2fb` bottom border, 20px side padding;
  - three columns: [cart, search 18px apart] | logo 138×27.9 centred | menu;
  - no account icon.
- Icon colours: desktop `#12568d`, mobile `#176bb0`.
- Matching Horizon: section `header` (name `t:names.header`, kept, `presets: []` unchanged), already in `header-group.json` (`header_section`). Reused with its static `_header-logo`/`_header-menu` blocks and the native `header-actions`, `search` and `header-drawer` controls. No new section, no duplicated markup, no JS changes.
- Native settings reused: `logo_position` center, `menu_row` bottom (navigation stays in its own row), `search_row` top, `actions_display_style` icon, `section_width` page-width, `enable_sticky_header` always. Logo image: global `settings.logo` (already the SNOSHA SVG).
- ~~Setting changed (Level 3): `search_position` left→**right** (Horizon's default), so search sits in the same column as the actions.~~ **SUPERSEDED 2026-11-11 (fix round 1):** reverted to `left`. The desktop CSS no longer depends on it.
- Setting added (category B): `custom_class` on `header` → rendered on `<header-component id="header-component">`.
- Icons: Horizon's glyphs differ (bag instead of cart, 2-line menu, different search and account). The Figma SVGs were saved as `assets/icon-header-{account,search,cart,menu}.svg` and painted over the **native** `<svg>` elements with CSS masks. Buttons, links, `aria-*`, drawer, search modal, cart drawer and bubble are unchanged, and tap targets stay 44px (40px on mobile).
- CSS (`assets/main.css`, owner Main, under `#header-component.sn-header-main`; the ID is needed to beat Horizon's drawer-mode rules):
  - desktop: top-row container 86rem (1376px), 22px vertical padding (88px row), grid areas swapped to `'right center left'`, `header-actions` flattened (`display: contents`) and ordered cart / search / account with no gap, logo 36px high and nudged 18px;
  - mobile and drawer mode: 40px edge columns, 20px side padding, 9.5px vertical padding plus a 1px `#dcf2fb` border through Horizon's own `--border-bottom-*-mobile` variables (64px), search moved next to the cart (`rightA`), account hidden, cart and search glyphs pinned to the outer edge (18px gap), menu glyph pinned, logo 28px high.
- Logo size: done in scoped CSS because the native size settings (`logo_height` 37 / `logo_height_mobile` 36) are global, in protected `settings_data.json`.
- ~~Settings to reset to undo (Level 3): `search_position` → left, `custom_class` → empty.~~ **SUPERSEDED, see fix round 1.**
- Shared files touched: `sections/header-group.json` (header instance only: 2 settings; S01 untouched), `sections/header.liquid` (class render + 1 setting). Claimed and released by Main 2026-11-11.
- Dependencies and limits:
  - the mobile border relies on the top row having `divider--page-width` (true while the menu is in the bottom row and `divider_size` = page-width);
  - transparent header modes would keep the blue icons (they're off);
  - in touch drawer mode at ≥750px (tablets) the mobile layout and 28px logo apply.
- Category: **B**. Approved by user: task request 2026-11-11.

#### S02 fix round 1 (2026-11-11, after user review)
- **Desktop icons split** (search on the visual right, account and cart on the visual left). The first version needed both `search_position = right` and the class in the store's live data, otherwise search and actions sat in separate native columns. The user's Theme Editor almost certainly doesn't have the repo values yet: what they saw is exactly native output with `search_position = left` and no class.
  - Fix: own desktop grid under the class, like Horizon's mobile layout. `.header__column` and `header-actions` use `display: contents`, with areas `'sn-cart sn-search sn-account . center . .'` (three 44px cells at inline-start, logo centred, a balancing 132px block at inline-end).
  - It now works with either `search_position`, so the setting is back to the merchant's original `left`.
- **Mobile logo looked small.**
  - The previous CSS fixed a 28px height. With the logo's assumed ratio of about 4.94 that's about 138px, the Figma width. It also blocked the native size setting.
  - ~~Now width-based: 138px (the Figma frame), `height: auto`, `max-width: 100%`, and `min-width: 0` on the link so it shrinks on narrow screens instead of overlapping the icons.~~ **SUPERSEDED by fix round 2** (the 138px frame wasn't the visible artwork).
  - The uploaded file couldn't be inspected (the Shopify MCP is connected to a different store), so internal padding in the file is unverified. If the logo still looks small, check the file's padding first.
- **Mobile row height:** Horizon's `.header__drawer` has a 60px min-height, which made the row about 80px. Set to `--button-size` (44px) in scope, so the row is 64px.
- **Mobile drawer:**
  - Cause of the oversized text: `snippets/menu-font-styles.liquid` hard-codes drawer top-level links to `--menu-font-2xl` (28px). The block's size setting only affects desktop. Rows were at least 45.6px tall plus flat-list margins, and the child lists were fully expanded.
  - Fix, native settings: `drawer_accordion` true (children collapse), `drawer_dividers` true with `#dcf2fb`.
  - Fix, scoped CSS: drawer width `85vw` (max 360px); top level 16px / 600 / line height 1.5; child links 14px; 48px top-level rows and 44px child rows; no list margins.
  - **Product cards:** they come from `_header-menu.menu_style = featured_products`, which shows up to 4 products from the menu's first collection link. The same setting drives the desktop mega menu and there's no mobile-only switch, so the cards are hidden **only in the drawer** with scoped CSS (`.menu-drawer__featured-content`). The native alternative, `menu_style` → text, would also remove them from the desktop mega menu; that's the merchant's choice.
- Files: `assets/main.css`, `sections/header-group.json` (`search_position` right→left, `drawer_accordion` false→true, `drawer_dividers` false→true, `drawer_divider_color` ""→`#dcf2fb`). No Liquid or JS changes.
- Reversibility now: `CLASS_PLUS_SETTINGS: drawer_accordion, drawer_dividers` (untested). Removing the class restores the native header layout, icons, logo and drawer typography; the accordion and dividers remain until those settings are reset.
- **User action needed:** the Theme Editor (store) data must contain Header → Advanced → Custom CSS class = `sn-header-main`, otherwise none of S02 applies. The repo has it; the editor screenshot suggests the store doesn't.

#### S02 fix round 2: exact logo (2026-11-11)
- Figma, measured with `get_metadata`:
  - desktop instance `190:3775` is a 184×37.18 frame at (666, 29) holding the **178×36** artwork at (+3, +1). The artwork sits at (669, 30) in the 1480×88 header: centre 18px right of and **4px below** the header centre.
  - mobile instance `190:4088` is a 138×27.89 frame holding the **same 178×36 artwork, unscaled and overflowing** at (−20, −4). It sits at (106, ≈14) in the 390×64 header: exactly centred.
  - Visible logo on both viewports: **178×36**. The 138/184 values are frame sizes, not the artwork.
- Figma artwork file `43c8e.svg`: viewBox `0 0 178 36`, ratio 4.944, with no transparent padding (artwork fills the viewBox).
- Root cause of the "too small" mobile logo: the earlier CSS (28px high, then 138px wide) followed the instance frame. The native `logo_height_mobile` = 36 was already right and was being overridden.
- Fix (native first):
  - all CSS logo-size overrides removed;
  - native `logo_height_mobile` = 36 (unchanged);
  - native `logo_height` 37 → **36** in `config/settings_data.json` (protected file; changed under the user's explicit "prefer native logo settings" instruction, 2026-11-11). It's used only by `_header-logo`, so the native width is ceil(36 × ratio) = 178.
  - Scoped CSS kept: desktop `translate: 18px 4px`; mobile `min-width: 0` on the link and `max-width: 100%` on the image (native `object-fit: contain` keeps the ratio if a very narrow screen forces shrinking).
  - At 390px the 190px centre column fits 178px, leaving 24px clearance to the search glyph.
- Limitation: the **uploaded** store file (`shop_images/SNOSHA_…svg`) couldn't be opened from here. If it was exported from the 184×37.18 desktop instance instead of the artwork, it carries about 3px / 1px of transparent padding, and the artwork would render about 1px short. Confirm in Shopify → Content → Files (expect 178×36).

#### S02 desktop navigation: active state (2026-11-11)
- Figma `190:3776` (1480×43, padding 5 / 14, container max 1376 with 20px padding, 32px gaps). `Nav Item` component `346:4607` has two variants:
  - **Default:** label `#12568d`, Cairo 15px / 500 / 24px line height;
  - **Active** (`346:4604`): label `#176bb0` plus 5px inline padding, and a marker `rgba(99,205,255,0.45)` with 3px radius, rotated 1.5°, spanning the item from y 9 to 23.54 of the 24px line.
- Native reuse: the `_header-menu` desktop menu (`nav.menu-list` > `overflow-list` > `li.menu-list__list-item` > `a.menu-list__link` > `span.menu-list__link-title`). Current page: Liquid adds `.menu-list__link--active` when `link.active` and `aria-current="page"` when `link.current`. No Liquid, JS or menu-data changes; no label matching.
- CSS (`assets/main.css`, Main, `#header-component.sn-header-main[data-menu-style='menu']`, ≥750px only):
  - colour variables redefined on `.menu-list > .overflow-menu` to navy, so Horizon's hover dimming still works;
  - at rest, non-active links are kept solid (Horizon otherwise dims every other link while one is active);
  - active link `#176bb0`;
  - marker drawn as `::before` on the active `.menu-list__link-title`: `z-index: -1` inside its own stacking context, `inset-inline: (title padding − 5px)` so it follows the label width, `top: 50% − 0.2em`, `height: 0.97em` (from the Figma geometry in em, relative to the text centre), `rotate(1.5deg)`, `pointer-events: none`;
  - overflow ("More") items use padding 0 for the inset.
- Not changed (outside this task): nav font size (native setting `type_font_primary_size` = 1rem/16px vs Figma 15px), weight and item gaps.
- Mobile drawer code untouched (diff is additions only, desktop media query only).
- Reversibility: `CLASS_ONLY` for this part (no settings changed); untested.
- Checks: Theme Check = baseline 9; CSS braces balanced.

## F. QA & progress

| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
|---|---|---|---|---|---|---|---|---|
| S01 | PASS (get_design_context, 2026-11-11) | PASS: Theme Check = baseline 9, JSON/schema parse OK, assets exist | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS`: see E) | custom-class snippet sanitizer matrix untested (needs render); confirm text color is white |
| S02 | PASS (get_design_context, 2026-11-11; navigation `190:3776` and `Nav Item` variants analysed 2026-11-11) | PASS: Theme Check = baseline 9 (header count 42→43, same offense), JSON/schema parse OK, mask assets exist | PENDING USER REVIEW | PENDING USER REVIEW | PENDING USER REVIEW | N/A (logo is the global native setting; icons are UI) | PENDING USER REVIEW (expected `CLASS_PLUS_SETTINGS: drawer_accordion, drawer_dividers`) | Fix rounds 1–2 applied 2026-11-11 (desktop grid, mobile height, drawer, exact 178×36 logo via native settings); confirm the store has `custom_class` = `sn-header-main` and `logo_height` = 36; desktop nav active marker and colours (added 2026-11-11); nav typography 16 vs 15px not done; account hidden on mobile (Figma); account button width unverified; cart bubble position; uploaded logo file dimensions unverified |
| S03–S15 | — | — | — | — | — | — | — | Only project-level mapping done; no section-level analysis yet |

Give a section its own row here when its work starts, and keep the S01–S15 row only for sections that haven't started.

## G. Global risks & dependencies

**Confirmed facts (2026-11-08):**
- Container: Figma's desktop content is 1376px inside a 1480px frame (52px margins). Horizon has 40px desktop margins and a 120rem (1920px) "normal" page width, so at 1480px the content is 1400px.
- Gutters: Figma mobile 24px (20px in some sections) vs Horizon 16px. Horizon scales padding ×0.7 below 990px.
- Tokens: Cairo, `#176bb0` (primary button), `#f0fafe` and `#dcf2fb` (palette) match. The theme foreground is `#000000` vs Figma `#131311`, and theme H1/H2 are 56/48px vs Figma display 56, H1 40, H2 32.
- Theme Check baseline: 9 offenses (2 errors, 7 warnings), listed in horizon-architecture.md.
- The `header` schema has 42 settings (Theme Check warning; not a platform limit). **Update 2026-11-11:** 43 after adding the required `custom_class` for S02 (same single warning).
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
| 2026-11-11 | `snippets/custom-class.liquid` created (first use) | Required by the custom-class policy | All future custom classes | Run the sanitizer test matrix when a render is available |
| 2026-11-11 | Exception to "no Figma exports in code": a decorative brand icon may ship as a default local SVG asset **if** a Theme Editor `image_picker` can override it | No native equivalent; the task asked for the exact Figma icon | S01 (`icon-sparkle-brand.svg`) | Reuse the same asset for other sparkle icons (S03, S06, S13) instead of duplicating it |
| 2026-11-11 | S01 implemented (category B) | First section | S01 | User visual QA |
| 2026-11-11 | UI icons that differ from Horizon's are replaced with Figma SVG assets painted over the native `<svg>` by CSS masks (no markup or JS changes) | Exact Figma glyphs while keeping native controls | S02 (`icon-header-*.svg`) | Reuse the same pattern and assets elsewhere |
| 2026-11-11 | `header` schema to 43 settings (`custom_class`) | Required by the custom-class policy; the user's S02 task asked for it | S02 | Theme Check warning only; no further `header` settings without need |
| 2026-11-11 | S02 header row implemented (category B) | — | S02 | User visual QA; desktop navigation `190:3776` is a separate task |
| 2026-11-11 | S02 fix round 1: desktop grid independent of `search_position` (setting reverted to `left`), mobile logo width-based 138px, mobile row 64px, drawer tidied (native accordion and dividers plus scoped CSS; featured cards hidden in the drawer only) | User review | S02 | User visual QA; make sure the store's header has the class `sn-header-main` |
| 2026-11-11 | S02 fix round 2: logo matched to the Figma **artwork** (178×36 on both viewports) through native `logo_height` 37→36 (`settings_data.json`, user-instructed) and `logo_height_mobile` 36; CSS size overrides removed; desktop offset 18px / 4px | The mobile Figma frame (138px) is not the visible artwork | S02 | Confirm the uploaded logo file is 178×36 |
| 2026-11-11 | S02 desktop navigation Default/Active states: native `link.active` class plus scoped CSS marker (`::before`) and colours | Match the Figma `Nav Item` variants without new markup | S02 | User visual QA; nav typography is a separate decision |
