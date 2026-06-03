---
id: TASK-FO001
status: pending
priority: p3
story_id:
directive_id:
created: 2026-06-03
updated: 2026-06-03
---

# TASK-FO001: File GitHub issue — consciousness plugin Windows AbsolutePath incompatibility

## What

File a GitHub issue against the consciousness plugin documenting that conscious mode, PGPS, and reportIssue all fail silently on Windows. The `AbsolutePath` branded type requires POSIX-style paths, but `process.cwd()` on Windows returns `C:\...` rather than `/...`, so validation/headless runs exit 0 with no output instead of reporting results.

## Done when

- A GitHub issue is filed at https://github.com/powell-clark/consciousness/issues/new
- It records: schema version, plugin version, the failing commands (conscious mode, PGPS `--headless`, reportIssue), and the root cause (`AbsolutePath` branded type rejecting Windows `C:\` paths from `process.cwd()`)

## Notes

This is a standalone infrastructure task — it has no parent story or directive. It tracks a defect in the plugin software itself, not in the FONT project data. The neurologist confirmed PGPS `--headless` exits 0 with empty output on this Windows project, consistent with the reported silent failure.
