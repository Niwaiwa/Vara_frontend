import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../globalRedux/store';
import AvatarUser from '../AvatarUser';
import useSWRImmutable from 'swr/immutable';


const fetcherWithHeader = (url: string, token: string) => axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data);
const useFriendRequests = (token: string | null, userId: string) => {
    const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const url = `${serverURL}/api/users/${userId}/friends/requests`;
    const { data, error } = useSWRImmutable( 
      { url: url, token: token ? token : '' }, 
      key => fetcherWithHeader(key.url, key.token), 
      { revalidateOnMount: true },
    );
    return {
        friendRequests: data?.data,
        page: data?.page,
        count: data?.count,
        isLoading: !error && !data,
        isError: error,
    };
}


const FriendRequests: React.FC = () => {

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const token = useSelector((state: RootState) => state.auth.token);

  const userId: string = userInfo?.id ? userInfo.id : '';

  const { friendRequests, page, count, isLoading, isError } = useFriendRequests(token, userId);

  return (
    <Box>
      <Typography variant="h6">Friend Requests</Typography>
      <Box sx={{ marginTop: '15px' }}>
        {friendRequests?.length === 0 ?
          <Typography variant="body2">{`You don't have any friend requests`}</Typography>
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
            {friendRequests?.map((friendRequest: any) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                key={friendRequest.id}
                sx={{ 
                  paddingRight: '15px',
                  paddingLeft: '15px'
                }}
              >
                <AvatarUser friendUser={friendRequest} useType={'friendRequest'} />
              </Grid>
            ))}
          </Grid>
        }
      </Box>
    </Box>
  );
};

export default FriendRequests;