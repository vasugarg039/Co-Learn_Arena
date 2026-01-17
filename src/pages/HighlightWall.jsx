import React from 'react';
import { Box, Typography, Grid, Container, Avatar, Chip, Button, Fade } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const MOCK_HIGHLIGHTS = [
    { name: "Rahul Sharma", title: "ELITE ARCHITECT", desc: "Completed 15 Explain Quests with 98% accuracy.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", rank: "Top 1%" },
    { name: "Squad Void", title: "LEGENDARY SYNERGY", desc: "Highest collaboration score this season.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha", rank: "#1 Squad" },
    { name: "Anjali Gupta", title: "CODE SENTINEL", desc: "Resolved 50+ critical squad blockers.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali", rank: "Guardian" }
];

const HighlightWall = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
            {/* Ambient Background */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 10 }, position: 'relative', zIndex: 1 }}>
                <Fade in timeout={800}>
                    <Box>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/dashboard')}
                            sx={{ mb: 6, fontWeight: 900, borderRadius: 3 }}
                            variant="outlined"
                        >
                            Return to HQ
                        </Button>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 10 }}>
                            <Box sx={{ p: 2.5, borderRadius: 5, bgcolor: 'rgba(249, 115, 22, 0.1)', color: '#f97316', boxShadow: '0 10px 30px rgba(249, 115, 22, 0.2)' }}>
                                <EmojiEventsIcon sx={{ fontSize: 48 }} />
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ fontWeight: 950, letterSpacing: '-0.04em' }}>Hall of Fame</Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>Celebrating the elite 0.1% of the CoLearn network.</Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={6} alignItems="stretch">
                            {MOCK_HIGHLIGHTS.map((item, idx) => (
                                <Grid item xs={12} md={4} key={idx}>
                                    <GlassCard
                                        delay={idx * 0.2}
                                        intensity={idx === 1 ? 1.5 : 1}
                                        sx={{
                                            p: 4,
                                            height: '100%',
                                            textAlign: 'center',
                                            position: 'relative',
                                            ...(idx === 1 && {
                                                border: '2px solid rgba(99, 102, 241, 0.3)',
                                                transform: 'scale(1.05)',
                                                zIndex: 10,
                                                boxShadow: '0 40px 80px rgba(0,0,0,0.5)'
                                            })
                                        }}
                                    >
                                        {/* Rank Badge */}
                                        <Box sx={{
                                            position: 'absolute',
                                            top: -20,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: idx === 1 ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.05)',
                                            px: 3, py: 1,
                                            borderRadius: 5,
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                            zIndex: 5
                                        }}>
                                            <Typography variant="caption" fontWeight="950" sx={{ letterSpacing: 2, color: idx === 1 ? 'white' : 'text.secondary' }}>
                                                {item.rank}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ position: 'relative', display: 'inline-block', mt: 4, mb: 3 }}>
                                            <Avatar
                                                src={item.avatar}
                                                sx={{
                                                    width: 120,
                                                    height: 120,
                                                    border: '4px solid',
                                                    borderColor: idx === 1 ? 'primary.main' : 'background.paper',
                                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                                }}
                                            />
                                            {idx === 1 && (
                                                <Box sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#f97316', borderRadius: '50%', p: 1, boxShadow: '0 0 20px #f97316' }}>
                                                    <StarIcon sx={{ color: 'white', fontSize: 24 }} />
                                                </Box>
                                            )}
                                        </Box>

                                        <Typography variant="h4" fontWeight="950" sx={{ mb: 1 }}>{item.name}</Typography>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 900,
                                                color: idx === 1 ? 'primary.light' : 'secondary.main',
                                                letterSpacing: 2,
                                                mb: 3
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontStyle: item.desc.includes('Bug') ? 'italic' : 'normal' }}>
                                            "{item.desc}"
                                        </Typography>

                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                            startIcon={<WorkspacePremiumIcon />}
                                            sx={{ borderRadius: 3, fontWeight: 900, borderColor: 'rgba(255,255,255,0.1)' }}
                                        >
                                            VIEW PROFILE
                                        </Button>
                                    </GlassCard>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Social Verification Footer */}
                        <Box sx={{ mt: 15, textAlign: 'center', opacity: 0.4 }}>
                            <Typography variant="caption" fontWeight="800" sx={{ letterSpacing: 5 }}>IMMUTABLE SYSTEM RECORD • UPDATED 4H AGO</Typography>
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default HighlightWall;
