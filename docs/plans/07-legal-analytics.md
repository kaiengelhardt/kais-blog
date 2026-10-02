# Legal pages and analytics

Status: draft plan. Depends on the shared layout; event tracking depends on real
resume and App Store links. Legal wording and account settings remain inputs.

## Milestones

1. [ ] **Legal notice.** Create the German legal-notice page, retaining `/impressum/`.
   Ask Kai to confirm current operator details from the old notice before using
   them; do not assume the old text remains accurate.
2. [ ] **Privacy notice.** Write the German notice around the actual deployment,
   hosting logs, GoatCounter setup, and external links. Verify current primary
   sources when drafting. Link both notices from the shared footer.
3. [ ] **Page-view integration.** Add Kai's provided GoatCounter endpoint/code through
   the shared layout. Enable only for production with the explicit analytics
   setting, and skip collection when DNT or GPC is enabled.
4. [ ] **Two click events.** Count resume-download and outbound App Store clicks using
   fixed event names. Do not send personal data or arbitrary query parameters.
   Tracking failures must not interrupt navigation or downloads. Add a focused
   check for the production/privacy gates and event routing.
5. [ ] **External: analytics activation.** Confirm account settings, deploy the enabled
   integration, and verify page views and the two events arrive. Check that the
   published privacy notice matches the activated configuration.

Do not inherit Celia's analytics identity or legal statements. App-specific privacy
and support needs are separate from this website's privacy notice.
