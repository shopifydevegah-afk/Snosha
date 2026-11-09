---
name: figma-to-sections-workflow
description: Native-first, pixel-accurate Figma-to-Shopify workflow for the Shosha Horizon 4.4 theme. Enforces section and block reuse, on-demand custom_class integration, reversible scoped CSS, safe schema extensions, RTL, developer CSS ownership, structured planning, and visual QA. Use for any task that turns a Figma design (link or node ID) into Shopify sections/blocks, or that customizes an existing section or block to match Figma.
---

# Shosha: Figma → Horizon Sections Workflow

**Project:** Shosha · **Brand:** SNOSHA · **Theme:** Shopify Horizon 4.4.0 · **Primary language:** Arabic (RTL)
**Design source:** Figma links and node IDs supplied in each task. Figma is the visual source of truth.

We extend and adapt Horizon. We do not rebuild it.

## Official Figma references (project level)

| Frame | URL | Node ID |
|---|---|---|
| File | https://www.figma.com/design/1fqyznLFgS65tTjGvBYPBm/Snosha | fileKey `1fqyznLFgS65tTjGvBYPBm` |
| Desktop | https://www.figma.com/design/1fqyznLFgS65tTjGvBYPBm/Snosha?node-id=190-3767 | `190:3767` |
| Mobile | https://www.figma.com/design/1fqyznLFgS65tTjGvBYPBm/Snosha?node-id=190-4082 | `190:4082` |

Frame widths are **1480px desktop** and **390px mobile**, not 1440/375. The section node map and design tokens are in `figma-analysis-and-qa.md`.

These are the full-page project frames, used for context. Each section is built from its own child nodes, either found inside these frames or given in the task. A more specific node in a task takes priority for that task. Having these frames does **not** authorize building or changing any section: implement only the sections a task asks for.

> **REUSE FIRST. EXTEND SECOND. CREATE LAST.**
> Every section or block we actively customize gets a `custom_class` setting, added **on demand** and never rolled out across the repo. All Figma CSS is scoped under that class, so removing the class turns that styling off.

## Reference files (read only what the current stage needs)

| File | Read when |
|---|---|
| [references/horizon-architecture.md](references/horizon-architecture.md) | Before any audit or implementation: wrappers, layout grid, tokens, breakpoints, RTL and CSS loading as they exist in this repo |
| [references/native-component-registry.md](references/native-component-registry.md) | Stage C (reuse audit): what each section/block does, its extension points, and the **log of project extensions** |
| [references/custom-class-policy.md](references/custom-class-policy.md) | Any time you add `custom_class`, render it, or write scoped CSS; includes reversibility and two-state testing |
| [references/schema-extension-policy.md](references/schema-extension-policy.md) | Before adding any schema setting |
| [references/developer-css-ownership.md](references/developer-css-ownership.md) | Before writing CSS or touching shared files, and when several sessions are active |
| [references/figma-analysis-and-qa.md](references/figma-analysis-and-qa.md) | Stage B (Figma extraction), Stage F (code checks) and Stage G (visual QA) |
| [references/project-plan-template.md](references/project-plan-template.md) | Stage A/H: plan lifecycle rules, structure (areas A–H), status vocabulary, audit format |

## Project plan (permanent)

`.claude/shosha/project-plan.md` is the **one permanent project plan**. The Skill says *how* to work; the plan records *what* has been decided and done.
- It already exists. Create it only if it's missing, and never re-create it or make per-section or per-developer plans.
- Read it at the start of every relevant task.
- Update it only when something actually changes. Global changes go in the global areas; section work updates that section's existing entry.
- After a Skill change, update the plan only if project decisions or tracked work are affected.
- Keep history.

Full rules: project-plan-template.md.

## Hard rules

1. **Native first.** Pick the lowest category that works safely (see the ladder below). Never create a section because it is faster.
2. **`custom_class` on demand.** Add it only to the sections or blocks you customize in the current task, and to every new custom section or block. Reuse an existing class setting if one exists (none exists in stock Horizon 4.4; check the registry log).
3. **Scoped CSS.** Every Figma-specific selector *depends on* the custom class (nesting under it, or a `:has()`/sibling form for backgrounds), and lives in the developer's own CSS file. No unscoped selectors, no edits to native Horizon CSS for Figma looks, and `!important` only with a written reason.
4. **Three-level reversibility.** (1) Removing the class turns off all its CSS (mandatory). (2) Liquid/JS changes keep the native path and sit behind opt-in settings whose defaults equal native. (3) Settings changed in the Theme Editor are recorded, because removing the class doesn't reset them. Details: custom-class-policy.md §6.
5. **Use Horizon tokens** (`--font-*`, `--color-*`, `--gap-*`, `--page-*`, palette, type presets) before hardcoding values. Exact Figma values that have no token go under the custom class and get a comment.
6. **Horizon breakpoints** (`749px`/`750px`, `990px`, plus `1440px` when needed); see the architecture file. Mobile follows the Mobile Figma frame, not a scaled-down desktop.
7. **RTL is mandatory.** Use logical properties (`margin-inline-start`, `inset-inline-end`, …). Don't mirror icons blindly; Horizon already flips slideshow arrows and close buttons.
8. **Approval:** routine edits inside an approved Figma task, and setting up your own developer CSS file, don't need extra approval. Ask first for: category E, category D changes to multi-caller shared snippets, protected files (`layout/theme.liquid`, `config/*`, `assets/base.css`, `custom-cairo.css.liquid`, locales), destructive or incompatible changes, anything outside the task, Horizon/CLI updates and dependencies. Don't commit, push, deploy or create worktrees.
9. **No unverified claims.** A section is VERIFIED only when Theme Check shows no offenses beyond the baseline, and visual QA (desktop, mobile, RTL) plus the two-state test have screenshot or browser evidence. Without it, visual QA stays `PENDING USER REVIEW` and the section must not be marked `VERIFIED`.
10. **Media is editable in the Theme Editor.** Merchants must be able to replace any content media (images, videos, posters, mobile variants, content icons) without touching code. Reuse native media/resource settings first, and add safe `image_picker`/`video` settings only where they're missing. The merchant supplies the final files; never hardcode Figma exports. UI icons can stay in code. Details: schema-extension-policy.md "Media settings".
11. **Measured values only.** Never invent Figma measurements, file paths or theme capabilities. Write assumptions down.
12. **Native preset reuse and native Theme Editor names.** If a native Horizon section or preset already provides the needed structure, inspect its exact `{% schema %}` `presets` and reuse the original section type, block hierarchy, and merchant editing experience. Extend only what Figma requires. Do not rebuild or rename the preset without a documented technical reason. Preserve the native Theme Editor section name; the visible heading is content, not the Section instance name. Do not globally alter native preset definitions without explicit approval.
13. **No preview or server execution — user-owned visual QA.** Never start, restart, stop, attach to, or configure any Shopify development/preview process or web server. Do not run `shopify theme dev`, `shopify theme serve`, `shopify theme preview`, `shopify theme push`, `shopify theme pull`, or commands/scripts that start a server, reserve a port, upload, or synchronize theme files. Do not kill processes or free ports. Even if the user says a preview exists, leave it untouched. The user alone manages previews and visually inspects the output. Do not run browser automation against a theme preview. Perform local, non-server code checks only; record visual/Theme Editor, tablet, console, and class on/off QA as PENDING USER REVIEW unless the user supplies evidence. Never label these checks as passed without evidence.

## Implementation ladder (Native Reuse Audit → category)

| Cat. | Meaning | Typical work |
|---|---|---|
| **A** | Native configuration | Theme Editor settings only. Add `custom_class` only if CSS is needed |
| **B** | Native schema extension | Add the missing settings to an existing section or block |
| **C** | Native composition | Combine existing sections, blocks (`group`, `_content`, `_card`…) and snippets |
| **D** | Minimal custom extension | Small isolated Liquid/CSS/JS change to a native component, with a fallback |
| **E** | New custom section | **Last resort.** Write why A–D fail (fragile, unsafe, or impossible) before building |

Don't force reuse if it leads to fragile hacks. Pick the smallest *safe, maintainable* option. Never copy a whole native section to change a few details.

## Workflow for every Figma task

**A. Read context.** Read this file, the project plan (status, ownership, claims, dependencies, earlier decisions, pending decisions), the registry's extension log, and the CSS ownership map. Find the requested section's existing entry (S01…). Only add a new entry if the section truly isn't listed. Find out which developer you are (Main → `main.css`, Dev1–3 → `dev1`–`dev3.css`), and ask if that's unclear. If your file isn't set up yet, follow "Developer initialization" in `developer-css-ownership.md`; never set up another developer's file. Run `git status` to see uncommitted work by others.

**B. Analyze Figma.** First check which Figma tools are available, and load any prerequisite skills they require (see `figma-analysis-and-qa.md`). Starting from the official frames above (or the nodes given in the task), find the requested section's Desktop and Mobile nodes. Inspect them separately and extract measurements using the checklist there. If there's no Figma access, say so and mark values `UNVERIFIED`. Never edit the Figma file.

**C. Native Reuse Audit.** Search `sections/`, `blocks/` and `snippets/` (start with the registry) and fill in the audit template in `project-plan-template.md`. Pick a category from A–E.

**D. Plan.** Record in the plan: components to reuse, missing settings, the custom class name, the CSS owner, Liquid/JS changes, shared-file risks, and justification if the category is E. Get approval only for the cases in hard rule 8. Claim shared files in the plan before editing them.

**E. Implement.** Make focused changes. Add `custom_class` only where you're customizing, with the snippet and pattern from `custom-class-policy.md`. Put CSS in the owner's file. Configure content and settings in the Theme Editor or the template JSON (follow the shared-file rules).

**F. Local automated checks only.** Run `shopify theme check` (without a development server) and compare with the recorded baseline; do not introduce new offenses. Validate schema/JSON, Liquid syntax where locally supported, file asset references, and JS syntax (`node --check`). Inspect CSS references statically. Do not start Shopify CLI preview processes, connect to existing live previews, open Theme Editor, or claim browser console checks were performed.

**G. Visual QA — user owned.** Do not start or interact with a preview, browser automation, or Theme Editor. Hand the user a concise manual QA checklist: Figma comparison at 1480px and 390px, intermediate/tablet widths, Arabic RTL, media settings, Theme Editor controls, overflow, interactions, and class-on/class-off reversibility. Record these as `PENDING USER REVIEW`. The user may later provide screenshots and findings for an assisted review; never infer a successful visual test from code checks.

**H. Update progress.** Update that section's existing entry in the plan (areas D/E/F), and log any project-level decision in area H. Append any `custom_class` or other schema additions to the registry's extension log. Use `IMPLEMENTED` after code work and local checks when appropriate, not `VERIFIED`; keep all user-owned visual QA pending until the user supplies evidence. Record what's left to review.

## Quick patterns

Class names: preferred `sn-<page>-<section>[-<part>]`. Other names are fine if a collision check finds no matches.

Render the class (`snippets/custom-class.liquid` is created and tested on first use; see the policy):
```liquid
class="section section--{{ section.settings.section_width }} …{% render 'custom-class', value: section.settings.custom_class %}"
```
Scoped CSS in the owner's file (product-list, where `.spacing-style` is the classed element itself):
```css
.sn-home-bestsellers {
  .product-card { border-radius: var(--style-border-radius-md); }
  /* --padding-* vars are inline → override the property, keep the transparent-header offset */
  &.spacing-style { @media screen and (max-width: 749px) {
    padding-block: calc(24px + var(--section-top-offset, 0px)) 32px;
  } }
}
.shopify-section:not(.header-section) .section-background:has(+ .sn-home-bestsellers) { /* background */ }
```
