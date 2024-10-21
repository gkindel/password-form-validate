import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PasswordForm from './module/PasswordForm.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <h3>{'<PasswordInput>'} component w/ validation</h3>
      <PasswordForm />
    </div>
    <div>
      <a href="./storybook/">Storybook</a>
    </div>
  </StrictMode>,
);
