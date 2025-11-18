import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css'; // GANTI import './index.css'; menjadi ini
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();