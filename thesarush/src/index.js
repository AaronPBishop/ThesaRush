import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import InputContextProvider from './context/InputContext';

import './index.css';
import App from './App';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <InputContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InputContextProvider>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
