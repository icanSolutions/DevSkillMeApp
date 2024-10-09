import { React, useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { activation } from '../redux/thunks/authThunks';
import { Stack, TextField, Typography, Autocomplete, Button, Box, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";



function Activate() {
    const dispatch = useDispatch();
    const { uid, token } = useParams();
    const [isVerified, setIsVerified] = useState(false);

    const onSubmit = e =>{
        e.preventDefault();
        dispatch(activation(uid, token));
        setIsVerified(true);
    };

    if(isVerified){
        return <Navigate to='/login'/>
    }


    return(
    <Stack direction={'column'} spacing={6}>
        <Box sx={{bgcolor:'#cfe8fc', borderRadius:'20px', p:'50px'}}>
        <Typography maxWidth={'50%'} variant='h2' gutterBottom textAlign={'left'}>Activate your Account</Typography>
        <Button onClick={onSubmit} color="primary" variant="contained" sx={{ fontSize: '12px' }} size="small">Activate</Button>
        </Box>
    </Stack>
    );
};


export default Activate;