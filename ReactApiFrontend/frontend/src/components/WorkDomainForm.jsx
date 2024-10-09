import { useState, useEffect } from "react";
import Typography from '@mui/joy/Typography';
import { Stack, TextField, Autocomplete, Button, Box, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { logout } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';





function WorkDomainForm({ getDomains }) {
  
    const [domainChoice, setDomainChoice] = useState({choice: "",});
    const domains_url = 'http://127.0.0.1:8000/domains/'
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/login" />;
      }
    
    const handleChange = (evt) => {
        setDomainChoice(currData => {
            return {
                ...currData,  // create a copy of the current state
                [evt.target.name]: evt.target.value,  // add the new state to the object (in this case it use the element name for the obj name and the value for the value)
            }
        });
    }

    const handleChange1 = (evt) => {
        setDomainChoice({ choice: evt.target.value })
        };

    const handleAutocompleteChange = (event, newValue) => {
        setDomainChoice({choice: newValue})
    } // Need to retrieve the new value and not the event target value like in other 'typing form'
    

    const handleSubmit = (evt) => {
        evt.preventDefault();
        getDomains(domainChoice.choice)
        setDomainChoice({choice:''})
    }

    const [domainsList, setDomainsList] = useState([])

    async function getDomainsList() {
        const response = await fetch(domains_url);
        const jsonResponse = await response.json();
        setDomainsList(jsonResponse)
    }

    useEffect(() => {
        getDomainsList()
    },[])

    const dispatch = useDispatch();

    

    return (
    <Stack direction={'column'} spacing={6}>
        <Box sx={{bgcolor:'#cfe8fc', borderRadius:'20px', p:'50px'}}>
        <Typography maxWidth={'50%'} level='h1' gutterBottom textAlign={'left'}>Please Enter The Job Your Interested By Today</Typography>
        <Stack spacing={2} direction={'row'} maxHeight={'100px'}>
            <Autocomplete
            size="large"
            
            options={domainsList}
            value={domainChoice.choice}  
            onChange={handleAutocompleteChange}  // The autocomplete demande other type of change handling
            renderInput={(params) => <TextField {...params} label='Domains' /> } />
            <IconButton onClick={handleSubmit} color="primary" size="large"><SearchIcon /></IconButton>
            <Button onClick={() => dispatch(logout())}  color="primary" variant="contained" sx={{ fontSize: '12px' }} size="small">Logout</Button>

            {/* <Button variant="outlined" color="primary" endIcon={<SearchIcon />} onClick={handleSubmit}></Button> */}
        </Stack>
        </Box>
    </Stack>
    )
}

export default WorkDomainForm;