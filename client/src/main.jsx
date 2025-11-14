import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Enquiry from './Enquiry.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Enquiry />
  </StrictMode>,
)
