import { Box, TextField, Button, Typography } from '@mui/material';

const AuthPage=()=>{
    return(
    <div>
        <h1>OPT page</h1>
        <Box
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
        Login
        </Typography>
        <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
        />
        <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
        />
        <Button variant="contained" color="primary" fullWidth>
            Login
        </Button>
        </Box>

    </div>
    )
}

export default AuthPage;