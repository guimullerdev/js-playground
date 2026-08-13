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

## Notes

- This poc uses Vite (dev server) + Jest/Babel (test runner) since RTL/Jest need a JSX build step, unlike the other zero-build pocs in this repo.
- Dependencies are managed with `yarn` (see `package.json` / `yarn.lock`).
