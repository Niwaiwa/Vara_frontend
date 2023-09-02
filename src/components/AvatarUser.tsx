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
  user?: any | undefined;
  useNickname?: boolean | undefined;
  useUsername?: boolean | undefined;
  useCreatedAt?: boolean | undefined;
  sameFontSize?: boolean | undefined;
  useLayerMarginTopBottom?: boolean | undefined;
  smallAvatar?: boolean | undefined;
  contentCreatedAt?: string | undefined;
  fontSize?: number | undefined;
}


const AvatarUser: React.FC<AvatarProps> = (props) => {
  const { 
    user, 
    useNickname = true, 
    useUsername = true, 
    useCreatedAt = true,
    sameFontSize = false,
    useLayerMarginTopBottom = true,
    smallAvatar = false,
    fontSize = 1,
    useType = '', 
    contentCreatedAt,
  } = props;
  const userId = user.id;
  const username = user.username;
  const nickname = user.nickname;
  const avatar = user.avatar;

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
      if (currentUserId === '' || userId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends`;
      const requestData = {
        friend_user_id: userId,
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
      if (currentUserId === '' || userId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends`;
      const requestData = {
        friend_user_id: userId,
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
      if (currentUserId === '' || userId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends/requests/cancel`;
      const requestData = {
        friend_user_id: userId,
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
      if (currentUserId === '' || userId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends/requests/accept`;
      const requestData = {
        user_id: userId,
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
      if (currentUserId === '' || userId === '') return;

      const url = `${serverURL}/api/users/${currentUserId}/friends/requests/reject`;
      const requestData = {
        user_id: userId,
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
      marginTop: useLayerMarginTopBottom ? '15px' : '0px',
      marginBottom: useLayerMarginTopBottom ? '15px' : '0px',
    }}>
      <Box
        sx={{
          display: 'flex',
          zIndex: 100,
          position: 'relative',
          marginRight: '15px',
          maxWidth: smallAvatar ? '28px' : '60px',
          minWidth: smallAvatar ? '28px' : '60px',  
          minHeight: smallAvatar ? '28px' : '60px',
          maxHeight: smallAvatar ? '28px' : '60px',
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
      {!useNickname && !useUsername && !useCreatedAt ? null :
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {!useNickname ? null : 
        <Link href={profileUrl} passHref style={{ textDecoration: 'none', color: 'inherit' }} title={nickname}>
          <div style={{ 
            fontWeight: 400,
            fontSize: fontSize !== undefined ? '${fontSize}rem' : '1rem',
            overflow: 'hidden',
            wordWrap: 'anywhere',
            display: '-webkit-box',
            'WebkitLineClamp': '1',
            'WebkitBoxOrient': 'vertical',
          }}>{nickname}</div>
        </Link>
        }
        {!useUsername ? null :
        <div style={{ 
          fontSize: sameFontSize ? fontSize !== undefined ? '${fontSize}rem' : '1rem' : '0.75rem',
          overflow: 'hidden',
          wordWrap: 'anywhere',
          display: '-webkit-box',
          'WebkitLineClamp': '1',
          'WebkitBoxOrient': 'vertical',
        }}>@{username}</div>
        }
        {!useCreatedAt ? null :
        <div style={{ 
          fontSize: fontSize !== undefined ? '${fontSize}rem' : '1rem',
          overflow: 'hidden',
          wordWrap: 'anywhere',
          display: '-webkit-box',
          'WebkitLineClamp': '1',
          'WebkitBoxOrient': 'vertical',
        }}>{contentCreatedAt}</div>
        }
      </Box>
      }
      <Box>
        {useType === 'friends' ?
          <Box>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={!notFriend ? <PersonOffIcon /> : !friendRequest 
              ? <PersonAddIcon /> : <PendingIcon />}
            onClick={!notFriend ? handleUnfriend : !friendRequest ? handleAddFriend : handleCancelFriendRequest}
          >
            {!notFriend ? 'Unfriend' : !friendRequest ? 'Add friend' : 'Cancel request'}
          </Button>
          </Box>
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
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
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
            </Box>
        : null
        }
      </Box>
    </Box>
  );
};

export default AvatarUser;