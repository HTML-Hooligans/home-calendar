import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface Props {
  handleDrawerToggle: () => void;
  navItems: { name: string; callback: () => void }[];
  isMobileOpen: boolean;
  container: (() => HTMLElement) | undefined;
}

function CustomDrawer({ handleDrawerToggle, navItems, isMobileOpen, container }: Props) {
  const drawerWidth = 240;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {/*todo add logo*/}
        LOGO
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ name, callback }) => (
          <ListItem key={name} disablePadding onClick={callback}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={isMobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
}

export default CustomDrawer;
