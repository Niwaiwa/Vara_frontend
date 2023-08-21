import React from 'react';
import Link from 'next/link';
import { Avatar, Box, Typography, Button, Grid } from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PendingIcon from '@mui/icons-material/Pending';
import { useSelector } from 'react-redux';
import { RootState } from '../globalRedux/store';
import axios from 'axios';
import { setMessageSnackBarState } from '../globalRedux/features/snackbar/messageSnackBarSlice';
import { useDispatch } from 'react-redux';


interface AvatarProps {
  sx?: any;
  children?: React.ReactNode;
  friendUser?: any;
  useType?: string;
}


const AvatarUser: React.FC<AvatarProps> = (props) => {
  const { friendUser, useType } = props;
  const friendUserId = friendUser.id;
  const username = friendUser.username;
  const nickname = friendUser.nickname;
  const avatar = friendUser.avatar;
  const profileUrl = `/profile/${username}`;

  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const avatarUrl = avatar ? `${serverURL}/${avatar}` : '';

  const token = useSelector((state: RootState) => state.auth.token);
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  const currentUserId = currentUser?.id ? currentUser.id : '';

  const [notFriend, setNotFriend] = React.useState<boolean>(false);
  const [friendRequest, setFriendRequest] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const handleUnfriend = async () => {
    try{
      if (currentUserId === '' || friendUserId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends`;
      const requestData = {
        friend_user_id: friendUserId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.delete(url, { headers: header, data: requestData });
      setNotFriend(true);
      dispatch(setMessageSnackBarState({ message: 'Unfriend success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Unfriend failed' }));
    }
  }

  const handleAddFriend = async () => {
    try{
      if (currentUserId === '' || friendUserId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends`;
      const requestData = {
        friend_user_id: friendUserId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.post(url, requestData, { headers: header });
      setFriendRequest(true);
      dispatch(setMessageSnackBarState({ message: 'Add friend request success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Add friend request failed' }));
    }
  }

  const handleCancelFriendRequest = async () => {
    try{
      if (currentUserId === '' || friendUserId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends/requests/cancel`;
      const requestData = {
        friend_user_id: friendUserId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.post(url, requestData, { headers: header });
      setFriendRequest(false);
      dispatch(setMessageSnackBarState({ message: 'Cancel friend request success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Cancel friend request failed' }));
    }
  }

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      marginTop: '15px',
      marginBottom: '15px',
    }}>
      <Box
        sx={{
          display: 'flex',
          zIndex: 100,
          position: 'relative',
          maxWidth: '60px',
          minWidth: '60px',
          marginRight: '15px',
          minHeight: '60px',
          maxHeight: '60px',
        }}
      >
        <Link href={profileUrl} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <Avatar 
            alt="Avatar"
            src={avatarUrl}
            sx={{
              position: 'relative',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        </Link>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Link href={profileUrl} passHref style={{ textDecoration: 'none', color: 'inherit' }} title={nickname}>
          <div style={{ 
            fontWeight: 400,
            fontSize: '1rem',
            overflow: 'hidden',
            wordWrap: 'anywhere',
            display: '-webkit-box',
            '-webkit-line-clamp': '1',
            '-webkit-box-orient': 'vertical',
          }}>{nickname}</div>
        </Link>
        <div style={{ 
          fontSize: '0.75rem',
          overflow: 'hidden',
          wordWrap: 'anywhere',
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
        }}>@{username}</div>
      </Box>
      <Box>
        {useType === 'friends' ?
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={!notFriend ? <PersonOffIcon /> : !friendRequest ? <PersonAddIcon /> : <PendingIcon />}
            onClick={!notFriend ? handleUnfriend : !friendRequest ? handleAddFriend : handleCancelFriendRequest}
          >
            {!notFriend ? 'Unfriend' : !friendRequest ? 'Add friend' : 'Cancel request'}
          </Button>
        : useType === 'friendRequest' ?
        <>
          <Button variant="contained" color="primary" style={{ marginRight: '15px' }}>Accept</Button>
          <Button variant="contained" color="primary">Reject</Button>
        </>
        : null
        }
      </Box>
    </Box>
  );
};

export default AvatarUser;