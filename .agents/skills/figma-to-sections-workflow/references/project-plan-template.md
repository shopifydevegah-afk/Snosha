# Project plan: lifecycle, structure, status rules

**Canonical plan:** `.claude/shosha/project-plan.md` is **the one permanent, project-wide plan** (created 2026-11-08). It lives under `.claude/`, outside Shopify's theme folders, so it is never uploaded to the store.

The Skill says **how** to work. The plan records **what** this project has decided and done. The plan refers to the Skill's rules but never copies them. For example:
- Skill: "content media must be editable in the Theme Editor."
- Plan: "S03 uses hero `image_1` + `image_1_mobile`, with the desktop image as fallback."

## Lifecycle rules

1. **Create once.** Only if `.claude/shosha/project-plan.md` is missing, create it from the skeleton below. Never overwrite it with a fresh template. Never create a second plan, a per-section plan, or a per-developer plan.
2. **Read before work.** Every planning or implementation task starts by reading the plan: status, ownership, claims, dependencies and earlier decisions.
3. **Update only when something changes**: architecture, approved decisions, ownership, Figma references, section scope or progress, validation results, blockers, dependencies. If nothing relevant changed, leave the plan alone.
4. **Global change → global area.** Update area B, C or G. Then check whether any existing section decisions are affected, update only those entries, and log the change in area H.
5. **Section work → its existing entry.** Update that section's rows in D, E and F. Never add a duplicate entry, and leave other sections untouched.
6. **Skill change → consistency review.** If a Skill change affects project decisions or tracked work (for example, a new required setting or a changed CSS convention), update the affected plan areas and log the migration needed in H. A documentation-only Skill change with no project impact doesn't touch the plan.
7. **Keep history.** Never silently remove decisions, completed work, QA results, blockers or ownership. Mark replaced decisions `SUPERSEDED (date): → new decision, reason`.
8. **Minimal edits.** Don't rewrite the whole plan for formatting, don't renumber section IDs, don't reset statuses, don't bump dates without a real change, and don't paste in implementation detail that belongs in code or the registry.

## Statuses (single vocabulary)

**Section status:** `NOT_STARTED` → `ANALYZED` (section-level Figma extraction done) → `PLANNED` (reuse audit and decisions recorded) → `IMPLEMENTED` (code done, checks run) → `VERIFIED` (all QA passed with evidence). `BLOCKED` can happen at any stage; always give the reason.

**QA columns:**
- `—`: stage not reached yet
- `PENDING` · `PASS` · `FAIL` · `N/A` (with reason)
- Reversibility QA, after a passing two-state test: `CLASS_ONLY` · `CLASS_PLUS_SETTINGS: <settings>` · `OPT_IN_STRUCTURAL: <setting>` · `NOT_FULLY_REVERSIBLE: <reason>` (custom-class-policy.md §6)

Never mark a section VERIFIED while any of its QA columns is `PENDING`, `FAIL` or `—`. `NOT_FULLY_REVERSIBLE` needs the user's agreement, recorded in H.

## Plan skeleton (initial creation only)

```markdown
# Shosha – Project Plan (permanent)
> Single source of truth for project decisions & progress. Rules: figma-to-sections-workflow skill → references/project-plan-template.md. Update incrementally; never recreate.

## A. Project overview
## B. Global architecture decisions   (short decisions + pointer to the governing Skill file)
## C. Developer ownership             (CSS files, initialization, explicit section assignments, shared-file claims)
## D. Section registry                (one row per logical section; stable IDs S01…)
| ID | Section | Desktop node | Mobile node | Target (template / group) | Owner | Status | Cat. | Native component | Custom class | Dependencies / blockers |
## E. Section decisions               (one subsection per section, created when its audit starts; holds the audit below)
## F. QA & progress
| ID | Figma analysis | Code checks | Visual desktop | Visual mobile | RTL | Media | Reversibility | Pending issues |
## G. Global risks & dependencies     (Confirmed facts | Pending decisions)
## H. Decision & change log           (date – change – why – affected – follow-up)
```

## Native Reuse Audit (goes in area E under the section's heading, before implementation)

```markdown
### S0X <Section name>
- Figma: desktop <node>, mobile <node> (+ sub-nodes used)
- Matching Horizon sections: …   Relevant blocks/snippets: …
- Native preset reused: <section file> → preset `t:names.…` (<English label>); instance `"name"` = that key; preset block hierarchy kept: yes/no (why)
- Native settings that cover it: …
- Missing settings: …            (gate: schema-extension-policy.md)
- Media: each item → resource | native setting | new setting (+ mobile fallback)
- Liquid changes: none | …       JS changes: none | …     CSS: scoped under .sn-… in <owner file>
- Custom class: .sn-…  on <file / root element>   (name collision check done: yes/no)
- Background via: native setting | scoped selector …   Settings changed from default: …
- Shared snippets touched + their callers: …
- Shared-file risks / impact on other pages: …
- Category: A | B | C | D | E   Justification (required for D/E): …
- Approved by user: <date / n.a.>
```
