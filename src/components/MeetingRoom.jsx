import React from 'react';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LaunchIcon from '@mui/icons-material/Launch';

const MeetingRoom = ({ onClose }) => {

    const handleLaunchMeet = () => {
        // Open a new Google Meet in a new tab
        window.open('https://meet.google.com/new', '_blank');
    };

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1300,
            bgcolor: 'background.default', // Use theme default background
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <Box sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={onClose}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">Squad Meeting Room</Typography>
                        <Typography variant="caption" color="text.secondary">Google Meet Integration</Typography>
                    </Box>
                </Box>
                <Button variant="outlined" color="error" onClick={onClose}>
                    Close Room
                </Button>
            </Box>

            {/* Meet Launcher Content */}
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
            }}>
                <Paper sx={{
                    p: 6,
                    maxWidth: 600,
                    width: '100%',
                    textAlign: 'center',
                    borderRadius: 4,
                    bgcolor: 'background.glass',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}>
                    <Box sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'background.paper',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}>
                        {/* Google Meet colored icon simulation */}
                        <VideoCallIcon sx={{ fontSize: 40, color: '#1a73e8' }} />
                    </Box>

                    <Typography variant="h4" fontWeight="900" gutterBottom>
                        Ready to Connect?
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                        Launch a secure Google Meet session for your squad. Share the link with your team members to start collaborating.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleLaunchMeet}
                        endIcon={<LaunchIcon />}
                        sx={{
                            py: 1.5,
                            px: 4,
                            fontSize: '1.1rem',
                            borderRadius: 3,
                            bgcolor: '#1a73e8', // Google Meet Blue
                            '&:hover': { bgcolor: '#1557b0' }
                        }}
                    >
                        Launch Google Meet
                    </Button>

                    <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                            Tip: After launching, copy the meeting URL and share it in your Squad Chat.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default MeetingRoom;
