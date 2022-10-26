import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import posts from "../modules/postsSlice";
import post from "../modules/postSlice"


const store = configureStore({
  reducer: { posts: posts, post: post },
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
