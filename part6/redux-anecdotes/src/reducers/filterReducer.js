const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE':
      return state = action.payload
    default:
      return state
  }
}

export const filterData = data => {
  return {
    type: 'CHANGE',
    payload: data
  }
}

export default filterReducer