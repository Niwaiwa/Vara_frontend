import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Typography, Pagination } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import AvatarUser from '../AvatarUser';


const fetcher = (url: string) => axios.get(url).then(res => res.data);
const useFollowings = (userId: string | null, page: number | null) => {
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${serverURL}/api/users/${userId}/following`;
  const newUrl = page !== null && page !== undefined && page > 1 ? `${url}?page=${page}` : url;
  const { data, error } = useSWR( 
    !userId ? null : { url: newUrl },
    key => fetcher(key.url),
    { 
      revalidateOnFocus: false, 
      revalidateOnReconnect: false,
      refreshInterval: 0,
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
  const [followingPage, setFollowingPage] = useState(1);

  const { followingData, followingIsLoading, followingIsError } = useFollowings(userId, followingPage);
  const followings = followingData?.data ? followingData.data : [];
  const followingCount = followingData?.count ? followingData.count : 0;

  const handleFolloingPageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    setFollowingPage(value);
  }

  return (
    <Box>
      { followingIsError ?
      <Typography variant="body2">{`Error! Please try again.`}</Typography> 
      :
      followingIsLoading ?
      <CircularProgress />
      :
      followings?.length === 0 ?
      <Typography variant="body2">{`You don't have any followings.`}</Typography>
      :
      <>
        <Typography variant="h6">Followings</Typography>
        <Box sx={{ marginTop: '15px' }}>
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
                  key={data.username}
                  sx={{ 
                    paddingRight: '15px',
                    paddingLeft: '15px'
                  }}
                >
                  <AvatarUser user={data} />
                </Grid>
              ))}
            </Grid>
        </Box>
        <Box display={'flex'} justifyContent={'center'} sx={{ marginTop: '10px' }}>
            {followingCount <= 30 ? null :
              <Pagination 
                count={Math.ceil(followingCount / 30)} 
                defaultPage={1}
                page={followingPage} 
                onChange={(e, page) => handleFolloingPageChange(e, page)}
              />
            }
          </Box>
      </>
      }
    </Box>
  );
};

export default Followings;