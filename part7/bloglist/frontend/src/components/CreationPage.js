import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, Typography } from '@mui/material';

const CreationPage = ({ blogFormRef, createBlog, blogs, like, user, remove }) => {
  return (
    <div>
      <Typography variant='h3'>Blogs</Typography>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Card key={blog.id} sx={{ border: '1px solid', m: '5px'}}>
            <CardActions>
              <Button component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CreationPage