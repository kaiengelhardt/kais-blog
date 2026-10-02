# Reference project findings

Inspected 2026-10-01. These are observations, not automatically adopted decisions.
Recheck the relevant source when implementing; the adjacent project may change.

## Celia's website

Source: `../celia-coe-website`.

- Static Astro build, trailing-slash URLs, npm lockfile, local fonts and Astro
  image optimization. Start with `astro.config.mjs` and `package.json`.
- Markdown collections with frontmatter. Drafts appear locally and are omitted
  from production routes, listings, and RSS. See `src/content.config.ts` and
  `src/lib/blog.ts`.
- PagesCMS commits into the repository. Stable filenames prevent accidental URL
  changes; uploads feed local image assets. Reuse the blog subset, not its
  multilingual or full-site authoring configuration.
- Recents (`src/pages/[...locale]/blog/index.astro`) shows the ten latest articles
  with date/title/excerpt and optional image. It ends with a link to the archive;
  there is no pagination. The archive groups all articles by year. Kai's version
  does not need Celia's category or podcast views.
- Pushes to `main` deploy incrementally; a separate manual workflow supports full
  uploads. Production deployments are serialized without cancelling active uploads.
- `scripts/deploy.sh` and `scripts/deploy.mjs` use a hash manifest, upload changes
  before deleting obsolete files, and recover from a missing manifest with a full
  upload. Direct uploads can briefly expose mixed versions.
- Builds and smoke checks gate deployment. Build artifacts include `.htaccess`.
  Connection setup pins SSH host keys.
- Celia's SFTP account is restricted to her site folder. That does not establish
  Kai's account boundary. Establish Kai's destination and ownership before planning
  remote cleanup. A successful upload alone does not verify domain mapping.
- GoatCounter is gated to production and an enable flag, honors DNT/GPC, and can
  count annotated clicks. Its endpoint and account settings are site-specific.

Avoid importing Celia's books, podcast, multilingual, PHP, or contact-form systems.

## Previous Kai site

Source: Git branch `backup/pre-astro-2026-10-01`.

- Domain: `https://kaiengelhardt.com/`.
- Socials: `https://mastodon.social/@kaiengelhardt`,
  `https://github.com/kaiengelhardt`, and
  `https://www.linkedin.com/in/kaiengelhardt/`.
- Existing paths include `/archive/` and `/impressum/`; confirm the old RSS path
  from generated output before defining redirects.
- One unfinished draft: “Building a Glass Button in UIKit,” dated 2025-09-19.
  No published articles were found in the tracked source.
- Portrait, logo, favicons, and old legal details remain recoverable. Kai plans
  to provide a portrait later. Kai approved reuse of the logo, favicons, and Apple
  touch icon, and explicitly discarded the old draft from the rebuild. Legal
  details still need confirmation.
- The former deployment uploaded by timestamp, accepted host keys automatically,
  and cancelled active runs. Prefer Celia's safer deployment behavior. The old
  workflow does not establish that stale remote files have been removed.

## LinkedIn inspiration

Source: [public profile](https://de.linkedin.com/in/kaiengelhardt/en), accessed
2026-10-01 through indexed public results. Direct fetching did not expose the
complete profile. Treat indexed content as potentially outdated.

The public material suggests education at TU Darmstadt, early iOS development,
Apple Cocoa Camp and WWDC scholarships, and independent projects as possible
timeline material. Recommendations support engineering and people-leadership
positioning. These are inspiration, not publication-ready career entries.
Exact employment titles/dates remain unverified and must come from Kai or a
complete profile/resume he supplies. Do not import inconsistent third-party
employment summaries.

## Useful external milestones

Include these in their eventual feature plans: PagesCMS save/upload through to
GitHub and deployment; a GitHub Actions deployment run; STRATO domain, HTTPS,
directory-index, and custom-404 checks; GoatCounter receipt after activation.
