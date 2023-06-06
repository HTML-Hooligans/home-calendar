import React, { Fragment, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import * as styles from './Navbar.styles';
import CustomDrawer from './Drawer';
import { useUser } from '../../hooks/useUser';
import Modal from '../../ui/Modal/Modal';
import { showToast } from '../../utils/showToast';

interface Props {
  window?: () => Window;
}

export default function Navbar({ window }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, logOutUser } = useUser();
  const navigate = useNavigate();

  const container = window !== undefined ? () => window().document.body : undefined;

  const navItems = [
    {
      name: 'Join',
      callback: () => navigate('/auth/sign-up'),
    },
    {
      name: 'Login',
      callback: () => navigate('/auth/login'),
    },
  ];

  const handleLogout = async () => {
    try {
      setIsModalOpen(false);
      await logOutUser();
      navigate('/');
      showToast('success', 'You have successfully logged out!');
    } catch (e) {
      showToast('error', 'The logout process failed');
    }
  };

  const handleDrawerToggle = () => {
    setIsMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {/*// todo add logo*/}
            <span css={styles.logoWrapper} onClick={() => navigate('/')}>
              LOGO
            </span>
          </Typography>
          {!isLoggedIn ? (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map(({ name, callback }) => (
                <Button key={name} sx={{ color: '#fff' }} onClick={callback}>
                  {name}
                </Button>
              ))}
            </Box>
          ) : (
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button
                  sx={{ color: '#fff' }}
                  onClick={() => {
                    navigate('/dashboard');
                  }}
                >
                  Dashboard
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button
                  sx={{ color: '#fff' }}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Logout
                </Button>
              </Box>
            </>
          )}
          <Modal
            open={isModalOpen}
            title={'Are you really want to log out?'}
            onClose={() => setIsModalOpen(false)}
          >
            <Fragment>
              <Button sx={{ mx: 2 }} variant="contained" onClick={handleLogout}>
                YES
              </Button>
              <Button
                sx={{ mx: 2 }}
                variant="contained"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                NO
              </Button>
            </Fragment>
          </Modal>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <CustomDrawer
          handleDrawerToggle={handleDrawerToggle}
          navItems={navItems}
          isMobileOpen={isMobileOpen}
          container={container}
        />
      </Box>
    </Box>
  );
}
