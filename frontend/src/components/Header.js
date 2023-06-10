import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store';

const Header = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userActions.logout());
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'black',height:"100px",justifyContent:"center"  }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        <Typography variant="h3" noWrap component="div">
            MovieTime
          </Typography>
        

        <Box display="flex" flex="1" justifyContent= "center">
          <Tabs
          
            textColor="white"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/" label="Home" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' },margin:'10px'}} />
            <Tab LinkComponent={Link} to="/movies" label="Movies" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' },margin:'10px' }} />
            <Tab LinkComponent={Link} to="/bookings" label="bookings" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' },margin:'10px' }} />
            {isUserLoggedIn && (
            
            <Tab LinkComponent={Link} to="/profile" label="profile" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' },paddingLeft:'100px'  }} />
            )}
 {isUserLoggedIn && (
            
            <Tab  onClick={() => logOut()} LinkComponent={Link} to="/" label="logout" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' },paddingLeft:'50px' }} />
            )}  
             {!isUserLoggedIn && (
            
            <Tab LinkComponent={Link} to="/login" label="login" sx={{ fontSize: '20px', '&:hover': { color: 'yellow' },marginLeft:'auto',paddingLeft:'100px'  }} />
            )}        
            </Tabs>
        </Box>

        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
