import React from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from '@mui/material';

const SendOtp=()=>{
    const Navigate=useNavigate();

    const mainpage=()=>{
        
        Navigate('https://www.netflix.com/browse')
    }
    return(
        <div><Box
        sx={{
            width: 300,
            margin: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 1,
        }}
        >
        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
        ENTER OTP
        </Typography>
        <TextField
            label="OTP"
            variant="outlined"
            type="OTP"
            fullWidth
            required
        />
        <Button variant="contained" color="primary" fullWidth onClick={mainpage} >SUBMIT</Button>
        </Box></div>
    )
}
export default SendOtp