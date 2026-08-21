import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { todoStore } from './TodoStore.js';

const App = observer(function App() {
  const [text, setText] = useState('');

  function handleAdd(event) {
    event.preventDefault();
    todoStore.add(text);
    setText('');
  }

  function handleToggle(id) {
    todoStore.toggle(id);
  }

  function handleDelete(id) {
    todoStore.remove(id);
  }

  return (
    <main>
      <h1>Todo List — MobX</h1>

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
        {todoStore.todos.map((todo) => (
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

      <p>{todoStore.remaining} item(s) left</p>
    </main>
  );
});

export default App;
