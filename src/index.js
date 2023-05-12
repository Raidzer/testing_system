import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

const store = createStore();

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU,
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div display="flex">
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </div>
  </Provider>
);