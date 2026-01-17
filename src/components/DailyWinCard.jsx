import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Chip, Snackbar, Alert } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LockIcon from '@mui/icons-material/Lock';
import { motion } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';
import GlassCard from './GlassCard';

const DailyWinCard = () => {
    const { dailyChallenge, completeDailyChallenge } = useGamification();
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

    if (!dailyChallenge) return null;

    const isCompleted = dailyChallenge?.completed || false;

    const submitQuiz = async () => {
        if (!selectedOption) return;
        setLoading(true);

        const result = await completeDailyChallenge(selectedOption);
        setToast({
            open: true,
            message: result.message,
            severity: result.success ? 'success' : 'error'
        });

        setLoading(false);
        if (result.success) {
            setSelectedOption('');
        }
    };

    return (
        <GlassCard sx={{ p: 0, position: 'relative', overflow: 'hidden', minHeight: 280, display: 'flex' }}>
            {/* Background Accent */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #6366f1, #10b981)' }} />

            <Grid container>
                {/* LEFT: Mission Intel */}
                <Grid item xs={12} md={7} sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Box sx={{
                            width: 8, height: 8, borderRadius: '50%',
                            bgcolor: isCompleted ? '#10b981' : '#f59e0b',
                            boxShadow: isCompleted ? '0 0 10px #10b981' : '0 0 10px #f59e0b'
                        }} />
                        <Typography variant="overline" color="text.secondary" fontWeight="800" sx={{ letterSpacing: 2 }}>
                            {isCompleted ? 'MISSION COMPLETE' : 'DAILY OBJECTIVE'}
                        </Typography>
                    </Box>

                    <Typography variant="h4" fontWeight="900" sx={{ mb: 1, color: 'white' }}>
                        {dailyChallenge?.title || 'System Reboot'}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '90%' }}>
                        {dailyChallenge?.description || 'Complete a system diagnostic check to restore grid functionality.'}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Chip icon={<EmojiEventsIcon />} label={`${dailyChallenge?.xpReward || 50} XP`} sx={{ fontWeight: 800, bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.light' }} />
                        <Chip icon={<MonetizationOnIcon />} label={`${dailyChallenge?.coins || 20} Coins`} sx={{ fontWeight: 800, bgcolor: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }} />
                    </Box>
                </Grid>

                {/* RIGHT: Validation Protocol (Quiz) */}
                <Grid item xs={12} md={5} sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                    {!isCompleted ? (
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <LockIcon color="disabled" fontSize="small" />
                                <Typography variant="subtitle2" fontWeight="800" color="text.secondary">VALIDATION REQUIRED</Typography>
                            </Box>

                            <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 2 }}>
                                {dailyChallenge?.quizQuestion || "What is the primary function of the JVM?"}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {dailyChallenge?.options?.map((option, idx) => (
                                    <Button
                                        key={idx}
                                        variant={selectedOption === option ? "contained" : "outlined"}
                                        color={selectedOption === option ? "primary" : "inherit"}
                                        onClick={() => setSelectedOption(option)}
                                        sx={{ justifyContent: 'flex-start', textAlign: 'left', px: 2, borderColor: 'rgba(255,255,255,0.1)' }}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                disabled={!selectedOption || loading}
                                onClick={submitQuiz}
                                sx={{ mt: 3, background: 'white', color: 'black', '&:hover': { bgcolor: '#f3f4f6' } }}
                            >
                                {loading ? 'Verifying...' : 'Submit Answer'}
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component={motion.div}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                sx={{
                                    width: 80, height: 80, mx: 'auto', mb: 2,
                                    borderRadius: '50%', bgcolor: 'rgba(16, 185, 129, 0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '2px solid #10b981'
                                }}
                            >
                                <CheckCircleIcon sx={{ fontSize: 40, color: '#10b981' }} />
                            </Box>
                            <Typography variant="h6" fontWeight="900" color="#10b981">ACCESS GRANTED</Typography>
                            <Typography variant="caption" color="text.secondary">Rewards deposited to your account.</Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>

            {/* Remove separate QuizModal logic as it is now embedded */}
            <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
                <Alert severity={toast.severity} variant="filled" onClose={() => setToast({ ...toast, open: false })}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </GlassCard>
    );
};
export default DailyWinCard;
