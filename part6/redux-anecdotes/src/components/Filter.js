import React from 'react'
import { useDispatch } from 'react-redux'
import { filterData } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = e => {
    dispatch(filterData(e.target.value))
  }

  const style = {
    margin: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter