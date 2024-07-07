import thunk from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";

const middleware = [thunk]; // Define an array of middleware

const store = configureStore({
  reducer: themeSlice,
  middleware: middleware,
  // Other store configurations
});

export default store;
