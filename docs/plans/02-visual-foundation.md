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

1. [x] **Typography and spacing.** Establish readable body width, a small spacing
       scale, expressive sans-serif headings, and a clean sans-serif body face. Compare
       actual font choices with Kai using one representative page; self-host fonts.
2. [x] **Light and dark colors.** Implement the chosen palette as CSS custom
       properties, following system appearance. Establish readable text, links,
       focus indicators, and opaque surface fallbacks before decorative effects.
3. [x] **Appearance control.** Add a compact system/light/dark choice and remember an
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

## Typography implementation

Kai selected Bricolage Grotesque headings with Space Grotesk body text. Headings
use weight 750, optical size 48, and slightly tighter letter spacing to match the
approved comparison. Body text uses the regular weight 400.

[The shared stylesheet](../../src/styles/site.css) owns font families, heading
sizes, reading width, and the four spacing tokens. The homepage supplies the
representative heading and paragraph content; the 404 page uses the same styles.

Fontsource's variable font packages are imported by the layout and bundled into
local assets by Astro. Visitors do not contact a font CDN. Their OFL licenses are
included in `public/fonts/`. Use the existing CSS tokens when adding page styles;
extend the scale only when the actual layout needs another value.

## Color implementation

The shared stylesheet defines five semantic color tokens: page background,
opaque reading surface, text, links, and hovered links. Light appearance uses
warm off-white surfaces with dark copper links; dark appearance uses deep warm
neutrals with peach links. Hovered links lean toward burgundy in light appearance
and a lighter rose in dark appearance.

Each token uses `light-dark(light, dark)`. With `color-scheme: light dark`, the
browser follows system appearance automatically, including changes while the
page is open. An explicit appearance sets `color-scheme` to `light` or `dark`.
This also tells the browser which appearance to use for its native UI.

The main reading area has an opaque surface, ready to remain readable when
decorative backgrounds arrive. Links retain underlines, and the keyboard focus
outline uses their current color. Text and both link colors meet at least 4.5:1
contrast against both surfaces in each appearance. Gradients and glass treatment
remain separate milestones.

## Appearance control

[AppearanceControl](../../src/components/AppearanceControl.astro) is a labeled
native select in the footer shared by every page. System is the default. Selecting Light or
Dark saves the choice in `localStorage`; selecting System removes it.

[The appearance script](../../src/scripts/appearance.js) is included inline in
the layout's head so a saved choice applies before the page content paints.
After the document is ready, it connects the select and reveals the control.
Without JavaScript the control stays hidden and CSS follows system appearance.
If storage is blocked, selection still works for the current page; persistence
across navigation is unavailable. Unrecognized saved values fall back to System.

`npm run test:build` includes a focused check of the built script placement,
early restoration, selection, persistence, and unavailable storage. Browser
checks cover actual colors and the native select's keyboard behavior.
