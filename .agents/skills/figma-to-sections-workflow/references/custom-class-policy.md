# Custom class policy: on demand, scoped, reversible

## When

| Situation | Action |
|---|---|
| Existing section or block you're customizing in this task | Add `custom_class` (unless the registry log shows it already has one) |
| New custom section or block | Include `custom_class` from the start |
| Section or block you're only *configuring* in the Theme Editor, with no CSS needed | Don't add it |
| Anything not in the current task | **Don't touch it.** No repo-wide rollout |

## 1. Naming

- **Preferred:** `sn-<page>-<section>[-<part>]`, for example `sn-home-hero` or `sn-pdp-details-gallery`.
- Other descriptive names are fine too, including `custom-*`, **as long as they don't collide**. Before using a name, search for it as a whole token in `assets/`, `sections/`, `blocks/`, `snippets/` and the plan's ownership table. Horizon already uses about 20 `custom-*` tokens as classes, attributes or element names: `custom-section-background`, `custom-section-content`, `custom-typography`, `custom-font-size`, `custom-color`, `custom-width`, `custom-popover`, `custom-styles` and others. That's why `sn-` is preferred: it has no matches today.
- Use lowercase `a-z`, `0-9` and `-`, starting with a letter. This way the sanitizer (§3) leaves the name unchanged, and the CSS selector is exactly what the editor typed.
- Give each class one meaning: one component instance, or one deliberately shared variant. Record the owner in the plan.

## 2. Schema setting

Append to the end of the component's `settings` array, after a `header`, so native settings keep their order and existing instances are unaffected:

```json
{ "type": "header", "content": "Advanced" },
{
  "type": "text",
  "id": "custom_class",
  "label": "Custom CSS class",
  "info": "Lowercase letters, numbers and hyphens, starting with a letter. Separate multiple classes with spaces."
}
```

- No `default`. Empty means native.
- Literal labels are valid. Horizon uses `t:` keys, but adding keys means editing `locales/*.schema.json`, which needs explicit permission.
- If the ID already exists, reuse it. Don't add `css_class`, `class_name` or similar duplicates.
- Check the settings count first (see the "Settings count" note in schema-extension-policy.md).

## 3. Sanitizing snippet: `snippets/custom-class.liquid`

**Not created yet and not tested.** Create it in the first implementation task that needs it, run the test matrix below, and write down the actual outputs in the registry log.

```liquid
{%- doc -%}
  Outputs sanitized custom classes from a `custom_class` setting, each prefixed with a space, or nothing when blank.

  @param {string} [value] - Raw `custom_class` setting value

  @example
  class="section section--page-width{% render 'custom-class', value: section.settings.custom_class %}"
{%- enddoc -%}
{%- liquid
  if value != blank
    assign parts = value | strip | split: ' '
    for part in parts
      assign clean = part | handleize | escape
      if clean != blank
        echo ' '
        echo clean
      endif
    endfor
  endif
-%}
```

How it handles each kind of input:
- **One class, or several space-separated classes:** each part is cleaned on its own and gets its own leading space, so `sn-home-hero sn-home-banner` becomes `␠sn-home-hero␠sn-home-banner`, two separate classes that never get merged.
- **Spaces at either end, repeated spaces, empty input:** `strip` removes outer spaces. Repeated spaces produce empty parts (or none, depending on how `split` treats repeated spaces), and the `!= blank` guard skips them either way. A blank value outputs nothing.
- **Unsafe characters:** `handleize` produces a handle-style token (lowercase, with special characters turned into `-`). `escape` is a second safety net, so quotes or `<` can't break out of the HTML attribute.
- **Limitations to check on first use (not assumed):**
  - What `handleize` does with `_`, uppercase letters, Arabic/Unicode letters, and a leading digit.
  - Any name that doesn't follow §1 may come out different from what the editor typed, or not be usable as a CSS selector (for example, one starting with a digit).
  - This is why §1 requires names in the canonical form. If an editor types something else, the CSS has to target the normalized output, so check the rendered HTML.
- **Test matrix.** Render each input and record what you actually get. "Expected" is the *requirement*, not a known `handleize` result:

  | Input | Expected | Notes |
  |---|---|---|
  | `sn-a` | `sn-a` | |
  | `sn-a sn-b` | `sn-a sn-b` (two classes) | |
  | `␠␠sn-a␠␠␠sn-b␠␠` | `sn-a sn-b` | |
  | empty / spaces only | nothing output | |
  | `SN-A` | `sn-a` | uppercase is lowercased |
  | `sn_a` | a single safe token | `handleize` may output `sn-a` or keep `_`. Whatever it outputs is the selector to use |
  | `sn-a"><x` | a safe token, no `"` or `<` in the HTML | |
  | `1abc` | accepted as-is, but not usable as a plain CSS selector | §1 forbids names that start with a digit |
  | an Arabic word | a safe token, or dropped | unknown |

  If the results aren't acceptable, change the snippet (for example, drop `handleize` and keep only `escape`), then update this table. Don't change §1.

## 4. Rendering: where the class goes

Append the class to the component's **existing** root element. Keep every native class, `id`, `data-*`, `aria-*`, `ref`, `on:*` and other JS hook, and don't add wrapper elements.

| Root type (as found in the code) | How |
|---|---|
| Section with its own `.section` div (product-list, product-recommendations, carousel, media-with-content, collection-list, main-collection, …) | Inside that div's `class="…"`: `{% render 'custom-class', value: section.settings.custom_class %}` |
| `section` / `_blocks` (through `snippets/section.liquid`) | On the `.section` div in the snippet. It reads `section.settings` directly, so sections without the setting output nothing |
| `hero` | On the `.hero` root, which is also where the background media is rendered. The inner `.hero__container.section.spacing-style` holds the padding |
| Block that renders `snippets/text.liquid` or `snippets/group.liquid` (both take a `class` param) | `{%- capture custom_class -%}{% render 'custom-class', value: block.settings.custom_class %}{%- endcapture -%}`, then pass `class: custom_class`. If the caller already passes a class (for example `_content-without-appearance` passes `'media-with-content__content'`), **append**: `class: 'media-with-content__content' | append: custom_class` |
| Block whose snippet has no class param (`button`, `product-card`, …) | The smallest compatible change: add an optional `[class]` param to the snippet's `{% doc %}`, and output it on the root only when it isn't blank. Category **D** (see the shared-snippet rules) |
| Block with inline root markup | Add the class to that root's `class` attribute, using `block.settings.custom_class` |

### Shared-snippet rules (`section`, `text`, `group`, `button`, `product-card`, and any snippet with more than one caller)

1. List every caller (`grep -rn "render '<snippet>'" sections blocks snippets`). The callers found in the code are listed in the registry.
2. Read the snippet's existing `@param`s and how it currently builds its `class` attribute.
3. Append the new class to the existing classes and never replace them. Leave IDs, `data-*`, `aria-*`, `ref` and JS hooks untouched.
4. With no class passed, the output must be the same as before (apart from whitespace).
5. Only add a new param when no existing one can carry the class, and add it only to the snippet you need.
6. After the change, render representative callers (at least one per caller type), check them in the preview, and update the registry.

## 5. CSS scoping

All Figma CSS lives in the owner's file (developer-css-ownership.md).

**Rule:** every Figma-specific selector must *depend on* the custom class. The class must pick out the intended instance, and nothing nested inside may match elements outside that instance. The class doesn't have to be the first token. A `:has()` or sibling selector that requires the class is still scoped.

```css
/* sn-home-bestsellers — product-list on index | Figma desktop 12:345, mobile 12:678 | owner: main */
.sn-home-bestsellers {
  .product-card { border-radius: var(--style-border-radius-md); }

  @media screen and (max-width: 749px) {
    .product-card { gap: var(--gap-xs); }
  }
}
```

- **Specificity:** `.sn-x .native` (0,2,0) beats most native rules. If a native rule is more specific, match its selector under your scope instead of using `!important`. Use `!important` only with a written reason.
- **Nested `.spacing-style` / `.group-block`:** these classes repeat on nested blocks. Use child combinators (`>`) when you mean the section's own wrapper.

### Section backgrounds

`.section-background` is a **sibling** of the classed `.section` div, not a child. In product-list, product-recommendations and `snippets/section.liquid` it comes **immediately before** `.section`. In most sections both are direct children of `.shopify-section`, but in `main-blog` and `product-recommendations` they sit inside a wrapper element. `main-cart` has one inside a `<template>`, and `hero` has none.

1. Use the native `background_color`, `background_media` or `background_image` settings first.
2. If CSS is needed, use the adjacent-sibling form. It works whether or not there's a wrapper, and its specificity (0,4,0) beats the native rule `.shopify-section:not(.header-section) .section-background` (0,3,0):
   ```css
   .shopify-section:not(.header-section) .section-background:has(+ .sn-home-hero) { background: … }
   ```
   `.shopify-section:has(> .sn-home-hero) > .section-background` only works when both are direct children, and only *ties* the native specificity (it wins only because our files load later), so it's the fallback, not the default.
3. Confirm the real DOM order in the component first, and check the computed background in the browser.
4. Hero backgrounds live inside `.hero`, so normal descendant scoping applies: `.sn-x .hero__…`.

### Inline CSS variables and spacing

Horizon writes `--padding-*`, `--gap`, `--size-style-*` and similar into the element's **inline `style`**. A stylesheet rule can't override an inline custom property on the same element, whatever the class specificity (only `!important` could). Order of preference:

1. **Native Theme Editor setting** (padding, gap, width).
2. **Override the property that uses the variable**, scoped to the class, on the element that carries `.spacing-style`. Keep `--section-top-offset`, which pushes the first section down under a transparent header (base.css):
   ```css
   /* product-list / product-recommendations: .spacing-style is the classed .section itself */
   .sn-home-bestsellers.spacing-style { @media screen and (max-width: 749px) {
     padding-block: calc(24px + var(--section-top-offset, 0px)) 32px;
   } }
   /* section / _blocks: .spacing-style is the inner wrapper */
   .sn-home-intro > .custom-section-content > .section-content-wrapper { … }
   /* hero: */
   .sn-home-hero > .hero__container { … }
   ```
3. **Explicit mobile spacing setting** (schema extension) when editors need to control it.

Variables you set on the class *do* reach descendants that don't set the same variable inline. For container width, see "Layout levels" in horizon-architecture.md.

## 6. Reversibility contract (three levels)

| Level | Requirement | How it's achieved |
|---|---|---|
| **1. CSS** (mandatory) | Removing the class turns off **all** Figma CSS for that component | Every rule depends on the class (§5). No unscoped Figma overrides anywhere |
| **2. Structure (Liquid/JS)** | Removing a class does **not** undo markup or JS changes | Keep the native rendering path. Alternative markup or behavior goes behind an **opt-in setting** whose default equals native. No unconditional replacements, and existing JS hooks stay intact. Write down exactly what has to be switched off |
| **3. Theme Editor configuration** | Removing a class does **not** reset settings changed for Figma (width, padding, columns, alignment, layout options) | Record every setting changed from its default, so the native look can be restored on purpose |

Record one result per customization in the plan (Reversibility QA) and the registry log:
- `CLASS_ONLY`: removing the class fully restores the native look
- `CLASS_PLUS_SETTINGS`: also reset settings X, Y (list them)
- `OPT_IN_STRUCTURAL`: also switch off setting Z (alternative markup)
- `NOT_FULLY_REVERSIBLE`: explain why

### Two-state test (required before VERIFIED)

**State A, class set:** desktop and mobile match Figma, RTL is correct, native functions still work.
**State B, class cleared** (in the Theme Editor, or temporarily in the template JSON on a dev/preview theme, then restore it): no Figma CSS applies, the component looks native for its current settings, the layout isn't broken, there are no console errors, and nothing else on the page changed.

Proof of scoping comes from **reading each rule**, plus a **browser check**. In State B, the computed styles of the affected elements must match native, and other sections must be unaffected. A text search alone doesn't prove anything. Only mark reversibility as passed after running this test.
