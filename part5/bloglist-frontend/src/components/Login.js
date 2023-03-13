import React from 'react'
import PropTypes from 'prop-types'

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

Login.propType = {
  user: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUserN: PropTypes.func.isRequired,
  setPass: PropTypes.func.isRequired
}

export default Login