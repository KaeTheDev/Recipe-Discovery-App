import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx';

createRoot(document.getElementById('root')!).render(
<FavoritesProvider>
<BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>,
 </BrowserRouter>
</FavoritesProvider>
)