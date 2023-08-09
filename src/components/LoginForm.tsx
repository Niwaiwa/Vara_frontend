import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../globalRedux/features/auth/authSlice';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';


interface CustomState extends SnackbarOrigin {
  open: boolean;
  message?: string;
}

const LoginForm: React.FC = () => {
  const [snackBarState, setSnackBarState] = useState<CustomState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open, message } = snackBarState;

  const dispatch = useDispatch();
  // const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // const handleLogin = () => {
  //   dispatch(login({ email, password }));
  // };

  const handleLogin = async () => {
    try {
      const loginData = {
        // email,
        username,
        password,
      };

      const loginHeader = {
        'Content-Type': 'multipart/form-data',
      }

      const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(`${serverURL}/api/users/login`, loginData, { headers: loginHeader });

      const token = response.data.access_token;
      const userInfo = await getUserInfo(token);

      const payload = {
        isLoggedIn: true,
        token: token,
        userInfo: userInfo,
      }
      dispatch(login(payload));
      setSnackBarState({ ...snackBarState, open: true, message: 'Login success' });
      router.push('/');
    } catch (error) {
      // console.error('Login failed:', error);
      setSnackBarState({ ...snackBarState, open: true, message: 'Login failed' });
    }
  };

  const getUserInfo = async ( token = null ) => {
    try {
      const header = {
        'Authorization': `Bearer ${token}`,
      }

      const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.get(`${serverURL}/api/users`, { headers: header });
      return response.data;
    } catch (error) {
      // console.error('Get user info failed:', error);
      setSnackBarState({ ...snackBarState, open: true, message: 'Get user info failed' });
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form>
        {/* <div>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </div> */}
        <div>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
      <Snackbar
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        autoHideDuration={3000}
        open={open}
        onClose={() => setSnackBarState({ ...snackBarState, open: false })}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default LoginForm;