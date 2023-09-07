import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setMessageSnackBarState } from '../globalRedux/features/snackbar/messageSnackBarSlice';


const ResetPWForm: React.FC = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [sendSccess, setSendSuccess] = useState(false);
  const router = useRouter();

  const handleSendResetPasswordEmail = async () => {
    try {
      const data = {
        email,
      };

      const headers = {
        'Content-Type': 'multipart/form-data',
      }

      const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(`${serverURL}/api/resetpw`, data, { headers: headers });
      setSendSuccess(true);
      dispatch(setMessageSnackBarState({ message: 'Send Reset Password Email success' }));
    } catch (error) {
      dispatch(setMessageSnackBarState({ message: 'Send Reset Password Email failed' }));
    }
  };

  return (
    <div>
      <Typography variant="h4">Reset Password</Typography>
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
        <br />
        <Button variant="contained" color="primary" onClick={handleSendResetPasswordEmail} fullWidth disabled={sendSccess}>
          Send Reset Password Email
        </Button>
      </form>
    </div>
  );
};

export default ResetPWForm;