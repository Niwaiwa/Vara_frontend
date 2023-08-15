import React, { useState } from 'react';
import { TextField, Typography, Box, Button } from '@mui/material';

const AccountSettings: React.FC = () => {

  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUploadNickname = () => {
    console.log('Nickname uploaded');
  };

  const handleUploadPassword = () => {
    console.log('Password uploaded');
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