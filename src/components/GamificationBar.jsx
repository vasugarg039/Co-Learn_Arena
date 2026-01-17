import React from 'react';
import { Box, Typography, Paper, Divider, LinearProgress, Avatar, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const GamificationBar = () => {
    const { stats, soundEnabled, toggleSound, rewardQueue, clearReward } = useGamification();

    const xpProgress = ((stats.xp % 1000) / 1000) * 100;
    const energyProgress = (stats.energy / (stats.maxEnergy || 100)) * 100;

    return (
        <>
            <Box sx={{ position: 'fixed', top: 24, left: 0, right: 0, px: 4, zIndex: 1200, display: 'flex', justifyContent: 'center' }}>
                <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', damping: 20 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 1.5,
                            px: 4,
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 2, md: 4 },
                            bgcolor: 'background.glass',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            background: (theme) => theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)'
                                : 'rgba(255,255,255,0.8)'
                        }}
                    >
                        {/* Level & Player */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar sx={{
                                    bgcolor: 'primary.main',
                                    width: 44,
                                    height: 44,
                                    fontSize: '1.1rem',
                                    fontWeight: 900,
                                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)',
                                    border: '2px solid rgba(255,255,255,0.2)'
                                }}>
                                    {stats.level}
                                </Avatar>
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: -5,
                                    right: -5,
                                    bgcolor: 'secondary.main',
                                    borderRadius: '50%',
                                    width: 20,
                                    height: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid #000'
                                }}>
                                    <Typography sx={{ fontSize: '0.6rem', fontWeight: 900 }}>P</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                                <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.6rem', color: 'primary.light', letterSpacing: 1.5, textTransform: 'uppercase' }}>{stats.currentTitle || 'NOVICE'}</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 900, mt: -0.5 }}>PLAYER_ONE</Typography>
                            </Box>
                        </Box>

                        <Divider orientation="vertical" flexItem sx={{ opacity: 0.1 }} />

                        {/* XP Meter */}
                        <Box sx={{ width: { xs: 80, sm: 120, md: 160 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                                <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.6rem', color: 'primary.light' }}>XP FLOW</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.6rem' }}>{stats.xp % 1000}/1000</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={xpProgress || 0}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        background: 'linear-gradient(90deg, #6366f1, #a855f7)'
                                    }
                                }}
                            />
                        </Box>

                        {/* Currency: Coins */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MonetizationOnIcon sx={{ color: '#fbbf24', fontSize: 24 }} />
                            <Typography variant="body1" sx={{ fontWeight: 900, color: '#fbbf24' }}>{stats.coins || 0}</Typography>
                        </Box>

                        {/* Energy Meter */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ width: 80, display: { xs: 'none', md: 'block' } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.6rem', color: '#10b981' }}>ENERGY</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.6rem' }}>{stats.energy}%</Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={energyProgress || 0}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: 4,
                                            background: 'linear-gradient(90deg, #10b981, #34d399)'
                                        }
                                    }}
                                />
                            </Box>
                            <BatteryChargingFullIcon sx={{ color: '#10b981', display: { xs: 'block', md: 'none' } }} />
                        </Box>

                        <Divider orientation="vertical" flexItem sx={{ opacity: 0.1 }} />

                        {/* Streak */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <motion.div animate={{ scale: [1, 1.2, 1], filter: ['drop-shadow(0 0 0px #f97316)', 'drop-shadow(0 0 8px #f97316)', 'drop-shadow(0 0 0px #f97316)'] }} transition={{ repeat: Infinity, duration: 2 }}>
                                <LocalFireDepartmentIcon sx={{ color: '#f97316', fontSize: 28 }} />
                            </motion.div>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>{stats.streak || 1}</Typography>
                        </Box>

                        <Divider orientation="vertical" flexItem sx={{ opacity: 0.1 }} />

                        {/* Sound & Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton size="small" onClick={toggleSound} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                                {soundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
                            </IconButton>
                        </Box>
                    </Paper>
                </motion.div>
            </Box>

            {/* Micro-Rewards Popups */}
            <Box sx={{ position: 'fixed', top: 120, right: 32, zIndex: 1300, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                <AnimatePresence>
                    {rewardQueue.map((reward) => (
                        <motion.div
                            key={reward.id}
                            initial={{ x: 100, opacity: 0, scale: 0.8 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: 50, opacity: 0, scale: 0.8 }}
                            onAnimationComplete={() => setTimeout(() => clearReward(reward.id), 4000)}
                        >
                            <Paper sx={{
                                p: 2,
                                px: 4,
                                borderRadius: 4,
                                bgcolor: reward.type === 'levelup' ? 'primary.main' : 'secondary.main',
                                color: 'white',
                                boxShadow: reward.type === 'levelup' ? '0 10px 40px rgba(99, 102, 241, 0.4)' : '0 10px 30px rgba(16, 185, 129, 0.3)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <Typography variant="h4" sx={{ mb: -0.5 }}>{reward.type === 'levelup' ? '⭐' : '🏆'}</Typography>
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.8, letterSpacing: 1.5 }}>ACHIEVEMENT UNLOCKED</Typography>
                                    <Typography variant="body1" fontWeight="900" sx={{ mt: -0.5 }}>{reward.message}</Typography>
                                </Box>
                            </Paper>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Box>
        </>
    );
};

export default GamificationBar;
