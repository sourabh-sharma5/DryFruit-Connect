// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  store  from './app/store.js'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'aos/dist/aos.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>
);
