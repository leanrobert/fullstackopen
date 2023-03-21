import { useState } from "react";
import { Button, TextField } from '@mui/material'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField 
        id="username" 
        label="Username" 
        variant="outlined" 
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField 
        id="password" 
        label="Password" 
        type="password"
        variant="outlined" 
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button variant="contained" sx={{ mt: 1 }} id="login-button" type="submit">Log in</Button>
    </form>
  );
};

export default LoginForm;
