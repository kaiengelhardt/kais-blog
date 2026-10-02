# Home and About

Status: draft plan. Depends on the visual foundation; app and blog previews depend
on their content features. Enlarged personal photos depend on the shared viewer.

## Boundaries

Home introduces Kai's engineering, design, and leadership strengths. About
introduces the person beyond work. Resume owns career history. Keep detailed
biography off the home page and detailed employment history off About.

About covers hobbies, values, and personal photos, with cooking as a confirmed
hobby and food photos as a concrete example. Include a curated music playlist.
This is a personal page maintained in code, not a separate recipe or music blog.

## Milestones

1. [ ] **Home introduction.** Add concise positioning and a prominent resume link
       inside the agreed floating-card composition. Use a clearly temporary portrait
       placeholder locally until Kai supplies the photo.
2. [ ] **Selected apps.** Show a small, deliberately selected set from the app data.
       Link to the app directory and detail pages. Omit the section when empty.
3. [ ] **Latest writing.** Show a small set of published articles using the blog's
       shared publication rules. Omit the section when no articles are public.
4. [ ] **About introduction.** Create a separate page with Kai's supplied personal
       introduction and a link from the homepage/navigation.
5. [ ] **Hobbies and values.** Add short personal sections using Kai's own content.
       Include cooking without inventing other hobbies or values.
6. [ ] **Personal photos.** Add a small photo composition with optional captions,
       including cooked food. Reuse the shared image viewer for enlargement; group
       related photos deliberately rather than mixing all site images together.
7. [ ] **Playlist.** Add a designed card linking to Kai's chosen playlist, with a short
       personal introduction. Keep artwork local if supplied; do not load a music
       service's player, API, or other resources when the About page opens.
8. [ ] **Real launch content.** Replace temporary copy and imagery with approved
       material. Hide unfinished sections rather than publishing invented biography.

Inputs can arrive at their milestone: portrait, final introduction, selected apps,
personal text/photos, and the playlist URL. No content submission is required to
finish planning.

## Homepage image convention

The foundation example in [the homepage](../../src/pages/index.astro) uses the
approved logo until personal photos are supplied. Keep displayed local images in
`src/assets/`, import them, and pass the import to Astro's `Image` component.
Astro reads their intrinsic dimensions and emits width and height attributes,
reserving space before the image loads. Keep favicons and downloads in `public/`.

Use `layout="constrained"` with `max-width: 100%` and `height: auto` so images
shrink with their container without stretching. For raster photos, Astro also
generates responsive image candidates; the vector logo needs only its SVG.
Set a display width when a photo should render smaller than its source, and
adjust `sizes` to the actual layout when introducing columns or cards.

Write alternative text for the image's purpose in context; use `alt=""` for
purely decorative images. The logo example identifies Kai's logo. Future photos
should describe the actual subject rather than reuse that text.

Reference: [Astro's image guide](https://docs.astro.build/en/guides/images/).
