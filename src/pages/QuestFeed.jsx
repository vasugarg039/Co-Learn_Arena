import React, { useState } from 'react';
import { Box, Typography, Grid, Container, Button, Chip, Fade } from '@mui/material';
import { QUESTS } from '../data/quests';
import QuestCard from '../components/QuestCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuestFeed = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const [filter, setFilter] = useState(initialCategory);

    const categories = ['All', 'DSA', 'Web Dev', 'AI', 'System Design', 'OS', 'Boss Raid'];

    const filteredQuests = filter === 'All'
        ? QUESTS
        : QUESTS.filter(q => q.tags.includes(filter) || q.tags.some(t => t.toLowerCase() === filter.toLowerCase()));

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
            {/* Background Blur */}
            <Box sx={{
                position: 'fixed',
                top: '0',
                right: '0',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 10 }, position: 'relative', zIndex: 1 }}>
                <Fade in timeout={800}>
                    <Box sx={{ mb: 8 }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/dashboard')}
                            sx={{ mb: 6, fontWeight: 900, borderRadius: 3, px: 3 }}
                            variant="outlined"
                        >
                            Return to HQ
                        </Button>

                        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
                            Quest Terminal
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400, maxWidth: 600 }}>
                            Select an operational objective. Complete missions with your squad to achieve mastery and earn legendary XP.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 8 }}>
                            {categories.map(cat => (
                                <Chip
                                    key={cat}
                                    label={cat.toUpperCase()}
                                    onClick={() => setFilter(cat)}
                                    sx={{
                                        fontWeight: 900,
                                        px: 2.5, py: 3,
                                        borderRadius: 3,
                                        fontSize: '0.7rem',
                                        letterSpacing: 1,
                                        bgcolor: filter === cat ? 'primary.main' : 'background.glass',
                                        color: filter === cat ? 'white' : 'text.primary',
                                        border: filter === cat ? 'none' : '1px solid rgba(255,255,255,0.05)',
                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            bgcolor: filter === cat ? 'primary.dark' : 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Fade>

                <Grid container spacing={4}>
                    {filteredQuests.map((quest, index) => (
                        <Grid item xs={12} sm={6} md={4} key={quest.id}>
                            <QuestCard quest={quest} delay={index * 0.1} />
                        </Grid>
                    ))}
                </Grid>

                {filteredQuests.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 15, opacity: 0.5 }}>
                        <Typography variant="h4" fontWeight="800">NO OBJECTIVES FOUND</Typography>
                        <Typography variant="body1">Try adjusting your filters to find active missions.</Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default QuestFeed;
