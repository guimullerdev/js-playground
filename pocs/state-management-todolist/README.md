# State Management Todo List PoC

A minimal Todo List app used to compare different state management libraries against the same UI/behavior. See [PLAN.md](./PLAN.md) for the full roadmap.

## Baseline app (plain React state)

This is the reference implementation: state lives in the component via `useState`, no external state library. Every later version (Redux, Context API, MobX, Zustand, Recoil, Jotai, XState) reimplements the same behavior with a different state management approach.

- `index.html` / `src/main.jsx` — Vite entry point.
- `src/App.jsx` — the Todo List component: add a todo, toggle it as done, delete it, shows a remaining-items count.
- `src/todoLogic.js` — pure functions (`addTodo`, `toggleTodo`, `deleteTodo`, `countRemaining`) used by `App.jsx`, kept separate so the same logic can be reused/adapted by the other versions.

## Redux

[Redux Toolkit](https://redux-toolkit.js.org/) version: a `todosSlice` (`createSlice`) owns the `todos` array, actions are dispatched from the component via `react-redux`'s `useDispatch`/`useSelector`, and the reducers/selector reuse the same `addTodo`/`toggleTodo`/`deleteTodo`/`countRemaining` functions from `src/todoLogic.js`.

- `src/redux/store.js` — `todosSlice` + `configureStore`.
- `src/redux/App.jsx` — the Todo List component, wired to the store instead of local `useState`.
- `src/redux/main.jsx` — entry point, wraps `App` in `<Provider store={store}>`.

## Context API

React's built-in [Context API](https://react.dev/reference/react/createContext) + `useReducer`, no external dependency. State and dispatch are split into two contexts (`TodosStateContext`/`TodosDispatchContext`) so components that only dispatch don't re-render on every state change; the reducer reuses the same `addTodo`/`toggleTodo`/`deleteTodo`/`countRemaining` functions from `src/todoLogic.js`.

- `src/context-api/TodosContext.jsx` — `todosReducer` + `TodosProvider` + `useTodosState`/`useTodosDispatch` hooks.
- `src/context-api/App.jsx` — the Todo List component, reading/dispatching via the hooks instead of local `useState`.
- `src/context-api/main.jsx` — entry point, wraps `App` in `<TodosProvider>`.

## Running it

```bash
cd pocs/state-management-todolist
yarn install
yarn dev
```

Then open:

- `/` — landing page linking to every version.
- `/baseline.html` — plain React `useState`.
- `/redux.html` — Redux (Redux Toolkit).
- `/context-api.html` — React Context API + `useReducer`.

## Notes

- Uses Vite (zero-config dev server for React/JSX), unlike the other zero-build pocs in this repo.
- Dependencies are managed with `yarn`.
