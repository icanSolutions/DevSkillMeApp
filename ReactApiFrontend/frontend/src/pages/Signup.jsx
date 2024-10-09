import { React, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from '../redux/thunks/authThunks';
import { Stack, TextField, Typography, Autocomplete, Button, Box, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";



function SignUp() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isActivate, setIsActivate] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();

    const onSubmit = e =>{
        e.preventDefault();
        if(password === re_password){
            dispatch(signUp(name, email, password, re_password));
            setIsActivate(true);
        }
    };

    if(isAuthenticated){
        alert('created already');
        return <Navigate to='/'/>
    }

    if(isActivate){
        return <Navigate to='/login'/>
    }

    return(
    <Stack direction={'column'} spacing={6}>
        <Box sx={{bgcolor:'#cfe8fc', borderRadius:'20px', p:'50px'}}>
        <Typography maxWidth={'50%'} variant='h1' gutterBottom textAlign={'left'}>Sign Up</Typography>
        <Typography maxWidth={'50%'} variant='h2' gutterBottom textAlign={'left'}>Create your Account</Typography>
        <Stack spacing={2} direction={'row'} maxHeight={'100px'} mb={3} mt={6}>
            <TextField 
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            type="text" 
            name='name'
            value={name}
            onChange={onChange}
            />
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
            <TextField 
            id="outlined-basic" 
            label="Repeat the Password" 
            variant="outlined" 
            type="password" 
            name='re_password'
            value={re_password}
            onChange={onChange}
            />
            <IconButton onClick={onSubmit} color="primary" size="large"><SearchIcon /></IconButton>
        </Stack>
        <Stack spacing={2} direction={'row'}>
            <Typography maxWidth={'50%'} level='p' gutterBottom textAlign={'left'}>Have an account already?</Typography>
            <Link to={'/login'}>Signup</Link>
        </Stack>
        </Box>
    </Stack>
    );
};

export default SignUp;