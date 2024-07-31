import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import ('dotenv/config')
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme();

const Authpg = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { logout, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (!token) return;

        const response = await fetch('https://{process.env.AUTH0_DOMAIN}/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        console.log('User info:', userInfo);
        setEmail(userInfo.email);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserInfo();
  }, [getAccessTokenSilently]);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Fill below fields
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleLogout} variant="contained">
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Authpg;
