import thunk from "redux-thunk";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { listingAPI } from "./rtkQuery";

const rtkstore = configureStore({
  reducer: {
    [listingAPI.reducerPath]: listingAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(listingAPI.middleware, thunk),
  // Other store configurations
});

export default rtkstore;
