import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, LinearProgress, Avatar, Chip } from '@mui/material';
import GlassCard from './GlassCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const SquadAchievements = ({ squad, height = 500 }) => {
    // Simulated achievements for MVP
    const achievements = [
        {
            id: 1,
            title: "Early Risers",
            description: "5 Members active before 8AM",
            icon: <WhatshotIcon sx={{ color: '#f59e0b' }} />,
            progress: 80,
            target: "4/5",
            completed: false
        },
        {
            id: 2,
            title: "Code Warriors",
            description: "Team completed 50 quests total",
            icon: <StarIcon sx={{ color: '#a855f7' }} />,
            progress: 100,
            target: "50/50",
            completed: true
        },
        {
            id: 3,
            title: "Squad Goals",
            description: "Reach Level 10 Composite",
            icon: <EmojiEventsIcon sx={{ color: '#10b981' }} />,
            progress: 45,
            target: "Lvl 4.5",
            completed: false
        }
    ];

    return (
        <GlassCard sx={{ display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden', height: height }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiEventsIcon sx={{ color: '#fbbf24' }} />
                <Typography variant="subtitle1" fontWeight="bold">Squad Trophy Case</Typography>
            </Box>

            <List sx={{ p: 0 }}>
                {achievements.map((ach) => (
                    <ListItem key={ach.id} divider sx={{ px: 2, py: 2, display: 'block' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.05)', width: 40, height: 40 }}>
                                {ach.icon}
                            </Avatar>
                            <ListItemText
                                primary={<Typography variant="subtitle2" fontWeight="bold">{ach.title}</Typography>}
                                secondary={<Typography variant="caption" color="text.secondary">{ach.description}</Typography>}
                            />
                            {ach.completed && <Chip label="DONE" color="success" size="small" sx={{ height: 20, fontSize: '0.6rem', fontWeight: 'bold' }} />}
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="caption" fontWeight="bold" color="primary.main">{ach.progress}%</Typography>
                                <Typography variant="caption" color="text.secondary">{ach.target}</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={ach.progress}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        background: ach.completed ? '#10b981' : 'linear-gradient(90deg, #6366f1, #a855f7)'
                                    }
                                }}
                            />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </GlassCard>
    );
};

export default SquadAchievements;
