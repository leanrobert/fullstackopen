import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) =>  user)

  const logout = async () => {
    dispatch(logoutUser())
    dispatch(setNotification({ message: 'logged out', type: 'info' }))
  };


  return (
    <div style={{ backgroundColor: 'lightgray', padding: '4px'}}>
      <span>
        <Link to='/'>blogs</Link>{' '}
        <Link to='/users'>users</Link>{' '}
        {user.name} logged in {' '}
        <button onClick={logout}>logout</button>
      </span>
    </div>
  )
}

export default Menu