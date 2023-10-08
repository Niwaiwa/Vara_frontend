import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import ProfileIcon from '@mui/icons-material/AccountCircle';


const fetcher = (url: string) => axios.get(url).then(res => res.data);
const useFollowers = (userId: string | null) => {
  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `${serverURL}/api/users/${userId}/follower`;
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
    followerData: data,
    followerIsLoading: !error && !data,
    followerIsError: error,
  };
}

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

interface FollowInfoProps {
  userId?: string;
  username?: string;
}


const FollowInfo: React.FC<FollowInfoProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = props.userId ? props.userId : '';
  const username = props.username ? props.username : '';

  const { followerData, followerIsLoading, followerIsError } = useFollowers(userId);
  const { followingData, followingIsLoading, followingIsError } = useFollowings(userId);
  const followerCount = followerData?.count ? followerData.count : 0;
  const followingCount = followingData?.count ? followingData.count : 0;

  return (
    <List>
      <ListItem disablePadding sx={{ display: 'block' }}>
          <Link href={`/profile/${username}/followers`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                    <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary={'Followers'} sx={{ opacity: 1 }} />
                {
                  followerIsError ?
                  <ListItemText primary={'Error'} sx={{ opacity: 1 }} />
                  :
                  followerIsLoading ?
                  <ListItemText primary={'Loading...'} sx={{ opacity: 1 }} />
                  :
                  <ListItemText primary={followerCount !== undefined ? followerCount : 0} sx={{ opacity: 1 }} />
                }
            </ListItemButton>
          </Link>
          <Link href={`/profile/${username}/following`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                    <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary={'Following'} sx={{ opacity: 1 }} />
                {
                  followingIsError ?
                  <ListItemText primary={'Error'} sx={{ opacity: 1 }} />
                  :
                  followingIsLoading ?
                  <ListItemText primary={'Loading...'} sx={{ opacity: 1 }} />
                  :
                  <ListItemText primary={followingCount !== undefined ? followingCount : 0} sx={{ opacity: 1 }} />
                }
            </ListItemButton>
          </Link>
      </ListItem>
  </List>
  );
};

export default FollowInfo;