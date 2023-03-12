import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
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
      console.log('Wrong credentials', error);
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
        <p>{`${user.name} logged in`} </p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            title:
            <input type="text" name="Title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            author:
            <input type="text" name="Author" value={author} onChange={e => setAuthor(e.target.value)} />
          </div>
          <div>
            url:
            <input type="text" name="Url" value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Login user={username} pass={password} setPass={e => setPassword(e.target.value)} setUserN={e => setUsername(e.target.value)} handleLogin={handleLogin} />
        </div>
      )}
    </div>
  )   
}

export default App