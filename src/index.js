import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/Store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/Stripe.js";
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js'
import { GlobalStyle } from "./globalStyles.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <GlobalStyle />
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register()