# Testing Todo List PoC

A minimal Todo List app used to study different testing tools/libraries against the same UI. See [PLAN.md](./PLAN.md) for the full roadmap of versions.

## App

- `index.html` / `src/main.jsx` — Vite entry point.
- `src/App.jsx` — the Todo List component: add a todo, toggle it as done, delete it, shows a remaining-items count.
- `src/todoLogic.js` — pure functions (`addTodo`, `toggleTodo`, `deleteTodo`, `countRemaining`) used by `App.jsx`, kept separate so they can be unit tested without rendering the component.

Run the app:

```bash
cd pocs/testing-todolist
yarn install
yarn dev
```

## Tests (React Testing Library + Jest)

Component tests written with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) on top of [Jest](https://jestjs.io/) as the test runner. RTL renders the component into jsdom and queries it the way a user would (by role/label text), instead of reaching into implementation details.

- Test file: `src/react-testing-library/App.test.jsx`
- Covers: initial empty state, adding a todo, ignoring empty input, toggling done, deleting a todo.

## Tests (Jest, no DOM)

Plain [Jest](https://jestjs.io/) unit tests against the pure functions in `src/todoLogic.js` — no rendering, no DOM, just input/output assertions on the todo logic itself.

- Test file: `src/jest/todoLogic.test.js`
- Covers: adding (including trimming/ignoring empty text), toggling, deleting, counting remaining todos, and that functions don't mutate their input.

Run all tests (both suites above run together):

```bash
yarn test
```

## Tests (Cypress, end-to-end)

[Cypress](https://www.cypress.io/) tests that drive the real app in a browser against the running Vite dev server, clicking and typing like a user instead of calling React directly.

- Test file: `src/cypress/e2e/todo.cy.js`
- Covers the same flows as the RTL suite: initial empty state, adding a todo, ignoring empty input, toggling done, deleting a todo.

Run it headless (starts the dev server, runs the specs, then shuts it down):

```bash
yarn test:e2e
```

Or interactively, against a dev server you already have running (`yarn dev`):

```bash
yarn cy:open
```

## Tests (Playwright, end-to-end)

[Playwright](https://playwright.dev/) tests covering the same flows as the Cypress suite, to compare the two end-to-end tools. The dev server is started automatically via Playwright's `webServer` config.

- Test file: `src/playwright/todo.spec.js`
- Covers: initial empty state, adding a todo, ignoring empty input, toggling done, deleting a todo.

Run it:

```bash
yarn pw:test
```

## Comparison

All four suites test the same five behaviors (empty state, add, ignore empty input, toggle, delete) against the same `App.jsx`. Ran on 2026-08-17, all 24 tests passing.

| | React Testing Library | Jest (logic only) | Cypress | Playwright |
|---|---|---|---|---|
| What it tests | Rendered component (jsdom) | Pure functions, no DOM | Real browser, real app | Real browser, real app |
| Runner | Jest | Jest | Own runner | Own runner |
| Needs dev server | No | No | Yes | Yes |
| Server startup | — | — | Manual (`start-server-and-test`) | Built into config (`webServer`) |
| Wall time (this run) | ~1.6s (shared with Jest suite) | included above | ~12.6s incl. server boot | ~4.5s incl. server boot |
| Test count | 5 | 9 | 5 | 5 |

Notes from actually building this:

- **Jest test-file collision**: Jest's default `testMatch` picks up any `*.spec.js`, which includes Playwright's `todo.spec.js`. Had to pin `jest.config.js` to `testMatch: ['<rootDir>/src/**/*.test.[jt]s?(x)']` so `yarn test` doesn't also try (and fail) to run Playwright specs.
- **Accessible-name matching differs**: RTL and Playwright both resolve a button's accessible name from `aria-label` (so `getByRole('button', { name: 'Delete Buy milk' })` works even though the visible text is just "Delete"). Cypress's `cy.contains('button', ...)` matches visible text only, so the Cypress spec had to fall back to `cy.get('button[aria-label="..."]')`. This is the most concrete practical gap between the tools, not just a style difference.
- **Server orchestration**: Playwright's `webServer` config starts and waits for the dev server itself. Cypress has no equivalent built in, so `test:e2e` depends on the extra `start-server-and-test` package. That's most of the Cypress run's extra wall time (server boot) — the actual test execution is comparable (~1-2s either way).
- **RTL vs. Jest-only**: RTL tests catch wiring bugs (does the button actually call the handler, does the DOM update) that the pure-logic Jest tests can't, since those never touch a component. The Jest-only suite is faster and more precise for the *logic* itself (trimming, immutability), but gives zero confidence the UI is wired correctly.

## Notes

- This poc uses Vite (dev server) + Jest/Babel (test runner) since RTL/Jest need a JSX build step, unlike the other zero-build pocs in this repo.
- Dependencies are managed with `yarn` (see `package.json` / `yarn.lock`).
