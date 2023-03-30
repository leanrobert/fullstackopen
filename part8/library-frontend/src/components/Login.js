import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const Login = ({ setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('book-author-token', token)
    }
  }, [result.data]) //eslint-disable-line


  const handleSubmit = e => {
    e.preventDefault()

    login({ variables: { username, password }})

    setUsername('')
    setPassword('')
    setPage('authors')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        password <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login