import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { reset_password } from "../redux/thunks/authThunks";
import { Stack, TextField, Typography, Autocomplete, Button, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";



export default function ResetPassword() {

    const [email, setEmail] = useState('')

    const onChange = e => {
        setEmail(e.target.value);
    };

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        dispatch(reset_password(email));
    };

    return(
        <Stack direction={'column'} spacing={6}>
        <Box sx={{bgcolor:'#cfe8fc', borderRadius:'20px', p:'50px'}}>
        <Typography maxWidth={'50%'} variant='h3' gutterBottom textAlign={'left'}>Reset Password</Typography>
        <Typography maxWidth={'50%'} variant='h5' gutterBottom textAlign={'left'}>Enter your email to receive a "reset_password" link</Typography>
        <Stack spacing={2} direction={'row'} maxHeight={'100px'} mt={6}>
            <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            type="email" 
            name="email"
            value={email.email}
            onChange={onChange}
            />
            <Button onClick={onSubmit} color="primary" variant="contained" sx={{ fontSize: '12px' }} size="small">Send Email</Button>
        </Stack>
        <Stack spacing={2} direction={'row'} mt={3} textAlign={'left'}>
            <Typography maxWidth={'50%'} level='p' gutterBottom textAlign={'left'}>Didn't receive a mail?</Typography>
            <Button onClick={onSubmit} sx={{ maxWidth: '100px', fontSize: '10px' }} color="primary" variant="text" size="medium" >Resend Email</Button>
        </Stack>
        </Box>
    </Stack>
    );
}