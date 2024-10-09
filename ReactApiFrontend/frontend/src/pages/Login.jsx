import { React, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from '../redux/thunks/authThunks';
import { Stack, TextField, Typography, Autocomplete, Button, Box, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";



function Login() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    if(!isAuthenticated){
        return <Navigate to='/'/>
    }


    return(
    <Stack direction={'column'} spacing={6}>
        <Box sx={{bgcolor:'#cfe8fc', borderRadius:'20px', p:'50px'}}>
        <Typography maxWidth={'50%'} variant='h1' gutterBottom textAlign={'left'}>Sign In</Typography>
        <Typography maxWidth={'50%'} variant='h2' gutterBottom textAlign={'left'}>Sign into your Account</Typography>
        <Stack spacing={2} direction={'row'} maxHeight={'100px'} mb={3} mt={6}>
            <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            type="email" 
            name="email"
            value={email}
            onChange={onChange}
            />
            <TextField 
            id="outlined-basic" 
            label="Password" 
            variant="outlined" 
            type="password" 
            name='password'
            value={password}
            onChange={onChange}
            />
        <Button onClick={onSubmit} color="primary" variant="contained" sx={{ fontSize: '12px' }} size="small">Login</Button>
        </Stack>
        <Stack spacing={2} direction={'row'}>
            <Typography maxWidth={'50%'} level='p' gutterBottom textAlign={'left'}>Dont have an account?</Typography>
            <Link to={'/signup'}>Signup</Link>
        </Stack>
        <Stack spacing={2} direction={'row'}>
            <Typography maxWidth={'50%'} level='p' gutterBottom textAlign={'left'}>Forgot Your Password?</Typography>
            <Link to={'/reset-password'}>Reset Passsword</Link>
        </Stack>
        </Box>
    </Stack>
    );
};


export default Login;