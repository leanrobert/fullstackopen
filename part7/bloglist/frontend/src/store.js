import { configureStore } from "@reduxjs/toolkit";
import blogsReducers from "./reducers/blogsReducers";
import notificationReducer from './reducers/notificationReducer'
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducers,
    notification: notificationReducer,
    user: userReducer
  }
});

export default store;
