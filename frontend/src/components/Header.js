import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store';

const Header = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userName = localStorage.getItem('name');
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userActions.logout());
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'black', height: '100px', justifyContent: 'center' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h3" noWrap component="div">
          MovieTime
        </Typography>
        <Box display="flex" flex="1" alignItems="center" justifyContent="center">
          <Tabs
            textColor="white"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            value={value}
            onChange={(e, val) => setValue(val)}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Tab LinkComponent={Link} to="/" label="Home" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
            <Tab LinkComponent={Link} to="/movies" label="Movies" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
            <Tab LinkComponent={Link} to="/bookings" label="Bookings" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
            {isUserLoggedIn && (
              <Tab LinkComponent={Link} to="/profile" label="Profile" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
            )}
          </Tabs>
        </Box>

        <Box display="flex" alignItems="center">
          {isUserLoggedIn && (
            <Typography variant="subtitle1" noWrap component="div" sx={{ color: 'white', fontSize: '20px', marginRight: '30px',paddingRight:"50px" }}>
              {userName}
            </Typography>
          )}

          <Tabs
            textColor="white"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            value={value}
            onChange={(e, val) => setValue(val)}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {isUserLoggedIn && (
              <Tab onClick={() => logOut()} LinkComponent={Link} to="/" label="Logout" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
            )}
            {!isUserLoggedIn && (
              <Tab LinkComponent={Link} to="/login" label="Login" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' }, margin: '10px' }} />
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
