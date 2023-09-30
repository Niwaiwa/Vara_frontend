import Link from 'next/link';
import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Paper, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Grid, Button} from '@mui/material';
import AvatarComponent from '../../components/AvatarComponent';
import ContainerFluid from '../../components/ContainerFluid';
import { RootState } from '@/globalRedux/store';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import PlayListIcon from '@mui/icons-material/PlaylistPlay';
import { GetStaticProps, GetStaticPaths } from 'next';
import useSWR from 'swr';


const fetcher = (url: string) => axios.get(url).then(res => res.data);
const fetcherWithHeader = (url: string, token: string) => axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data);
const useProfile = (token: string | null, username: string) => {
    const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const url = `${serverURL}/api/profile/${username}`;
    const key = { url: url, token: token ? token : ''}
    const { data, error } = useSWR(key, key => token ? fetcherWithHeader(key.url, key.token) : fetcher(key.url), { revalidateOnMount: true });
    return {
        profile: data,
        isLoading: !error && !data,
        isError: error,
    };
}

interface ProfileProps {
    username: string;
}

const ProfilePage: React.FC<ProfileProps> = (props) => {
    const username = props.username;

    const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const currentUser = useSelector((state: RootState) => state.auth.userInfo);
    const token: string | null = useSelector((state: RootState) => state.auth.token);

    const { profile, isLoading, isError } = useProfile(token, username);
    if (isLoading) {
        return <div>Loading...</div>
    } else if (isError) return <div></div>

    const user = profile;
    const avatar = user?.avatar ? `${serverURL}/${user?.avatar}` : '';
    const backgroundImageUrl = user?.header ? `${serverURL}/${user?.header}` : '';

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
                    backgroundImage: `url(${backgroundImageUrl})`,
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
                    <AvatarComponent useSize="large" avatar={avatar} />
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
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center!important',
                    }}>
                        { currentUser?.username !== username && 
                            <>
                                <Button 
                                    variant="outlined"
                                    {...(user?.is_following ? { disabled: true } : {})}
                                    sx={{ 
                                        whiteSpace: 'nowrap',
                                        width: '100%',
                                    }}
                                >
                                    {user?.is_following ? 'Following' : 'Follow'}
                                </Button>
                                <Box sx={{ marginLeft: '15px' }}>
                                    { user?.is_friend_request ?
                                        <Button 
                                            variant="outlined"
                                            sx={{ 
                                                whiteSpace: 'nowrap',
                                                width: '100%',
                                            }}
                                        >
                                            Cancel friend request
                                        </Button>
                                    :
                                        <Button 
                                            variant="outlined"
                                            {...(user?.is_friend ? { disabled: true } : {})}
                                            sx={{ 
                                                whiteSpace: 'nowrap',
                                                width: '100%',
                                            }}
                                        >
                                            {user?.is_friend ? 'Friends' : 'Add Friend'}
                                        </Button>
                                    }
                                </Box>
                                <Box sx={{ marginLeft: '15px', marginRight: '15px' }}>
                                    <Button 
                                        variant="outlined"
                                        sx={{ 
                                            whiteSpace: 'nowrap',
                                            width: '100%',
                                        }}
                                    >
                                        Message
                                    </Button>
                                </Box>
                            </>
                        }
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
                                <Grid item sm={12} sx={{ textAlign: 'center', paddingTop: '8px', fontStyle: 'italic' }}>
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
                                    <Link href={`/profile/${encodeURIComponent(username)}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
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

export const getStaticProps: GetStaticProps = async (context) => {
    const username = context.params?.username;
    return {
        props: {
            username,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { username: 'test' } },
        ],
        fallback: true,
    }
}


export default ProfilePage;

