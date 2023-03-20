import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificate(state, action) {
      return state = action.payload
    },
    reset(state, action) {
      return state = null
    }
  }
})

export const { notificate, reset } = notificationSlice.actions

export const setNotification = message => {
  return async dispatch => {
    dispatch(notificate(message))
    setTimeout(() => {
      dispatch(reset())
    }, 3000)
  }
}

export default notificationSlice.reducer