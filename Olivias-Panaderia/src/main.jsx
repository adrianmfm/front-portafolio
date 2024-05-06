import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import App from './App';
// Utiliza createRoot en lugar de ReactDOM.render
const root = createRoot(document.getElementById('root'));

// Renderiza tu aplicación utilizando createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
