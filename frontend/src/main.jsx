import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import './styles/products.css'
import './styles/product.css'
import './styles/occasions.css'
import './styles/bestsellers.css'
import './styles/login.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
