import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { AuthProvider } from './Context/Context';

import { persistor, store } from './redux/app/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    {' '}
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </PersistGate>
  </Provider>,
);
