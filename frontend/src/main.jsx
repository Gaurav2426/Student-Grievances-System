import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '16px',
              fontSize: '14px',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#0f172a',
              boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
            },
            success: {
              iconTheme: {
                primary: '#0f766e',
                secondary: '#ecfeff',
              },
            },
            error: {
              iconTheme: {
                primary: '#be123c',
                secondary: '#fff1f2',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
