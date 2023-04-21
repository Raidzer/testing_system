import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div display="flex">
      <App />
    </div>
  </Provider>
);