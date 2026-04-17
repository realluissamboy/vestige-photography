# Decisions Log

Append-only. One entry per decision. Newest at the top.

### 2026-04-17 — Book Now CTA repointed to IG DM, no contact route
- **Decision:** (1) The "Book a Session" CTA (only Book CTA in the codebase, on the Portfolio page at `src/vestige-site.jsx:588`) links to `https://ig.me/m/susanavestige`, opens in a new tab, `rel="noopener noreferrer"`. (2) No dedicated contact/booking route will be built. Site stays at three surfaces: Home, Portfolio, About. (3) If Susana later asks for a real on-site form, Luis frames it as a paid add-on under the Avenida upsell, not as free scope on this engagement.
- **Proposed by:** Luis
- **Rationale:** Susana already runs her business through IG DM; `ig.me/m/<handle>` opens the DM thread in-app on mobile, falls back to her profile on desktop. Zero build, zero spam surface, zero hosting. A hosted form is real work (delivery mechanism, spam handling, deliverability) and belongs in a paid scope if it ever comes up.
- **Scope impact:** resolves the three Book Now / form-location items previously in `open-questions.md`. Updates `scope.md` "Known open decisions" section to mark the Book Now item as resolved. No surface area change (three pages, no contact route).
- **Related leads consulted:** none (href swap, not a design or architecture call)
- 2026-04-17 follow-up: second CTA on About/"The next step" also wired to IG DM — initially missed by string-based grep.

### 2026-04-17 — RETRACTION: Google Form delivery mechanism
- **Decision:** Retract item (5) of the earlier 2026-04-17 "Intake form scoping" entry below. The Google Form delivery mechanism and the questionnaire drafted at `project-memory/intake-form.md` were based on a misread of Luis's brief. Luis clarified: the "form" he asked to see built is the **on-site Book Now contact form** that lives on the Vestige website, the dead button Susana flagged — not a Google Form questionnaire sent to Susana. Questionnaire spec has been renamed to `project-memory/client-intake-questionnaire.md` and marked DEFERRED.
- **Proposed by:** Luis (correction), PM (retraction)
- **Rationale:** The original delegation to copywriter-lead ran against a misframed brief. Retracting here so the log reflects the real state of the project.
- **Scope impact:** reopens `scope.md` item "Contact page: not being built. Booking / contact happens via direct link to Susana's social media, not an on-site form." That line may need to change depending on Luis's answer to the three open decisions now in `open-questions.md` (submission destination, location of the form, Book Now target). No scope edit until Luis confirms.
- **Related leads consulted:** none (correction, not delivery)

### 2026-04-17 — Intake form scoping + favor posture, portfolio fallback, hero source, no deadline
- **Decision:** (1) Commercial posture for Vestige project is **favor**: no pay, no expectation, referrals are a possible upside only. (2) Portfolio interaction preference is **drill-into sub-galleries**, with flat gallery as fallback if drill-in proves materially slower or more complex. PM/developer to call the fallback if it triggers, with justification. (3) Hero image will be selected from Susana's OneDrive archive. (4) No deadline on the project — work proceeds whenever. (5) Intake form delivery mechanism: **Google Form**, drafted by copywriter lead, spec at `project-memory/intake-form.md`.
- **Proposed by:** Luis (1–4), PM with copywriter lead (5)
- **Rationale:** Favor framing matches the ex-roommate relationship and removes billing ambiguity. Drill-in matches Susana's revealed expectation (she flagged the broken category links as a function problem, not an aesthetic one); fallback preserves delivery speed if it turns expensive. OneDrive is the only real photo source. Google Form wins on effort-to-signal for a mobile, traveling, asynchronous client.
- **Scope impact:** none to `scope.md` surface area. Resolves three `open-questions.md` items (portfolio interaction model direction, hero source, intake form mechanics). Book Now destination still pending — captured as question 11 in the intake form.
- **Related leads consulted:** copywriter (form question drafting)

## Format

```
### YYYY-MM-DD — <short decision title>
- **Decision:**
- **Proposed by:** (Luis, PM, specific lead)
- **Rationale:**
- **Scope impact:** (none / expands scope.md / reduces scope.md)
- **Related leads consulted:**
```

---

### 2026-04-17 — Cormorant Garamond loaded via Google Fonts
- **Decision:** Added Google Fonts `<link>` tags for Cormorant Garamond (weights 300, 400, 500, 600, italic 300/400) to `index.html`.
- **Proposed by:** PM (bug surfaced during scope review)
- **Rationale:** Every `fontFamily` in the JSX referenced Cormorant Garamond but the font was never loaded, so all visitors saw Times New Roman as fallback. Verified fix via preview: "Vestige" wordmark now renders in Cormorant.
- **Scope impact:** none (bug fix, not new work)
- **Related leads consulted:** none (trivial fix, Luis authorized directly)

### 2026-04-17 — Final scope locked with Luis (site shape)
- **Decision:** Site is a minimalist portfolio with three surfaces only: Home (hero), Portfolio, About. No Gazette, no Books page, no Contact page, no newsletter, no legal pages, no dedicated social page. Books reference links out to Wonkpress. Contact happens via direct social media link. WCAG 2.1 AA is the approved accessibility target.
- **Proposed by:** Luis
- **Rationale:** Aligns with Luis's original pitch to Susana ("one-page minimalist website that contains a gallery of photos, a contact form or direct contact to your social media"). Susana has not asked for the cut surfaces.
- **Scope impact:** removes Gazette, Books, Contact, Newsletter, Legal, Social pages from `scope.md`. Adds susanavestige.com as the deploy target. Sets WCAG 2.1 AA as accessibility target.
- **Related leads consulted:** none (scope-setting, not a delivery decision)

### 2026-04-17 — Susana's latest feedback logged (via screenshots)
- **Decision:** Capture Susana's IG DM thread content into `client-brief.md` and `client-history.md`. Treat her positive feedback on the in-progress site as implied ratification of direction, pending the intake form Luis committed to send.
- **Proposed by:** Luis (provided screenshots)
- **Rationale:** No formal written brief exists. The DM thread is the closest thing to a record of what Susana has asked for and approved.
- **Scope impact:** none directly; surfaces three blocking items now in `open-questions.md` (portfolio interaction model, Book Now button fate, hero replacement, intake form mechanics).
- **Related leads consulted:** none yet — these are the first real items for the agency team to work on.

### 2026-04-17 — Scope ratified (operational answers)
- **Decision:** Luis confirmed: creative direction is hybrid leaning A (verified against code); no CMS; Books links out to external storefront; contact form goes to Susana's email; no analytics; no SEO targets beyond discoverability; no launch date, milestones, budget, or billing on record. Accessibility target set at WCAG 2.1 AA for contrast, keyboard, and alt text (not full AA).
- **Proposed by:** Luis (answers) + PM (accessibility recommendation)
- **Rationale:** Susana has not ratified formally. These are Luis's operating answers for the agency. Susana-facing ratification is a separate step once Luis responds to her latest conversation.
- **Scope impact:** updates `scope.md` — status shifts from fully-draft to Luis-confirmed operational defaults.
- **Related leads consulted:** none (scope-setting, not a delivery decision)

### 2026-04-17 — Agent system activated for Vestige project
- **Decision:** Adopt the web agency agent system (PM + 5 role leads) as the operating model for the Susana Andrea / Vestige Photography engagement. Luis works directly with Susana as CEO; `project-manager` handles all internal coordination and drafting.
- **Proposed by:** Luis
- **Rationale:** Luis runs the agency and wants a single internal point of contact (PM) with leads underneath. Existing Vestige repo becomes the first project under this system.
- **Scope impact:** none (operational setup, not a deliverable change)
- **Related leads consulted:** none (setup decision)
