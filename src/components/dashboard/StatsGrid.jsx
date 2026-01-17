import React, { useState } from 'react';
import { Grid, Box, Typography, Dialog, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import GlassCard from '../GlassCard';
import StreakCalendar from '../StreakCalendar';

const StatsGrid = ({ user }) => {
    const [openStreak, setOpenStreak] = useState(false);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                    <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                            <StarIcon sx={{ color: '#fbbf24', fontSize: 20 }} />
                            <Typography variant="h5" fontWeight="900">{user?.xp || 0}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="600">Total XP</Typography>
                    </GlassCard>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                            <TrendingUpIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                            <Typography variant="h5" fontWeight="900">{user?.level || 1}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="600">Level</Typography>
                    </GlassCard>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <GlassCard
                        sx={{
                            p: 2.5,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)', bgcolor: 'rgba(249, 115, 22, 0.1)' }
                        }}
                        onClick={() => setOpenStreak(true)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                            <LocalFireDepartmentIcon sx={{ color: '#f97316', fontSize: 20 }} />
                            <Typography variant="h5" fontWeight="900">{user?.streak || 0}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="600">Day Streak</Typography>
                    </GlassCard>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <GlassCard sx={{ p: 2.5, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                            <EmojiEventsIcon sx={{ color: '#10b981', fontSize: 20 }} />
                            <Typography variant="h5" fontWeight="900">{user?.achievements?.length || 0}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="600">Achievements</Typography>
                    </GlassCard>
                </Grid>
            </Grid>

            {/* Streak Details Modal */}
            <Dialog
                open={openStreak}
                onClose={() => setOpenStreak(false)}
                PaperProps={{
                    sx: {
                        bgcolor: '#1a1b1e',
                        color: 'white',
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.1)',
                        minWidth: '500px',
                        p: 1
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => setOpenStreak(false)} sx={{ color: 'text.secondary' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ px: 3, pb: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <LocalFireDepartmentIcon sx={{ fontSize: 60, color: '#f97316', mb: 2 }} />
                        <Typography variant="h4" fontWeight="900" gutterBottom>
                            {user?.streak || 0} Day Streak!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Consistency is key. Keep the fire burning!
                        </Typography>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Activity History</Typography>
                    <StreakCalendar activityLog={user?.activityLog} />
                </Box>
            </Dialog>
        </>
    );
};

export default StatsGrid;
