import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChakraProvider } from '@chakra-ui/react';
const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
