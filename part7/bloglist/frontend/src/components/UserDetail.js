import { Container, List, ListItem, Typography } from '@mui/material'
import React from 'react'

const UserDetail = ({ user }) => {
  if(!user) {
    return null
  }

  return (
    <Container>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant='h6'>Added blogs</Typography>
      <List>
        {user.blogs.map(blog => (
          <ListItem key={blog.id}>
            - {blog.title}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default UserDetail