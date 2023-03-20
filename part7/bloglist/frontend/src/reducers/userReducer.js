import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import storageService from '../services/storage'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    },
  }
})

export const { login, logout } = userSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password });
    storageService.saveUser(user);
    dispatch(login(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storageService.removeUser();
    dispatch(logout())
  }
}

export default userSlice.reducer