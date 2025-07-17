import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const EmptyData = ({height = "100vh", title = "Something went wrong", description = "An error occurred. Please try again." }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height, // Full-screen height
            backgroundColor: '#f9f9f9', // Light background
        }}
    >
        <InboxIcon color="info" style={{ fontSize: 60, marginBottom: 16 }} />
        <Typography variant="h5" gutterBottom>
            {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
            {description}
        </Typography>
        {/* {onRetry && (
            <Button variant="contained" color="primary" onClick={onRetry}>
                Retry
            </Button>
        )} */}
    </Box>
);

export default EmptyData;
