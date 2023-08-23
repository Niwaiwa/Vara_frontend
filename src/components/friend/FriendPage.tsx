import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemButton, ListItemText, Paper, Grid } from '@mui/material';
import Friends from './Friends'; // Profile設定用コンポーネント
import FriendRequests from './FriendRequests'; // Account設定用コンポーネント

const FriendPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'friends' | 'friendRequests'>('friends');

  const handleTabChange = (tab: 'friends' | 'friendRequests') => {
    setSelectedTab(tab);
  };

  return (
    <Paper elevation={0} sx={{ padding: '15px' }}>
      <Box sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={3} lg={2}>
            <List sx={{ marginRight: '40px' }}>
              <ListItem disablePadding>
                <ListItemButton selected={selectedTab === 'friends'} onClick={() => handleTabChange('friends')}>
                  <ListItemText primary="Friends" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={selectedTab === 'friendRequests'} onClick={() => handleTabChange('friendRequests')}>
                  <ListItemText primary="FriendRequests" />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={10}>
            <Box sx={{ flexGrow: 1 }}>
              {selectedTab === 'friends' ? <Friends /> : <FriendRequests />}
            </Box>
          </Grid>
        </Grid>
        {/* <List sx={{ marginRight: '40px' }}>
          <ListItem disablePadding>
            <ListItemButton selected={selectedTab === 'friends'} onClick={() => handleTabChange('friends')}>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={selectedTab === 'friendRequests'} onClick={() => handleTabChange('friendRequests')}>
              <ListItemText primary="FriendRequests" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ flexGrow: 1 }}>
          {selectedTab === 'friends' ? <Friends /> : <FriendRequests />}
        </Box> */}
      </Box>
    </Paper>
  );
};

export default FriendPage;