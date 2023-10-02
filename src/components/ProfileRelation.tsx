import React, { useState } from 'react';
import { Box, Button } from '@mui/material';


interface ProfileRelationProps {
  currentUser?: any;
  username?: string;
  user?: any;
}


const ProfileRelation: React.FC<ProfileRelationProps> = ({ currentUser, username, user }) => {

  const [isDisplayCancelFriendRequestButton, setIsDisplayCancelFriendRequestButton] = useState<boolean>(false);
  const [isDisplayUnfollowButton, setIsDisplayUnfollowButton] = useState<boolean>(false);
  const [isDisplayUnFriendButton, setIsDisplayUnFriendButton] = useState<boolean>(false);

  const handleDisplayCancelFriendRequestButton = () => {
    setIsDisplayCancelFriendRequestButton(!isDisplayCancelFriendRequestButton);
  };

  const handleDisplayUnFriendButton = () => {
      setIsDisplayUnFriendButton(!isDisplayUnFriendButton);
  };

  const handleDisplayUnfollowButton = () => {
      setIsDisplayUnfollowButton(!isDisplayUnfollowButton);
  };

  const handleCancelFriendRequest = () => {
      console.log('cancel friend request');
  };

  const handleUnFriend = () => {
      console.log('unfriend');
  };

  const handleAddFriend = () => {
      console.log('add friend');
  };

  const handleFollowUser = () => {
      console.log('follow user');
  };

  const handleUnFollowUser = () => {
      console.log('unfollow user');
  };

  return (
      <>
        { currentUser?.username !== username && 
          <>
              { user?.is_following ?
                  <Button 
                      variant="outlined"
                      // {...(user?.is_following ? { disabled: true } : {})}
                      sx={{ 
                          whiteSpace: 'nowrap',
                          width: '100%',
                          textTransform: 'none',
                      }}
                      onClick={handleUnFollowUser}
                      onMouseOver={handleDisplayUnfollowButton}
                      onMouseOut={handleDisplayUnfollowButton}
                  >
                      {isDisplayUnfollowButton ? 'Unfollow' : 'Following'}
                  </Button>
              :
                  <Button 
                      variant="outlined"
                      // {...(user?.is_following ? { disabled: true } : {})}
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
              
              <Box sx={{ marginLeft: '10px' }}>
                  { user?.is_friend_request ?
                      <Button 
                          variant="outlined"
                          sx={{ 
                              whiteSpace: 'nowrap',
                              width: '100%',
                              textTransform: 'none',
                          }}
                          onClick={handleCancelFriendRequest}
                          onMouseOver={handleDisplayCancelFriendRequestButton}
                          onMouseOut={handleDisplayCancelFriendRequestButton}
                      >
                          {isDisplayCancelFriendRequestButton ? 'Cancel friend request' : 'Friend requesting'}
                      </Button>
                  : user?.is_friend ?
                      <Button 
                          variant="outlined"
                          // {...(user?.is_friend ? { disabled: true } : {})}
                          sx={{ 
                              whiteSpace: 'nowrap',
                              width: '100%',
                              textTransform: 'none',
                          }}
                          onClick={isDisplayUnFriendButton ? handleUnFriend : () => {}}
                          onMouseOver={handleDisplayUnFriendButton}
                          onMouseOut={handleDisplayUnFriendButton}
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
              <Box sx={{ marginLeft: '10px', marginRight: '10px' }}>
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