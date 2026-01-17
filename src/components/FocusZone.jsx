import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useGamification } from '../context/GamificationContext';

const FocusZone = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const { awardXP } = useGamification();

    useEffect(() => {
        let timer = null;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleSessionComplete();
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const handleSessionComplete = () => {
        setIsActive(false);
        if (!isBreak) {
            awardXP(100, "Deep Work Session Complete");
            setTimeLeft(5 * 60);
            setIsBreak(true);
        } else {
            setTimeLeft(25 * 60);
            setIsBreak(false);
        }
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
        setIsBreak(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const progress = ((isBreak ? 5 * 60 - timeLeft : 25 * 60 - timeLeft) / (isBreak ? 5 * 60 : 25 * 60)) * 100;

    return (
        <GlassCard sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: -0.5 }}>
                        {isBreak ? "Recharge Phase" : "Hyper-Focus Mode"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                        {isBreak ? "Take a breath. Resets in:" : "Block distractions. Next break in:"}
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h3" fontWeight="900" sx={{ fontFamily: 'monospace', lineHeight: 1, letterSpacing: -2 }}>
                        {formatTime(timeLeft)}
                    </Typography>
                </Box>
            </Box>

            {/* Linear Progress Bar */}
            <Box sx={{ position: 'relative', height: 8, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0, top: 0, bottom: 0,
                        width: `${progress}%`,
                        bgcolor: isBreak ? 'secondary.main' : 'primary.main',
                        transition: 'width 1s linear'
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    color={isBreak ? "secondary" : "primary"}
                    onClick={toggleTimer}
                    startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
                    sx={{ borderRadius: 2, fontWeight: 800 }}
                >
                    {isActive ? "PAUSE SESSION" : "INITIATE FOCUS"}
                </Button>
                <Button variant="outlined" onClick={resetTimer} sx={{ borderRadius: 2, minWidth: 50 }}>
                    <RestartAltIcon />
                </Button>
            </Box>
        </GlassCard>
    );
};

export default FocusZone;
