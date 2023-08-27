import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../globalRedux/store';
import AvatarUser from '../AvatarUser';
import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';
import { logout } from '../../globalRedux/features/auth/authSlice';


const fetcherWithHeader = (url: string, token: string) => axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data);
const useFriends = (token: string | null, userId: string) => {
    const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const url = `${serverURL}/api/users/${userId}/friends`;
    const { data, error } = useSWRImmutable( 
      { url: url, token: token ? token : '' }, 
      key => fetcherWithHeader(key.url, key.token), 
      { revalidateOnMount: true },
    );
    return {
        friends: data?.data,
        page: data?.page,
        count: data?.count,
        isLoading: !error && !data,
        isError: error,
    };
}


const Friends: React.FC = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const token = useSelector((state: RootState) => state.auth.token);

  const userId: string = userInfo?.id ? userInfo.id : '';

  const { friends, page, count, isLoading, isError } = useFriends(token, userId);
  if (isLoading) {
    return <div>Loading...</div>
  } else if (isError?.response.status === 403) {
    dispatch(logout());
    router.push('/login');
  }

  return (
    <Box>
      <Typography variant="h6">Friends</Typography>
      <Box sx={{ marginTop: '15px' }}>
        { isError ?
          <Typography variant="body2">{`Error! Please try again.`}</Typography> 
          :
          friends?.length === 0 ?
          <Typography variant="body2">{`You don't have any friends`}</Typography>
          :
          <Grid 
            container
            wrap={'wrap'}
            sx={{
              marginRight: '-15px',
              marginLeft: '-15px',
              backgroundColor: '#f5f5f5',
            }}
          >
            {friends?.map((friend: any) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                key={friend.id}
                sx={{ 
                  paddingRight: '15px',
                  paddingLeft: '15px'
                }}
              >
                <AvatarUser friendUser={friend} useType={'friends'} />
              </Grid>
            ))}
          </Grid>
        }
      </Box>
    </Box>
  );
};

export default Friends;