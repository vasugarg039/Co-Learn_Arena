import React from 'react';
import { Box, Typography, Avatar, Paper, Grid, Chip, Tab, Tabs } from '@mui/material';
import { motion } from 'framer-motion';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import GlassCard from './GlassCard';

const Leaderboard = () => {
    const [tab, setTab] = React.useState(0);

    const TOP_PLAYERS = [
        { id: 1, name: 'CyberSamurai', xp: 12500, level: 12, rank: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam' },
        { id: 2, name: 'GlitchMaster', xp: 11200, level: 11, rank: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Glitch' },
        { id: 3, name: 'NodeNinja', xp: 10800, level: 10, rank: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Node' },
        { id: 4, name: 'ByteCommander', xp: 9500, level: 9, rank: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Byte' },
        { id: 5, name: 'PixelPaladin', xp: 8900, level: 8, rank: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel' },
    ];

    const SQUADS = [
        { id: 1, name: 'Void Walkers', members: 5, avgXP: 9800, rank: 1 },
        { id: 2, name: 'Binary Beasts', members: 4, avgXP: 8500, rank: 2 },
        { id: 3, name: 'Logic Lords', members: 6, avgXP: 7200, rank: 3 },
    ];

    return (
        <GlassCard sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <TrophyIcon sx={{ color: 'accent.orange', fontSize: 32 }} />
                <Typography variant="h5" fontWeight="900">HALL OF FAME</Typography>
            </Box>

            <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 4, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Tab label="PLAYERS" sx={{ fontWeight: 900, letterSpacing: 1 }} />
                <Tab label="SQUADS" sx={{ fontWeight: 900, letterSpacing: 1 }} />
            </Tabs>

            {tab === 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {TOP_PLAYERS.map((player, index) => (
                        <motion.div
                            key={player.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                bgcolor: 'background.default',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: 3,
                                '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.05)', borderColor: 'primary.main' }
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="h6" fontWeight="900" sx={{ width: 30, color: index < 3 ? 'accent.orange' : 'text.secondary' }}>
                                        #{player.rank}
                                    </Typography>
                                    <Avatar src={player.avatar} sx={{ width: 40, height: 40 }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="900">{player.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">Level {player.level}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" fontWeight="900" color="primary.light">{player.xp}</Typography>
                                    <Typography variant="caption" sx={{ letterSpacing: 1, fontWeight: 900, opacity: 0.5 }}>XP</Typography>
                                </Box>
                            </Paper>
                        </motion.div>
                    ))}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {SQUADS.map((squad, index) => (
                        <motion.div
                            key={squad.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                bgcolor: 'background.default',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: 3
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <MilitaryTechIcon sx={{ color: index === 0 ? 'accent.orange' : 'text.secondary' }} />
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="900">{squad.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">{squad.members} Members</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" fontWeight="900" color="secondary.main">{squad.avgXP}</Typography>
                                    <Typography variant="caption" sx={{ letterSpacing: 1, fontWeight: 900, opacity: 0.5 }}>AVG XP</Typography>
                                </Box>
                            </Paper>
                        </motion.div>
                    ))}
                </Box>
            )}
        </GlassCard>
    );
};

export default Leaderboard;
