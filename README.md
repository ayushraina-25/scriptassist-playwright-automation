# ScriptAssist Playwright Automation

QA Automation Engineer Take Home Assignment

## Automation Strategy

This repository is focused on delivering a reliable Playwright + TypeScript automation foundation for the ScriptAssist staging patient app.

### What will be automated first

- UI: Login / Logout flow
- UI: Dashboard landing and key page elements
- UI: Profile access and basic update path
- UI: Search function happy path
- API: Login API validation
- API: Profile API retrieval

### Smoke suite candidates

- Successful login and landing on dashboard
- Dashboard content visibility
- Profile page open and basic data verification
- Search returns expected results
- API login returns success and auth token

### What is intentionally not automated yet

- Email verification flows and account confirmation
- Third-party integrations or external service validation
- Visual regression / screenshot comparisons
- Deep settings configuration flows
- Extensive negative and edge-case scenarios
- Complete user permission and role matrix

## Tech Stack

- Playwright
- TypeScript
- Node.js