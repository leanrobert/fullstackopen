import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog';
import { Link } from 'react-router-dom';

const CreationPage = ({ blogFormRef, createBlog, blogs, like, user, remove }) => {
  const style = {
    border: "1px solid black",
    padding: "10px",
    margin: "2px"
  }

  return (
    <div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <div style={style} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreationPage