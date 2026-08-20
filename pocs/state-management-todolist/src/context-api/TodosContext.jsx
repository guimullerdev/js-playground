import React, { createContext, useContext, useReducer } from 'react';
import { addTodo, toggleTodo, deleteTodo } from '../todoLogic.js';

const TodosStateContext = createContext(null);
const TodosDispatchContext = createContext(null);

let nextId = 1;

function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return addTodo(state, action.text, nextId++);
    case 'toggle':
      return toggleTodo(state, action.id);
    case 'remove':
      return deleteTodo(state, action.id);
    default:
      return state;
  }
}

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosStateContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
}

export function useTodosState() {
  return useContext(TodosStateContext);
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}
