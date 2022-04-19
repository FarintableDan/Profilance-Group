import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth";
import newsReducer from "./news";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});
