import React from 'react';
import { Box, Typography, Avatar, Chip, CircularProgress } from '@mui/material';
import GlassCard from '../GlassCard';

const IdentityCard = ({ user }) => {
    return (
        <GlassCard sx={{ p: 0, overflow: 'hidden' }}>
            {/* Header Gradient */}
            <Box sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
                p: 3,
                textAlign: 'center'
            }}>
                <Avatar
                    src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                    sx={{
                        width: 80,
                        height: 80,
                        border: '4px solid rgba(255,255,255,0.3)',
                        mx: 'auto',
                        mb: 1.5,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }}
                />
                <Typography variant="h6" fontWeight="900" sx={{ color: 'white', mb: 0.5 }}>
                    {user?.name || "Cadet"}
                </Typography>
                <Chip
                    label={`Level ${user?.level || 1} Warrior`}
                    size="small"
                    sx={{
                        fontWeight: 800,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                    }}
                />
            </Box>

            {/* Stats Section */}
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ mb: 2 }}>
                    Progress to Next Level
                </Typography>

                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        value={100}
                        size={80}
                        thickness={4}
                        sx={{ color: 'rgba(255,255,255,0.1)' }}
                    />
                    <CircularProgress
                        variant="determinate"
                        value={Math.round(((user?.xp || 0) % 1000) / 10)}
                        size={80}
                        thickness={4}
                        sx={{
                            color: 'primary.main',
                            position: 'absolute',
                            left: 0,
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" component="div" fontWeight="900" color="text.primary">
                            {`${Math.round(((user?.xp || 0) % 1000) / 10)}%`}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </GlassCard>
    );
};

export default IdentityCard;
