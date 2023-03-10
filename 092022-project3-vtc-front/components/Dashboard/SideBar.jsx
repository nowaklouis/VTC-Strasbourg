import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
} from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import TuneIcon from '@mui/icons-material/Tune';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';

function SideBar({ mobileOpen, setMobileOpen }) {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        <Link href="/dashboard/courses">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DirectionsCarFilledIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/config">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TuneIcon />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/profile">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Person2Icon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link href="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <Paper>
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        open
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Paper>
  );
}

SideBar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
};

export default SideBar;
