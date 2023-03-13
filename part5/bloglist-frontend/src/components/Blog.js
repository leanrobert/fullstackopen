import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    margin: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }, blog.id)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <span className='title-author'>{blog.title} {blog.author}</span>
      <button onClick={toggleVisibility} className='button'>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          {blog.url} <br />
          likes {blog.likes}<button onClick={likeBlog}>like</button> <br />
          {blog.user.name} <br />
          <button onClick={deleteBlog}>remove</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog