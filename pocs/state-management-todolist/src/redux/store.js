import { configureStore, createSlice } from '@reduxjs/toolkit';
import { addTodo, toggleTodo, deleteTodo } from '../todoLogic.js';

let nextId = 1;

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    add: {
      reducer(state, action) {
        return addTodo(state, action.payload.text, action.payload.id);
      },
      prepare(text) {
        return { payload: { text, id: nextId++ } };
      },
    },
    toggle(state, action) {
      return toggleTodo(state, action.payload);
    },
    remove(state, action) {
      return deleteTodo(state, action.payload);
    },
  },
});

export const { add, toggle, remove } = todosSlice.actions;

export const store = configureStore({
  reducer: { todos: todosSlice.reducer },
});
