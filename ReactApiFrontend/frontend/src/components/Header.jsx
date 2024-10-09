import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import RestorePageIcon from '@mui/icons-material/RestorePage';

export default function Header () {
    return (
        <AppBar position="static" sx={{margin:'0px', padding:'0px', marginBottom: '50px' }}>
            <Toolbar>
                <IconButton size="large" edge="end" aria-label="logo">
                    <RestorePageIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center'}}>TheWorkApp</Typography>
            </Toolbar>
        </AppBar>
    )
}