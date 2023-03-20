import { configureStore } from "@reduxjs/toolkit";
import blogsReducers from "./reducers/blogsReducers";
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducers,
    notification: notificationReducer,
  }
});

export default store;
