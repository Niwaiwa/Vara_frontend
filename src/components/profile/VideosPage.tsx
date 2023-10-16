import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Paper, 
  Grid, Typography, Chip, Dialog, DialogTitle, DialogContent, FormControl, 
  Input, Pagination, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { setMessageSnackBarState } from '../../globalRedux/features/snackbar/messageSnackBarSlice';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getDuration } from '../../helpers';
import { RootState } from '../../globalRedux/store';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';


const fetcherWithHeader = (url: string) => axios.get(url).then(res => res.data);
const useVideosRequests = (url: string, userId: string, searchParams: string) => {
    const userVideoUrl = `${url}?user=${userId}`;
    const newUrl = searchParams === '' ? userVideoUrl : `${userVideoUrl}&${searchParams}`;
    const { data, error } = useSWR( 
      { url: newUrl }, 
      key => fetcherWithHeader(key.url), 
      { revalidateOnFocus: false, 
        revalidateOnReconnect: false,
        refreshInterval: 0,
      }
    );
    return {
        videoData: data?.data,
        videoPage: data?.page,
        videoCount: data?.count,
        isLoading: !error && !data,
        isError: error,
    };
}

interface VideosPageProps {
  userId?: string;
  username?: string | null;
}

const VideosPage: React.FC<VideosPageProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const userId = props.userId ? props.userId : '';
  const username = props.username ? props.username : '';
  const videoThumbnailsPath = 'media/videos/thumbnails/';
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const videosUrl = `${serverURL}/api/videos`;
  const searchParams = useSearchParams();
  
  const pageParam = searchParams?.get('page') || null
  const sortParam = searchParams?.get('sort') || null

  const newSearchParams = new URLSearchParams(searchParams?.toString() || '');

  const { videoData, videoPage, videoCount, isLoading, isError } = useVideosRequests(videosUrl, userId, newSearchParams.toString());

  const handleVideosSortChange = (sort: string) => {
    const newParams = new URLSearchParams();
    newParams.append('sort', sort);
    newParams.append('page', '1');
    const path = newParams.toString() === '' ? `/profile/${username}/videos` : `/profile/${username}/videos?${newParams.toString()}`;
    router.push(path);
  }

  const handleVideosPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams();
    if (sortParam) newParams.append('sort', sortParam);
    newParams.append('page', value.toString());
    const path = newParams.toString() === '' ? `/profile/${username}/videos` : `/profile/${username}/videos?${newParams.toString()}`;
    router.push(path);
  }

  return (
    <Paper elevation={0} sx={{ padding: '15px' }}>
      <Box sx={{ paddingRight: '15px', paddingLeft: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5">Videos</Typography>
        </Box>
        <Box sx={{ marginRight: '15px' }}>
          <IconButton
            aria-label="sort by"
            color="inherit"
            onClick={(e) => handleVideosSortChange('latest')}
          >
            <AccessTimeFilledIcon />
          </IconButton>
          <IconButton
            aria-label="sort by"
            color="inherit"
            onClick={(e) => handleVideosSortChange('oldest')}
          >
            <HistoryIcon />
          </IconButton>
          <IconButton
            aria-label="sort by"
            color="inherit"
            onClick={(e) => handleVideosSortChange('views')}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            aria-label="sort by"
            color="inherit"
            onClick={(e) => handleVideosSortChange('likes')}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: '15px' }}>
        { isError ? <Typography variant="body2">{`Error! Please try again.`}</Typography> :
          isLoading ? <CircularProgress /> :
          videoData?.length === 0 ? <Typography variant="body2">{`No videos found`}</Typography> :
          <>
          <Grid container>
            {videoData?.map((video: any) => (
              <Grid key={video.id} item xs={6} sm={4} md={3} lg={3}>
                <Box sx={{ paddingRight: '15px', paddingLeft: '15px', marginBottom: '15px' }}>
                  <Link href={`/videos/${video.id}`} title={video.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box 
                      component="img"
                      sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', width: '100%' }} 
                      alt={video.title}
                      src={`${serverURL}/${videoThumbnailsPath}${video.id}/thumbnails_0.jpg`}
                      onError={(e) => e.currentTarget.src = '/video_default_thumb.png'}
                    />
                  </Link>
                  <Link href={`/videos/${video.id}`} title={video.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box sx={{ marginTop: '5px', fontWeight: '700' }}>
                      {video.title}
                    </Box>
                  </Link>
                  <Box sx={{ marginTop: '5px', fontSize: '0.8rem', color: '#606060' }}>
                    {getDuration((new Date(video.created_at)).getTime())}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box display={'flex'} justifyContent={'center'} sx={{ marginTop: '20px' }}>
            {videoCount <= 30 ? null :
              <Pagination 
                count={Math.ceil(videoCount / 30)} 
                defaultPage={1}
                page={videoPage}
                onChange={(e, page) => handleVideosPageChange(e, page)}
              />
            }
          </Box>
          </>
        }
      </Box>
    </Paper>
  );
};

export default VideosPage;