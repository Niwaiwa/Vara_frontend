import React, { useState } from 'react';
import { Box, Container, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
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
          {/* アカウント設定用のリスト */}
          <List sx={{ width: '20%', marginRight: '40px' }}>
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
          {/* 選択されたコンポーネント */}
          <Box sx={{ flexGrow: 1 }}>
            {selectedTab === 'profile' ? <ProfileSettings /> : <AccountSettings />}
          </Box>
        </Box>
      </Paper>
  );
};

export default AccountSettingsPage;