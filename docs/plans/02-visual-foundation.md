# Visual foundation and navigation

Status: approved by Kai on 2026-10-02. Depends on the shared page layout.
The approved visual direction lives in [the brief](../brief.md).

## Copper Hour

Use copper `#A65E45`, peach `#EFB69E`, and burgundy `#824761` as the starting
gradient colors. Pair with warm neutral light surfaces and deep neutral dark
surfaces. These are decorative colors, not automatically suitable text or button
colors; tune interactive and text tokens for contrast in each appearance.

Keep the existing logo and icons intact. Let their purple/pink identity stand
on a neutral surface instead of recoloring them to match the page background.

## Milestones

1. [ ] **Typography and spacing.** Establish readable body width, a small spacing
   scale, expressive serif headings, and a clean sans-serif body face. Compare
   actual font choices with Kai using one representative page; self-host fonts.
2. [ ] **Light and dark colors.** Implement the chosen palette as CSS custom
   properties, following system appearance. Establish readable text, links,
   focus indicators, and opaque surface fallbacks before decorative effects.
3. [ ] **Appearance control.** Add a compact system/light/dark choice and remember an
   explicit selection. Work safely if storage is unavailable and avoid a flash
   of the wrong theme. Verify this interaction with a focused runnable check.
4. [ ] **Gradient and dot background.** Add static streaks and subtle localized dots
   using CSS or a small local asset. Keep article reading areas quiet and avoid
   expensive full-page effects.
5. [ ] **Glass card treatment.** Add translucent surfaces, fine edges, and restrained
   shadows. Preserve contrast without backdrop blur and allow content to grow.
6. [ ] **Shared navigation and footer.** Link Home, About, Blog, Resume, and Apps.
   Place social and legal links in the footer. Add a skip link and a small-screen
   navigation treatment with native semantics and visible keyboard focus.
7. [ ] **Interaction polish.** Add the agreed restrained hover/focus transitions and
   reduced-motion handling. Responsive behavior and accessibility are checked
   during every milestone, including touch use and text zoom.

Recents and Archive are views within Blog, not primary navigation
destinations.
