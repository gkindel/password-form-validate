import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PasswordForm from './PasswordForm.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordForm />
  </StrictMode>,
)
