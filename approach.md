# Approach

This project uses Playwright with TypeScript to automate UI and API tests for the ScriptAssist staging application.

## Approach Summary

- Build a stable Page Object Model (POM) structure for UI flows.
- Separate test scenarios by area such as login, logout, search, settings, and signup.
- Use API tests for core backend validation where direct response checks are valuable.
- Keep tests readable, modular, and focused on critical user journeys.

## Testing Strategy

- UI tests cover main user flows and page-level validations.
- API tests validate key endpoints and expected response structure.
- Environment variables are used for configurable values such as tokens and URLs.

## Execution Notes

- Install dependencies with `npm install`.
- Install browsers with `npx playwright install`.
- Run tests with `npx playwright test`.
