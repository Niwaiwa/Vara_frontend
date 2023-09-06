import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography, Box, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../globalRedux/store';
import AvatarUser from '../AvatarUser';
import useSWRImmutable from 'swr/immutable';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { logout } from '../../globalRedux/features/auth/authSlice';
import { setMessageSnackBarState } from '../../globalRedux/features/snackbar/messageSnackBarSlice';
import { getDuration } from '../../helpers';

const fetcher = (url: string) => axios.get(url).then(res => res.data);
const fetcherWithHeader = (url: string, token: string) => axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data);
const useVideoDetailRequests = (videoId: string | null, token: string | null) => {
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${serverURL}/api/videos/${videoId}`;
  const { data, error } = useSWR( 
    !videoId ? null : { url: url, token: token ? token : '' },
    key => token ? fetcherWithHeader(key.url, key.token) : fetcher(key.url),
    { 
      revalidateOnFocus: false, 
      revalidateOnReconnect: false,
      // refreshInterval: 0,
    }
  );
  return {
      videoData: data,
      isLoading: !error && !data,
      isError: error,
  };
}

interface VideoDetailProps {
  videoId: string | undefined;
}


const VideoDetail: React.FC<VideoDetailProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const videoId = props.videoId ? props.videoId : '';
  const token = useSelector((state: RootState) => state.auth.token);
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { videoData, isLoading, isError } = useVideoDetailRequests(videoId, token);
  // console.log(isLoading, isError, videoData);

  return (
    <Paper elevation={0} sx={{ padding: '15px' }}>
      <Box sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={9} sx={{ paddingRight: '15px', paddingLeft: '15px' }}>
            { isError || !videoData ?
              <Typography variant="body2">{`Error! Please try again.`}</Typography> 
              :
              isLoading ?
              <Typography variant="body2">{`Loading...`}</Typography>
              :
              <Box>
                <video width="100%" height="auto" controls>
                  <source src={`${serverURL}/${videoData?.video_file}`} type="video/mp4"/>
                </video>
                <Typography variant="h6">{videoData?.title}</Typography>
                <Typography variant="body2">{getDuration((new Date(videoData?.created_at)).getTime())}</Typography>
                <Box sx={{ marginTop: '5px' }}>
                  <AvatarUser user={videoData.user}/>
                </Box>
                <Typography variant="body1">{videoData.description}</Typography>
              </Box>
            }
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>

          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default VideoDetail;