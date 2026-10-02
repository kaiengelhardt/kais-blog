# Website rebuild brief

Status: approved by Kai on 2026-10-02.
Content and account details will be supplied at their implementation milestones.

## Purpose and positioning

Kai is a software engineer focused on iOS and Mac development, with watchOS,
tvOS, and TypeScript web experience. Design ability and engineering leadership
are central to his positioning.

The homepage is a professional introduction centered on this combination.
Exploring Kai's work and resume are the primary next steps.

## Language

Main site and blog: English. Legal notices: German. Additional translations
are outside the initial scope.

## Visual direction

Technical, sophisticated, and design oriented. Classy typography, streaky
background gradients, subtle dot patterns, and floating glass cards. Decorative
code symbols and a coding-terminal aesthetic are explicitly excluded.

References: [Linearity](https://www.linearity.io/) for gradients, and the supplied
Astro screenshot for the dot pattern behind a translucent card. These references
describe visual ingredients, not a request to copy their layout or content.

Support light and dark appearances, initially following the visitor's system
preference, with a theme switch. Dark uses luminous gradients; light uses softer
color streaks and frosted glass.

Cards look suspended through layering; they do not continuously float around.
Use restrained hover transitions and static gradients. Respect reduced-motion
preferences.

Pair expressive serif headings with clean sans-serif body text; host fonts locally.
Choose the actual font families during the first visual milestone. The selected
color direction is Copper Hour: copper, peach, and burgundy, inspired by warm
evening light across metal and glass. Starting colors live in the visual plan.

Reuse the existing logo, favicons, and Apple touch icon from the backup branch.

## Pages and features

- Home with floating glass cards and Kai's photo, to be provided later. Include
  selected apps, a concise engineering/design/leadership introduction, latest
  articles when available, and a prominent resume link.
- About: a separate page for Kai as a person, beyond professional history.
  Share hobbies, personal values, and photos, including food Kai cooks. Include
  a playlist of songs he likes as a designed card with a short personal
  introduction and a link to the music service. No embedded player.
- Blog authored in Markdown, with Celia's blog as a functional reference. Include
  chronological listing, article pages, RSS, code highlighting, and a table of
  contents for articles with headings. Defer tags, search, and comments.
- Recents at `/blog/`: latest ten articles with date, title, excerpt, and optional
  image; link to `/blog/archives/`, which groups all published articles by year.
- Legal notice and privacy notice.
- Mastodon, GitHub, and LinkedIn links in an appropriate shared location.
- Resume: download at the top, then a slightly playful professional timeline
  with photos. Photos open large; multiple photos at a career point support
  previous/next navigation.
  Order newest first, group successive roles under their company, and include
  selected education and independent milestones. Photos have optional captions.
  Maintain the downloadable PDF independently of the timeline. LinkedIn is a
  reference for drafting; confirm dates and wording before publication.
- Apps: tiles with icon, name, tagline, and App Store button. Each app also has
  a detail page with screenshots, App Store links, and a description.
  Include features and an optional “Behind the app” section. App screenshots
  use the same large-image viewer as career photos.

Image galleries stop at the first and last images rather than wrapping. Support
previous/next buttons, keyboard arrows, mobile swipes, an image counter, optional
captions, and a clear close button.

## Publishing and identity

PagesCMS saves commit to `main`. Drafts stay unpublished; turning off draft
publishes through the next successful deployment. Draft previews are local
initially. Discard the unfinished legacy UIKit article from the new site.

Retain `https://kaiengelhardt.com/` and these profiles:

- `https://mastodon.social/@kaiengelhardt`
- `https://github.com/kaiengelhardt`
- `https://www.linkedin.com/in/kaiengelhardt/`

## Technical constraints

- Astro, hosted on STRATO Hosting Basic.
- GitHub repository and GitHub Actions deployment, informed by the adjacent
  `celia-coe-website` project. Improve individual choices where justified.
- PagesCMS exposes blog authoring only. Other content is edited in code.
- GoatCounter analytics; Kai will supply the integration code later.
  Count page views, resume downloads, and outbound App Store clicks. Enable
  analytics only in production, respecting Do Not Track and Global Privacy
  Control.
- Keep generated files, dependencies, and local environment secrets out of Git;
  retain a tracked environment example when configuration needs one.

## Delivery

The current deliverable is a series of feature and foundation plans, each broken
into small implementation milestones. Website implementation follows the
requirements interview and confirmation of shared understanding.

Each milestone should leave a small change that Kai can read and understand.
Testing belongs within development. Separate verification milestones are useful
only for external systems, such as running GitHub Actions.

Development may use placeholders. Publish only real content; keep unfinished
sections hidden until ready.

## Repository reset

- Original `main`: `4cbe7dd33f69c52e2dbab806f068dec7b3159f10`.
- Local backup branch: `backup/pre-astro-2026-10-01`.
- Removal commit on local `main`: `14329fd`.
- Generated and untracked legacy site files moved to
  `/tmp/kais-blog-legacy-generated-2026-10-01`; this temporary directory is not
  a durable backup. Tracked originals remain recoverable from the backup branch.
- No remote branches or live hosting have been changed.
