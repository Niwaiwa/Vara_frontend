import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../globalRedux/store';
import { setUserInfo } from '../../globalRedux/features/auth/authSlice';
import { setMessageSnackBarState } from '../../globalRedux/features/snackbar/messageSnackBarSlice';


const ProfileSettings: React.FC = () => {

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const handleChangeAvatar = () => {
    const file = document.getElementById('avatar') as HTMLInputElement;
    if (file.files !== null) {
      if (file.files.length === 0) return;
      const reader = new FileReader();
      reader.readAsDataURL(file.files[0]);
      reader.onload = () => {
        setAvatarFile(file.files[0]);
      };
    }
  };

  const handleUploadAvatar = () => {
    if (avatarFile === null) return;
    sendUserUpdate({
      'avatar': avatarFile,
    });
  };

  const handleChangeHeader = () => {
    const file = document.getElementById('header') as HTMLInputElement;
    if (file.files !== null) {
      if (file.files.length === 0) return;
      const reader = new FileReader();
      reader.readAsDataURL(file.files[0]);
      reader.onload = () => {
        setHeaderFile(file.files[0]);
      };
    }
  };

  const handleUploadHeader = () => {
    if (headerFile === null) return;
    sendUserUpdate({
      'header': headerFile,
    });    
  };

  const handleUploadDescription = () => {
    sendUserUpdate({
      'description': description,
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
      <Typography variant="h6">Profile Settings</Typography>
      <Box sx={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexColumn: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body2">Avatar</Typography>
        </Box>
        <Box sx={{ marginTop: '15px' }}>
          <form>
            <div>
              <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleChangeAvatar} />
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button variant="contained" color="primary" onClick={handleUploadAvatar}>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Box>
      <Box sx={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexColumn: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body2">Header</Typography>
        </Box>
        <Box sx={{ marginTop: '15px' }}>
          <form>
            <div>
              <input type="file" id="header" name="header" accept="image/png, image/jpeg" onChange={handleChangeHeader} />
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button variant="contained" color="primary" onClick={handleUploadHeader}>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Box>
      <Box sx={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', flexColumn: 'column', justifyContent: 'space-between' }}>
          <Typography variant="body2">Description</Typography>
        </Box>
        <Box sx={{ marginTop: '15px' }}>
          <form>
            <div>
              <TextField 
                label="" 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                margin="normal" />
            </div>
            <div style={{ marginTop: '15px' }}>
              <Button variant="contained" color="primary" onClick={handleUploadDescription}>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSettings;