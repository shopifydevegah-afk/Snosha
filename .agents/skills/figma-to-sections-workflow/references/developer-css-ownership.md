# Developer CSS ownership & multi-session safety

> Consolidated from the supplied Accept Both document. Historical initialization claims are not verification of the current working tree.

**One developer = one CSS file**, containing the Figma-specific CSS for every section that developer owns. **Do not create a CSS file per section.** Each developer stylesheet is created and loaded **on demand**, only when that developer begins work.

## Ownership map (historical reports dated 2026-11-08)
The accepted-both versions contained contradictory "initialized" and "not initialized" rows. The consolidated table below retains the **positive initialization reports as historical evidence**, not as proof of the current worktree state. **Inspect the actual file and `layout/theme.liquid` before changing anything.**

| Developer | CSS file | Consolidated historical status | Current worktree status |
|---|---|---|---|
| Main | `assets/main.css` | Reported initialized on 2026-11-08: existing file (`/* main css */`) preserved, stylesheet tag added once | **VERIFY** |
| Dev1 | `assets/dev1.css` | Reported initialized on 2026-11-08 for S03: file created and loaded once after `main.css`; another snapshot reported not initialized | **VERIFY** |
| Dev2 | `assets/dev2.css` | Reported initialized on 2026-11-08: file created and loaded once after `main.css`; other snapshots reported not initialized | **VERIFY** |
| Dev3 | `assets/dev3.css` | Reported initialized on 2026-11-08 for S05: file created and loaded once after `main.css`; other snapshots reported not initialized | **VERIFY** |

These are **four ownership assignments**, not nine developer entries. The conflicting statuses likely describe different branch/worktree snapshots or stages, but their exact provenance is **not established by the pasted text**.

None of these filenames was reported to clash with stock Horizon assets. Switch to `assets/shosha-<dev>.css` **only if a real filename collision is confirmed**, then record the new name in this table and the permanent project plan. Do not rename existing files merely to resolve documentary conflicts.

Other custom shared assets, owned by Main and protected:

- `assets/custom-cairo.css.liquid` — Cairo font override.
- `assets/cairo-variable.woff2` — font asset.

## Loading order in `layout/theme.liquid`
Keep the stylesheet tags in this canonical order **when the relevant file has actually been initialized**:

```liquid

{{ 'custom-cairo.css' | asset_url | stylesheet_tag }}

{{ 'main.css' | asset_url | stylesheet_tag }}

{{ 'dev1.css' | asset_url | stylesheet_tag }}

{{ 'dev2.css' | asset_url | stylesheet_tag }}

{{ 'dev3.css' | asset_url | stylesheet_tag }}

```

This is an **ordering reference**, not an instruction to add tags for developers whose files have not been initialized. Each active file is loaded **exactly once**. In particular, do **not** add a second `dev3.css` tag; the accepted-both text contained a duplicate example, not a requirement for two loads.

- Insert a new owner's tag in its numeric slot after the closest existing lower-numbered developer tag (or after `main.css`).
- Preserve the Cairo stylesheet and the existing native stylesheet order.
- Do not assume current load order or whether `base.css` and `{% stylesheet %}` compiled output appear earlier without inspecting the actual `theme.liquid`; verify the cascade before relying on equal specificity.
- Never `@import` one developer stylesheet from another.
- Never include a developer CSS file again from within an individual section.
- Plain `.css` files cannot contain Liquid.
- Different owners' selectors must be isolated through their assigned custom classes; order is not a substitute for isolation.

## Developer initialization (once per developer per actual worktree)
1. **Identify the developer.** If ownership is not clear from the current task/worktree and project plan, ask which developer the session represents before editing owner-specific files.

2. **Inspect actual state.** Check that `assets/<file>` exists and count matching `asset_url | stylesheet_tag` references in `layout/theme.liquid`. Inspect the actual contents, not merely the historical table.

3. **File missing?** Create it with only an identifying header comment, e.g. `/* Dev1 — Shosha Figma CSS. Scoped per class; see figma-to-sections-workflow. */`. **File exists?** Preserve all existing content; do not replace or clear it.

4. **Tag count = 0?** Inspect `git status` and `git diff -- layout/theme.liquid`, follow the shared/protected-file ownership procedure, claim it in area C of the permanent plan, then add **only the current owner's tag** in its numeric slot **if the associated file exists**. **Count = 1?** No change. **Count > 1?** Stop this initialization and report the duplicate; do not silently rewrite a protected file.

5. **Verify locally.** Confirm exactly one matching tag for an initialized file, Cairo line unchanged, no accidental edits to other owners' tags, no new offenses in `shopify theme check` (compare with baseline), and correct file path/casing. **Do not start a server or preview, use browser automation, or claim a live network/404 test.** File loading in the browser remains **PENDING USER REVIEW**.

6. **Record and release.** Record the observed initialization state and date in area C of `.claude/shosha/project-plan.md` and release the `layout/theme.liquid` claim. Do not overwrite entries belonging to other developers.

Adding this one owner-specific tag is the **only routine** `theme.liquid` edit exempt from additional explicit user approval, subject to the shared-file safety checks. Never initialize another developer's CSS file.

## Rules for owners
- Edit only your assigned CSS file. If a change belongs in another owner's CSS, record the requirement in the plan and coordinate with that owner.
- Every Figma-specific rule must depend on a custom class you own, as defined in `custom-class-policy.md` §5. Area C of the permanent project plan records class ownership.
- Avoid selectors that target another developer's custom classes or unrelated Horizon components.
- Start each section/class block with a comment recording the class, relevant component and Figma nodes; put base rules and responsive rules together in that owner's stylesheet.
- Do not put project-specific Figma styling into native Horizon CSS (`assets/base.css` or unrelated component `{% stylesheet %}` blocks).
- Do not duplicate shared utilities. If several owners need the same helper, Main may add it to `main.css`, scoped under a suitable utility class such as `.sn-u-<name>` and coordinated with all callers.
- Changes to a native section's built-in styling for structural/functional reasons must obey the skill's reuse, schema extension and approval rules; this is not permission to move owner-specific visual styling into native CSS.

## Shared and protected files
**Shared** (multiple owners or components can depend on these):

- `templates/*.json`
- `sections/*-group.json`
- `snippets/section.liquid`
- `snippets/text.liquid`
- `snippets/group.liquid`
- `snippets/button.liquid`
- `snippets/product-card.liquid`
- `snippets/custom-class.liquid`
- Any section or block another owner has logged in the registry.

**Protected** (global; explicit user approval except for the one developer-initialization tag described above):

- `layout/theme.liquid`
- `config/settings_schema.json`
- `config/settings_data.json`
- `assets/base.css`
- `assets/custom-cairo.css.liquid`
- `locales/*`

Before editing any shared or protected file:

1. Run `git status` and `git diff -- <file>`. If there are uncommitted changes that another owner made, **stop and coordinate**; do not overwrite them.

2. Check area C of `.claude/shosha/project-plan.md` for active claims. If another developer owns the current edit, coordinate first. Otherwise claim the file there.

3. Make the smallest safe edit and preserve all unrelated contents and identifiers. Shopify Theme Editor can rewrite JSON templates and `settings_data.json`; **do not run `shopify theme pull` or access an existing preview to synchronize.** Instead use the locally available revision and ask the user to provide or reconcile the newer editor version if there is a conflict or uncertainty.

4. Release the file claim once the change is complete.

The exception permitting a routine stylesheet tag **does not** grant permission to make unrelated protected-file edits.

## Approval policy
**No additional approval required** within an already approved Figma task, as long as all ownership and safety checks pass:

- Adding `custom_class` to the component being customized.
- Scoped CSS in the current developer's file.
- Safe shared-file edits under the claiming/coordination procedure.
- Categories A–C.
- The current developer's one-time stylesheet initialization.

**Explicit user approval required** for:

- Category **E** (new section).
- Category **D** changes to shared snippets with multiple callers.
- Any other protected-file edit.
- Destructive or backward-incompatible changes, including deleting or renaming settings or blocks and changing JavaScript hooks.
- Work outside the approved task.

## Strict multi-session and preview safety
Unless the user explicitly authorizes a particular Git/write action where applicable, **never**:

- Create or manipulate Git worktrees.
- Commit, push, publish, deploy, or run `shopify theme push`.
- Run `shopify theme pull`.
- Start, stop, restart, or interact with a Shopify development server or Theme Editor.
- Run `shopify theme dev`, `shopify theme serve`, or a preview command.
- Inspect another developer's running preview through browser automation.
- Claim visual or runtime verification not supplied by the user.

Permitted local checks include `git status`, `git diff`, static CSS/JSON/Liquid inspection, and `shopify theme check`. Record visual verification as **PENDING USER REVIEW**.

**Never reformat or overwrite another owner's work.**

## Merge notes (documentation only)
- Consolidated three repeated historical status reports for Dev1, Dev2 and Dev3 into one row per developer, retaining both positive and negative reports without choosing an unverified current status.
- Removed the repeated `dev3.css` loading example from the canonical order; the actual project file has **not** been inspected or edited.
- Replaced the obsolete preview/404 step and the generic “pull latest” instruction with local-only checks consistent with the project no-preview/no-pull policy.
- No active worktree state, Git diff or stylesheet-load result is asserted by this document.
