import React from 'react';
import { Container, Typography, Switch, FormControlLabel } from '@mui/material';

function Settings() {
    return (
        <Container sx={{ marginTop: '30px' }}>
            <Typography variant="h5">Settings</Typography>
            <FormControlLabel control={<Switch />} label="Enable Voice Input" />
            <FormControlLabel control={<Switch />} label="Enable Facial Analysis" />
        </Container>
    );
}

export default Settings;
