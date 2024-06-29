import { Box, TextField, Button, Typography } from '@mui/material';
import React from "react";

const AuthPage=()=>{
    return(
    <div>
        <Box
        sx={{
            width: 300,
            margin: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '2px solid black',
            borderRadius: 2,
            boxShadow: 1,
        }}
        >
        <Typography variant='h2'>FINISH WHAT YOU STARTED!</Typography>
         </Box>

    </div>
    )
}

export default AuthPage;