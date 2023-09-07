import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../globalRedux/features/auth/authSlice';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setMessageSnackBarState } from '../globalRedux/features/snackbar/messageSnackBarSlice';


const RegisterForm: React.FC = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const registerData = {
        username,
        email,
        password,
      };

      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(`${serverURL}/api/users/register`, registerData, { headers: headers });

      const token = response.data.access_token;
      const userInfo = await getUserInfo(token);

      const payload = {
        isLoggedIn: true,
        token: token,
        userInfo: userInfo,
      }
      dispatch(login(payload));
      dispatch(setMessageSnackBarState({ message: 'Register success' }));
      router.push('/');
    } catch (error) {
      // console.error('Login failed:', error);
      dispatch(setMessageSnackBarState({ message: 'Register failed' }));
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
      dispatch(setMessageSnackBarState({ message: 'Get user info failed' }));
    }
  };

  return (
    <div>
      <Typography variant="h4">Register</Typography>
      <form>
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
        <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;