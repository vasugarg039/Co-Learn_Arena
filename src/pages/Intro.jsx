import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, keyframes } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const scanline = keyframes`
  0% { bottom: 100%; }
  100% { bottom: 0%; }
`;

import useSEO from '../hooks/useSEO';

const Intro = () => {
    useSEO('Start Game', 'Enter the gamified world of CoLearn. Earn XP, finish quests, and level up.');
    const navigate = useNavigate();
    const { soundEnabled, toggleSound } = useGamification();
    const [started, setStarted] = useState(false);

    const handleStart = () => {
        setStarted(true);
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            bgcolor: '#05070a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            color: 'white',
            fontFamily: '"Outfit", sans-serif'
        }}>
            {/* Background Grid */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)',
                backgroundSize: '40px 40px',
                opacity: 0.5,
                zIndex: 0
            }} />

            {/* Scanline Effect */}
            <Box sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '10%',
                background: 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.05), transparent)',
                animation: `${scanline} 8s linear infinite`,
                zIndex: 1
            }} />

            {/* Floating Orbs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '15%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />

            <AnimatePresence mode="wait">
                {!started && (
                    <motion.div
                        key="intro-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        style={{ textAlign: 'center', zIndex: 10 }}
                    >
                        <Box sx={{ mb: 6 }}>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Typography variant="h6" sx={{ letterSpacing: 8, color: 'primary.light', mb: 2, fontWeight: 300 }}>
                                    WELCOME TO THE GRID
                                </Typography>
                                <Typography variant="h1" sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: '4rem', md: '7rem' },
                                    background: 'linear-gradient(180deg, #fff 0%, #6366f1 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1,
                                    textShadow: '0 0 30px rgba(99, 102, 241, 0.5)'
                                }}>
                                    CO-LEARN
                                </Typography>
                            </motion.div>
                        </Box>

                        <Box sx={{ position: 'relative' }}>
                            <Button
                                onClick={handleStart}
                                variant="outlined"
                                sx={{
                                    borderColor: 'primary.main',
                                    color: 'white',
                                    px: 8,
                                    py: 2,
                                    borderRadius: 0,
                                    fontSize: '1.5rem',
                                    fontWeight: 900,
                                    letterSpacing: 4,
                                    borderWidth: '2px',
                                    '&:hover': {
                                        borderWidth: '2px',
                                        bgcolor: 'rgba(99, 102, 241, 0.1)',
                                        boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)'
                                    },
                                    animation: `${pulse} 2s ease-in-out infinite`
                                }}
                            >
                                PRESS START
                            </Button>
                        </Box>

                        <Box sx={{ mt: 8, display: 'flex', gap: 4, justifyContent: 'center', opacity: 0.6 }}>
                            <Typography variant="caption" sx={{ letterSpacing: 2 }}>V 2.0.0-PRO</Typography>
                            <Typography variant="caption" sx={{ letterSpacing: 2 }}>GLOBAL SERVER: ONLINE</Typography>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD Elements Overlay during Intro */}
            <Box sx={{ position: 'absolute', bottom: 40, right: 40, zIndex: 10 }}>
                <IconButton onClick={toggleSound} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </IconButton>
            </Box>

            <Box sx={{ position: 'absolute', bottom: 40, left: 40, zIndex: 10, display: 'flex', alignItems: 'center', gap: 2 }}>
                <RocketLaunchIcon sx={{ color: 'primary.main' }} />
                <Typography variant="caption" sx={{ letterSpacing: 2, fontWeight: 700 }}>NEURAL SYNC ESTABLISHED</Typography>
            </Box>

            {/* Cinematic Transition Overlay */}
            <AnimatePresence>
                {started && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'white',
                            zIndex: 100
                        }}
                    />
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Intro;
