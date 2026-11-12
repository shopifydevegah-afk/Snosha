# Developer CSS ownership & multi-session safety

**One developer = one CSS file**, containing all Figma-specific styling for that developer's assigned sections. Do not create a CSS file per section. Initialize a developer's file **on demand**, only when that developer starts work. This document sets policy; the permanent project plan (`.claude/shosha/project-plan.md`, area C) and the actual current worktree determine live ownership and initialization state.

## Ownership map

The following table consolidates the two conflicting versions after **Accept Both**. Positive initialization reports are retained as historical evidence, while `Not initialized` is retained as a different snapshot—not asserted to be the current state.

| Developer | CSS file | Consolidated historical record | Required current-session check |
|---|---|---|---|
| Main | `assets/main.css` | Reported initialized on 2026-11-08: existing `/* main css */` retained and loaded once in `layout/theme.liquid`. | Verify file exists and stylesheet tag appears exactly once. |
| Dev1 | `assets/dev1.css` | Reported initialized on 2026-11-08 for S03, created and loaded once after `main.css`; a separate earlier snapshot reported not initialized. | Verify actual file, tag and plan in the active worktree; do not recreate existing CSS. |
| Dev2 | `assets/dev2.css` | Conflicting snapshots: not initialized (file/tag absent) vs. initialized on 2026-11-08 and loaded after `main.css`; subsequent Dev2 work was documented. | Verify actual file, tag and plan in the active worktree; preserve any existing CSS. |
| Dev3 | `assets/dev3.css` | Conflicting snapshots: not initialized (file/tag absent) vs. initialized on 2026-11-08 for S05 and loaded after `main.css`; subsequent Dev3 work was documented. | Verify actual file, tag and plan in the active worktree; preserve any existing CSS. |

**Historical status is not live state.** The contradictory lines above came from different developer snapshots/branches, not necessarily the same worktree. Do not turn them into a claim that all files are simultaneously present or loaded. Confirm `assets/`, `layout/theme.liquid`, `git status`, and area C of the permanent plan before edits. Reconcile documented status only after checking evidence.

These names do not appear to conflict with stock Horizon assets in the original audit. If an actual collision is found, coordinate a rename and update the Skill/plan; do not rename files speculatively.

**Protected shared font assets:** `assets/custom-cairo.css.liquid` and `assets/cairo-variable.woff2` belong to the shared theme foundation (Main-coordinated). Do not change them during ordinary section work.

## Loading order

Stylesheet tags belong in `layout/theme.liquid` after the existing Cairo font integration, with the following **relative order for tags that actually exist**:

```liquid
{{ 'custom-cairo.css' | asset_url | stylesheet_tag }}
{{ 'main.css' | asset_url | stylesheet_tag }}
{%- comment -%} Add only if Dev1 has been initialized: {%- endcomment -%}
{{ 'dev1.css' | asset_url | stylesheet_tag }}
{%- comment -%} Add only if Dev2 has been initialized: {%- endcomment -%}
{{ 'dev2.css' | asset_url | stylesheet_tag }}
{%- comment -%} Add only if Dev3 has been initialized: {%- endcomment -%}
{{ 'dev3.css' | asset_url | stylesheet_tag }}
```

**The snippet above illustrates order, not a command to insert every line.** The conditional explanatory comments are not required in production. Do **not** add tags or files for inactive developers. Insert a newly initialized developer tag in its numeric slot; inspect the actual theme architecture before relying on assumed relative positions around `content_for_header`. Keep every loaded stylesheet referenced **once**, and preserve the Cairo integration unchanged. Do not use cross-file `@import` or load the same file from a section. Plain `.css` assets cannot contain Liquid.

A later developer stylesheet must not override another owner's styles: CSS ownership and unique section classes, not load order alone, enforce isolation. No broad rules with competing specificity.

## Developer initialization — once per developer per worktree

1. **Identify the active developer/worktree.** If unclear, ask rather than using another developer's CSS file.

2. **Inspect without changing anything:** verify the intended file, count its stylesheet tag in `layout/theme.liquid`, read relevant changes and the permanent plan's area C. Check for pending edits and file claims.

3. **File missing?** Create **only the active developer's** file with a brief CSS header comment. **File exists?** Preserve its contents; never reset it.

4. **Tag count 0?** Inspect/claim the shared `layout/theme.liquid`, then add **only the active developer's** stylesheet tag once in the proper numeric slot. **Count 1?** Leave it intact. **Count >1?** Stop and report a duplicate; do not improvise changes over another session's edits.

5. **Local verification:** inspect the resulting tag count (exactly one), file path, Cairo reference, `git diff`, and `shopify theme check` against the documented baseline. **Do not open a preview or test for browser 404s**; runtime loading is `PENDING USER REVIEW` until the user provides evidence.

6. **Record:** update the existing plan's area C with the verified state, ownership, relevant date, and release the shared-file claim. No duplicate plan or row.

Adding a single developer's missing stylesheet tag is the only routine `theme.liquid` change allowed under this policy. Do not repeat it once initialized. Never initialize another developer's file on their behalf.

## Rules for owners

- Edit only your assigned CSS file. Changes requested in another owner's file require coordination with that owner.

- All Figma-specific CSS selectors must **depend on an owned Custom Class**, including valid scoped ancestor, sibling, or `:has()` relationships when required by Horizon's actual DOM. Do not let selectors affect other sections, blocks, or developer classes.

- Start each section class block with a comment naming the class, component, and Figma Desktop/Mobile nodes; group its base and responsive rules logically. Native CSS nesting is allowed.

- Do not place Figma-specific styling in `assets/base.css` or native Horizon `{% stylesheet %}` blocks. Minimal structural/native extensions may require their existing source files under the Skill's reuse rules, but presentation styling belongs in the owner CSS file.

- Avoid duplicate utilities. If a genuinely shared utility is required, coordinate with Main and scope it to an explicit opt-in class (for example `.sn-u-<name>`); do not impose it globally.

- Use existing Horizon and Cairo tokens first. Do not introduce a global font or color override as part of normal section styling.

## Shared and protected files

**Shared** (used across owners or components): `templates/*.json`, `sections/*-group.json`, `snippets/section.liquid`, `snippets/text.liquid`, `snippets/group.liquid`, `snippets/button.liquid`, `snippets/product-card.liquid`, `snippets/custom-class.liquid`, and any section/block already logged as shared or edited by another owner.

**Protected** (global; explicit user approval required except for the one-time developer CSS tag above): `layout/theme.liquid`, `config/settings_schema.json`, `config/settings_data.json`, `assets/base.css`, `assets/custom-cairo.css.liquid`, `locales/*`, and other agreed global foundations.

Before changing any shared or protected file:

1. Run `git status` and inspect the targeted `git diff`. If it contains unrecognized/uncommitted edits, **stop that edit and coordinate**; never erase or reformat them.

2. Consult the permanent plan's ownership/claims area. If another developer has an active claim, coordinate first; otherwise claim the file for the minimum duration necessary.

3. Make the smallest compatible change and preserve unrelated settings, IDs, media, JS hooks, and merchants' content.

4. **For Theme Editor-managed JSON:** do **not** run `shopify theme pull` or another remote sync command. Ask the user to supply/confirm the latest authoritative JSON when required, or limit work to safe code outside that file and report the blocker. Never overwrite remote editor changes based on a stale local JSON.

5. Release the claim and document meaningful changes in the existing project plan.

## Approval policy

**Routine changes within an already approved task** do not need fresh approval for each small edit: on-demand `custom_class` settings, scoped CSS in the owner's file, low-risk compatible edits to shared files under the coordination process, reuse categories A–C, and initializing the current developer's stylesheet.

**Explicit user approval required for:** category E (new custom section), category D high-risk changes to shared snippets with multiple callers, protected-file changes outside the one-time stylesheet tag, destructive/incompatible changes (including removal or renaming of settings/blocks or modification of shared JS hooks), and out-of-scope changes.

## Strict no-preview / no-remote-sync rule

**Claude Code must not start, restart, stop, attach to, or manage any Shopify preview or server**, including another developer's session. Never run `shopify theme dev`, `shopify theme serve`, preview-launching scripts, or browser automation against the storefront. Never free ports or kill processes. Never run `shopify theme push`, `shopify theme pull`, or automatic upload/synchronization commands.

Allowed: local repository inspection, `git status`/`git diff`, `shopify theme check`, local JSON/schema/Liquid checks where available, static CSS inspection, and JS syntax checks. Do not automatically commit or push Git, publish, deploy, or create Git worktrees. **Visual, Theme Editor, browser console, CSS-loading/404, and class-on/off checks are `PENDING USER REVIEW` until the user supplies evidence.**

## Maintenance

Keep exactly one persistent project plan at `.claude/shosha/project-plan.md`. Change its ownership rows only when verified state or assignments actually change; never recreate it for another developer. Preserve branch-specific history when reconciliations cannot yet be confirmed from the current worktree.
