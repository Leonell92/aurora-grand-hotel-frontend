import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Keep this for global styles
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* No <BrowserRouter> here - App.tsx handles routing */}
    <App />
  </React.StrictMode>
);