import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../globalRedux/store';


const FriendRequests: React.FC = () => {

  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography variant="h6">Friend Requests</Typography>
      <Box sx={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2">{`You don't have any friends`}</Typography>
      </Box>
    </Box>
  );
};

export default FriendRequests;