import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/';
import reportWebVitals from './reportWebVitals';

import './index.css'


//Функция, чтобы вставить наше приложение в root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
