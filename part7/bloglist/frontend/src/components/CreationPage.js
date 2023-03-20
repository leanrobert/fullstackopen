import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog';
import Blog from './Blog';

const CreationPage = ({ blogFormRef, createBlog, blogs, like, user, remove }) => {
  return (
    <div>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user?.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  )
}

export default CreationPage