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
      marginTop: { xs: '-100px', sm: '0px' },
      marginBottom: { xs: '0px', sm: '15px' },
      marginRight: { xs: '0px', sm: '15px' },
    }}>
      <div style={{
      }}>
        <Avatar 
          alt="Avatar" 
          src={avatar}
          sx={{ 
            position: { xs: 'none', sm: 'absolute'},
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