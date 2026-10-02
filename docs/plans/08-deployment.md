# GitHub Actions, STRATO, and launch

Status: draft plan. Reuse Celia's deployment behavior as requested; verify local
source and hosting constraints when implementing. See [reference findings](../reference-findings.md).

## Milestones

1. [ ] **Build workflow.** Run installation, Astro checks, build, and relevant focused
       checks in GitHub Actions. Retain the exact checked output as a build artifact.
       This first workflow does not upload an unfinished site.
2. [ ] **External: establish the hosting destination.** Check STRATO's domain mapping,
       SFTP account boundary, and destination directory. Inventory existing files and
       establish which belong to this site before enabling stale-file deletion.
3. [ ] **Upload plan.** Adapt Celia's hash-manifest comparison to identify changed
       and obsolete files without transferring anything. Add a small check for
       unchanged files and missing/corrupt manifests. Omit its PHP/contact work.
4. [ ] **File transfer.** Add SFTP with pinned SSH host keys and upload changed files
       to the verified destination. Keep upload failures visible. Add a focused
       transfer check without touching the production host.
5. [ ] **Cleanup and recovery.** Add manifest invalidation before mutation, scoped
       obsolete-file deletion after uploads, and manifest publication after success.
       Cover interruption and missing-manifest recovery in the deployment checks.
6. [ ] **Production workflow.** Connect the uploader to successful builds on `main`.
       Serialize deployment runs without cancelling an active upload. Keep a manual
       full-upload recovery path; upload the checked artifact without rebuilding it.
7. [ ] **Hosting rules and old URLs.** Add the necessary `.htaccess` rules for the
       custom 404, URL conventions, and old archive/feed redirects. Preserve the
       legal-notice route. Check existing generated output before choosing redirects.
8. [ ] **External: configure GitHub and STRATO.** Configure connection variables,
       credential secrets, and the verified SSH host key. Publish the backup branch
       to GitHub before the first new-site release. Keep credentials out of commits.
9. [ ] **External: first deployment.** Once real launch content and legal pages are
       ready, run the GitHub action. Verify the domain serves the intended folder,
       HTTPS works, nested routes resolve, and missing pages return a real 404.
10. [ ] **External: recovery exercise.** Verify the manual full deployment and recovery
        from a failed upload using a known checked artifact. Document the actual
        rollback procedure and limitations of direct, non-atomic file uploads.

The existing live site remains in place during planning and local development.
Initial publication can omit unfinished content sections, as agreed. Deployments
of later published CMS changes then follow the same pipeline automatically.
