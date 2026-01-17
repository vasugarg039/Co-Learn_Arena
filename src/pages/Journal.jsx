import React from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText, Chip, Divider, Button, Fade } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import HistoryIcon from '@mui/icons-material/History';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Journal = () => {
    const navigate = useNavigate();
    const history = JSON.parse(localStorage.getItem('questHistory') || '[]');
    const totalXP = history.reduce((acc, curr) => acc + (curr.xp || 0), 0);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
            {/* Background Accent */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 40%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <Container maxWidth="md" sx={{ pt: { xs: 4, md: 10 }, position: 'relative', zIndex: 1 }}>
                <Fade in timeout={800}>
                    <Box>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/dashboard')}
                            sx={{ mb: 6, fontWeight: 900, borderRadius: 3 }}
                            variant="outlined"
                        >
                            Back to HQ
                        </Button>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 6 }}>
                            <Box sx={{ p: 2, borderRadius: 4, bgcolor: 'rgba(16, 185, 129, 0.1)', color: 'secondary.main' }}>
                                <AutoStoriesIcon fontSize="large" />
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ fontWeight: 950, letterSpacing: '-0.04em' }}>Learning Journal</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>Your immutable path to mastery.</Typography>
                            </Box>
                        </Box>

                        <GlassCard sx={{ p: 6, mb: 6, textAlign: 'center', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)' }}>
                            <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: 2, opacity: 0.7, mb: 1 }}>TOTAL XP ACCUMULATED</Typography>
                            <Typography variant="h1" fontWeight="950" sx={{ color: 'primary.main' }}>{totalXP}</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontWeight: 600 }}>SYSTEM VERIFIED PROGRESS</Typography>
                        </GlassCard>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, ml: 1 }}>
                            <HistoryIcon sx={{ color: 'text.secondary' }} />
                            <Typography variant="h4" fontWeight="950" sx={{ letterSpacing: '-0.02em' }}>Quest History</Typography>
                        </Box>

                        <GlassCard sx={{ p: 0, overflow: 'hidden' }}>
                            <List sx={{ p: 0 }}>
                                {history.length === 0 ? (
                                    <ListItem sx={{ py: 8, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Typography variant="h5" color="text.secondary" fontWeight="700">NO ARCHIVES FOUND</Typography>
                                        <Typography variant="body1" color="text.secondary">Your achievements will appear here as you conquer quests.</Typography>
                                    </ListItem>
                                ) : (
                                    history.map((quest, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem sx={{
                                                py: 4, px: { xs: 3, md: 6 },
                                                transition: 'all 0.3s',
                                                '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                                            }}>
                                                <ListItemText
                                                    primary={quest.title}
                                                    secondary={new Date(quest.completedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                    primaryTypographyProps={{ variant: 'h6', fontWeight: 900, mb: 0.5 }}
                                                    secondaryTypographyProps={{ variant: 'caption', fontWeight: 700, sx: { letterSpacing: 1, opacity: 0.7 } }}
                                                />
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                                                        <Typography variant="h4" color="secondary.main" fontWeight="900">{quest.vibe}</Typography>
                                                        <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.5 }}>STATE</Typography>
                                                    </Box>
                                                    <Box sx={{ px: 2, py: 1, borderRadius: 2, bgcolor: 'primary.main', minWidth: 100, textAlign: 'center' }}>
                                                        <Typography variant="subtitle1" fontWeight="950" color="white">+{quest.xp} XP</Typography>
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                            {index < history.length - 1 && <Divider sx={{ opacity: 0.05 }} />}
                                        </React.Fragment>
                                    ))
                                )}
                            </List>
                        </GlassCard>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Journal;
