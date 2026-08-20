import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, toggle, remove } from './store.js';
import { countRemaining } from '../todoLogic.js';

export default function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  function handleAdd(event) {
    event.preventDefault();
    dispatch(add(text));
    setText('');
  }

  function handleToggle(id) {
    dispatch(toggle(id));
  }

  function handleDelete(id) {
    dispatch(remove(id));
  }

  const remaining = countRemaining(todos);

  return (
    <main>
      <h1>Todo List — Redux</h1>

      <form onSubmit={handleAdd}>
        <label htmlFor="todo-input">New todo</label>
        <input
          id="todo-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggle(todo.id)}
              />
              <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            </label>
            <button type="button" onClick={() => handleDelete(todo.id)} aria-label={`Delete ${todo.text}`}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p>{remaining} item(s) left</p>
    </main>
  );
}
