import Link from 'next/link';
import { useState } from 'react';
import { Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem,
  List, ListItem, ListItemIcon, ListItemText, Divider, ListItemButton, Box } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import CheckboxIcon from '@mui/icons-material/Checkbox';
import UnCheckboxIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import ForumIcon from '@mui/icons-material/Forum';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { switchOpen } from '../globalRedux/features/sidebar/sidebarSlice';
import { RootState } from '../globalRedux/store';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [isLogin, setIsLogin] = useState(false);
  const theme = useTheme();
  const [locale, setLocale] = useState('en-US');
  const [rating, setRating] = useState('all');
  const [themeMode, setThemeMode] = useState('light');

  const open = useSelector((state: RootState) => state.sidebar.open);
  const dispatch = useDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getLocaleMappping = (text: string) => {
    if (text === 'English') {
      return 'en-US';
    } else if (text === 'Japanese') {
      return 'ja-JP';
    } else {
      return text;
    }
  };

  const getRatingMappping = (text: string) => {
    if (text === 'All') {
      return 'all';
    } else if (text === 'General') {
      return 'G';
    } else if (text === 'Ecchi') {
      return 'E';
    } else {
      return text;
    }
  };

  const getThemeModeMappping = (text: string) => {
    if (text === 'Dark') {
      return 'dark';
    } else if (text === 'Light') {
      return 'light';
    } else {
      return text;
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* Add user menu items here */}
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => dispatch(switchOpen())}>
            <MenuIcon />
          </IconButton>
          {/* <PlayCircleFilledIcon sx={{ mr: 1 }} /> */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Your Video Site
          </Typography>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
          { isLogin ? <Avatar onClick={handleMenuOpen} /> : null}        
        </Toolbar>
        {renderMenu}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <Box>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Home'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <VideoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary={'Video'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText primary={'Image'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ForumIcon />
                </ListItemIcon>
                <ListItemText primary={'Forum'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <Box sx={{ display: 'block' }}>
              <ListItem
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={'Language'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItem>
            </Box>
            {open ?
              ['English', 'Japanese'].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => setLocale(getLocaleMappping(text))}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {getLocaleMappping(text) === locale ? <CheckboxIcon /> : <UnCheckboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
          </List>
          <Divider />
          <List>
            <Box sx={{ display: 'block' }}>
              <ListItem
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={'Rating'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItem>
            </Box>
            {open ?
              ['all', 'G', 'E'].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => setRating(getRatingMappping(text))}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {getRatingMappping(text) === rating ? <CheckboxIcon /> : <UnCheckboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
          </List>
          <Divider />
          <List>
            <Box sx={{ display: 'block' }}>
              <ListItem
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DarkModeIcon />
                </ListItemIcon>
                <ListItemText primary={'Theme'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItem>
            </Box>
            {open ?
              ['Dark', 'Light'].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => setThemeMode(getThemeModeMappping(text))}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {getThemeModeMappping(text) === themeMode ? <CheckboxIcon /> : <UnCheckboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
