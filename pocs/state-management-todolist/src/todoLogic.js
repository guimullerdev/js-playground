export function addTodo(todos, text, id) {
  const trimmed = text.trim();
  if (!trimmed) return todos;
  return [...todos, { id, text: trimmed, done: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function countRemaining(todos) {
  return todos.filter((todo) => !todo.done).length;
}
