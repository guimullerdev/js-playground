# State Management Todo List PoC

A minimal Todo List app used to compare different state management libraries against the same UI/behavior. See [PLAN.md](./PLAN.md) for the full roadmap.

## Baseline app (plain React state)

This is the reference implementation: state lives in the component via `useState`, no external state library. Every later version (Redux, Context API, MobX, Zustand, Recoil, Jotai, XState) reimplements the same behavior with a different state management approach.

- `index.html` / `src/main.jsx` — Vite entry point.
- `src/App.jsx` — the Todo List component: add a todo, toggle it as done, delete it, shows a remaining-items count.
- `src/todoLogic.js` — pure functions (`addTodo`, `toggleTodo`, `deleteTodo`, `countRemaining`) used by `App.jsx`, kept separate so the same logic can be reused/adapted by the other versions.

Run the app:

```bash
cd pocs/state-management-todolist
yarn install
yarn dev
```

## Notes

- Uses Vite (zero-config dev server for React/JSX), unlike the other zero-build pocs in this repo.
- Dependencies are managed with `yarn`.
