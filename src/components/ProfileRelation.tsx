import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setMessageSnackBarState } from '../globalRedux/features/snackbar/messageSnackBarSlice';
import axios from 'axios';


interface ProfileRelationProps {
  currentUser?: any;
  username?: string | null;
  user?: any;
  token?: string | null;
}


const ProfileRelation: React.FC<ProfileRelationProps> = ({ currentUser, username, user, token }) => {

  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [userState, setUserState] = useState<any>(user);
  const [isDisplayCancelFriendRequestButton, setIsDisplayCancelFriendRequestButton] = useState<boolean>(false);
  const [isDisplayUnFriendButton, setIsDisplayUnFriendButton] = useState<boolean>(false);
  const [isDisplayUnfollowButton, setIsDisplayUnfollowButton] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleDisplayCancelFriendRequestButtonOnMouseOver = () => {
    setIsDisplayCancelFriendRequestButton(true);
  };

  const handleDisplayCancelFriendRequestButtonOnMouseOut = () => {
    setIsDisplayCancelFriendRequestButton(false);
  };

  const handleDisplayUnFriendButtonOnMouseOver = () => {
    setIsDisplayUnFriendButton(true);
  };

  const handleDisplayUnFriendButtonOnMouseOut = () => {
    setIsDisplayUnFriendButton(false);
  };

  const handleDisplayUnfollowButtonOnMouseOver = () => {
    setIsDisplayUnfollowButton(true);
  };

  const handleDisplayUnfollowButtonOnMouseOut = () => {
    setIsDisplayUnfollowButton(false);
  };

  const handleCancelFriendRequest = async () => {
    try{
      if (!currentUser) return;
      const currentUserId = currentUser.id;
      const userId = userState.id;

      const url = `${serverURL}/api/users/${currentUserId}/friends/requests/cancel`;
      const requestData = {
        friend_user_id: userId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.post(url, requestData, { headers: header });
      handleGetProfileUser(header);
      dispatch(setMessageSnackBarState({ message: 'Cancel friend request success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Cancel friend request failed' }));
    }
  };

  const handleUnFriend = async () => {
    try{
      if (!currentUser) return;
      const currentUserId = currentUser.id;
      const userId = userState.id;

      const url = `${serverURL}/api/users/${currentUserId}/friends`;
      const requestData = {
        friend_user_id: userId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.delete(url, { data: requestData, headers: header });
      handleGetProfileUser(header);
      dispatch(setMessageSnackBarState({ message: 'Unfriend success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Unfriend failed' }));
    }
  };

  const handleAddFriend = async () => {
    try{
      if (!currentUser) return;
      const currentUserId = currentUser.id;
      const userId = userState.id;

      const url = `${serverURL}/api/users/${currentUserId}/friends`;
      const requestData = {
        friend_user_id: userId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.post(url, requestData, { headers: header });
      handleGetProfileUser(header);
      dispatch(setMessageSnackBarState({ message: 'Add friend success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Add friend failed' }));
    }
  };

  const handleFollowUser = async () => {
    try{
      if (!currentUser) return;
      const userId = userState.id;

      const url = `${serverURL}/api/users/following`;
      const requestData = {
        following_user_id: userId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.post(url, requestData, { headers: header });
      handleGetProfileUser(header);
      dispatch(setMessageSnackBarState({ message: 'Follow user success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Follow user failed' }));
    }
  };

  const handleUnFollowUser = async () => {
    try{
      if (!currentUser) return;
      const userId = userState.id;

      const url = `${serverURL}/api/users/following`;
      const requestData = {
        following_user_id: userId,
      }

      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const response = await axios.delete(url, { data: requestData, headers: header });
      handleGetProfileUser(header);
      dispatch(setMessageSnackBarState({ message: 'Unfollow user success' }));
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Unfollow user failed' }));
    }
  };

  const handleGetProfileUser = async (header: any) => {
    try {
      const url = `${serverURL}/api/profile/${username}`;
      const response = await axios.get(url, { headers: header });
      setUserState(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <>
        { currentUser?.username !== username && 
          <>
              { userState?.is_following ?
                  <Button 
                      variant="outlined"
                      sx={{ 
                          whiteSpace: 'nowrap',
                          width: '100%',
                          textTransform: 'none',
                      }}
                      onClick={handleUnFollowUser}
                      onMouseOver={handleDisplayUnfollowButtonOnMouseOver}
                      onMouseOut={handleDisplayUnfollowButtonOnMouseOut}
                  >
                      {isDisplayUnfollowButton ? 'Unfollow' : 'Following'}
                  </Button>
              :
                  <Button 
                      variant="outlined"
                      sx={{ 
                          whiteSpace: 'nowrap',
                          width: '100%',
                          textTransform: 'none',
                      }}
                      onClick={handleFollowUser}
                  >
                      Follow
                  </Button>
              }
              
              <Box sx={{ marginLeft: '10px', marginRight: { xs: '10px', md: '0px' } }}>
                  { userState?.is_friend_request ?
                      <Button 
                          variant="outlined"
                          sx={{ 
                              whiteSpace: 'nowrap',
                              width: '100%',
                              textTransform: 'none',
                          }}
                          onClick={handleCancelFriendRequest}
                          onMouseOver={handleDisplayCancelFriendRequestButtonOnMouseOver}
                          onMouseOut={handleDisplayCancelFriendRequestButtonOnMouseOut}
                      >
                          {isDisplayCancelFriendRequestButton ? 'Cancel friend request' : 'Friend requesting'}
                      </Button>
                  : userState?.is_friend ?
                      <Button 
                          variant="outlined"
                          sx={{ 
                              whiteSpace: 'nowrap',
                              width: '100%',
                              textTransform: 'none',
                          }}
                          onClick={isDisplayUnFriendButton ? handleUnFriend : () => {}}
                          onMouseOver={handleDisplayUnFriendButtonOnMouseOver}
                          onMouseOut={handleDisplayUnFriendButtonOnMouseOut}
                      >
                          {isDisplayUnFriendButton ? 'Unfriend' : 'Friend'}
                      </Button>
                  :
                      <Button 
                          variant="outlined"
                          sx={{ 
                              whiteSpace: 'nowrap',
                              width: '100%',
                              textTransform: 'none',
                          }}
                          onClick={handleAddFriend}
                      >
                          Add Friend
                      </Button>
                  }
              </Box>
              <Box sx={{ marginLeft: { xs: '0px', md: '10px' }, marginRight: { xs: '0px', md: '10px' } }}>
                  <Button 
                      variant="outlined"
                      sx={{ 
                          whiteSpace: 'nowrap',
                          width: '100%',
                          textTransform: 'none',
                      }}
                  >
                      Message
                  </Button>
              </Box>
          </>
        }
      </>
  );
};

export default ProfileRelation;