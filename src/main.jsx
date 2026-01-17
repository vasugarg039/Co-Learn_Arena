import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SquadProvider } from './context/SquadContext';
import { isConfigValid } from './firebase';
import App from './App.jsx'
import './index.css'
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

const root = createRoot(document.getElementById('root'));

if (!isConfigValid) {
  root.render(
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      color: 'red'
    }}>
      Firebase configuration is missing or invalid. Please check your .env file.
    </div>
  );
} else {
  root.render(
    <StrictMode>
      <GlobalErrorBoundary>
        <SquadProvider>
          <App />
        </SquadProvider>
      </GlobalErrorBoundary>
    </StrictMode>
  );
}
