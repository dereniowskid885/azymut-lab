# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Azymut Lab, a Kraków architectural/interior studio. Next.js 16 App Router + embedded Sanity Studio, deployed on Vercel (push to `main` deploys). All user-facing copy and all Sanity schema `title`/`description` strings are **Polish**; code identifiers are English.

## Commands

```bash
npm run dev          # predev runs typegen first — needs .env.local + Sanity auth
npm run build        # next build + extracts studio manifest to public/studio/static
npm run type-check   # next typegen && tsc --noEmit
npm run typegen      # sanity schema extract && sanity typegen generate
npm run lint         # eslint . (react-hooks rules only)
npm run lint:fix     # prettier --write . then eslint --fix
npm run format       # prettier only
npm run analyze      # bundle analysis
```

There is no test suite and no test runner configured.

App runs at `http://localhost:3000`; Sanity Studio is **embedded** at `/studio` (`app/studio/[[...index]]/page.tsx`) — there is no separate studio dev server. (The README's `npm run sanity` command does not exist.)

### Type-safety gotchas

- `sanity.types.ts` and `schema.json` are **generated and committed**. Regenerate with `npm run typegen` after any change to `sanity/schemas/**` or `sanity/lib/queries.ts`.
- `next.config.ts` sets `typescript.ignoreBuildErrors: process.env.VERCEL_ENV === 'production'` — type errors do **not** fail production builds. Run `npm run type-check` locally before pushing.
- `tsconfig.json` has `strict: false` but `strictNullChecks: true`, so most CMS fields arrive as `T | null` and pages destructure with `?? {}` + `= ''` defaults.
- Path alias: `@/*` → repo root.

## Environment

`.env.local` (template is `.env.local.example`, not `.env.example`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `RESEND_API_KEY`. `sanity/lib/api.ts` throws on missing project id/dataset and `sanity/lib/token.ts` (server-only) throws on missing read token — the app cannot boot without them.

## Architecture

### Content flow: every page is a Sanity singleton

There are no collections or dynamic slugs. Each route reads exactly one singleton document whose `_id` equals its `_type` (`home`, `offer`, `about`, `contact`, `work`, `settings`, `portfolio`).

The pattern for a page (`app/(pages)/<route>/page.tsx`):

1. `sanityFetch({query: xPageQuery})` from `@/sanity/lib/live` for the body.
2. A separate `generateMetadata()` doing `sanityFetch({query, stega: false})` — **`stega: false` is required in metadata**, otherwise Content Source Map markers leak into `<title>`/`<meta>`.
3. Compose `Header` (which fetches `settingsQuery` itself for the logo, and renders `Navbar` from `const/menu.ts`), then `Section` / `SectionFullWidth` blocks, ending in a CTA driven by `ctaTitle`/`ctaDescription`/`ctaHref`/`ctaButtonText` fields.

Adding a page therefore means: new singleton schema in `sanity/schemas/singletons/`, register it in **three** arrays in `sanity.config.ts` (`schema.types`, `pageStructure([...])`, `singletonPlugin([...])`), add a `defineQuery` to `sanity/lib/queries.ts`, run `npm run typegen`, create the route, and add entries to `const/menu.ts` and `app/sitemap.ts` (sitemap URLs are hardcoded).

`portfolio` deviates deliberately: it is registered in the Studio but has **no route**, and its query in `sanity/lib/queries.ts` is commented out. Unfinished, not dead code to delete, and not something to wire up unprompted.

`about` (`/o-nas`) is the newest page and the cleanest example of the full pattern end to end — schema, query, route, `TeamMemberSection`, nav and sitemap entries. Its `team[]` array is the only place a singleton holds a repeating list of people; the page maps over it and alternates `isReversed` so each row mirrors the one above.

### Live content + visual editing

`sanity/lib/live.ts` calls `defineLive()` and exports `sanityFetch` + `SanityLive`. Always fetch through this, not `client` directly (`sanity/lib/client.ts` is the stega-configured base client, used by `defineLive` and the draft-mode route). `app/(pages)/layout.tsx` mounts `<SanityLive onError={handleError}>` plus, when `draftMode()` is enabled, `<VisualEditing>` and `DraftModeToast`. Presentation mode enters via `app/api/draft-mode/enable/route.ts`.

`sonner`'s `<Toaster>` in that layout exists specifically to surface Sanity Live/CORS errors from `app/(pages)/client-functions.ts`.

### Images

Never build Sanity image URLs by hand. GROQ queries must expand the asset with `asset->{..., metadata{lqip}}`; `parseSanityImage()` in `sanity/lib/utils.ts` then returns `{urlBuilder, blurDataURL}`. Because generated query types don't line up with `@sanity/image-url`'s input, call sites cast: `parseSanityImage(image as SanityImage)` (`types/image.ts`). `urlForOpenGraphImage()` is the 1200×627 variant. Only `cdn.sanity.io` is whitelisted in `next.config.ts`.

When an image is absent, components render an alternating `bg-studio-400` / `bg-studio-600` block keyed off the item index rather than collapsing the layout (`OfferSliderCard`, `ImageSliderCard`, `TeamMemberSection`) — follow that instead of inventing a new empty state.

`dangerouslyAllowSVG` is **not** set, so `next/image` returns 400 for any `.svg` src. Any local raster art served through `next/image` has to be PNG/JPG; only raw `<img>` (as in `ImageSliderCard`'s touch hint) can point at an SVG.

### Contact form → Resend

`ContactSection` (client) wraps `ContactForm` in Sanity UI's `ThemeProvider`/`ToastProvider` purely to reuse `useToast`/`Spinner` — Sanity UI is a front-end dependency here, not just a Studio one. Validation lives in `helpers/validations.ts` (`getFieldError` keyed by field name, Polish messages, Polish-diacritic name regex) and runs both on change and on submit. Submit calls the `'use server'` `sendEmail` in `services/emailService.ts`, which renders `helpers/email.ts`'s inline-styled HTML template and sends via Resend.

`sendEmail`'s signature is easy to misread: `email` is the **recipient** (`contactFormEmail` from the Contact singleton, falling back to a hardcoded `studioazymut@gmail.com`) and `sender` is the **visitor's** address. `from` is still Resend's sandbox `onboarding@resend.dev`. It also returns `undefined` early when the message is under 10 characters.

### Styling

Tailwind 3 with `@sanity/demo/tailwind` as the base theme; `fontFamily` is overridden to the `next/font` CSS variables (`--font-sans` Questrial, `--font-serif` PT Serif, `--font-mono` IBM Plex Mono) declared in `app/layout.tsx`. Two custom pieces worth knowing:

- `.full-container-width` (`app/globals.css`) — negative-margin bleed matching the layout's responsive `24/48/80px` padding; use it for full-bleed `<hr>`s and carousels instead of re-deriving the offsets.
- `supports-hover:` variant (`tailwind.config.ts`) — `@media (hover: hover) and (pointer: fine)`, used to keep hover-reveal UI from breaking on touch (see `ImageSliderCard`).

`app/layout.tsx` also holds the hardcoded `InteriorDesigner` JSON-LD block (address, phone, email) — update it there, not in the CMS. Sliders (`ImageSlider`, `OfferSlider`) are client components sharing `Carousel.tsx`, which disables Embla above `md` when there are 3 or fewer slides.

Recurring visual idioms worth copying rather than reinventing:

- **Two-column text/photo split** — `flex-col md:flex-row`, `min-h-[75vh]`, `w-full md:w-1/2`, photo `h-[50vh] md:h-auto` with `fill`. Used by `/praca`, `/kontakt`, and `TeamMemberSection` (which adds `md:order-1`/`md:order-2` to mirror alternate rows).
- **Micro-label** — `text-sm tracking-widest uppercase font-sans` with `text-white/50` on the black CTA band, `text-gray-400` on white.
- **Dashed list** — `<ul>` of `pl-6 relative` items with an absolutely-positioned `—`. Note `styles/index.css` gives every `ul`/`ol` a `margin-left: 1rem`, so add `ml-0` when the list should align flush with surrounding text.
- **Left-border callout** — `border-l-2 … pl-4`: `border-warning-border` for the note box in `Section`, neutral `border-studio-300` for the serif pull-quotes in `TeamMemberSection`.
- **`h1` belongs to `Header`** (it renders the CMS `title` as the letter-spaced wordmark linking home), so page content starts at `h2`.

`Header`, `Section`, `SectionFullWidth` and `TeamMemberSection` are server components; only sliders, cards, `NavLink` and the contact form are client-side.

### Formatting

Prettier uses `@sanity/prettier-config` (no semicolons, single quotes, bracket spacing off) plus Tailwind class sorting and `@ianvs/prettier-plugin-sort-imports`. ESLint only enforces `react-hooks` recommended rules, so formatting compliance comes from `npm run lint:fix`.

## Note on README.md

`README.md` is partly stale relative to the tree: it lists `constants/`, `lib/`, and a `/portfolio` route (actual: `const/`, `helpers/`, no portfolio route), references `.env.example` and `npm run sanity`. Trust the code over the README.
