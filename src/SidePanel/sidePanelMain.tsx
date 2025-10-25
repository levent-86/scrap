import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './SidePanelApp.tsx';
import '../style.css';
import '@fontsource/public-sans';
import '@fontsource/exo';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
