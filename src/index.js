import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store, persistor } from './appStore/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
