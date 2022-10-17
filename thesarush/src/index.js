import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import InputContextProvider from './context/InputContext.js';
import BoardContextProvider from './context/BoardContext.js';
import ColumnContextProvider from './context/ColumnContext.js';

const Root = () => {
  return (
    <BoardContextProvider>
      <ColumnContextProvider>
        <InputContextProvider>
           <BrowserRouter>
            <App />
          </BrowserRouter>
        </InputContextProvider>
      </ColumnContextProvider>
    </BoardContextProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
