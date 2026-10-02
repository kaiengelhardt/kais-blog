# Blog, Recents, and PagesCMS

Status: draft plan.
Depends on the shared layout and visual foundation.

## Approach

Use Astro content collections and Markdown with validated frontmatter. Start with
title, description, publication date, draft status, and an optional cover image
with alternative text. Keep URLs stable when a title changes. PagesCMS exposes
only the article collection and its media, not other site content.

One publication rule feeds routes, listings, home previews, RSS, and sitemap:
drafts are local-only. Publishing means switching draft off and letting the
successful deployment run. Scheduling is outside the initial scope.

## Milestones

1. [ ] **Article schema.** Define the collection and one development-only draft
       fixture. Add the shared publication filter and a small check that drafts
       cannot enter production results. Do not migrate the old UIKit draft.
2. [ ] **Article page.** Render Markdown with title, date, readable prose, links,
       lists, images, and code highlighting. Public routes use stable identifiers.
3. [ ] **Recents.** At `/blog/`, show the ten latest articles with date, title, excerpt,
       and optional image. Link each tile to its article. Handle an empty blog without
       invented posts; development can show clearly marked drafts.
4. [ ] **Article navigation.** Add an accessible table of contents when headings
       exist. Keep heading anchors stable and usable without client JavaScript.
5. [ ] **RSS.** Generate a feed using the same publication rule. Link it from the
       blog and document head. Resolve the legacy feed URL during deployment.
6. [ ] **Archive.** At `/blog/archives/`, group all published articles by year. Link
       Recents to the archive and provide simple Recents/Archive/RSS blog navigation.
       Share the article data; do not introduce a separate updates content type.
7. [ ] **PagesCMS fields.** Add the article form with safe draft defaults, stable
       filenames, and Markdown body editing. Rename behavior must not silently
       change a published URL.
8. [ ] **CMS media.** Configure uploads and cover/body image paths. Verify the actual
       CMS-produced Markdown builds correctly with the local image convention.
9. [ ] **External: authoring round trip.** Connect the repository in PagesCMS; create
       a draft with an image, confirm the GitHub commit, then publish through Actions
       when deployment is ready. Confirm drafts stay absent from the public site.

Initial exclusions: tags, search, comments, remote draft previews, future-date
scheduling, and Celia's multilingual/podcast features.
