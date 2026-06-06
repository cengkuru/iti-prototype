# ITI Website Success Prototype: what this is and why

A click-through prototype of the proposed Infrastructure Transparency Index website. It exists to make Evelyn's content strategy concrete enough that she, the CoST board, and the partner who raised the gap can react to something real instead of a Word document.

It is **not a final build**. It is a persuasion artifact and a scope-reality probe.

## The one thing it argues

The current ITI site works like a library for people who already know what the ITI is. It starts from the tool ("here is the data"). This prototype shows the proposed shift: **meaning before data**. A cold visitor should answer five questions inside 90 seconds:

1. What is the ITI?
2. Why does it matter?
3. How does it work?
4. Who should use it?
5. What should they do next?

If a reader cannot answer those, the prototype has failed. Hand it to someone for 90 seconds and check.

## What is in here

A small multi-page site, not a single scroll, because a board pitch needs navigable depth, not one page that ends.

| File | What it is |
|---|---|
| `index.html` | Homepage. The full persuasive sequence: hero, proof stats, the problem reframe, four dimensions, boxed dashboard, impact, audience selector, vision timeline, action. |
| `what-is-iti.html` | The anchor explainer (Evelyn's highest-value second page). The mechanism, the four dimensions in depth, the scoring hierarchy in plain language, and what the ITI is *not*. |
| `how-to-use.html` | The audience hub. A full block per reader: government, civil society, donor, regional body, journalist. Each with their question, what the ITI gives them, and the next action. |
| `results.html` | Comparison tool (boxed as "existing tool, retained") plus links into country profiles. |
| `country-uganda.html` | One fully-built country profile, so the board sees what a real result page feels like: score, dimension breakdown, trend. |
| `why-it-matters.html` | Impact storytelling (Panama, Uganda, Costa Rica) and the 100-country roadmap. |
| `assets/iti.css` | The shared design system. One stylesheet for every page. |
| `assets/iti.js` | Shared behaviour, including `ITI_STATS`, the single source of truth for the figures. |

## Decisions made, on purpose

These were genuine forks. Recording them so they are choices, not accidents.

- **Audience: Evelyn and the board.** Optimised for ten-second persuasion, not developer annotation. The build-reality argument lives in the framing (this note, plus the "existing tool, retained" labels), not in the visual system.
- **Palette: the real ITI brand, scraped from the live site.** Gold `#FECE32` (primary accent), dark slate `#2C4143` (structure), teal-blue `#61A8BD` (cool accent), red `#D60000` (CoST lineage, used sparingly), navy `#040922` (deepest ground). These are the live site's actual Fusion global colour tokens (`infrastructuretransparencyindex.org`), not invented values. An earlier draft used an invented teal/amber palette from Evelyn's one-pager brief; that was wrong and has been replaced.
- **Visual register: editorial / data-journalism, bold reinvention.** The brief was explicit: the earlier draft read as a 2015 corporate template and moved nobody. This version uses the real palette but pushes the language to editorial data-journalism: a full-bleed dark hero with an ambient data-field animation (scattered points resolving into an ordered grid, encoding "raw data becoming a measure"), oversized Inter Black display type, Source Serif 4 for human prose, alternating dark-slate and warm-paper bands for rhythm, and the central reframe staged as a *drawn SVG instrument* (the question physically travels along a line that sweeps gold) rather than two fading text boxes. One deliberate motion event per scene; nothing loops; everything has a reduced-motion and no-JS fallback so content never depends on script to appear.
- **Craft governance.** The artefact is signed by ITI/CoST, so `cost-html-design` governs the brand and `visual-storytelling` plus the Atelier density gates supply the craft discipline (substitution test, drawn-not-generated instruments, register mix, one-motion rule). Atelier itself does not govern, because the authorship test puts CoST-signed work outside it.
- **Multi-page, shared CSS/JS.** Pages share `iti.css` and `iti.js` so they cannot drift apart. This is also the maintenance argument made physical: edit a figure once in `ITI_STATS`, every page follows. When the board asks why the real build needs a named owner, the answer is "every page you just clicked reads from one stylesheet and one stats file, and someone has to keep that alive across fourteen-going-on-a-hundred countries."

## The human element and richer inputs

The earlier drafts were all type and geometry, no people, no place, no infrastructure. A piece about Panama and Uganda that shows neither reads as an outsider's framework. This version adds four inputs:

- **Real photography, so it reads as production-ready.** The hero (a road and bridge under construction in East African hills), the three impact cards (a Panama metro viaduct, a Ugandan road being paved, a Costa Rican bridge through rainforest), the Uganda country profile (a community consultation at a project noticeboard), and the "what is the ITI" explainer (a worker reviewing project data on a tablet beside a public disclosure board) all carry generated photographic images in `assets/img/`. They were produced with the image generator (Gemini Nano Banana Pro) to be contextually specific to each country, not generic stock. Each has descriptive alt text. **Before any public launch, CoST should swap these for authentic, rights-cleared photographs from its own programmes** and run them through publication assurance: generated imagery is right for a board-facing prototype, but the live site should carry real photos of real projects. The slot sizing is already correct, so the swap is a one-for-one file replacement.
- **A real infrastructure artefact.** The homepage carries a mock public disclosure record ("Rural road rehabilitation, Phase 2") showing fields marked complete or missing. It makes the abstract concrete: a donor sees exactly what the ITI inspects and why "published" is not the same as "complete".
- **A real map.** The "why it matters" page carries an interactive Mapbox map with the assessed countries marked at their real coordinates. The public token is loaded at runtime from `assets/config.js` (gitignored, never a committed literal); if the token or the Mapbox CDN is absent, a self-contained inline-SVG map renders instead, so the page never breaks. Protect the public token with a domain URL-restriction in the Mapbox account.
- **Richer data viz.** The Uganda country profile now uses a radar chart (the four dimensions against the international average) and a multi-country trend line, both drawn on scroll, instead of plain bars.

Everything that animates has a reduced-motion and no-JS fallback. Country positions on the map are real; all scores and figures remain illustrative and unverified.

## Review responses (round 2)

Acting on a structured review, this version adds and corrects:

- **A "For funders" assurance page** (`for-funders.html`). The donor pathway was too thin. The new page sets out the six-part assurance case (methodology, data source, quality assurance, use cases, explicit limits, cost and value), an **evidence ledger** listing every headline claim with its stated source and a visible "pending verification" status, a **complementarity table** showing how the ITI sits alongside the IMF PIMA, the World Bank IGA, and OECD tools rather than duplicating them, and an **Apply the ITI pathway** (four steps with lead, indicative timing, and the ITI-Core support model). It is linked from the main nav, the footer, and the donor audience row.
- **Map correction.** The map data wrongly included Thailand, which has not run the ITI. It now lists real ITI/CoST countries only (Uganda, Malawi, Ghana, Costa Rica, Panama, Honduras, Guatemala, Ukraine), with a code comment forbidding the addition of any country that has not run the ITI.
- **The evidence ledger is a template, not proof.** Every headline number (20 implementations, 14 countries, Uganda +55%, Panama 400 to 4,000, Costa Rica 48 to 67) is shown with a "pending verification" status, because none has a verified source on hand. CoST replaces each pending row with a verified source and date through publication assurance before any funder-facing release. No citation has been invented.
- **Accessibility fixes.** Contact-form inputs now carry `id`, `name`, `autocomplete`, and associated `<label>` elements (with a visually-hidden `.sr-only` utility). The expandable dimension cards are now `role="button"` with `tabindex`, `aria-expanded`, and Enter/Space keyboard operation, so screen readers announce them correctly. A visible focus ring is applied site-wide.
- **Performance.** Below-the-fold images carry `loading="lazy"` and `decoding="async"`; the hero is `fetchpriority="high"`. Mobile spacing was tightened across the hero, proof strip, radar, dashboard, artefact, and timeline, and the trend chart's viewBox was widened so end-labels no longer clip. (Still prototype-grade: images are not yet WebP/AVIF or served with `srcset`, and Mapbox still loads eagerly. Both are noted for production.)

## What is real and what is faked

**Real:** the structure, the navigation, the copy, the design system, the interactions (dimension cards, country switching, audience selector, scroll reveals, modals).

**Faked, on purpose:** all data is mock. There is no backend, no CMS, no live dashboard, no real search or downloads. The dashboard is boxed and labelled "existing tool, retained" to make the point that this layer sits *on top of* the working data platform, it does not replace it.

## The figures are not cleared (load-bearing)

Every persuasive number (20 implementations, 14 countries, Uganda +55%, Panama 400 to 4,000, Costa Rica 48 to 67) is sourced from the ITI Business Plan and has **not** passed publication assurance. In the prototype they carry a visible "illustrative, pending verification" treatment and are driven from a single object (`ITI_STATS` in `assets/iti.js`) so they update in one place.

**Before any of this goes public**, each figure has to clear `cost-publication-assurance`. A journalist will check the one that is wrong. Treat the prototype's numbers as placeholders that happen to look real, not as approved facts.

## What this prototype is also telling us

Building one page well, and then five more, is the evidence behind the recommendation that CoST name a delivery owner, a design approach, and a stats-maintenance model before the real seven-page build. The prototype took real design effort. That effort *is* the argument: this is a front-end engineering project with a maintenance tail, not a copywriting task.

## Three things to decide next (for Evelyn and the board)

1. **Assurance pass** on every figure before anything is published.
2. **A named delivery owner and design approach** for the real build, plus a single source-of-truth for the stats so numbers update once.
3. **An explicit board sign-off** that "100 countries by 2031" goes on the public site on purpose, given the funding reset. The prototype frames it as an ambition, not a guarantee; the board should confirm that framing.

## How to view it

Open `index.html` in any browser. No server, no build step, no network needed. Click through the nav to walk the full site.

---

*Verified: all six pages render with zero console errors, prose passes the communication-guide preflight (no em/en dashes, no AI-tell phrasing), internal links resolve, and the interactions work in a headless browser. Data and figures are illustrative and unverified by design.*
