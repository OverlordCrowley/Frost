import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ModalContextProvider from "./store/ModalContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <ModalContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ModalContextProvider>
);

