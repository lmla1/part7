import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AnecdoteProvider } from './context/AnecdoteProvider'

createRoot(document.getElementById('root')).render(
  <AnecdoteProvider>
    <App />
  </AnecdoteProvider>
)
