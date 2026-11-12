# Schema extension policy

Add a setting only when Figma needs a control that doesn't exist yet and someone will actually use it from the Theme Editor. Search the component's schema and the shared setting IDs below first.

## Theme Editor control policy (mandatory; SKILL hard rule 15)

This section is the single detailed source for the rule. Other files only point here.

**Rule:** every visual property a merchant may reasonably want to adjust must be configurable in the Theme Editor. That covers sections and blocks, and these properties:
- font size, weight and line height
- widths, heights and image or card sizes
- image aspect ratios
- padding, margins, gaps and spacing
- border radius and border width
- colors and backgrounds
- alignment and positioning
- Desktop and Mobile layout, including carousel card size and spacing

Don't hardcode these values in CSS, Liquid or JS.

**Order (stop at the first that works):**
1. **Native setting.** Reuse the Horizon setting that already controls the property (IDs in the gate below). Theme tokens (`--color-*`, type presets, `--gap-*`, …) count as native when their value is editable in the Theme Editor.
2. **Smallest safe extension.** Otherwise add one setting to the existing native section or block you're customizing.
   - Follow the gate below.
   - Place it next to the related native settings: a block's typography setting goes right after its `font_size`.
   - Pass the value to CSS as a custom property scoped to the instance, e.g. `--sn-<name>` on the block's own `.text-block--{{ block.id }}` or in the section's `style` attribute.
   - Output that variable only when the instance has a custom class. Other sections then keep native behavior even if they share the block.
3. **Never** create a duplicate control for something a native setting already does.

**Desktop and Mobile:** when the Desktop and Mobile Figma frames differ (SKILL hard rule 14), give each device its own control.
- Reuse the native setting for the device it already serves, usually desktop.
- Add a mobile-only control such as `mobile_<property>` or `<property>-mobile` (follow Horizon's pattern for that concept).
- Read the mobile control only inside `@media screen and (max-width: 749px)` under the custom class.
- At ≤749, never let a fixed declaration compete with the merchant's value for the same property. At ≥750, never let the mobile variable leak into the desktop value.
- Tablet (750–989) can derive from the desktop value, e.g. `calc(var(--font-size) * 0.75)`. It must not replace it with a literal.

**Defaults:**
- Verified Figma measurements are the initial values: mobile Figma value → mobile control, desktop Figma value → desktop control. They stay editable.
- An opt-in setting that has no effect without the custom class can use the Figma value as its schema `default`.
- A setting that affects existing instances keeps a native-equivalent `default` (gate item 3), and the Figma value goes on the instance in the template JSON.
- In CSS, use the same value only as the `var()` fallback, e.g. `var(--sn-mobile-font-size, 11px)`, never as a separate fixed rule.

**Allowed in code (exceptions):**
- internal calculations (`calc()`, ratios derived from settings)
- breakpoints
- accessibility requirements (focus rings, minimum tap targets, visually-hidden helpers)
- `var()` fallbacks that equal the setting default
- non-merchant-facing implementation constants: structural fixes for native quirks, z-index, animation timing, and UI icon sizes that don't vary per design

When a value sits in a grey zone, add a control if the merchant is likely to want it, otherwise add a one-line CSS comment saying why it stays fixed. Every literal that stays has a reason.

**Settings budget:** if a schema would pass the 40-setting guideline (gate item 5), prefer block-level settings over section-level ones. Otherwise record in the plan which values stay fixed and why, and ask the user.

**Done means it works:** a control counts only when changing it in the Theme Editor visibly changes the matching property on the intended device, independently of every other control, with no CSS override defeating it. Code checks: `figma-analysis-and-qa.md` Stage F "Theme Editor controls". Two-value check by the user: Stage G.

## Gate for every new setting

1. Search the schema for an equivalent. Native IDs to reuse: `section_width`, `section_height`, `padding-block-start/end`, `padding-inline-start/end`, `gap`, `content_direction`, `vertical_on_mobile`, `horizontal_alignment`, `vertical_alignment`, `alignment`, `width`/`custom_width`/`width_mobile`/`custom_width_mobile`, `max_width`, `height`, `columns`, `mobile_columns`, `layout_type`, `carousel_on_mobile`, `columns_gap`/`rows_gap`, `image_ratio`, `background_color`, `text_color`, `type_preset`, `font`, `font_size`, `line_height`, `letter_spacing`, `case`, border and radius settings, `background_media`/`background_image`/`video`, `toggle_overlay`.
2. Use a valid Shopify setting type. Ranges need `min`, `max`, `step`, `default`, and at most 101 steps.
3. Pick a default that **reproduces the current behavior**, so existing instances don't change.
4. Use the same ID pattern Horizon uses for the same concept (for example `padding-block-start-mobile`, not `mobilePaddingTop`).
5. **Settings count:** Theme Check warns above 40 top-level settings per schema. That's a maintainability guideline, not a confirmed platform limit (see the baseline in horizon-architecture.md). Don't push a schema over 40, and don't make `header` (already at 42) worse, unless the plan explains why and the user agrees. Grouping options under a `header` doesn't reduce the count.
6. Wire the setting through existing snippets (`spacing-style`, `gap-style`, `size-style`, `layout-panel-style`) where possible.
7. Validate with Theme Check, open the Theme Editor and make sure existing instances look unchanged, then log the setting in the registry.

## What Horizon already has vs. what's missing

| Need | Horizon 4.4 | Recommendation |
|---|---|---|
| Custom class | ❌ none | **Add on demand** (custom-class-policy.md) |
| Layout: Default / Full width | ✅ `section_width` `page-width` / `full-width` (24 sections). Global `page_width` narrow/normal/wide is protected | Reuse. Don't add a second width setting that does the same thing |
| Layout: Container / Wide (a content width other than the global one) | ❌ no per-section setting | One-off: class-scoped override of **both** `--page-content-width` and `--page-width` (see "Layout levels" in horizon-architecture.md). If editors need to switch it: add a `select` on that specific section, with the default equal to native, which adds a modifier class setting the same two variables. Category B/D. That's reversibility level 3 (a setting), not the custom class. Never build a parallel container system |
| Layout: Full width with side margin | ⚠️ exists as the CSS class `section--full-width-margin` (header and mega menu only), not as a setting | Expose it only if Figma needs it, as an extra `section_width` option on the section you're customizing. Default unchanged |
| Padding desktop | ✅ 4 logical padding ranges (0–100px) | Reuse |
| Padding mobile | ❌ auto-scaled ×0.7 below 990px (min 20px). The variables are inline, so a class can't override them | Add mobile padding settings (Theme Editor control policy): `padding-block-start-mobile`/`-end-mobile` ranges with **no effect without the custom class**, default = Figma mobile value, read by a class-scoped override of the `padding-block` *property* (custom-class-policy.md §5) |
| Content gap | ✅ `gap`, `columns_gap`, `rows_gap` | Reuse |
| Alignment / direction | ✅ alignment, flex direction, `vertical_on_mobile` | Reuse |
| Columns desktop/mobile | ✅ on product/collection lists | Reuse. Elsewhere use `group` flex wrap plus widths |
| Width desktop/mobile | ✅ `width`, `custom_width`, `width_mobile`, `custom_width_mobile` on blocks | Reuse |
| Device visibility (hide on mobile/desktop) | ❌ none | **Recommended addition, on demand**: `select` `visibility: all|desktop|mobile` with default `all`, using classes and the 749/750 breakpoint |
| Separate mobile image | ✅ `hero` only (`image_1_mobile`, `video_1_mobile`, …). ❌ elsewhere | See "Media settings" below |
| Image ratio / fit / position | ✅ `image_ratio`, `background_image_position`, `video_position` | Reuse |
| Typography | ✅ presets plus custom font, size, line height, letter spacing, case (desktop only; no mobile size) | Reuse for desktop. A Figma size outside the `font_size` options, or a different mobile size, gets a `range` px setting next to `font_size` (Theme Editor control policy), not a fixed CSS value |
| Colors | ✅ palette, `background_color`, `text_color` | Reuse. Don't add color pickers that duplicate these |

## Media settings (mandatory Theme Editor editability)

**Rule:** merchants must be able to select or replace every piece of content media in a customized section or block from the Theme Editor, without editing Liquid, CSS, JS or JSON. That includes lifestyle and product photos, banner and hero images, desktop and mobile variants, videos and their posters, custom collection or card images, decorative *content* images, and image-based content icons. Code-managed UI assets (chevrons, close, cart, search, accessibility icons, native SVG icons) can stay in code.

**Order of preference:**
1. **Media from the resource.** If the media belongs to a product, collection, article or blog, use that resource's own image through the native `product`/`collection`/`blog`/`collection_list` setting. Don't add a picker that duplicates it.
2. **A native media setting that already exists** on the component (see the registry's "Native media capabilities").
3. **A native block that carries media.** Compose with `image`, `video`, `icon` (`image_upload`), `_media-without-appearance`, or a `background_image`/`video` on `section`/`group`/`_card`.
4. **A new setting** (category B), added only to the component you're customizing:
   - `image_picker` for images
   - `video` for Shopify-hosted video
   - `video_url` for YouTube/Vimeo, where the existing `video` block pattern supports it
   - plus an `image_picker` poster when the design shows one

   No `default` value, since `image_picker`/`video` can't hold a meaningful one. **Empty means native behavior.**

**Desktop vs mobile media:** add a mobile setting only when Figma really uses different media or crops. Follow hero's naming (`<id>_mobile`). Render one element with a fallback (mobile → desktop → placeholder), using `<picture>`/`srcset` or Horizon's existing image snippets (`image`, `media`, `background-media`). Never duplicate the whole section's markup.

**Rendering & fallback:**
- Use Shopify filters (`image_url`, `image_tag` with `widths`/`sizes`, `video_tag`) or Horizon snippets.
- Alt text comes from the media file's alt (or an existing alt setting). Decorative images get `alt=""`.
- When nothing is selected: keep the native fallback, or show a placeholder in the editor only (`request.design_mode` + `placeholder_svg_tag`). On the live store, render nothing and let the layout collapse cleanly. No broken `<img>`.
- Never hardcode asset paths, Figma export URLs, temporary CDN links, or stock images you inserted yourself. Don't download Figma media; the merchant uploads the final files.

## Not recommended

- A parallel "Kalles-style" settings framework, or copying a set of generic settings into every component.
- Settings for values merchants won't reasonably adjust (implementation constants; see the exceptions in the Theme Editor control policy).
- Layout options a component can't actually support. Only offer choices that have been implemented and tested for that specific section.
- New global settings in `settings_schema.json` without explicit approval.
- Editing locale JSON for labels without permission (use literal labels).
