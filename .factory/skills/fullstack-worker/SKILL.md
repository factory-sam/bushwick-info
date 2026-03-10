---
name: fullstack-worker
description: Handles Next.js setup, API routes, data layer, admin panel, and full-stack integration features
---

# Fullstack Worker

NOTE: Startup and cleanup are handled by `worker-base`. This skill defines the WORK PROCEDURE.

## When to Use This Skill

Use for features involving:
- Next.js project setup and configuration
- API routes (CRUD endpoints, auth)
- Data layer (JSON files, data models)
- Admin panel pages and forms
- Authentication and session management
- Build/deploy configuration
- Full-stack integration (connecting frontend to backend)

## Work Procedure

1. **Read context files first:**
   - Read `.factory/library/architecture.md` for tech stack decisions and patterns
   - Read `.factory/library/environment.md` for env vars and external dependencies
   - Read `.factory/library/eva-design.md` for design tokens (colors, fonts, CSS patterns)
   - Read `.factory/services.yaml` for commands and service configuration

2. **Write failing tests first (RED):**
   - For API routes: write Vitest tests covering happy path, validation errors, auth checks
   - For data utilities: write tests for CRUD operations, data integrity
   - Run `pnpm test` to confirm tests fail (they should, nothing is implemented yet)

3. **Implement to make tests pass (GREEN):**
   - Follow Next.js App Router conventions (app/ directory structure)
   - Use TypeScript throughout
   - For API routes: use Next.js Route Handlers (app/api/...)
   - For pages: use Server Components by default, Client Components only when needed
   - For auth: simple env var password check + httpOnly cookie
   - For data: JSON file read/write in a `/data/` directory
   - Apply EVA theme styling using the design tokens from `.factory/library/eva-design.md`

4. **Run all checks:**
   - `pnpm test` — all tests pass
   - `pnpm typecheck` — no type errors (if configured)
   - `pnpm lint` — no lint errors (if configured)
   - `pnpm build` — builds successfully

5. **Manual verification with agent-browser or curl:**
   - Start the dev server: `PORT=3100 pnpm dev`
   - Wait for healthcheck: `curl -sf http://localhost:3100`
   - For API routes: use curl to test each endpoint
   - For pages: use agent-browser to navigate and verify visual output
   - Stop the dev server after verification

6. **Stop any processes you started:**
   - Kill dev server: `lsof -ti :3100 | xargs kill 2>/dev/null`
   - Ensure no orphaned processes remain

## Example Handoff

```json
{
  "salientSummary": "Implemented admin login flow with password auth. POST /api/auth validates against ADMIN_PASSWORD env var, sets httpOnly cookie. Login page at /admin with EVA-themed form. Tests cover correct password (200 + cookie), wrong password (401), empty password (400). Verified with curl and agent-browser screenshot.",
  "whatWasImplemented": "Admin authentication: POST /api/auth/login route handler validates password against ADMIN_PASSWORD env var, sets httpOnly session cookie with 24h expiry. GET /api/auth/session validates cookie. Login page at /admin/login with EVA-themed form (Orbitron heading, NERV panel styling, error display). Middleware redirects unauthenticated /admin/* requests to login.",
  "whatWasLeftUndone": "",
  "verification": {
    "commandsRun": [
      { "command": "pnpm test -- --grep auth", "exitCode": 0, "observation": "6 tests passing: login-success, login-wrong-pw, login-empty, session-valid, session-expired, session-invalid" },
      { "command": "pnpm build", "exitCode": 0, "observation": "Build successful, no type errors" },
      { "command": "curl -X POST http://localhost:3100/api/auth/login -H 'Content-Type: application/json' -d '{\"password\":\"bushwick-admin-2024\"}'", "exitCode": 0, "observation": "200 OK, Set-Cookie header present with httpOnly flag" },
      { "command": "curl -X POST http://localhost:3100/api/auth/login -H 'Content-Type: application/json' -d '{\"password\":\"wrong\"}'", "exitCode": 0, "observation": "401 Unauthorized, body: {\"error\":\"ACCESS DENIED\"}" }
    ],
    "interactiveChecks": [
      { "action": "Navigated to http://localhost:3100/admin with agent-browser", "observed": "Redirected to /admin/login. Dark EVA-themed login form visible with Orbitron heading, password input, NERV-styled submit button" },
      { "action": "Entered correct password and submitted", "observed": "Redirected to /admin dashboard. Session cookie set." },
      { "action": "Entered wrong password and submitted", "observed": "Red 'ACCESS DENIED' error message with EVA alert styling. Remained on login page." }
    ]
  },
  "tests": {
    "added": [
      { "file": "src/__tests__/api/auth.test.ts", "cases": [
        { "name": "returns 200 and sets cookie for correct password", "verifies": "login success flow" },
        { "name": "returns 401 for incorrect password", "verifies": "login failure" },
        { "name": "returns 400 for empty password", "verifies": "input validation" },
        { "name": "returns session data for valid cookie", "verifies": "session check" },
        { "name": "returns 401 for expired cookie", "verifies": "session expiry" },
        { "name": "returns 401 for invalid cookie", "verifies": "session security" }
      ]}
    ]
  },
  "discoveredIssues": []
}
```

## When to Return to Orchestrator

- Feature depends on a component, API route, or data model that doesn't exist yet and wasn't listed in preconditions
- Requirements are ambiguous (e.g., unclear what fields are required vs optional)
- Build or test infrastructure is broken and can't be fixed within this feature's scope
- Environment variables or external services are missing/misconfigured
