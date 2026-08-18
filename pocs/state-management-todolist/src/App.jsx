import React, { useState } from 'react';
import { addTodo, toggleTodo, deleteTodo, countRemaining } from './todoLogic.js';

let nextId = 1;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function handleAdd(event) {
    event.preventDefault();
    setTodos((prev) => addTodo(prev, text, nextId++));
    setText('');
  }

  function handleToggle(id) {
    setTodos((prev) => toggleTodo(prev, id));
  }

  function handleDelete(id) {
    setTodos((prev) => deleteTodo(prev, id));
  }

  const remaining = countRemaining(todos);

  return (
    <main>
      <h1>Todo List</h1>

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
