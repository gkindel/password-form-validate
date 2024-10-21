import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ValidatingForm from './module/ValidatingForm.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ValidatingForm />
  </StrictMode>,
);
