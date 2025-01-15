// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// AOS import
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Provider } from 'react-redux';
import store from './redux/store';

AOS.init({
  duration: 1000, // durata animatiei in ms
  once: true,     // animatia sa nu se repete la scroll repetat
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
