import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fbDataUrl, googleDataUrl, twitterDataUrl } from '../../assest/photo';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Signup = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({ email: '', password: '' });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formdata);
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();

      if (response.status === 409) {
        alert(data.message);
        navigate('/newtodo');
      } else if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      } else {
        localStorage.setItem('token', data.token);
        navigate('/newtodo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  
  const handleGoogleLogin = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
      authorizationParams : {redirectUri: 'http://localhost:5173/newtodo'}
  });
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
            Sign up to TodoIST
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="text"
              id="email"
              autoComplete="email"
              value={formdata.email}
              onChange={handleInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formdata.password}
              onChange={handleInput}
            />
            {/* IMPROVE THIS */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ marginRight: '5px' }}
              >
                Sign Up
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleLogin}
              >
                Login
              </Button>
            </div>

            {/* <button onClick={() => loginWithRedirect()}>Log In</button>  */}

            {/* {isAuthenticated && (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => logout()}
              >
                Logout
              </Button>
            )} */}
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<img src={googleDataUrl} alt="Google" width="40" />}
              sx={{ mb: 1 }}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
