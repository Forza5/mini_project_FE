import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
