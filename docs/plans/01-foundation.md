# Technical foundation

Status: approved by Kai on 2026-10-02. Product requirements are in
[the brief](../brief.md). Implement one requested milestone at a time.

## Approach

Build static pages with Astro and TypeScript. Use native Astro components and
plain CSS; introduce client scripts only for interactions that need them.
Use npm and its lockfile. Choose the current stable Astro version at setup time
and check its own documentation rather than blindly copying Celia's version.

Blog articles are Markdown content. Keep other content in code, with simple
typed data for repeated apps and career points when their feature is built.
Use local image assets and Astro image processing where appropriate; publicly
downloadable files, icons, and hosting configuration belong in `public/`.

## Milestones

1. [x] **Minimal Astro project.** Add package scripts, lockfile, Astro/TypeScript
       configuration, and one bare homepage. Local development and static build work.
       The existing `.gitignore` already covers dependencies and generated output.
2. [x] **Shared page document.** Add one layout with title, description, language,
       viewport, and canonical URL. Set the confirmed domain and consistent trailing
       slashes. One page demonstrates the layout.
3. [x] **Restore identity assets.** Recover the approved logo, favicons, and Apple
       touch icon from the backup branch into the new asset structure. Link icons
       in the document head. Do not restore the legacy article or portrait.
4. [x] **Image convention.** Add one responsive local image example with intrinsic
       dimensions and meaningful alternative text. Document the authoring convention
       beside the feature that first uses it.
5. [x] **Discovery metadata.** Add social sharing metadata and a sitemap that includes
       only public pages. Give each content feature responsibility for its own
       publication filtering. Avoid invented social preview images.
6. [ ] **Missing-page experience.** Add an accessible 404 page with working navigation.
       STRATO's response behavior is handled in the deployment plan.

## Additional foundation work

- [x] **Formatting and pre-commit checks.** Requested before milestone 2. Adopt
      Celia's Prettier, ESLint, Stylelint, and staged-file hook; format existing
      files and verify partial staging and failed-commit recovery.

Testing is part of each change, not a separate milestone. Keep the package build
and type checks as the baseline; add focused behavioral checks as logic appears.

## Discovery and publication

The shared layout reuses each page's title, description, and canonical URL for
social metadata. Preview images remain unset until appropriate images are supplied.

The [official sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
generates `/sitemap-index.xml` and its numbered sitemap files during the build.
The document head links to the index. The homepage is currently the only public
page.

Each content feature owns its publication rule and must exclude unpublished
content from production routes as well as listings and feeds. The sitemap then
inherits those public routes; it does not independently interpret draft fields.
Implement the blog's filter with its collection, as described in
[the blog plan](04-blog-cms.md). Omitting a URL from the sitemap alone does not
make its page private.
