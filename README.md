# Tacita.ai

**One line:** Tacita calls key people before they leave a company, interviews them by phone in 15-minute conversations (AI interviewer "Wissbert"), and turns what only they know into a searchable company memory and a hand-over dossier.

**Status (2026-10-07):** Idea pitched at 120 Ventures (Learnings lab / Idea Cradle) on 2026-10-06. Pitch went well. Next phase: validation / testing with real business owners.

**Source of truth for the pitch:** [Notion page](https://www.notion.so/120ventures/Tacita-ai-3f13da1f144080269f0bcae8e23480a6) (snapshot in `docs/pitch.md`).

## Repo layout

- `src/` – fake-door landing page (Vite + React + shadcn, from the 120 Ventures boilerplate)
  - `/` – „Betrieb übergeben. Wissen behalten.“ for owners before a hand-over (segment D)
  - all copy lives in `src/content/landing.ts`; an HR/QM page (Figma Variante B) comes later
- `docs/pitch.md` – snapshot of the Notion pitch (problem, solution, market, revenue model, signals)
- `docs/feedback/` – feedback from colleagues and later from customers, one file per source and date
- `docs/testing/` – validation plan, interview guides, pilot notes, results

## Key numbers from the pitch

| Item | Value |
|---|---|
| Austrian companies facing succession by 2034 | 52,500 |
| Austrian takeovers per year | ~8,200 |
| Owner-discount in valuation for owner-dependent businesses | 20–40% |
| Bottom-up Austria market | ~EUR 160M / year |
| Price: succession case | EUR 2,490 (or 490 + 1% of sale price) |
| Price: retirement case | EUR 3,900 |
| Price: parental leave case | EUR 1,490 |
| Subscription "Wissens-Schutzbrief" | EUR 99–299 / month / company |

## Development

Uses **pnpm**.

```sh
pnpm install
pnpm dev        # http://localhost:8080
```

Design source: Figma file `GzbHAa9hXQu7Vci5mI4t2i` (Variante A, mobile mockups). The hero orb from Figma is replaced by an animated voice waveform.

The Erstgespräch calendar (Calendly) is embedded in the section `#erstgespraech`; the link defaults to Andrea's calendar in `src/content/landing.ts` and can be overridden with `VITE_CALENDLY_URL` in `.env.local`. `VITE_DEPOSIT_URL` is the Stripe payment link for the 490 € deposit (without it the deposit buttons lead to the booking), `VITE_SAMPLE_DOSSIER_URL` the sample dossier.

**Personal links for the private outreach** (see `docs/research/2026-11-02-zielgruppe-erster-outreach.md`): industry pages `/gastro`, `/kfz`, `/installateur`, `/tischler`, `/handel` swap the hero pill and example cards. Optional query parameters: `name` greets the visitor in the hero pill and prefills Calendly, `von` shows who sent the link, e.g. `/gastro?name=Familie%20Huber&von=Andrea`. Unknown paths show the 404 page.

**Leads in Supabase:** the hero email is stored in `public.leads` (migration in `supabase/migrations/`) before the visitor is scrolled to the calendar. Setup: `supabase login`, `supabase link --project-ref <ref>`, `supabase db push`, then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env.local` and in the Netlify site settings. Without them the page works and simply skips the insert.

Before going live: Impressum and Datenschutz pages, self-hosted fonts instead of Google Fonts, cookie consent + ad tracking (`docs/COOKIE_CONSENT_SETUP.md`).
