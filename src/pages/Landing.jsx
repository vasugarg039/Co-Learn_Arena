import React from 'react';
import { Box, Typography, Button, Container, Grid, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        { icon: <GroupsIcon fontSize="large" />, title: "Squad-Based Learning", desc: "Don't study alone. Join squads of 5 and conquer challenges together." },
        { icon: <SportsEsportsIcon fontSize="large" />, title: "Gamified Quests", desc: "Earn XP, unlock badges, and level up your skills through interactive missions." },
        { icon: <PsychologyIcon fontSize="large" />, title: "AI Study Buddy", desc: "Your personal mentor 'Omnis AI' guides your path and answers every doubt." },
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Ambient Background Elements */}
            <Box sx={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                filter: 'blur(100px)',
                zIndex: 0
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '5%',
                left: '-5%',
                width: '30vw',
                height: '30vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)',
                zIndex: 0
            }} />

            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 20 }, pb: 10, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={8} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 10, bgcolor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', mb: 4 }}>
                                <Typography variant="caption" fontWeight="bold" color="primary.light" sx={{ letterSpacing: 2 }}>
                                    FUTURE OF COLLABORATIVE LEARNING
                                </Typography>
                            </Box>
                            <Typography variant="h1" gutterBottom>
                                Learn Faster. <br />
                                <Box component="span" sx={{
                                    background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>
                                    Together.
                                </Box>
                            </Typography>
                            <Typography variant="h5" color="text.secondary" sx={{ mb: 6, maxWidth: 550, fontWeight: 400, lineHeight: 1.6 }}>
                                CoLearn is the world's first gamified squad-learning platform. Transform your study routine into an epic adventure with real-time collaboration.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate('/')}
                                    startIcon={<RocketLaunchIcon />}
                                    sx={{
                                        height: 64,
                                        px: 6,
                                        fontSize: '1.2rem',
                                        boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.5)'
                                    }}
                                >
                                    Start Your Legend
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{ height: 64, px: 6, fontSize: '1.1rem', borderColor: 'rgba(255,255,255,0.1)' }}
                                >
                                    Watch Trailer
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Box sx={{
                            position: 'relative',
                            animation: `${float} 6s ease-in-out infinite`,
                            perspective: '1000px'
                        }}>
                            <GlassCard
                                intensity={1.5}
                                sx={{
                                    p: 4,
                                    transform: 'rotateY(-10deg) rotateX(10deg)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)'
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10b981' }} />
                                </Box>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>Squad Dashboard</Typography>
                                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {[1, 2, 3].map(i => (
                                        <Box key={i} sx={{ h: 40, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, width: `${100 - i * 15}%`, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'primary.main' }} />
                                            <Box sx={{ h: 8, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, flex: 1 }} />
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="subtitle2" color="primary.light">+500 XP Earned</Typography>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
                                        <Typography variant="caption" fontWeight="bold">LEVEL UP!</Typography>
                                    </Box>
                                </Box>
                            </GlassCard>
                        </Box>
                    </Grid>
                </Grid>

                {/* Features Grid */}
                <Grid container spacing={4} sx={{ mt: { xs: 10, md: 20 } }}>
                    {features.map((f, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <GlassCard sx={{ p: 4, height: '100%' }}>
                                    <Box sx={{
                                        color: 'primary.main',
                                        mb: 3,
                                        p: 2,
                                        borderRadius: 4,
                                        bgcolor: 'rgba(99, 102, 241, 0.1)',
                                        width: 'fit-content'
                                    }}>
                                        {f.icon}
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>{f.title}</Typography>
                                    <Typography color="text.secondary">{f.desc}</Typography>
                                </GlassCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer Decorative Line */}
            <Box sx={{
                height: '1px',
                width: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
                my: 10
            }} />
        </Box>
    );
};

export default Landing;
