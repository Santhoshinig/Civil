import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
/**
 * Entry Point Styles
 * Moved to organized styles directory
 */
import './styles/index.css'
import App from './App.jsx'

/**
 * React Application Mounting
 * Bootstraps the application into the DOM #root element
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
