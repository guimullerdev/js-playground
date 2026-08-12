# Testing Todo List PoC

A minimal Todo List app used to study different testing tools/libraries against the same UI. See [PLAN.md](./PLAN.md) for the full roadmap of versions.

## App

- `index.html` / `src/main.jsx` — Vite entry point.
- `src/App.jsx` — the Todo List component: add a todo, toggle it as done, delete it, shows a remaining-items count.

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

Run it:

```bash
yarn test
```

## Notes

- This poc uses Vite (dev server) + Jest/Babel (test runner) since RTL/Jest need a JSX build step, unlike the other zero-build pocs in this repo.
- Dependencies are managed with `yarn` (see `package.json` / `yarn.lock`).
