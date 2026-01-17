import React, { useState, useEffect } from 'react';
import { Dialog, Typography, Box, IconButton, Paper, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';

const MoodCheck = () => {
    const [open, setOpen] = useState(false);
    const { awardXP } = useGamification();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!sessionStorage.getItem('moodChecked')) {
                setOpen(true);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleMood = (mood) => {
        sessionStorage.setItem('moodChecked', 'true');
        awardXP(10, `Daily Check-in: ${mood}`);
        setOpen(false);
    };

    const emojis = [
        { label: 'Energized', icon: '⚡', color: '#ffd600' },
        { label: 'Chill', icon: '🎧', color: '#10b981' },
        { label: 'Stressed', icon: '😤', color: '#ef4444' },
        { label: 'Confused', icon: '😵', color: '#6366f1' },
    ];

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="sm"
            TransitionComponent={Fade}
            transitionDuration={500}
            PaperProps={{
                sx: {
                    borderRadius: 10,
                    p: 4,
                    textAlign: 'center',
                    minWidth: { xs: '90%', sm: 500 },
                    bgcolor: 'background.glass',
                    backdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                    overflow: 'visible'
                }
            }}
        >
            <IconButton
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: 24, top: 24, color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.05)' }}
            >
                <CloseIcon />
            </IconButton>

            <Box sx={{ mb: 2 }}>
                <Typography variant="h3" fontWeight="950" sx={{ mb: 1, letterSpacing: '-0.04em' }}>
                    Vibe Check <Box component="span" sx={{ color: 'primary.main' }}>🧬</Box>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Syncing your biological state with the neural network.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2.5, justifyContent: 'center', mt: 4 }}>
                {emojis.map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.1, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Paper
                            onClick={() => handleMood(item.label)}
                            elevation={0}
                            sx={{
                                cursor: 'pointer',
                                p: 3,
                                width: { xs: 70, sm: 90 },
                                borderRadius: 5,
                                bgcolor: 'rgba(255,255,255,0.03)',
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                '&:hover': {
                                    boxShadow: `0 20px 40px ${item.color}22`,
                                    borderColor: item.color,
                                    bgcolor: `${item.color}11`
                                }
                            }}
                        >
                            <Typography sx={{ fontSize: { xs: '2rem', sm: '2.8rem' }, mb: 1.5 }}>{item.icon}</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: 1, fontSize: '0.65rem' }}>
                                {item.label.toUpperCase()}
                            </Typography>
                        </Paper>
                    </motion.div>
                ))}
            </Box>

            <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Box sx={{ px: 1.5, py: 0.5, borderRadius: 1.5, bgcolor: 'primary.main', color: 'white' }}>
                    <Typography variant="caption" fontWeight="900">+10 XP</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    LOGGING YOUR STATE REWARDS PROGRESS
                </Typography>
            </Box>
        </Dialog>
    );
};

export default MoodCheck;
