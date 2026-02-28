import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import App from './App.jsx'
import './index.css'

/**
 * Application Entry Point
 * This section initializes the React root element and mounts the application 
 * to the physical DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter is wrapped around the App to enable dynamic URL routing.
      This allows users to navigate between the search results and specific 
      movie detail pages without refreshing the browser.
    */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)