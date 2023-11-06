import React from 'react';
import { createRoot} from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./styles.css";

const el = document.getElementById("root");
const root = createRoot(el);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

