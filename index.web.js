import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Surface silent JS crashes as visible errors instead of a blank screen
window.onerror = (msg, src, line, col, err) => {
  document.getElementById('root').innerHTML =
    '<pre style="color:red;padding:20px">' + msg + '\n' + (err?.stack || '') + '</pre>';
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
