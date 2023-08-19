import React, { use } from 'react';
import Link from 'next/link';
import { Avatar, Box, Typography, Button } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


interface AvatarProps {
  sx?: any;
  children?: React.ReactNode;
  username?: string;
  nickname?: string;
  avatar?: string;
  useType?: string;
}


const AvatarUser: React.FC<AvatarProps> = (props) => {
  const { username, nickname, avatar, useType } = props;
  const profileUrl = `/profile/${username}`;

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    }}>
      <div style={{
        minWidth: '60px',
        minHeight: '60px',
        marginRight: '15px',
      }}>
        <Avatar 
          alt="Avatar"
          src={avatar}
          sx={{
            position: 'relative',
          }}
        />
      </div>
      <div style={{
        flex: 1,
      }}>
        <Link href={profileUrl} passHref style={{ textDecoration: 'none', color: 'inherit' }} title={nickname}>
          <Typography variant="h6">{nickname}</Typography>
        </Link>
        <Link href={profileUrl} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="subtitle1">{username}</Typography>
        </Link>
      </div>
      {useType === 'friend' ?
      <div>
        <Button variant="contained" color="primary" size="small" startIcon={<PersonRemoveIcon />}>Unfriend</Button>
      </div>
      : useType === 'friendRequest' ?
      <div>
        <Button variant="contained" color="primary" size="small">Accept</Button>
        <Button variant="contained" color="primary" size="small">Reject</Button>
      </div>
      : null
      }
    </Box>
  );
};

export default AvatarUser;