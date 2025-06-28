import React from 'react';
import { Container, Typography, List, ListItem } from '@mui/material';

function Results() {
    return (
        <Container sx={{ marginTop: '30px' }}>
            <Typography variant="h5">Your Interview Performance</Typography>
            <List>
                <ListItem>Fluency: 8/10</ListItem>
                <ListItem>Confidence: 7/10</ListItem>
                <ListItem>Technical Accuracy: 9/10</ListItem>
            </List>
        </Container>
    );
}

export default Results;
