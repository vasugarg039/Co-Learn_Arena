
import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Fade } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';

const LiveTicker = () => {
    const [index, setIndex] = useState(0);

    const items = [
        { icon: <LocalFireDepartmentIcon sx={{ fontSize: 16, color: '#f97316' }} />, text: "128 students active", color: '#fff' },
        { icon: <GroupIcon sx={{ fontSize: 16, color: '#a855f7' }} />, text: "3 squads in live huddle", color: '#fff' },
        { icon: <SchoolIcon sx={{ fontSize: 16, color: '#10b981' }} />, text: "Explain Quest starting in 4 min", color: '#fff' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const currentItem = items[index];

    return (
        <Box sx={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.02)',
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.05)',
            px: 3
        }}>
            <Fade in={true} key={index} timeout={500}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {currentItem.icon}
                    <Typography variant="body2" fontWeight="700" sx={{ color: currentItem.color, letterSpacing: 0.5 }}>
                        {currentItem.text}
                    </Typography>
                </Box>
            </Fade>
        </Box>
    );
};

export default LiveTicker;
