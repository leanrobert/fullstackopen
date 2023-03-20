import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/user'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    },
    remove(state, action) {
      return state.filter((u) => u.id !== action.payload.id)
    }
  }
})

export const { setUsers, appendUser, remove } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer