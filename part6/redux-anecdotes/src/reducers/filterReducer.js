import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterData(state, action) {
      return state = action.payload
    }
  }
})

export const { filterData } = filterSlice.actions
export default filterSlice.reducer