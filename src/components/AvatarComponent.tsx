import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, Typography } from '@mui/material';
import { RootState } from '@/globalRedux/store';

interface AvatarProps {
  sx?: any;
  children?: React.ReactNode;
  useSize?: string;
}


const AvatarComponent: React.FC<AvatarProps> = (props) => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { useSize } = props;

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
          src={`${serverURL}/${user?.avatar}`}
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