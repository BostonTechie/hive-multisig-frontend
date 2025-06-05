import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { AuthProvider } from './auth/Context';
import SigNav from './components/navigating/SigNav';

import { persistor, store } from './redux/app/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    {' '}
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <div className="@container">
          <Router>
            <div className="fixed top-0 w-[100%]">
              <SigNav />
            </div>
            <App />
          </Router>
        </div>
      </AuthProvider>
    </PersistGate>
  </Provider>,
);
