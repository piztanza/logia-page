# Escalation — REFACTOR_BEHAVIOR_CHANGE

**Job:** build (refactor mode, cross_cutting) on branch `refactor/onboarding`
**Result:** escalated
**Raised:** 2026-07-13

## Summary

One rubric convention cannot be satisfied by a behaviour-preserving refactor:
it directly conflicts with existing characterization tests that were authored to
pin the current behaviour. Per the builder contract (step 4), a change that would
require editing a characterization test is a **behaviour change** and must route
through **ba-change**, not a refactor.

## The conflict

Rubric (`product/.ba/analysis/rubric.json`), readability + conventions dimensions:

> "No dead or placeholder links: every nav/footer anchor resolves to a real
>  in-page section, or is removed."

The following anchors are dead / placeholder links, and each is **explicitly
pinned by a green characterization test**:

| Location | Anchors | Pinning test | Test's own note |
|---|---|---|---|
| `src/components/sections/Hero.tsx` (bottom-nav pill) | `#enterprise`, `#ai-audit`, `#saas`, `#consulting` — no matching section exists | `src/components/sections/__tests__/Hero.test.tsx` → *"renders the four bottom-nav pill links with their current hrefs"* | "INCLUDING their current placeholder hrefs" |
| `src/components/layout/Footer.tsx` (Products column) | `#` ×4 (Enterprise Audit, Agentic Engine, SME SaaS, Custom Dev) | `src/components/layout/__tests__/Footer.test.tsx` → *"renders the Products column with its current placeholder hrefs"* | "INCLUDING the Products column's current placeholder '#' hrefs" |
| `src/components/layout/Footer.tsx` (Legal row) | `#` ×3 (Privacy Policy, Terms of Service, Cookies) | `src/components/layout/__tests__/Footer.test.tsx` → *"renders the copyright and legal row with current placeholder hrefs"* | "also currently '#' placeholders" |

Resolving or removing these links would flip those assertions red — i.e. it would
require rewriting the behaviour contract. That is a product-behaviour decision
(where should these links point? should they be removed?), not a mechanical
refactor. **Routing to ba-change.**

Section anchors that DO resolve (Navbar: `#about`, `#services`, `#methodology`,
`#products`, `#contact`, `#market`; Footer Company column: `#about`,
`#methodology`, `#market`, `#contact`) are already correct and were left as-is.

## Behaviour-preserving refactor that WAS applied (green-to-green)

To avoid a silent rubric violation on the architecture standard
*"A single site-config module as the source of truth for external integrations …
centralize … WhatsApp number in src/config"*, the following was refactored without
changing observable behaviour (full suite stayed 22/22 green, `tsc --noEmit` clean):

- Added `src/config/site.ts` — the single source of truth for external
  integrations: the WhatsApp number + greeting (previously a hard-coded literal
  in `Contact.tsx`) and a `getWeb3FormsConfig()` accessor that reads the
  Web3Forms endpoint/key from `import.meta.env` **at call time** (preserving the
  original submit-handler read timing so env stubbing in tests stays effective).
- `src/components/sections/Contact.tsx` now imports `whatsAppHref()` and
  `getWeb3FormsConfig()` from the config module; the hard-coded `wa.me` literal
  is gone. The generated `WA_HREF` value and all submit behaviour are byte-identical.

## Not touched (behaviour changes / out of safe scope)

- Dead/placeholder link removal (the escalated item above).
- Reduced-motion gating for the timer-driven `LoadingScreen` breathing loop and
  the scroll-driven `Methodology` animations — adding gating changes observable
  behaviour under `prefers-reduced-motion`, which the characterization tests fix
  as "renders without breaking". Deferred to ba-change if desired.
