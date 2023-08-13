import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

interface AvatarProps {
  sx?: any;
  children?: React.ReactNode;
  useSize?: string;
  avatar?: string;
}


const AvatarComponent: React.FC<AvatarProps> = (props) => {
  const { useSize, avatar } = props;

  return (
    <Box sx={{ 
      maxWidth: '250px',
      minWidth: '200px',
      zIndex: 10,
      marginTop: 0,
      marginBottom: '15px',
      marginRight: '15px',
    }}>
      <div style={{
        minWidth: '200px',
        marginTop: 0,
        marginBottom: '15px',
        marginRight: '15px',
      }}>
        <Avatar 
          alt="Avatar" 
          src={avatar}
          sx={{ 
            position: 'absolute',
            width: useSize === 'large' ? '200px' : '32px', 
            height: useSize === 'large' ? '200px' : '32px',
            bottom: useSize === 'large' ? '15px' : '0px',
          }}
        />
      </div>
    </Box>
  );
};

export default AvatarComponent;