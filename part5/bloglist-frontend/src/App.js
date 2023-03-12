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
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState("")
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleCreateBlog = async e => {
    e.preventDefault()

    try {
      await blogService.create({ title, author, url })
      setMessage(`A new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage('')
      }, 3000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log('Error creating blog', error);
      setTitle('')
      setAuthor('')
      setUrl('')
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
          <CreateBlog title={title} author={author} url={url} setA={e => setAuthor(e.target.value)} setT={e => setTitle(e.target.value)} setU={e => setUrl(e.target.value)} handleCreateBlog={handleCreateBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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