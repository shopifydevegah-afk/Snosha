# Project plan: location, format, status rules

**Plan file:** `.claude/shosha/project-plan.md`. It doesn't exist yet. Create it from this template the first time a Figma task starts, then reuse it, and never keep a second plan. It lives under `.claude/`, outside Shopify's theme folders, so it is never uploaded to the store.

## Statuses

`NOT_STARTED` → `ANALYZED` (Figma extracted) → `PLANNED` (audit plus plan recorded) → `IMPLEMENTED` (code done, checks run) → `VERIFIED` (automated checks pass, visual QA and reversibility QA done with evidence). `BLOCKED` can happen at any stage; always give the reason.

**QA column values:**
- Code checks / Visual QA: `PENDING` · `PASS` · `FAIL` · `N/A` (with reason)
- Reversibility QA: `PENDING`, `FAIL`, or after a passing two-state test: `CLASS_ONLY` · `CLASS_PLUS_SETTINGS: <settings>` · `OPT_IN_STRUCTURAL: <setting>` · `NOT_FULLY_REVERSIBLE: <reason>` (definitions in custom-class-policy.md §6)

Never mark a section VERIFIED while any QA column is `PENDING` or `FAIL`. `NOT_FULLY_REVERSIBLE` needs the user's agreement in the log.

## Template (copy into the plan file)

```markdown
# Shosha – Figma implementation plan

## Ownership
| Owner | CSS file | Classes owned | Shared files currently claimed |
|---|---|---|---|
| main | assets/main.css | | |

## Sections
| # | Section | Page/template | Figma desktop | Figma mobile | Horizon candidate | Cat. (A–E) | Custom class | CSS owner | Modified files | Dependencies | Shared-file risks | Status | Code checks | Visual QA | Reversibility QA | Blockers |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

## Log
- YYYY-MM-DD – <section> – <what changed, files, results, remaining mismatches>
```

## Native Reuse Audit (write under the section's heading in the plan, before implementation)

```markdown
### <Section name> — audit
- Figma: desktop <node>, mobile <node>
- Matching Horizon sections: …   Relevant blocks/snippets: …
- Native settings that cover it: …
- Missing settings: …            (gate: schema-extension-policy.md)
- Liquid changes: none | …       JS changes: none | …     CSS: scoped under .sn-…
- Custom class: .sn-…  on <file / root element>   (name collision check done: yes/no)
- Background via: native setting | scoped selector …   Settings changed from default: …
- Shared snippets touched + their callers: …
- Shared-file risks / impact on other pages: …
- Category: A | B | C | D | E   Justification (required for D/E): …
```
