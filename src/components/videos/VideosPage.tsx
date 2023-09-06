import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Paper, 
  Grid, Typography, Chip, Dialog, DialogTitle, DialogContent, FormControl, 
  Input, Pagination, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { setMessageSnackBarState } from '../../globalRedux/features/snackbar/messageSnackBarSlice';
import { useDispatch } from 'react-redux';
import useSWRImmutable from 'swr/immutable';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import AvatarUser from '../AvatarUser';
import Link from 'next/link';
import { getDuration } from '../../helpers';


const fetcherWithHeader = (url: string) => axios.get(url).then(res => res.data);
const useVideosRequests = (url: string) => {
    const { data, error } = useSWR( 
      { url: url }, 
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

const useTagsRequests = (url: string) => {
  const { data, error } = useSWR( 
    { url: url }, 
    key => fetcherWithHeader(key.url), 
    { revalidateOnFocus: false, 
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );
  return {
      tagData: data?.data,
      isLoading: !error && !data,
      isError: error,
  };
}


const VideosPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const videosUrl = `${serverURL}/api/videos`;
  const tagsUrl = `${serverURL}/api/tags`;
  const searchParams = useSearchParams();

  const urlWithParam = searchParams ? `${videosUrl}?${searchParams.toString()}` : videosUrl;

  const pageParam = searchParams?.get('page') || null
  const sortParam = searchParams?.get('sort') || null
  const tagsParam = searchParams?.getAll('tag') || []
  const ratingParam = searchParams?.get('rating') || null

  const { videoData, videoPage, videoCount, isLoading, isError } = useVideosRequests(urlWithParam);
  const { tagData, isLoading: isTagLoading, isError: isTagError } = useTagsRequests(tagsUrl);

  const searchTagUpperCaseList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9'];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTagList, setModalTagList] = useState<string[]>([]);
  const [modalTagListPage, setModalTagListPage] = useState<number>(1);
  const [modalTagListTotalCount, setModalTagListTotalCount] = useState<number>(0);
  const [currentSelecttedSearchText, setCurrentSelecttedSearchText] = useState<string>('');
  const [isModalDataLoading, setIsModalDataLoading] = useState<boolean>(false);

  const handleTagSelect = (tag: string) => {
    const index = tagsParam.indexOf(tag);
    if (index > -1) {
      const newTags = [...tagsParam.slice(0, index), ...tagsParam.slice(index + 1)];
      handleVideosTagChange(newTags);
      return;
    }
    const newTags = [...tagsParam, tag];
    handleModalClose();
    handleVideosTagChange(newTags);
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
    getTagListRequest('');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // setModalTagListPage(1);
  };

  const handleModalListPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getTagListRequest(currentSelecttedSearchText, value);
  }

  const getTagListRequest = async (text: string, page: number = 1) => {
    try {
      setIsModalDataLoading(true);
      const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const lowerCaseText = text.toLowerCase();
      const url = `${serverURL}/api/tags?keyword=${lowerCaseText}&page=${page}`;
      const response = await axios.get(url);
      setModalTagListTotalCount(response.data.count);
      setModalTagList(response.data.data);
      setModalTagListPage(page);
      setCurrentSelecttedSearchText(text);
      setIsModalDataLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(setMessageSnackBarState({ message: 'Get tag list failed' }));
      setIsModalDataLoading(false);
    }
  }

  const handleVideosSortChange = (sort: string) => {
    const newParams = new URLSearchParams();
    newParams.append('sort', sort);
    if (tagsParam) tagsParam.forEach(tag => newParams.append('tag', tag));
    if (ratingParam) newParams.append('rating', ratingParam);
    if (pageParam) newParams.append('page', pageParam.toString());
    const path = newParams.toString() === '' ? '/videos' : `/videos?${newParams.toString()}`;
    router.push(path);
  }

  const handleVideosPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams();
    if (sortParam) newParams.append('sort', sortParam);
    if (tagsParam) tagsParam.forEach(tag => newParams.append('tag', tag));
    if (ratingParam) newParams.append('rating', ratingParam);
    newParams.append('page', value.toString());
    const path = newParams.toString() === '' ? '/videos' : `/videos?${newParams.toString()}`;
    router.push(path);
  }

  const handleVideosTagChange = (newTags: string[] = []) => {
    const newParams = new URLSearchParams();
    if (sortParam) newParams.append('sort', sortParam);
    if (newTags) newTags.forEach(tag => newParams.append('tag', tag));
    if (ratingParam) newParams.append('rating', ratingParam);
    if (pageParam) newParams.append('page', pageParam.toString());
    const path = newParams.toString() === '' ? '/videos' : `/videos?${newParams.toString()}`;
    router.push(path);
  }

  return (
    <Paper elevation={0} sx={{ padding: '15px' }}>
      <Box sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={9} sx={{ paddingRight: '15px', paddingLeft: '15px' }}>
            <Box sx={{ paddingRight: '15px', paddingLeft: '15px' }}>
              <Typography variant="h5">Videos</Typography>
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
                        <Box 
                          component="img"
                          sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', width: '100%' }} 
                          onClick={() => router.push(`/videos/${video.id}`)}  
                          alt={video.title}
                          src={video.thumbnail ? video.thumbnail : '/video_default_thumb.png'}
                        />
                        <Link href={`/videos/${video.id}`} title={video.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Box sx={{ marginTop: '5px', fontWeight: '700' }}>
                            {video.title}
                          </Box>
                        </Link>
                        <Box sx={{ marginTop: '5px' }}>
                          <AvatarUser 
                            user={video.user}
                            useUsername={false}
                            useLayerMarginTopBottom={false}
                            smallAvatar={true}
                            fontSize={0.7}
                            contentCreatedAt={getDuration((new Date(video.created_at)).getTime())}
                          />
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
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Box sx={{ flexGrow: 2 }}>
                {/* <SortOptions /> */}
                <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
                    <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
                        <Typography variant="h6">Sort by</Typography>
                        <Box sx={{ marginTop: '10px' }}>
                          <List>
                              <ListItem disablePadding>
                                  <ListItemButton selected={sortParam === 'latest' || sortParam === null} onClick={() => handleVideosSortChange('latest')} >
                                      <ListItemText primary="Latest" />
                                  </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                  <ListItemButton selected={sortParam === 'oldest'} onClick={() => handleVideosSortChange('oldest')} >
                                      <ListItemText primary="Oldest" />
                                  </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                  <ListItemButton selected={sortParam === 'views'} onClick={() => handleVideosSortChange('views')} >
                                      <ListItemText primary="Views" />
                                  </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                  <ListItemButton selected={sortParam === 'likes'} onClick={() => handleVideosSortChange('likes')} >
                                      <ListItemText primary="Likes" />
                                  </ListItemButton>
                              </ListItem>
                          </List>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
                        <Typography variant="h6">Tags Filter</Typography>
                        <Box sx={{ marginTop: '10px' }}>
                          {(tagsParam as string[]).map((tag) => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              color='primary'
                              sx={{ 
                                marginRight: '5px', 
                                marginTop: '5px',
                                height: 'auto',
                                borderRadius: '5px',
                                padding: '2px',
                              }}
                              onClick={() => handleTagSelect(tag)}
                            />
                          ))}
                          <FormControl sx={{ marginTop: '5px' }} variant="outlined" size="small" >
                            <Input 
                              placeholder="Select tags"
                              disableUnderline
                              disabled
                              sx={{
                                maxWidth: '100%',
                                minWidth: '150px',
                              }}
                            />
                          </FormControl>
                          <Box sx={{ marginTop: '5px', marginBottom: '10px' }}>
                            <Box sx={{ padding: '2px', cursor: 'pointer' }} onClick={handleModalOpen}>
                              + View all tags
                            </Box>
                          </Box>
                        </Box>
                        {/* 全タグリストを表示するモーダル */}
                        <Dialog 
                          open={isModalOpen} 
                          onClose={handleModalClose}
                        >
                          <DialogTitle>All Tags</DialogTitle>
                          <DialogContent>
                            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} sx={{ padding: '2px' }}>
                              {searchTagUpperCaseList.map((searchTag) => (
                                <div key={searchTag} style={{ marginRight: '7.5px', marginBottom: '7.5px' }}>
                                  <Button 
                                    variant={searchTag === currentSelecttedSearchText ? 'contained' : 'outlined'}
                                    sx={{ minWidth: '32px', padding: '9.6px', textTransform: 'none', fontSize: '16px' }}
                                    onClick={() => getTagListRequest(searchTag)}>
                                    {searchTag}
                                  </Button>
                                </div>
                              ))}
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                              {isModalDataLoading ? <CircularProgress /> :
                                <Grid container>
                                  {modalTagList.map((tag) => (
                                    <Grid key={tag.name} item xs={12} sm={6} md={4} lg={4}>
                                      <Box 
                                        key={tag.name}
                                        sx={{ 
                                          padding: '2px', 
                                          fontWeight: tagsParam.includes(tag.name) ? 'bold' : 'normal', 
                                          cursor: 'pointer' 
                                        }} 
                                        onClick={() => handleTagSelect(tag.name)}>
                                        + {tag.name}
                                      </Box>
                                    </Grid>
                                  ))}
                                </Grid>
                              }
                            </Box>
                            <Box display={'flex'} justifyContent={'center'} sx={{ marginTop: '10px' }}>
                              {modalTagListTotalCount <= 30 ? null :
                                <Pagination 
                                  count={Math.ceil(modalTagListTotalCount / 30)} 
                                  defaultPage={1}
                                  page={modalTagListPage} 
                                  onChange={(e, page) => handleModalListPageChange(e, page)}
                                />
                              }
                            </Box>
                          </DialogContent>
                        </Dialog>
                        {/* 常用タグ */}
                        <Box sx={{ marginTop: 1 }}>
                            {isTagError ? <Typography variant="body2">{`Error! Please try again.`}</Typography> :
                              isTagLoading ? <CircularProgress /> :
                              tagData?.slice(0, 8).map((tag) => (
                                <Box 
                                  key={tag.id} 
                                  sx={{ 
                                    padding: '2px', 
                                    fontWeight: tagsParam.includes(tag.name) ? 'bold' : 'normal',
                                    cursor: 'pointer' }} 
                                  onClick={() => handleTagSelect(tag.name)}
                                >
                                  + {tag.name}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
                
                </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default VideosPage;