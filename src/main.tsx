import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Test from './Test.tsx';

// Use Test to verify Three.js works, then switch back to App
const USE_TEST = false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {USE_TEST ? <Test /> : <App />}
  </StrictMode>,
);
