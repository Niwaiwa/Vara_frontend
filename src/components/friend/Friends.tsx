import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../globalRedux/store';


const Friends: React.FC = () => {

  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography variant="h6">Account Settings</Typography>
      <Box sx={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5' }}>

      </Box>
    </Box>
  );
};

export default Friends;