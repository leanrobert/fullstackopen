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
      const user = await loginService({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
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

  return (
    <div>
      {user ? (
      <div>
        <h2>blogs</h2>
        <p>{`${user.name} logged in`} </p>
        <button onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Login username={username} password={password} setPassword={e => setPassword(e.target.value)} setUsername={e => setUsername(e.target.value)} handleLogin={handleLogin} />
        </div>
      )}
    </div>
  )   
}

export default App