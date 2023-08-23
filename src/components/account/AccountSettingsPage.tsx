import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemButton, ListItemText, Paper, Grid } from '@mui/material';
import ProfileSettings from './ProfileSettings'; // Profile設定用コンポーネント
import AccountSettings from './AccountSettings'; // Account設定用コンポーネント

const AccountSettingsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'profile' | 'account'>('profile');

  const handleTabChange = (tab: 'profile' | 'account') => {
    setSelectedTab(tab);
  };

  return (
      <Paper elevation={0} sx={{ padding: '15px' }}>
        <Box sx={{ display: 'flex' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={3} lg={2}>
              <List sx={{ marginRight: '40px' }}>
                <ListItem disablePadding>
                  <ListItemButton selected={selectedTab === 'profile'} onClick={() => handleTabChange('profile')}>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton selected={selectedTab === 'account'} onClick={() => handleTabChange('account')}>
                    <ListItemText primary="Account" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={10}>
              <Box sx={{ flexGrow: 1 }}>
                {selectedTab === 'profile' ? <ProfileSettings /> : <AccountSettings />}
              </Box>
            </Grid>
          </Grid>
          
          {/* <List sx={{ width: '20%', marginRight: '40px' }}>
            <ListItem disablePadding>
              <ListItemButton selected={selectedTab === 'profile'} onClick={() => handleTabChange('profile')}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected={selectedTab === 'account'} onClick={() => handleTabChange('account')}>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ flexGrow: 1 }}>
            {selectedTab === 'profile' ? <ProfileSettings /> : <AccountSettings />}
          </Box> */}
        </Box>
      </Paper>
  );
};

export default AccountSettingsPage;