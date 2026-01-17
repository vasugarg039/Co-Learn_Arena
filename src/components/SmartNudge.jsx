
import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import GlassCard from './GlassCard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SmartNudge = () => {
    return (
        <GlassCard sx={{ p: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <NotificationsActiveIcon color="action" />
                <Typography variant="overline" color="text.secondary" fontWeight="800" sx={{ letterSpacing: 1 }}>
                    SQUAD INTEL
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>S</Avatar>
                <Box>
                    <Typography variant="body2" fontWeight="700">Sarah just finished the "JS Basics" Quest.</Typography>
                    <Typography variant="caption" color="text.secondary">2 mins ago</Typography>
                </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Your squad is 150 XP ahead. Complete a quick challenge to catch up!
            </Typography>

            <Button
                variant="outlined"
                fullWidth
                size="small"
                endIcon={<ArrowForwardIcon />}
                sx={{ borderRadius: 2, justifyContent: 'space-between', px: 2 }}
            >
                View Challenge
            </Button>
        </GlassCard>
    );
};

export default SmartNudge;
