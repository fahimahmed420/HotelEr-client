import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import AuthProvider from './context/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import { ThemeProvider } from './utils/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
