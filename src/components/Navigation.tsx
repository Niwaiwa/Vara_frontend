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
import { getAllLocales, setLocale } from '../globalRedux/features/sidebar/localeSlice';
import { getAllRatings, setRating } from '../globalRedux/features/sidebar/ratingSlice';
import { getAllThemeModes, setThemeMode } from '../globalRedux/features/sidebar/themeModeSlice';
import { RootState } from '../globalRedux/store';
import { logout } from '../globalRedux/features/auth/authSlice';
import axios from 'axios';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useRouter } from 'next/router';


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

interface CustomState extends SnackbarOrigin {
  open: boolean;
  message?: string;
}

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const open = useSelector((state: RootState) => state.sidebar.open);
  const locale = useSelector((state: RootState) => state.locale.locale);
  const rating = useSelector((state: RootState) => state.rating.rating);
  const themeMode = useSelector((state: RootState) => state.themeMode.themeMode);
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const userInfo = user ? user : null;
  const allLocales = getAllLocales();
  const allRatings = getAllRatings();
  const allThemeModes = getAllThemeModes();
  const dispatch = useDispatch();
  const router = useRouter();

  const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const avatarUrl = userInfo?.avatar ? `${serverURL}/${userInfo?.avatar}` : '';
  const username = userInfo?.username ? userInfo?.username : '';

  const [snackBarState, setSnackBarState] = useState<CustomState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open: snackBarOpen, message } = snackBarState;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutAndClose = () => {
    try {

      const header = {
        'Authorization': `Bearer ${token}`,
      }
      const serverURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = axios.post(`${serverURL}/api/users/logout`, {}, { headers: header });
      handleMenuClose();
      dispatch(logout());
      // console.log('ログアウト成功:', response.data);
      // 他の処理を追加
      setSnackBarState({ ...snackBarState, open: true, message: 'Logout success' });
      router.push('/login');
    } catch (error) {
      // console.error('Logout failed:', error);
      // 他の処理を追加
      setSnackBarState({ ...snackBarState, open: true, message: 'Logout failed' });
    }
  };

  const getLocaleText = (text: string) => {
    if (text === 'en-US') {
      return 'English';
    } else if (text === 'ja-JP') {
      return 'Japanese';
    } else {
      return text;
    }
  };

  const getRatingText = (text: string) => {
    if (text === 'all') {
      return 'All';
    } else if (text === 'G') {
      return 'General';
    } else if (text === 'E') {
      return 'Ecchi';
    } else {
      return text;
    }
  };

  const getThemeModeText = (text: string) => {
    if (text === 'dark') {
      return 'Dark';
    } else if (text === 'light') {
      return 'Light';
    } else {
      return text;
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* Add user menu items here */}
      <Link href={`/profile/${encodeURIComponent(username)}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <Link href="/friend" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem onClick={handleMenuClose}>Friend</MenuItem>
      </Link>      
      <Link href="/account" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem onClick={handleMenuClose}>Account</MenuItem>
      </Link>
      <MenuItem onClick={handleLogoutAndClose}>Logout</MenuItem>
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
          { isLoggedIn ? 
            <>
              <Avatar
                src={avatarUrl}
                onClick={handleMenuOpen}
              /> 
              {renderMenu}
            </>
          : <>
            <Link href="/register" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Register</Button>
            </Link>
            <Link href="/login" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Login</Button>
            </Link>
            </>
          }
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <Box>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
                <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
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
                </Link>
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
              allLocales.map((text, index) => (
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
                    onClick={() => dispatch(setLocale(text))}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {text === locale ? <CheckboxIcon /> : <UnCheckboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={getLocaleText(text)} sx={{ opacity: open ? 1 : 0 }} />
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
              allRatings.map((text, index) => (
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
                    onClick={() => dispatch(setRating(text))}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {text === rating ? <CheckboxIcon /> : <UnCheckboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={getRatingText(text)} sx={{ opacity: open ? 1 : 0 }} />
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
              allThemeModes.map((text, index) => (
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
                    onClick={() => dispatch(setThemeMode(text))}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {text === themeMode ? <CheckboxIcon /> : <UnCheckboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={getThemeModeText(text)} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
          </List>
        </Box>
      </Drawer>
      <Snackbar
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        autoHideDuration={3000}
        open={snackBarOpen}
        onClose={() => setSnackBarState({ ...snackBarState, open: false })}
        message={message}
        key={vertical + horizontal}
      />
    </>
  );
};

export default Navigation;
