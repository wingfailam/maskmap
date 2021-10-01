import "babel-polyfill";

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./configureStore";
import App from "./containers/App";

const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);
