import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, {
  productsFetch,
} from "./Routes/User/slices/productsSlice";
import cartReducer, { getTotals } from "./Routes/User/slices/cartSlice";
import { productsApi } from "./Routes/User/slices/productsApi";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
