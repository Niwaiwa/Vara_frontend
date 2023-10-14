import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Paper, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Grid, Button} from '@mui/material';
import AvatarComponent from '../../components/AvatarComponent';
import ContainerFluid from '../../components/ContainerFluid';
import ProfileRelation from '../../components/ProfileRelation';
import FollowInfo from '@/components/FollowInfo';
import Followers from '@/components/Followers';
import Followings from '@/components/Followings';
import { RootState } from '@/globalRedux/store';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import PlayListIcon from '@mui/icons-material/PlaylistPlay';
import { GetStaticProps, GetStaticPaths } from 'next';
import useSWR from 'swr';


const fetcher = (url: string) => axios.get(url).then(res => res.data);
const fetcherWithHeader = (url: string, token: string) => axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => res.data);
const useProfile = (token: string | null, username: string | null) => {
    const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const url = `${serverURL}/api/profile/${username}`;
    const key = { url: url, token: token ? token : ''}
    const { data, error } = useSWR(
        !username ? null : key,
        key => token ? fetcherWithHeader(key.url, key.token) : fetcher(key.url),
        { revalidateOnMount: true }
    );
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
    // const username = props.username;
    const currentUser = useSelector((state: RootState) => state.auth.userInfo);
    const token: string | null = useSelector((state: RootState) => state.auth.token);

    const router = useRouter();

    const pathParams: string[] | null = Array.isArray(router.query.username) ? router.query.username : null;
    const username: string | null = pathParams ? pathParams[0] : null;
    const secondParam: string | null = pathParams ? pathParams[1] : null;
    const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: { xs: 'center', sm: 'space-between' },
                    alignItems: { xs: 'center', sm: 'none' },
                    position: { xs: 'none', sm: 'relative'},
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    // borderRadius: '25px',
                    textAlign: { xs: 'center', sm: 'initial' },
                }}>
                    <AvatarComponent useSize="large" avatar={avatar} />
                    <Box sx={{ 
                        marginTop: '15px',
                        marginBottom: '15px',
                        marginLeft: { xs: '0px', sm: '15px' },
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
                        // width: '100%',
                        maxWidth: '360px',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center!important',
                        marginBottom: { xs: '15px', sm: '0px'}
                    }}>
                        { currentUser &&
                            <ProfileRelation currentUser={currentUser} username={username} user={user} token={token} />
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
                    <Grid item xs={12} sm={12} md={8} lg={9}>
                        <Box sx={{ marginTop: '15px' }}>
                            { secondParam === 'followers' ?
                            <Box sx={{ marginTop: '15px' }}>
                                <Followers userId={user?.id} />
                            </Box>
                            :
                            secondParam === 'followings' ?
                            <Box sx={{ marginTop: '15px' }}>
                                <Followings userId={user?.id} />
                            </Box>
                            :
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    marginRight: { xs: '0px', sm: '-15px' },
                                    marginLeft: { xs: '0px', sm: '-15px' },
                                }}
                            >
                                <Grid item sm={12} sx={{ textAlign: 'center', paddingTop: '8px', fontStyle: 'italic' }}>
                                    <Typography variant="h6">{user?.description}</Typography>
                                </Grid>
                            </Box>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3}>
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
                                    <Link 
                                        href={`/profile/${encodeURIComponent(username ? username : '')}`} 
                                        passHref 
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
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
                        <Box sx={{
                            marginTop: '30px',
                            marginBottom: '30px',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 5px rgba(0,0,0,.1)',
                            backgroundColor: '#f0f0f0',
                        }}>
                            <FollowInfo userId={user?.id} username={username} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ContainerFluid>
    );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//     const username = context.params?.username;
//     return {
//         props: {
//             username,
//         }
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [
//             { params: { username: 'test' } },
//         ],
//         fallback: true,
//     }
// }


export default ProfilePage;

