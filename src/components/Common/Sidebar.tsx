import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard, PeopleAlt } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import config from 'config';

export default function Sidebar() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <NavLink
            to={config.Routers.dashboard}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {({ isActive }) => (
              <ListItem>
                <ListItemButton
                  sx={{
                    bgcolor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Change to your preferred active background color
                  }}
                >
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
          <NavLink to={config.Routers.student} style={{ textDecoration: 'none', color: 'inherit' }}>
            {({ isActive }) => (
              <ListItem>
                <ListItemButton
                  sx={{
                    bgcolor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent', // Change to your preferred active background color
                  }}
                >
                  <ListItemIcon>
                    <PeopleAlt />
                  </ListItemIcon>
                  <ListItemText primary="Student" />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        </List>
      </nav>
    </Box>
  );
}
