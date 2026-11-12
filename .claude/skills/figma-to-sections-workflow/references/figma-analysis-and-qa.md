# Figma analysis, automated checks & visual QA

## Stage B: Figma extraction

**Which nodes to use.** The official Desktop (`190:3767`) and Mobile (`190:4082`) frames, with URLs in SKILL.md, are the project-level references.
1. Use them for overall context: page structure, section order, and shared spacing and type.
2. Find the **individual section nodes** for the section you're building, inside both frames (for example with `get_metadata`), and record the node IDs in the plan. Never guess a node ID. If you can't tell which node matches, ask.
3. If the task gives more specific nodes, use those for that task. Keep the project frames for context.
4. Analyze Desktop and Mobile **independently**, then compare the matching sections. Note what is reordered, hidden, resized, or changes from a carousel to a grid.
5. Take every measurement from Figma (spacing, typography, dimensions). The design is drawn for Arabic RTL; check that its direction matches what the storefront renders.
6. When you can access them, use `get_screenshot` of the section nodes as the reference images for Stage G.

### Homepage map (verified with `get_metadata` on 2026-11-08; re-check before use, since the file can change)

Desktop frame: **1480 × ~8696**. Most section content sits in a **1376px container** (52px side margins), and many inner rows are 1336px (another 20px inset). Mobile frame: **390 × ~9155**, with 24px side gutters (20px in some sections).

| # | Section | Desktop node | Mobile node | Notable desktop → mobile change |
|---|---|---|---|---|
| 1 | Announcement Bar | `190:3768` | `190:4083` | — |
| 2 | Header / Navigation | `190:3769` / `190:3776` | `190:4084` | nav row → menu icon |
| 3 | Hero + Trust strip | `190:3789` | `335:3959` | side-by-side → stacked; spec chips on product image |
| 4 | Collections | `190:3830` | `190:4133` | arrow carousel → swipe track + progress bar |
| 5 | Featured Collection | `190:3844` | `190:4149` | 4-col row → carousel + progress + link |
| 6 | F1 Banner | `190:3851` | `190:4167` | side-by-side → stacked |
| 7 | Featured Collection 2 | `190:3896` | `190:4204` | as #5 |
| 8 | Before / After | `190:3903` | `190:4222` | side-by-side → stacked |
| 9 | Reels | `190:3935` | `190:4254` | 5 cards → carousel + progress |
| 10 | Choose Your Care | `190:3943` | `190:4265` | 3 cards (middle raised) → carousel |
| 11 | Bundle | `190:3987` | `190:4318` | mobile adds image hotspots |
| 12 | Blog | `190:4018` | `190:4349` | 3-col → carousel + link |
| 13 | Why SNOSHA | `190:4024` | `190:4361` | 4-col → 2×2 |
| 14 | FAQ | `217:14604` | `217:14813` | 2 columns → 1 list |
| 15 | Footer | `190:4048` | `190:14491` | reordered: brand → newsletter → links |

### Figma design tokens (`get_variable_defs` on both frames)

- **Colors:** brand primary `#60c1e1`, brand secondary/link `#176bb0`, hover `#12568d`, text `#131311` / secondary `#5a5a59`, background `#ffffff` / secondary `#f0fafe`, border `#dcf2fb` / strong `#60c1e1`. Soft shadow: `0 12px 32px #0F64A81A`.
- **Type (Cairo):**

  | Style | Desktop (size/line height, weight) | Mobile |
  |---|---|---|
  | Display hero | 56/84 Bold | — |
  | H1 | 40/64 Bold | 28/44 |
  | H2 | 32/52 SemiBold | 24/38 |
  | H3 | 24/40 SemiBold | — |
  | H4 | 20/34 SemiBold | 18/30 |
  | Body | 16/28 | 15/26 |
  | Body large | 18/32 | — |
  | Body small | 14/24 | 13/22 |
  | Caption | 12/20 | 12/19 |
  | Overline | 12/18 SemiBold | — |
  | Nav | 15/24 Medium | — |
  | Button | 16/26 SemiBold | — |
  | Product name | 16/27 SemiBold | — |
  | Price | 18/28 Bold | — |

- **Compared with the theme today:** Cairo matches the custom font. `#176bb0` matches the primary button, `#f0fafe` and `#dcf2fb` match palette colors 3 and 1. The theme's foreground is `#000000` and its H2 is 48px, which differs from Figma. Any global alignment needs the user's approval, because it's a protected setting.

**Find out what's available first.** Figma tools depend on the connectors in the session, and names and schemas can change.
1. Look for the Figma tools (for example ToolSearch `figma`), and read the Figma MCP server's own instructions if they're in context. Follow its required call order and each tool's schema.
2. Load any prerequisite skills the server or a skill marks as mandatory before calling the tool they cover. Currently `figma:figma-design-to-code` is required before `get_design_context`.
3. Seen in this environment on 2026-11-08 (Figma connector): `create_session` (first, with the fileKey), `get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`. Use whichever of these exist. Don't assume one exists without checking.
4. A URL `figma.com/design/:fileKey/…?node-id=1-2` gives nodeId `1:2`. Treat the code from `get_design_context` as a *reference*. Never paste it in as Liquid or CSS.
5. **If there's no Figma access:** tell the user, ask for exports or screenshots and specs, and mark every value as `UNVERIFIED`. Without design data, a section can't go past `ANALYZED` with any measured values.

Read only. Never edit the Figma file.

Record for **Desktop and Mobile separately**:

- Frame width (homepage frames are 1480 / 390; check other frames), container/content width, section height (fixed or content-driven)
- Grid/flex structure: direction, columns, wrap, gaps, alignment, order changes between breakpoints
- Spacing: padding (block/inline), gaps between elements
- Typography per text style: family (expect Cairo), weight, size, line height, letter spacing, case, color → map to the closest Horizon preset/token, or note the exact override
- Colors, borders, radius, shadows → map to palette/tokens where possible
- Media: list every image/video/poster/content icon with its dimensions, aspect ratio, crop and focal point. Note whether mobile uses different media, and classify each one as *resource media*, *merchant content media* (needs a Theme Editor control) or *UI asset* (code)
- Interactive states (hover, active, focus, open), sliders and their controls, and behavior if Figma shows it
- RTL: is the design drawn RTL? Note anything that shouldn't mirror (logos, numbers, media, play icons)
- Text content changes: truncated or shortened labels on mobile (e.g. first N words), hidden lines, different copy

**Desktop ↔ Mobile comparison table (mandatory, SKILL.md hard rule 14).** After extracting both frames, write one row per property: heading size/line height, body/title sizes, media ratio and size, card width/height, gaps, paddings, column count, layout mode (carousel/grid), visible text, controls (arrows, progress). Columns: `Property | Desktop | Mobile | Same? | How it's delivered`. For each "different" row, the last column says one of: **native responsive setting** (name it), **existing setting reused for one breakpoint + new mobile-only setting** (name both), or **scoped CSS at ≤749 only** (fixed Figma value with no merchant need). Never copy a desktop value into a mobile rule, or the reverse, without a row that says they match. Copy the table (or its "different" rows) into the section's plan entry.

If a value isn't available, write `ASSUMED: <value> (reason)`. Never invent one.

## Stage F: automated checks (non-destructive)

| Check | Command / method | Pass criterion |
|---|---|---|
| Theme Check | `shopify theme check --output json` | Same 9 baseline offenses only (table in horizon-architecture.md), none new, none worse |
| Schema JSON | Theme Check `ValidSchema`, and a Theme Editor load | Valid; existing instances unchanged |
| Template JSON | `node -e` JSON.parse after stripping the leading `/* */` comment | Parses; only intended keys changed (`git diff`) |
| Assets referenced | Grep `asset_url` for new names; `ls assets` | Every referenced file exists |
| JS syntax | `node --check assets/<file>.js` | No errors |
| CSS loaded once | Grep `layout/theme.liquid` for the file | Exactly one `stylesheet_tag` per *initialized* developer file, none for uninitialized ones, and the Cairo line unchanged |
| CSS scoping | Read every top-level rule you added or changed | Every selector depends on the owning custom class (custom-class-policy.md §5), and nothing nested escapes the instance. `:has()`/sibling forms are fine. A text search alone doesn't count; the browser check in Stage G is the proof |
| Theme Editor controls (SKILL hard rule 15) | Read every declaration you added under the custom class and every inline `style` in the Liquid. Grep that CSS for literal sizes and colors (`px`, `rem`, `%`, `#`, `rgb(`). Compare with the plan's control map | (1) Each merchant-adjustable value reads a setting: native, or a scoped `--sn-*` var whose fallback equals the setting default. (2) Every remaining literal is a listed exception with a comment. (3) No fixed declaration targets a property a setting controls on the same device, so the merchant's value always wins (check specificity against native rules, e.g. `.custom-font-size`). (4) Mobile vars are read only at ≤749 and desktop values aren't overwritten at ≥750. (5) New settings are wired: Liquid outputs the var, CSS consumes it, and nothing renders without the custom class. (6) No duplicate of a native setting |
| Console / network | `browser-automation` skill on the preview URL | No new errors or 404s |
| Native preset & naming (SKILL hard rule 12) | Read the section's `presets`; compare with the instance in the template JSON | (1) instance `type` = the chosen native section; (2) the native preset was inspected and its block hierarchy reused; (3) instance `"name"` = the preset's `t:names.*` key, not a heading, brand or nickname; (4) storefront heading lives in a content block, separate from the name; (5) no duplicate custom section was created |

Previews need `shopify theme dev --store <store>.myshopify.com` (requires the user to be logged in) or a preview URL from the user. If neither is available, say so and leave visual QA `PENDING`.

## Stage G: visual QA matrix

Capture preview screenshots and compare them side by side with `get_screenshot` from Figma:

| Width | Class on | Class off |
|---|---|---|
| 1480 (desktop frame) | match Figma | native look |
| 390 (mobile frame) | match Figma | native look |
| 375 & 768 & 1024 & 1920 (other widths) | no overflow, sensible flow | — |

Check every row in **Arabic RTL** (the store's Arabic locale). Check:
- container width, alignment, spacing, typography, image crop, card dimensions, borders/shadows (tolerance about 2px on positions and sizes; typography should match exactly where the font renders the same)
- no horizontal scroll at any width (`document.documentElement.scrollWidth <= innerWidth`)
- order of elements, slider direction and arrows, inline spacing in RTL
- native functions still work: add to cart, variant change, cart drawer, filters, search, links, keyboard focus

- media: every content image/video can be chosen and replaced in the Theme Editor and renders correctly. The mobile → desktop fallback works. Empty settings don't break the layout (placeholder in the editor only, nothing broken live). Native media behavior is unchanged, and no code edit is needed to swap media
- Theme Editor controls (rule 15): for every new or reused control, set two different values and confirm the property changes visibly, on its own device only (desktop at 1480, mobile at 390). Changing one element's control must not change another. Every card or repeated item uses the same value
- class off: computed styles of the affected elements match native, other sections are unaffected, and the reversibility result is recorded (`CLASS_ONLY` / `CLASS_PLUS_SETTINGS` / `OPT_IN_STRUCTURAL` / `NOT_FULLY_REVERSIBLE`, see custom-class-policy.md §6)

Write down any mismatch you can't fix (with the reason) in the plan. **VERIFIED** requires every applicable row with screenshot evidence. "Renders without errors" isn't enough, and don't claim pixel-perfect without comparing screenshots.
