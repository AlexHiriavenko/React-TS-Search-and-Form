import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store.tsx';
// import ContextProvider from './components/Context/ContextProvider.tsx';
import App from './App.tsx';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    {/* <ContextProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ContextProvider> */}
  </ReduxProvider>
);
