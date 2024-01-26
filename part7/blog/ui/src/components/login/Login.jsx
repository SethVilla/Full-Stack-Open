import React, { useState } from 'react'

export const Login = ({ onLogin }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('root')
  const [password, setPassword] = useState('salainen')
  const handleLogin = (event) => {
    event.preventDefault()
    onLogin({ username, password })
    console.log('logging in with', username, password)
  }
  return <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </>
}