import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';

const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: 'xp_earned',
            message: 'Earned 250 XP',
            detail: 'Completed "React Hooks Deep Dive"',
            time: '5 mins ago',
            icon: <TrendingUpIcon sx={{ fontSize: 20 }} />,
            color: '#6366f1',
            bgColor: 'rgba(99, 102, 241, 0.1)'
        },
        {
            id: 2,
            type: 'achievement',
            message: 'Achievement Unlocked!',
            detail: 'Speed Demon - 5 quests in one day',
            time: '1 hour ago',
            icon: <EmojiEventsIcon sx={{ fontSize: 20 }} />,
            color: '#fbbf24',
            bgColor: 'rgba(251, 191, 36, 0.1)'
        },
        {
            id: 3,
            type: 'squad',
            message: 'Squad Activity',
            detail: 'Alex joined your squad',
            time: '2 hours ago',
            icon: <GroupsIcon sx={{ fontSize: 20 }} />,
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)'
        },
        {
            id: 4,
            type: 'quest',
            message: 'Quest Started',
            detail: 'JavaScript Algorithms Challenge',
            time: '3 hours ago',
            icon: <SchoolIcon sx={{ fontSize: 20 }} />,
            color: '#a855f7',
            bgColor: 'rgba(168, 85, 247, 0.1)'
        },
        {
            id: 5,
            type: 'level_up',
            message: 'Level Up!',
            detail: 'Reached Level 5',
            time: '1 day ago',
            icon: <TrendingUpIcon sx={{ fontSize: 20 }} />,
            color: '#f97316',
            bgColor: 'rgba(249, 115, 22, 0.1)'
        }
    ];

    return (
        <GlassCard sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <HistoryIcon sx={{ color: '#6366f1', fontSize: 24 }} />
                <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -0.5 }}>
                    Recent Activity
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            p: 1.5,
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.03)',
                                transform: 'translateX(4px)'
                            }
                        }}>
                            {/* Icon */}
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: activity.bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: activity.color,
                                flexShrink: 0
                            }}>
                                {activity.icon}
                            </Box>

                            {/* Content */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="700"
                                    sx={{
                                        mb: 0.25,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {activity.message}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: 'block',
                                        mb: 0.5,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {activity.detail}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: activity.color,
                                        fontWeight: 600,
                                        fontSize: '0.7rem'
                                    }}
                                >
                                    {activity.time}
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>
                ))}
            </Box>
        </GlassCard>
    );
};

export default RecentActivity;
