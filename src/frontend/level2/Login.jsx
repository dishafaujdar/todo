import React from 'react';
import {Navigate, useNavigate } from "react-router-dom";
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

const Login=()=>{
    return(
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
              Login to TodoIST 
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
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In 
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<img src={googleDataUrl} alt="Google" width="40" />}
                sx={{ mb: 1 }}
              >
                Sign in with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <img
                    src={fbDataUrl}
                    alt="Facebook"
                    width="40"
                  />
                }
                sx={{ mb: 1 }}
              >
                Sign in with Facebook
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<img src={twitterDataUrl} alt="Twitter" width="40" />}
              >
                Sign in with Twitter
              </Button> */}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

export {Login}