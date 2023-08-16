import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../globalRedux/store';
import { setUserInfo } from '../../globalRedux/features/auth/authSlice';
import { setMessageSnackBarState } from '../../globalRedux/features/snackbar/messageSnackBarSlice';


const AccountSettings: React.FC = () => {

  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const handleUploadNickname = () => {
    if (nickname === '') return;
    sendUserUpdate({
      'nickname': nickname,
    });
  };

  const handleUploadPassword = () => {
    if (password === '') return;
    sendUserUpdate({
      'password': password,
    });
  };

  const sendUserUpdate = async (data: object) => {
    try {
      let loginData = {...data};
      const header = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }

      const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.put(`${serverURL}/api/users/`, loginData, { headers: header });
      const userInfo = response.data;
      dispatch(setUserInfo(userInfo));
      dispatch(setMessageSnackBarState({ message: 'Update success' }));
    } catch (error) {
      dispatch(setMessageSnackBarState({ message: 'Update failed' }));
    }
  };

  return (
    <Box>
      <Typography variant="h6">Account Settings</Typography>
      <Box sx={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexColumn: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body2">Nickname</Typography>
        </Box>
        <Box sx={{ marginTop: '15px' }}>
          <form>
            <div>
              <TextField
                label="Nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button variant="contained" color="primary" onClick={handleUploadNickname}>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Box>
      <Box sx={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexColumn: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body2">Password</Typography>
        </Box>
        <Box sx={{ marginTop: '15px' }}>
          <form>
            <div>
              <TextField
                label="Password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button variant="contained" color="primary" onClick={handleUploadPassword}>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountSettings;