import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import '../public/css/style.min.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>

  </React.StrictMode>
);
