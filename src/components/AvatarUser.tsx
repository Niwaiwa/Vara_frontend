import React from 'react';
import Link from 'next/link';
import { Avatar, Box, Typography, Button, Grid } from '@mui/material';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from 'react-redux';
import { RootState } from '../globalRedux/store';
import axios from 'axios';
import { setMessageSnackBarState } from '../globalRedux/features/snackbar/messageSnackBarSlice';
import { useDispatch } from 'react-redux';


interface AvatarProps {
  sx?: any;
  children?: React.ReactNode;
  useType?: string;
  friendUser?: any | undefined;
  noNickname?: boolean | undefined;
  noUsername?: boolean | undefined;
}


const AvatarUser: React.FC<AvatarProps> = (props) => {
  const { 
    friendUser, 
    noNickname = true, 
    noUsername = true, 
    useType = '', 
  } = props;
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
  const [acceptedFriendRequest, setAcceptedFriendRequest] = React.useState<boolean>(false);
  const [rejectedFriendRequest, setRejectedFriendRequest] = React.useState<boolean>(false);

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

  const handleAcceptFriendRequest = async () => {
    try{
      if (currentUserId === '' || friendUserId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends/requests/accept`;
      const requestData = {
        user_id: friendUserId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.post(url, requestData, { headers: header });
      setAcceptedFriendRequest(true);
      dispatch(setMessageSnackBarState({ message: 'Accept friend request success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Accept friend request failed' }));
    }
  }

  const handleRejectFriendRequest = async () => {
    try{
      if (currentUserId === '' || friendUserId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends/requests/reject`;
      const requestData = {
        user_id: friendUserId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.post(url, requestData, { headers: header });
      setRejectedFriendRequest(true);
      dispatch(setMessageSnackBarState({ message: 'Reject friend request success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Reject friend request failed' }));
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
      {!noNickname && !noUsername ? null :
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {!noNickname ? null : 
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
        }
        {!noUsername ? null :
        <div style={{ 
          fontSize: '0.75rem',
          overflow: 'hidden',
          wordWrap: 'anywhere',
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
        }}>@{username}</div>
        }
      </Box>
      }
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
          acceptedFriendRequest ?
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
              disabled
            >
              Accepted
            </Button>
          : rejectedFriendRequest ?
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<ClearIcon />}
              disabled
            >
              Rejected
            </Button>
          :
            <>
              <Button
                variant="contained" 
                color="primary" 
                style={{ marginRight: '15px' }}
                startIcon={<CheckIcon />}
                onClick={handleAcceptFriendRequest}
              >
                Accept
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<ClearIcon />}
                onClick={handleRejectFriendRequest}
              >
                Reject
              </Button>
            </>
        : null
        }
      </Box>
    </Box>
  );
};

export default AvatarUser;