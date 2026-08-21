import { makeAutoObservable } from 'mobx';
import { addTodo, toggleTodo, deleteTodo, countRemaining } from '../todoLogic.js';

let nextId = 1;

class TodoStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(text) {
    this.todos = addTodo(this.todos, text, nextId++);
  }

  toggle(id) {
    this.todos = toggleTodo(this.todos, id);
  }

  remove(id) {
    this.todos = deleteTodo(this.todos, id);
  }

  get remaining() {
    return countRemaining(this.todos);
  }
}

export const todoStore = new TodoStore();
