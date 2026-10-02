# Resume and shared image viewer

Status: draft plan. Depends on the visual foundation. The content model follows
[Career point and Resume](../../CONTEXT.md).

## Milestones

1. [ ] **Resume download.** Add the page introduction and a download link at the top
   once a real PDF is supplied. Maintain the PDF independently in `public/`.
   Use a clear unavailable state locally until then, not a broken download.
2. [ ] **Career data and basic timeline.** Define simple typed data for company,
   successive roles, dates, descriptions, and selected education or independent
   milestones. Render newest first with semantic markup.
3. [ ] **Timeline character.** Add restrained offsets, markers, and spacing to make
   the timeline slightly playful. Preserve chronological reading order and use
   a simple vertical layout on small screens.
4. [ ] **Career photos.** Add responsive thumbnails and optional captions to a career
   point. Zero, one, and several photos all have sensible layouts.
5. [ ] **Large-image dialog.** Build one shared viewer with a native dialog, a visible
   close control, Escape support, focus restoration, image description, and a
   direct-image fallback. Add a small runnable interaction check.
6. [ ] **Gallery navigation.** Add previous/next controls, arrow-key navigation, and
   an image counter for multi-image groups. Stop at the first and last images;
   disable unavailable directions. Single images do not show unnecessary
   navigation. Extend the interaction check to cover both ends.
7. [ ] **Touch gestures.** Add horizontal swipe navigation to the same viewer while
   retaining visible buttons. Preserve normal scrolling and pinch zoom; a tap
   must not accidentally advance the image. Check gesture direction and bounds.
8. [ ] **Real career content.** Draft from accessible LinkedIn evidence and Kai's own
   information; have Kai confirm roles/dates/copy before publication. Add approved
   photos and the PDF without making LinkedIn an ongoing runtime dependency.

The viewer is also used by app screenshots and About photos. It does not combine
unrelated career points, apps, or personal photo groups into a single gallery.
