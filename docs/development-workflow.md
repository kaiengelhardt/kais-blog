# Development and review

## Implement and review

1. Inspect Git status and any `review/base` and `review/tip` branches before
   editing. These local branches preserve a pending review across turns.
2. For a new task, record the starting commit as `review/base`. Preserve unrelated
   user edits and staging; never include them in task commits or discard them.
3. Implement one requested milestone, run its checks, and commit granular changes.
4. Ask a subagent to review the committed changes against the starting commit.
   Address feedback in additional commits and repeat review until no findings
   remain. Keep the original commits rather than squashing or recreating them.

## Present the working copy

After the review loop, preserve the final commit as `review/tip`. Confirm both
review branches point to the intended commits and the task changes are committed.
Then, while on `main`, run:

```sh
git reset --mixed -N review/base
```

This moves `main` back to the starting commit without changing file contents.
The changes appear unstaged; new files have intent-to-add entries so they also
appear in ordinary diffs. Verify `git diff review/tip --` is empty for the task
files: the working copy must still match the saved result.

Keep both review branches until approval. Report that commits are preserved and
the working copy is intentionally dirty. Finish with a walkthrough grouped in
a logical reading order. End each turn by naming the current milestone just
worked on and the next planned milestone. Do not start the next milestone before
Kai requests it.

Use this presentation only for unpublished task commits. Preserve unrelated
staged changes before any mixed reset and verify their restoration afterward.
Never use a hard reset, checkout files over user edits, or force-push for this
workflow.

## Approval or change requests

When Kai approves, restore the exact saved commits without overwriting files:

```sh
git reset --mixed review/tip
```

Check status afterward. Edits made during review remain working-copy changes;
preserve them rather than assuming approval includes them. Once `main` retains
the saved commits, remove the two local review branches. Start further work only
as requested.

For change requests, restore `main` to `review/tip` the same way, but keep
`review/base` at the original starting commit. Inspect any edits made during
review, implement the requested corrections, and commit them on top. Repeat the
subagent review loop, update `review/tip`, and present the cumulative changes
against the same base again.
