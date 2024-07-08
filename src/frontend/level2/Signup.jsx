import React,{useState,useEffect} from 'react';
import {Navigate, useNavigate } from "react-router-dom";
import { fbDataUrl, googleDataUrl, twitterDataUrl } from '../../assest/photo'
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


const Signup=()=>{
  
  const Navigate=useNavigate();

  const[navigate,setNavigate]=useState(false);
  const[formdata,setFormdata]=useState({
    email:[],
    password:[]
  })
  
  useEffect(()=>{
    if(navigate){
      Navigate('/newtodo')
    }
  },[navigate,Navigate]);

  const handlenav=(e)=>{
    e.preventDefault();
    const{name,value}=e.target;
    
    setFormdata({
      ...formdata,
      [name]:value,
    })
    setNavigate(true)
  }

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
            Sign to TodoIST 
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <form onSubmit={handlenav}>

              <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="name"
              id="name"
              autoComplete="name"
              value={formdata.name}
              onChange={handlenav}></TextField>

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
                onChange={handlenav}
              ></TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
            <Grid container>
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
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;




