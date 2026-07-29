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

## Setup Instructions

1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Configure environment variables if required in the project config

## How to Execute the Tests

- Run all tests: `npx playwright test`
- Run a specific test file: `npx playwright test tests/ui/login.spec.ts`
- Show the HTML report: `npx playwright show-report`

## Project Structure Overview

- `tests/ui` - UI end-to-end scenarios
- `tests/api` - API validation tests
- `pages` - Page Object Model classes for UI flows
- `fixtures` - Shared test fixtures and setup
- `utils` - Utility helpers such as environment loading
- `playwright.config.ts` - Playwright configuration

## README Summary

### UI

- Covered through end-to-end Playwright tests for login, logout, search, settings, and signup. ![alt text](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/ayush.raina/scriptassist-playwright-automation/image.png)

### API

- Covered through API validation tests for authentication, patient queries, and user agreements. ![alt text](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/ayush.raina/scriptassist-playwright-automation/image-1.png)

## Assumptions Made

- The test environment is stable and accessible.
- Test accounts are available.
- Test data is independent and reusable.
- Stable locators are available.
- APIs required for authentication are functional.

## What I Would Improve With More Time

Given additional time, I would enhance the framework by:

- Implementing API-based authentication to reduce UI execution time
- Adding data-driven testing for broader input coverage
- Integrating Allure reporting with environment and execution metadata
- Introducing accessibility testing using Axe
- Adding visual regression testing for key screens
- Expanding API automation coverage
- Integrating code quality tools such as ESLint, Prettier, and Husky
- Supporting multiple environments through environment-specific configuration
- Running tests in parallel across multiple browsers in CI
- Incorporating performance monitoring into the automation pipeline