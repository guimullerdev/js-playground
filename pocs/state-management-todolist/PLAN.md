# Plan — state-management-todolist versions

Roadmap for studying the same Todo List app built with different state management libraries. Same idea as [`testing-todolist`](../testing-todolist/PLAN.md), but instead of swapping the testing tool, each version swaps how state is stored/updated while the UI and behavior stay identical.

Pace: one library implemented per day, in the order below.

## Baseline spec (every version must implement this)

- Add a todo (ignore empty/whitespace-only input, trim text).
- Toggle a todo's done state.
- Delete a todo.
- Show a "N item(s) left" remaining count.
- Same markup/labels/aria-labels across versions where possible, so tests and visual comparison stay meaningful (reuse the `App.jsx` shape from `testing-todolist` as the reference).

## Project structure

Single Vite + React app (like `testing-todolist`), one folder per library under `src/`:

- `src/redux/`
- `src/context-api/`
- `src/mobx/`
- `src/zustand/`
- `src/recoil/`
- `src/jotai/`
- `src/xstate/`

Each folder owns its own state wiring (store/reducer/atoms/machine) and its own `App.jsx`. A top-level landing page links out to each implementation (multi-entry Vite pages, e.g. `redux.html`, `zustand.html`, ... each loading `src/<lib>/main.jsx`), so all versions run off a single `yarn dev`.

## Day 1 — Redux (done)

[Redux](https://redux.js.org/) (with Redux Toolkit) — the classic flux-style store: actions, a reducer, `configureStore`, connected via `react-redux`'s `useSelector`/`useDispatch`.

- Folder: `src/redux/`
- Entry: `redux.html` → `src/redux/main.jsx`
- Covers: baseline spec via a `todosSlice` (RTK) dispatched from the component, reusing `addTodo`/`toggleTodo`/`deleteTodo`/`countRemaining` from `src/todoLogic.js` inside the reducers/selector.

## Day 2 — Context API (done)

React's built-in [Context API](https://react.dev/reference/react/createContext) + `useReducer` — no external dependency, state lives in a provider component wrapping the tree.

- Folder: `src/context-api/`
- Entry: `context-api.html` → `src/context-api/main.jsx`
- Covers: baseline spec via a `TodosProvider` (state + dispatch split into two contexts) and `useTodosState`/`useTodosDispatch` hooks, reusing `addTodo`/`toggleTodo`/`deleteTodo`/`countRemaining` from `src/todoLogic.js` inside the reducer/selector.

## Day 3 — MobX

[MobX](https://mobx.js.org/) — observable state with actions, wired to React via `mobx-react-lite`'s `observer`.

- Folder: `src/mobx/`
- Covers: baseline spec via an observable `TodoStore` class.

## Day 4 — Zustand

[Zustand](https://zustand-demo.pmnd.rs/) — minimal hook-based store, no boilerplate, no providers.

- Folder: `src/zustand/`
- Covers: baseline spec via a single `useTodoStore` hook (`create`).

## Day 5 — Recoil

[Recoil](https://recoiljs.org/) — atomic state model from Meta, `atom`/`selector` read via hooks, needs a `RecoilRoot`.

- Folder: `src/recoil/`
- Covers: baseline spec via a `todosAtom` + a `remainingCountSelector`.

## Day 6 — Jotai

[Jotai](https://jotai.org/) — atomic state model, closer to `useState` ergonomics than Recoil, no root provider required by default.

- Folder: `src/jotai/`
- Covers: baseline spec via a `todosAtom` + a derived read-only atom for the remaining count.

## Day 7 — XState

[XState](https://xstate.js.org/) — state machines/statecharts; todos and their transitions modeled explicitly as machine states/events instead of free-form reducers.

- Folder: `src/xstate/`
- Covers: baseline spec via a `todosMachine` driven with `useMachine` (`@xstate/react`).

## Comparison (to fill in once all 7 are done)

Planned axes, same spirit as `testing-todolist`'s comparison table:

- Boilerplate (lines of code / files needed for the baseline spec)
- Learning curve / mental model (flux, observables, atoms, statecharts, plain hooks)
- Devtools support
- Bundle size (rough, via `vite build`)
- Async/derived-state ergonomics (e.g. computing "remaining count" outside the store)
- Need for a provider/root wrapper

See [README.md](./README.md) for setup and the final comparison once written.
