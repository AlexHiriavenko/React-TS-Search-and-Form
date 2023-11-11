import ReactDOM from 'react-dom/client';
import ContextProvider from './components/Context/ContextProvider.tsx';
import App from './App.tsx';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);
