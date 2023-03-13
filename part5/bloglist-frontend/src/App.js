import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserjson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserjson) {
      const user = JSON.parse(loggedUserjson)
      setUser(user)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage('')
      }, 3000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const handleCreateBlog = async blogObj => {
    try {
      await blogService.create(blogObj)
      setMessage(`A new blog ${blogObj.title} by ${blogObj.author} added`)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (error) {
      console.log('Error creating blog', error);
    }
  }

  const handleLike = async (blog, id) => {
    try {
      await blogService.update(blog, id)
    } catch (error) {
      console.log('Error updating likes', error);
    }
  }

  return (
    <div>
      {user ? (
      <div>
        <h2>blogs</h2>
        {message && <p style={{ backgroundColor: "lightgray", color: "green", border: "1px solid green" }}>{message}</p>}
        <p>{`${user.name} logged in`} </p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <Togglable buttonLabel='create a blog'>
          <CreateBlog createBlog={handleCreateBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={handleLike} />
        )}
      </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          {message && <p style={{ backgroundColor: "lightgray", color: "red", border: "1px solid red" }}>{message}</p>}
          <Login user={username} pass={password} setPass={e => setPassword(e.target.value)} setUserN={e => setUsername(e.target.value)} handleLogin={handleLogin} />
        </div>
      )}
    </div>
  )
}

export default App