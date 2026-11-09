# Developer CSS ownership & multi-session safety

**One developer = one CSS file**, holding every section that developer owns. Don't create a CSS file per section. Each file is created and loaded **on demand**, only when its developer starts work.

## Ownership map (checked 2026-11-08)

| Developer | CSS file | Status |
|---|---|---|
| Main | `assets/main.css` | **Initialized 2026-11-08**: the file existed (`/* main css */`, content kept) and is loaded once in `layout/theme.liquid` |
| Dev1 | `assets/dev1.css` | Not initialized (file absent, no tag) |
| Dev2 | `assets/dev2.css` | Not initialized (file absent, no tag) |
| Dev3 | `assets/dev3.css` | **Initialized 2026-11-08** (S05): loaded once in `layout/theme.liquid`, right after `main.css` |

None of these names clash with Horizon assets. Switch to `assets/shosha-<dev>.css` only if a real filename clash appears, and update this table if you do.

Other custom assets (shared, owned by Main, protected): `assets/custom-cairo.css.liquid` (the Cairo font override) and `assets/cairo-variable.woff2`.

## Loading order (in `layout/theme.liquid`, after `{{ content_for_header }}`)

```liquid
{{ 'custom-cairo.css' | asset_url | stylesheet_tag }}   ← stays first, never changed
{{ 'main.css' | asset_url | stylesheet_tag }}           ← loaded since 2026-11-08
{{ 'dev1.css' | asset_url | stylesheet_tag }}           ← added only when Dev1 initializes
{{ 'dev2.css' | asset_url | stylesheet_tag }}           ← added only when Dev2 initializes
{{ 'dev3.css' | asset_url | stylesheet_tag }}           ← loaded since 2026-11-08
```

Each tag goes in its numeric slot: after the nearest *lower-numbered* developer tag that exists, or after `main.css`. That keeps the order the same no matter who starts first. These files load after `base.css` and the compiled `{% stylesheet %}` bundle (both come before or inside `content_for_header`), so a scoped rule wins over a native rule of equal specificity. Order between developer files doesn't matter, because each owner only targets their own classes. Never use `@import` between files, and never load a file a second time from a section. Plain `.css` files can't contain Liquid.

## Developer initialization (run once, when a developer starts)

1. **Identify yourself.** Ask the user which developer this session is if it isn't clear. Find your file in the table.
2. **Check:** `ls assets/<file>` and `grep -c "'<file>' | asset_url" layout/theme.liquid`.
3. **File missing?** Create it with only a header comment (`/* <Dev> — Shosha Figma CSS. Scoped per class; see figma-to-sections-workflow */`). **File exists?** Keep its content as it is.
4. **Tag missing (count 0)?** Run `git status` / `git diff layout/theme.liquid`, claim `layout/theme.liquid` in the plan, and add **only your own** tag in its slot. **Count 1** means it's already done. **Count above 1** means a duplicate: stop and report it.
5. **Verify:** the count is exactly 1, the Cairo line is unchanged, `shopify theme check` shows no new offenses, and if a preview is available, the file loads with no 404.
6. **Record it:** set your row to "Initialized <date>", add your row to the plan's area C (Developer ownership), and release the claim on `theme.liquid`.

This tag is the only `theme.liquid` edit allowed as routine work, and it isn't repeated afterwards. Never create or load another developer's file.

## Rules for owners

- Edit only your own file. If you need a change in someone else's file, note it in the plan and ask that owner.
- Every rule depends on a class you own (see the scoping rule in custom-class-policy.md §5). The plan's area C lists who owns which classes. Avoid selectors that overlap with another owner's classes.
- Start each class block with a header comment (class, component, Figma nodes), then the base rules, then `@media` rules inside the same nesting.
- Don't put Figma styling into native Horizon CSS (`base.css` or component `{% stylesheet %}` blocks).
- Don't duplicate utilities. If two owners need the same helper, Main adds it to `main.css`, still scoped behind a class (for example `.sn-u-<name>`).

## Shared files

**Shared** (several owners or components depend on them): `templates/*.json`, `sections/*-group.json`, `snippets/section.liquid`, `snippets/text.liquid`, `snippets/group.liquid`, `snippets/button.liquid`, `snippets/product-card.liquid`, `snippets/custom-class.liquid`, and any section or block another owner has logged in the registry.

**Protected** (global; need explicit user approval): `layout/theme.liquid` (except the developer-initialization tag above), `config/settings_schema.json`, `config/settings_data.json`, `assets/base.css`, `assets/custom-cairo.css.liquid`, `locales/*`.

Before editing any shared or protected file:
1. Run `git status` and `git diff <file>`. If the file has uncommitted changes you didn't make, stop and ask.
2. Check the plan's area C (Developer ownership). If someone else has claimed the file, coordinate with them first. Otherwise, claim it there.
3. Make the smallest possible edit and keep unrelated changes intact. The Theme Editor rewrites JSON templates and `settings_data.json`, so pull or confirm the latest version first and expect the editor to reformat them.
4. Release the claim when you're done.

## Approval policy

**No extra approval needed** for routine edits inside an approved Figma task:
- adding `custom_class` to the component being customized
- scoped CSS in your own file
- editing shared files following the steps above
- category A–C work
- your own developer initialization

**Explicit user approval needed for:**
- category **E** (new section)
- category **D** changes to shared snippets with several callers
- any other edit to a protected file
- destructive or potentially incompatible changes (removing or renaming settings or blocks, changing JS hooks)
- anything outside the approved task

**Never** create git worktrees, commit, push, `shopify theme push`/publish, or deploy unless the user asks. Never reformat or overwrite another owner's file.
