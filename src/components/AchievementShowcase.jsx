import React from 'react';
import { Box, Typography, Chip, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AchievementShowcase = () => {
    const achievements = [
        {
            id: 1,
            title: 'First Steps',
            description: 'Complete your first quest',
            unlocked: true,
            icon: '🎯',
            progress: 100,
            rarity: 'common'
        },
        {
            id: 2,
            title: 'Speed Demon',
            description: 'Complete 5 quests in one day',
            unlocked: true,
            icon: '⚡',
            progress: 100,
            rarity: 'rare'
        },
        {
            id: 3,
            title: 'Knowledge Seeker',
            description: 'Earn 1000 XP',
            unlocked: false,
            icon: '📚',
            progress: 65,
            rarity: 'epic'
        },
        {
            id: 4,
            title: 'Team Player',
            description: 'Join a squad',
            unlocked: true,
            icon: '🤝',
            progress: 100,
            rarity: 'common'
        },
        {
            id: 5,
            title: 'Streak Master',
            description: 'Maintain a 7-day streak',
            unlocked: false,
            icon: '🔥',
            progress: 42,
            rarity: 'legendary'
        },
    ];

    const rarityColors = {
        common: '#9ca3af',
        rare: '#3b82f6',
        epic: '#a855f7',
        legendary: '#f59e0b'
    };

    return (
        <GlassCard sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <EmojiEventsIcon sx={{ color: '#fbbf24', fontSize: 24 }} />
                    <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -0.5 }}>
                        Achievements
                    </Typography>
                </Box>
                <Chip
                    label={`${achievements.filter(a => a.unlocked).length}/${achievements.length}`}
                    size="small"
                    sx={{ fontWeight: 800, bgcolor: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {achievements.map((achievement, index) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Box sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: achievement.unlocked ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${achievement.unlocked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)'}`,
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: achievement.unlocked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.04)',
                                transform: 'translateX(4px)'
                            }
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <Box sx={{
                                    fontSize: 32,
                                    filter: achievement.unlocked ? 'none' : 'grayscale(100%) opacity(0.3)',
                                    transition: 'filter 0.3s ease'
                                }}>
                                    {achievement.icon}
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight="800"
                                            sx={{
                                                color: achievement.unlocked ? 'text.primary' : 'text.secondary',
                                                opacity: achievement.unlocked ? 1 : 0.6
                                            }}
                                        >
                                            {achievement.title}
                                        </Typography>
                                        {achievement.unlocked ? (
                                            <CheckCircleIcon sx={{ fontSize: 16, color: '#10b981' }} />
                                        ) : (
                                            <LockIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                                        )}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: 'block', mb: 1, opacity: achievement.unlocked ? 0.8 : 0.5 }}
                                    >
                                        {achievement.description}
                                    </Typography>

                                    {!achievement.unlocked && (
                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                <Typography variant="caption" fontWeight="600" sx={{ fontSize: '0.7rem' }}>
                                                    Progress
                                                </Typography>
                                                <Typography variant="caption" fontWeight="800" color="primary.main" sx={{ fontSize: '0.7rem' }}>
                                                    {achievement.progress}%
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={achievement.progress}
                                                sx={{
                                                    height: 4,
                                                    borderRadius: 2,
                                                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: rarityColors[achievement.rarity],
                                                        borderRadius: 2
                                                    }
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            {/* Rarity indicator */}
                            <Box sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: rarityColors[achievement.rarity],
                                boxShadow: `0 0 8px ${rarityColors[achievement.rarity]}`
                            }} />
                        </Box>
                    </motion.div>
                ))}
            </Box>
        </GlassCard>
    );
};

export default AchievementShowcase;
