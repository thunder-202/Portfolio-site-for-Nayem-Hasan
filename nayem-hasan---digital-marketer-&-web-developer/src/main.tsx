import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept Vite development websocket disconnection noise
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason;
    const msg = (reason && (reason.message || String(reason))) || '';
    if (
      msg.includes('WebSocket closed') ||
      msg.includes('WebSocket') ||
      msg.includes('failed to connect to websocket') ||
      msg.includes('[vite]')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
