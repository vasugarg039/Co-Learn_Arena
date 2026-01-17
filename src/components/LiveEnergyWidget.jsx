import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BoltIcon from '@mui/icons-material/Bolt';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GlassCard from './GlassCard';

const EVENTS = [
    { text: "128 students mastering DSA right now", icon: <LocalFireDepartmentIcon sx={{ color: '#ef4444' }} />, type: 'hot' },
    { text: "Squad 'Void' just completed a Level 5 Mission", icon: <GroupsIcon sx={{ color: '#6366f1' }} />, type: 'social' },
    { text: "Global Event: 300+ students exploring Neural Networks", icon: <PsychologyIcon sx={{ color: '#f59e0b' }} />, type: 'study' },
    { text: "Quest Unlocked: 'Microservices Architecture' is trending", icon: <BoltIcon sx={{ color: '#a855f7' }} />, type: 'trend' },
    { text: "User 'Sam' just ascended to Level 10!", icon: <EmojiEventsIcon sx={{ color: '#10b981' }} />, type: 'achievement' },
];

const LiveEnergyWidget = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
                setVisible(true);
            }, 600);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentEvent = EVENTS[currentIndex];

    return (
        <GlassCard
            intensity={0.5}
            sx={{
                p: 2,
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.1)'
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                px: 2,
                py: 0.8,
                borderRadius: 2,
                fontWeight: 900,
                fontSize: '0.7rem',
                letterSpacing: 1,
            }}>
                <Box sx={{
                    width: 8,
                    height: 8,
                    bgcolor: '#ef4444',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #ef4444',
                    animation: 'pulse 1.5s infinite'
                }} />
                NETWORK LIVE
            </Box>

            <Fade in={visible} timeout={600}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex' }}>{currentEvent.icon}</Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.95rem' }}>
                        {currentEvent.text}
                    </Typography>
                </Box>
            </Fade>

            <style>
                {`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.3); }
                    100% { opacity: 1; transform: scale(1); }
                }
                `}
            </style>
        </GlassCard>
    );
};

export default LiveEnergyWidget;
