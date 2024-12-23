import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // Global styles
import 'katex/dist/katex.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
