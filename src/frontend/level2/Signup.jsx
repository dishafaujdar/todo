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
    username:'',
    password:''
  })
  
  // useEffect(()=>{
  //   if(navigate){
  //     Navigate('/newtodo')
  //   }
  // },[navigate,Navigate]); 

  const handleinput=(e)=>{
    e.preventDefault();
    const{name,value}=e.target;
  
    setFormdata({
      ...formdata,  
      [name]:value,
    });
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    console.log('Form data:', formdata); 
    try{
      const response = await fetch('http://localhost:3000/signup',{ 
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formdata),
      });
      
      const data = await response.json(); // Read the response body only once

      if (response.status === 409) {
        alert(data.message);
        Navigate('/login'); // Redirect to login page if user already exists
      } else if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      } else{
      localStorage.setItem('token', data.token);
      Navigate('/newtodo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
    // setNavigate(true);
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
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="username"
              type="text"
              id="username"
              autoComplete="username"
              value={formdata.username}
              onChange={handleinput}
              
              ></TextField>

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
                onChange={handleinput}
                ></TextField>

              <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me" 
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

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




