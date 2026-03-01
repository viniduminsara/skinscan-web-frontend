import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import "./index.css";
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
