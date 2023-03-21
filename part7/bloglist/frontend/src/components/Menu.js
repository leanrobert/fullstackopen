import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
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
    <AppBar position='static' sx={{ mb: '15px'}}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display:'flex' }}>
            <Button
              onClick={() => {}}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link} 
              to='/'
            >
              Blogs
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display:'flex' }}>
            <Button
              onClick={() => {}}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link} 
              to='/users'
            >
              Users
            </Button>
          </Box>          
          <Typography variant='p'>{user.name} logged in</Typography>
          <Button variant='contained' color='error' style={{ marginLeft: "10px"}} onClick={logout}>logout</Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Menu