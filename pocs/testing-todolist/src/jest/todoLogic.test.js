import { addTodo, toggleTodo, deleteTodo, countRemaining } from '../todoLogic.js';

describe('addTodo', () => {
  test('appends a todo with the given id', () => {
    const result = addTodo([], 'Buy milk', 1);
    expect(result).toEqual([{ id: 1, text: 'Buy milk', done: false }]);
  });

  test('trims whitespace from the text', () => {
    const result = addTodo([], '  Buy milk  ', 1);
    expect(result[0].text).toBe('Buy milk');
  });

  test('ignores empty or whitespace-only text', () => {
    expect(addTodo([], '', 1)).toEqual([]);
    expect(addTodo([], '   ', 1)).toEqual([]);
  });

  test('does not mutate the original array', () => {
    const todos = [];
    addTodo(todos, 'Buy milk', 1);
    expect(todos).toEqual([]);
  });
});

describe('toggleTodo', () => {
  test('flips done for the matching todo', () => {
    const todos = [{ id: 1, text: 'Buy milk', done: false }];
    const result = toggleTodo(todos, 1);
    expect(result[0].done).toBe(true);
  });

  test('leaves other todos untouched', () => {
    const todos = [
      { id: 1, text: 'Buy milk', done: false },
      { id: 2, text: 'Walk dog', done: false },
    ];
    const result = toggleTodo(todos, 1);
    expect(result[1]).toEqual({ id: 2, text: 'Walk dog', done: false });
  });
});

describe('deleteTodo', () => {
  test('removes the matching todo', () => {
    const todos = [
      { id: 1, text: 'Buy milk', done: false },
      { id: 2, text: 'Walk dog', done: false },
    ];
    expect(deleteTodo(todos, 1)).toEqual([{ id: 2, text: 'Walk dog', done: false }]);
  });
});

describe('countRemaining', () => {
  test('counts todos that are not done', () => {
    const todos = [
      { id: 1, text: 'Buy milk', done: false },
      { id: 2, text: 'Walk dog', done: true },
    ];
    expect(countRemaining(todos)).toBe(1);
  });

  test('returns 0 for an empty list', () => {
    expect(countRemaining([])).toBe(0);
  });
});
