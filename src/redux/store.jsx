import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const middleware = [thunk]; // Define an array of middleware

const store = configureStore({
  reducer: reducer,
  middleware: middleware,
});

export default store;
