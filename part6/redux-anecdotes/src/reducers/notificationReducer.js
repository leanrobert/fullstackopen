import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificate(state, action) {
      return state = action.payload
    },
    reset(state, action) {
      return state = ''
    }
  }
})

export const { notificate, reset } = notificationSlice.actions
export default notificationSlice.reducer