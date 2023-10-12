import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import AvatarUser from './AvatarUser';


const fetcher = (url: string) => axios.get(url).then(res => res.data);
const useFollowings = (userId: string | null) => {
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${serverURL}/api/users/${userId}/following`;
  const { data, error } = useSWR( 
    !userId ? null : { url: url },
    key => fetcher(key.url),
    { 
      revalidateOnFocus: false, 
      revalidateOnReconnect: false,
      // refreshInterval: 0,
    }
  );
  return {
    followingData: data,
    followingIsLoading: !error && !data,
    followingIsError: error,
  };
}

interface FollowingsProps {
  userId?: string;
}


const Followings: React.FC<FollowingsProps> = (props) => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  const userId = props.userId ? props.userId : '';
  // const username = props.username ? props.username : '';

  const { followingData, followingIsLoading, followingIsError } = useFollowings(userId);
  const followingCount = followingData?.count ? followingData.count : 0;

  const followings = followingData?.data ? followingData.data : [];
  const [followingsPage, setFollowerPage] = useState(1);
  const [followingsCount, setFollowingCount] = useState(0);

  return (
    <Box>
      <Typography variant="h6">Followings</Typography>
      <Box sx={{ marginTop: '15px' }}>
        { followingIsError ?
          <Typography variant="body2">{`Error! Please try again.`}</Typography> 
          :
          followings?.length === 0 ?
          <Typography variant="body2">{`You don't have any followings.`}</Typography>
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
            {followings?.map((data: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={data.id}
                sx={{ 
                  paddingRight: '15px',
                  paddingLeft: '15px'
                }}
              >
                <AvatarUser user={data} />
              </Grid>
            ))}
          </Grid>
        }
      </Box>
    </Box>
  );
};

export default Followings;