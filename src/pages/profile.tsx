import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Paper, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Grid, } from '@mui/material';
import AvatarComponent from '../components/AvatarComponent';
import ContainerFluid from '../components/ContainerFluid';
import { RootState } from '@/globalRedux/store';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import PlayListIcon from '@mui/icons-material/PlaylistPlay';


const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <ContainerFluid>
        <Paper elevation={3}>
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 20,
                minHeight: 300,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${serverURL}/${user?.header})`
            }}>
            </Box>
            <Box sx={{ 
                backgroundColor: '#f0f0f0', 
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                paddingLeft: '15px',
                paddingRight: '15px',
                // borderRadius: '25px',
            }}>
                <AvatarComponent useSize="large" />
                <Box sx={{ 
                    marginTop: '15px',
                    marginBottom: '15px',
                    marginLeft: '15px',
                    paddingTop: 0,
                    paddingBottom: 0,
                    flex: 1,
                    alignItems: 'center!important',
                }}>
                    <Typography 
                        variant="h1"
                        color={'primary'}
                        fontSize={'2.2rem'}
                        fontWeight={700}
                        lineHeight={'2.2rem'}
                    >
                        {user?.nickname}
                    </Typography>
                    <Typography variant="subtitle1">@{user?.username}</Typography>
                </Box>
                <Box sx={{
                    width: '100%',
                    maxWidth: '360px',
                    paddingTop: '15px',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center!important',
                }}>
                    {/* <Typography variant="h6">0</Typography>
                    <Typography variant="subtitle1">Following</Typography>
                    <Typography variant="h6">0</Typography>
                    <Typography variant="subtitle1">Followers</Typography>
                    <Typography variant="h6">0</Typography>
                    <Typography variant="subtitle1">Videos</Typography> */}
                </Box>
            </Box>
        </Paper>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginRight: '-15px', marginLeft: '-15px' }}>
            <Grid 
                container
                sx={{ 
                    width: '100%',
                    position: 'relative',
                    paddingLeft: '15px',
                    paddingRight: '15px',
            }}>
                <Grid item sm={12} md={8} lg={9}>
                    <Box sx={{ marginTop: '15px' }}>
                        <Box 
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                marginRight: '-15px',
                                marginLeft: '-15px',
                            }}
                        >
                            <Grid sm={12} sx={{ textAlign: 'center', paddingTop: '8px', fontStyle: 'italic' }}>
                                <Typography variant="h6">{user?.description}</Typography>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item sm={12} md={4} lg={3}>
                    <Box sx={{
                        marginTop: '30px',
                        marginBottom: '30px',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 5px rgba(0,0,0,.1)',
                        backgroundColor: '#f0f0f0',
                    }}>
                        <List>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <Link href="/profile" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItemButton sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }}>
                                        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                                            <ProfileIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Profile'} sx={{ opacity: 1 }} />
                                    </ListItemButton>
                                </Link>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                                        <VideoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Video'} sx={{ opacity: 1 }} />
                                </ListItemButton>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                                        <PlayListIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'PlayList'} sx={{ opacity: 1 }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </ContainerFluid>
  );
};

export default ProfilePage;