import { useState } from "react"

const Blog = ({blog}) => {
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

  console.log(blog)
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div>
          {blog.url} <br />
          likes {blog.likes}<button>like</button> <br />
          {blog.user.name}
        </div>
      )}
    </div>
  )
}

export default Blog