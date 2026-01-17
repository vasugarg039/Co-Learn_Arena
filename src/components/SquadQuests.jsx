import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Chip } from '@mui/material';
import GlassCard from './GlassCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SquadQuests = ({ squad, height = 500 }) => {
    // Simulated quest data for MVP - in a real app, this would query a 'completedQuests' collection
    // or aggregate data from member profiles.
    const [teamActivity, setTeamActivity] = useState([]);

    useEffect(() => {
        if (!squad?.members) return;

        // Simulate activity feed based on squad members
        const sampleQuests = [
            "Intro to React", "State Management", "Async JS", "Flexbox Mastery", "API Integration"
        ];

        const generatedActivity = squad.members.flatMap(member => {
            // Randomly assign 1-2 completed quests to each member for demo
            const numQuests = Math.floor(Math.random() * 2) + 1;
            return Array(numQuests).fill(0).map((_, i) => ({
                id: `${member.uid}-${i}`,
                user: member,
                quest: sampleQuests[Math.floor(Math.random() * sampleQuests.length)],
                time: `${Math.floor(Math.random() * 24)}h ago`
            }));
        }).sort(() => 0.5 - Math.random()); // Shuffle

        setTeamActivity(generatedActivity.slice(0, 6)); // Top 6 recent
    }, [squad]);

    return (
        <GlassCard sx={{ height: height, display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography variant="subtitle1" fontWeight="bold">Squad Victories</Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                <List sx={{ p: 0 }}>
                    {teamActivity.map((activity, index) => (
                        <ListItem key={index} divider sx={{ px: 2, py: 1.5 }}>
                            <ListItemAvatar>
                                <Avatar src={activity.user.avatar} sx={{ width: 36, height: 36 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.primary' }}>
                                        {activity.user.name}
                                    </Typography>
                                }
                                secondary={
                                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                        <CheckCircleIcon sx={{ fontSize: 14, color: '#10b981' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            Completed: {activity.quest}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <Chip label={activity.time} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                        </ListItem>
                    ))}
                    {teamActivity.length === 0 && (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                No recent quest activity recorded.
                            </Typography>
                        </Box>
                    )}
                </List>
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Typography variant="caption" color="text.secondary" align="center" display="block">
                    Latest completions from your squad.
                </Typography>
            </Box>
        </GlassCard>
    );
};

export default SquadQuests;
