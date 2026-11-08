# Figma analysis, automated checks & visual QA

## Stage B: Figma extraction

**Which nodes to use.** The official Desktop (`190:3767`) and Mobile (`190:4082`) frames, with URLs in SKILL.md, are the project-level references.
1. Use them for overall context: page structure, section order, and shared spacing and type.
2. Find the **individual section nodes** for the section you're building, inside both frames (for example with `get_metadata`), and record the node IDs in the plan. Never guess a node ID. If you can't tell which node matches, ask.
3. If the task gives more specific nodes, use those for that task. Keep the project frames for context.
4. Analyze Desktop and Mobile **independently**, then compare the matching sections. Note what is reordered, hidden, resized, or changes from a carousel to a grid.
5. Take every measurement from Figma (spacing, typography, dimensions). The design is drawn for Arabic RTL; check that its direction matches what the storefront renders.
6. When you can access them, use `get_screenshot` of the section nodes as the reference images for Stage G.

**Find out what's available first.** Figma tools depend on the connectors in the session, and names and schemas can change.
1. Look for the Figma tools (for example ToolSearch `figma`), and read the Figma MCP server's own instructions if they're in context. Follow its required call order and each tool's schema.
2. Load any prerequisite skills the server or a skill marks as mandatory before calling the tool they cover. Currently `figma:figma-design-to-code` is required before `get_design_context`.
3. Seen in this environment on 2026-11-08 (Figma connector): `create_session` (first, with the fileKey), `get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`. Use whichever of these exist. Don't assume one exists without checking.
4. A URL `figma.com/design/:fileKey/…?node-id=1-2` gives nodeId `1:2`. Treat the code from `get_design_context` as a *reference*. Never paste it in as Liquid or CSS.
5. **If there's no Figma access:** tell the user, ask for exports or screenshots and specs, and mark every value as `UNVERIFIED`. Without design data, a section can't go past `ANALYZED` with any measured values.

Read only. Never edit the Figma file.

Record for **Desktop and Mobile separately**:

- Frame width (expected 1440 / 375, but use the actual value), container/content width, section height (fixed or content-driven)
- Grid/flex structure: direction, columns, wrap, gaps, alignment, order changes between breakpoints
- Spacing: padding (block/inline), gaps between elements
- Typography per text style: family (expect Cairo), weight, size, line height, letter spacing, case, color → map to the closest Horizon preset/token, or note the exact override
- Colors, borders, radius, shadows → map to palette/tokens where possible
- Media: dimensions, aspect ratio, crop and focal point, whether mobile uses different media
- Interactive states (hover, active, focus, open), sliders and their controls, and behavior if Figma shows it
- RTL: is the design drawn RTL? Note anything that shouldn't mirror (logos, numbers, media, play icons)

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
| Console / network | `browser-automation` skill on the preview URL | No new errors or 404s |

Previews need `shopify theme dev --store <store>.myshopify.com` (requires the user to be logged in) or a preview URL from the user. If neither is available, say so and leave visual QA `PENDING`.

## Stage G: visual QA matrix

Capture preview screenshots and compare them side by side with `get_screenshot` from Figma:

| Width | Class on | Class off |
|---|---|---|
| 1440 (desktop frame) | match Figma | native look |
| 375 (mobile frame) | match Figma | native look |
| 1024 & 768 & 1920 (in-between widths) | no overflow, sensible flow | — |

Check every row in **Arabic RTL** (the store's Arabic locale). Check:
- container width, alignment, spacing, typography, image crop, card dimensions, borders/shadows (tolerance about 2px on positions and sizes; typography should match exactly where the font renders the same)
- no horizontal scroll at any width (`document.documentElement.scrollWidth <= innerWidth`)
- order of elements, slider direction and arrows, inline spacing in RTL
- native functions still work: add to cart, variant change, cart drawer, filters, search, links, keyboard focus

- class off: computed styles of the affected elements match native, other sections are unaffected, and the reversibility result is recorded (`CLASS_ONLY` / `CLASS_PLUS_SETTINGS` / `OPT_IN_STRUCTURAL` / `NOT_FULLY_REVERSIBLE`, see custom-class-policy.md §6)

Write down any mismatch you can't fix (with the reason) in the plan. **VERIFIED** requires every applicable row with screenshot evidence. "Renders without errors" isn't enough, and don't claim pixel-perfect without comparing screenshots.
