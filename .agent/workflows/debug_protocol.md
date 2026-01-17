---
description: Comprehensive end-to-end debugging protocol for COlearn
---

# Core debugging prompt for Antigravity

**Context about this project**
- **Stack**: React + Vite + Material UI (Frontend). Logic is currently client-side (GameMasterService, LocalStorage) simulating a backend.
- **Entry points**: UI Interactions (Buttons), Context API Methods (`GameContext`, `SquadContext`), `localStorage` state.
- **Execution environment**: Local dev (`npm run dev`) with Chrome DevTools console logs.

**Debugging Workflow**

## 1. Understand the failure clearly
- Read the error message, stack trace, and recent logs for the failing request or job.
- Summarize in 3–5 bullet points:
  - What failed.
  - Where it failed (file, function, layer).
  - When it failed (trigger, endpoint, workflow step).
  - The suspected root cause.

## 2. Trace the execution path (UI → Logic → State)
- Start from the public UI surface:
  - Identify the exact component and event handler being triggered.
  - Map variables from the UI state to internal function calls.
- Follow the call chain step‑by‑step:
  - Component Handler → Context Method → Service/Helper → State Update.
- Note any branching logic, feature flags (GameMode), or async tasks (setTimeout) involved.

## 3. Inspect logs, traces, and state
- Use `console.log` traces.
- Compare:
  - Last failing run vs last successful run.
- Call out at least 3 concrete evidence points (log lines, variable values, State values) that support your hypothesis.

## 4. Localize the bug
- Pinpoint the smallest set of functions/files where the bug is most likely located.
- Explicitly distinguish between:
  - **Logic Bug**: Wrong branching, wrong transitions, off-by-one errors.
  - **State Bug**: Stale closures, improper `useEffect` dependencies, mutation of state.
  - **Data Bug**: Malformed `localStorage` data, undefined props.

## 5. Design a minimal, safe fix
- Propose a minimal patch that fixes the root cause while avoiding risky rewrites.
- For each change, explain:
  - Why it fixes the issue.
  - Why it should not break existing behavior.

## 6. Run and verify
- Describe the exact steps to reproduce and verify:
  - Refresh Page -> Click X -> Verify Y.
- Confirm that the failing case now passes.

## 7. Risk analysis and rollback plan
- List possible side‑effects or regressions.
- Suggest a simple rollback plan.

**How to start on each debugging task**
When given a bug report, stack trace, or failing behavior, follow this format:
1.  **Summary**: Short summary of the bug.
2.  **Path**: Execution path in bullet points.
3.  **Analysis**: Root cause analysis with evidence.
4.  **Patch**: Proposed patch (with diffs or full files).
5.  **Validation**: How to run and validate.
6.  **Risks**: Risks and rollback plan.
