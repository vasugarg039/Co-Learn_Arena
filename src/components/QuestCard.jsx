import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ConstructionIcon from '@mui/icons-material/Construction';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const QuestCard = ({ quest, delay = 0 }) => {
    const navigate = useNavigate();

    const getTypeConfig = (type) => {
        switch (type) {
            case 'Sprint Quest': return { icon: <FlashOnIcon />, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' };
            case 'Explain Quest': return { icon: <PsychologyIcon />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' };
            case 'Battle Quest': return { icon: <SportsEsportsIcon />, color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' };
            case 'Fix-a-Friend': return { icon: <ConstructionIcon />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' };
            default: return { icon: <FlashOnIcon />, color: '#94a3b8', gradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' };
        }
    };

    const config = getTypeConfig(quest.type);

    return (
        <GlassCard
            delay={delay}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: `0 30px 60px ${config.color}22`,
                    borderColor: `${config.color}44`
                }
            }}
        >
            <Box sx={{
                height: 8,
                width: '100%',
                background: config.gradient
            }} />

            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Chip
                        icon={config.icon}
                        label={quest.type.toUpperCase()}
                        size="small"
                        sx={{
                            fontWeight: 900,
                            fontSize: '0.6rem',
                            bgcolor: 'rgba(255,255,255,0.05)',
                            color: config.color,
                            border: `1px solid ${config.color}44`,
                            borderRadius: 2,
                            letterSpacing: 1
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main' }}>
                            {quest.xp}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', fontSize: '0.6rem' }}>
                            XP
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.5, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {quest.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontWeight: 500, lineHeight: 1.6, flexGrow: 1 }}>
                    {quest.description}
                </Typography>

                <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {quest.tags.map(tag => (
                        <Typography
                            key={tag}
                            variant="caption"
                            sx={{
                                fontWeight: 800,
                                color: 'text.secondary',
                                bgcolor: 'rgba(255,255,255,0.03)',
                                px: 1, py: 0.5, borderRadius: 1,
                                fontSize: '0.65rem'
                            }}
                        >
                            #{tag.toUpperCase()}
                        </Typography>
                    ))}
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(`/quest/${quest.id}`)}
                    sx={{
                        borderRadius: 3,
                        background: config.gradient,
                        py: 2,
                        fontWeight: 900,
                        letterSpacing: '0.05em',
                        boxShadow: `0 10px 20px -5px ${config.color}44`,
                    }}
                >
                    INITIALIZE MISSION
                </Button>
            </CardContent>
        </GlassCard>
    );
};

export default QuestCard;
