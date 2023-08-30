import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemButton, ListItemText, Paper, 
  Grid, Typography, OutlinedInput, Select, MenuItem, Chip, Dialog, DialogTitle,
  DialogContent, FormControl, InputLabel, Input, Pagination, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { setMessageSnackBarState } from '../../globalRedux/features/snackbar/messageSnackBarSlice';
import { useDispatch } from 'react-redux';

// import SortOptions from './SortOptions'; // Profile設定用コンポーネント

const VideosPage: React.FC = () => {
  const dispatch = useDispatch();

  const [sort, setSort] = useState<string>('latest');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>(['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8']);
  const [searchTagUpperCaseList, setSearchTagUpperCaseList] = useState<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9']);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTagList, setModalTagList] = useState<string[]>([]);
  const [modalTagListPage, setModalTagListPage] = useState<number>(1);
  const [modalTagListTotalCount, setModalTagListTotalCount] = useState<number>(0);
  const [currentSelecttedSearchText, setCurrentSelecttedSearchText] = useState<string>('');
  const [isModalDataLoading, setIsModalDataLoading] = useState<boolean>(false);

  const handleSortChange = (sort: string) => {
      setSort(sort);
  };

  // const handleTagChange = (event: SelectChangeEvent<string[]> | any) => {
  //   setSelectedTags(event.target.value as string[]);
  // };

  const handleTagSelect = (tag: string) => {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      setSelectedTags([...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)]);
      return;
    }
    setSelectedTags([...selectedTags, tag]);
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

  // タグリストを取得
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

  return (
    <Paper elevation={0} sx={{ padding: '15px' }}>
      <Box sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Typography variant="h6">Videos</Typography>
            <Box sx={{ flexGrow: 1 }}>
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
                                  <ListItemButton selected={sort === 'latest'} onClick={() => handleSortChange('latest')}>
                                      <ListItemText primary="Latest" />
                                  </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                  <ListItemButton selected={sort === 'oldest'} onClick={() => handleSortChange('oldest')}>
                                      <ListItemText primary="Oldest" />
                                  </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                  <ListItemButton selected={sort === 'views'} onClick={() => handleSortChange('views')}>
                                      <ListItemText primary="Views" />
                                  </ListItemButton>
                              </ListItem>
                          </List>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
                        <Typography variant="h6">Tags Filter</Typography>
                        <Box sx={{ marginTop: '10px' }}>
                          {(selectedTags as string[]).map((tag) => (
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
                                          fontWeight: selectedTags.includes(tag.name) ? 'bold' : 'normal', 
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
                            {tagList.slice(0, 8).map((tag) => (
                              <Box 
                                key={tag} 
                                sx={{ 
                                  padding: '2px', 
                                  fontWeight: selectedTags.includes(tag) ? 'bold' : 'normal',
                                  cursor: 'pointer' }} 
                                onClick={() => handleTagSelect(tag)}
                              >
                                + {tag}
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