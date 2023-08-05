import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../globalRedux/features/auth/authSlice';
import { TextField, Button, Typography } from '@mui/material';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form>
        <div>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
      <Typography variant="body2">
        <Link href="resetpw" passHref>Forgot your password?</Link>
      </Typography>
    </div>
  );
};

export default LoginForm;