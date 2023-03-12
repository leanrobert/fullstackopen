import React from 'react'

const Login = ({ user, pass, handleLogin, setUserN, setPass }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={user} name="Username" onChange={setUserN} />
      </div>
      <div>
        password
        <input type="password" value={pass} name="Password" onChange={setPass} />
      </div>
      <button type="submit">log in</button>
    </form >
  )
}

export default Login