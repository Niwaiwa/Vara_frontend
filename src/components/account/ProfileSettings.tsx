import React, { useState } from 'react';
import { Avatar, Box, TextField, Typography, Button } from '@mui/material';

const ProfileSettings: React.FC = () => {

  const [description, setDescription] = useState<string>('');

  const handleUploadAvatar = () => {
    console.log('Avatar uploaded');
  };

  const handleUploadHeader = () => {
    console.log('Header uploaded');
  };

  const handleUploadDescription = () => {
    console.log('Description uploaded');
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
              <input type="file" />
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
              <input type="file" />
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