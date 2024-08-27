import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom';
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<NextUIProvider>

        <App />
      
</NextUIProvider>
  </BrowserRouter>,
)
