import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodosProvider } from './TodosContext.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </React.StrictMode>
);
