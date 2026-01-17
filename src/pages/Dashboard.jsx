import React, { useRef, useState } from 'react';
import { Box, Typography, Grid, Button, Avatar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import GroupsIcon from '@mui/icons-material/Groups';
import BoltIcon from '@mui/icons-material/Bolt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { useSquad } from '../context/SquadContext';
import { useGamification } from '../context/GamificationContext';
import useSEO from '../hooks/useSEO';

// Component Imports
import GlassCard from '../components/GlassCard';
import DailyWinCard from '../components/DailyWinCard';
import LiveTicker from '../components/LiveTicker';
import JourneyMap from '../components/JourneyMap';
import Leaderboard from '../components/Leaderboard';
import RecentActivity from '../components/RecentActivity';
import IdentityCard from '../components/dashboard/IdentityCard';


const HeroCard = ({ user }) => {
    const ref = useRef(null);
    const [hover, setHover] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHover(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                style={{
                    rotateX: hover ? rotateX : 0,
                    rotateY: hover ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <Paper
                    sx={{
                        p: 4,
                        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4) 0%, rgba(124, 58, 237, 0.2) 100%)', // Transparent Indigo-Violet
                        backdropFilter: 'blur(20px)', // Heavy blur for glass
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        borderRadius: 4,
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', // Deep shadow for "overlayered" look
                        minHeight: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    {/* Background Texture */}
                    <Box sx={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-20%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
                        transform: 'rotate(30deg)',
                        pointerEvents: 'none'
                    }} />

                    <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar
                            src={user?.photoURL}
                            sx={{
                                width: 80, height: 80,
                                border: '4px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                            }}
                        />
                        <Box>
                            <Typography variant="h4" fontWeight="900" sx={{ mb: 0.5, textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                                Welcome back, {user?.name || "Cadet"}! 🚀
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                                Your command center is ready. Status: <Box component="span" sx={{ color: '#d946ef', fontWeight: 800, textShadow: '0 0 10px #d946ef' }}>ONLINE ⚡</Box>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
        </motion.div>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    useSEO('HQ Command', 'Central command dashboard for your mission progress.');
    const { squad } = useSquad();
    const { user, stats } = useGamification();

    const dashboardUser = { ...user, ...stats };

    const containerReqs = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemReqs = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <React.Fragment>
            <motion.div variants={containerReqs} initial="hidden" animate="show" style={{ position: 'relative', zIndex: 1 }}>

                {/* --- Ambient Background Blobs --- */}
                <Box sx={{
                    position: 'fixed',
                    top: -100,
                    left: -100,
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', // Violet
                    filter: 'blur(80px)',
                    zIndex: -1,
                    animation: 'pulse 15s infinite alternate'
                }} />
                <Box sx={{
                    position: 'fixed',
                    bottom: -100,
                    right: -100,
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(217, 70, 239, 0.1) 0%, transparent 70%)', // Fuchsia
                    filter: 'blur(80px)',
                    zIndex: -1,
                    animation: 'pulse 20s infinite alternate-reverse'
                }} />
                <Box sx={{
                    position: 'fixed',
                    top: '30%',
                    left: '40%',
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', // Blue
                    filter: 'blur(100px)',
                    zIndex: -1,
                    opacity: 0.6
                }} />

                {/* Hero Section */}
                <Box sx={{ mb: 4 }}>
                    <HeroCard user={dashboardUser} />
                </Box>

                <Grid container spacing={3}>
                    {/* --- LEFT COLUMN: PERSONAL GROWTH --- */}
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <motion.div variants={itemReqs}>
                                <GlassCard sx={{ p: 0 }}>
                                    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TrendingUpIcon color="primary" />
                                        <Typography variant="h6" fontWeight="bold">My Progress</Typography>
                                    </Box>
                                    <Box sx={{ p: 2 }}>
                                        <IdentityCard user={dashboardUser} />
                                    </Box>
                                </GlassCard>
                            </motion.div>


                        </Box>
                    </Grid>

                    {/* --- CENTER COLUMN: MISSIONS & ACTIVITY --- */}
                    <Grid item xs={12} lg={5}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <motion.div variants={itemReqs}>
                                <Typography variant="h6" fontWeight="900" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <BoltIcon sx={{ color: '#f59e0b' }} /> Active Missions
                                </Typography>
                                <DailyWinCard />
                            </motion.div>

                            <motion.div variants={itemReqs}>
                                <LiveTicker />
                            </motion.div>

                            <motion.div variants={itemReqs}>
                                <JourneyMap level={dashboardUser?.level || 1} />
                            </motion.div>
                        </Box>
                    </Grid>

                    {/* --- RIGHT COLUMN: SQUAD & SOCIAL --- */}
                    <Grid item xs={12} lg={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <motion.div variants={itemReqs}>
                                <GlassCard sx={{ p: 0, overflow: 'hidden' }}>
                                    <Box sx={{
                                        p: 2,
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), transparent)'
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <GroupsIcon sx={{ color: '#10b981' }} />
                                            <Typography variant="h6" fontWeight="bold">My Squad</Typography>
                                        </Box>
                                        {squad && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 8px #10b981' }} />}
                                    </Box>

                                    {squad ? (
                                        <Box sx={{ p: 3 }}>
                                            <Typography variant="h5" fontWeight="800" gutterBottom>{squad.name}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                {squad.members?.length || 0} members active now
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                                                {squad.members?.slice(0, 4)?.map((m, i) => (
                                                    <Avatar key={i} src={m.avatar} sx={{ width: 32, height: 32, border: '2px solid white' }} />
                                                ))}
                                                {squad.members?.length > 4 && <Avatar sx={{ width: 32, height: 32, fontSize: 12 }}>+{squad.members.length - 4}</Avatar>}
                                            </Box>
                                            <Button variant="outlined" fullWidth onClick={() => navigate('/squad')}>
                                                Enter HQ
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box sx={{ p: 3, textAlign: 'center' }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                Solo operatives miss out on +20% XP bonuses.
                                            </Typography>
                                            <Button variant="contained" fullWidth onClick={() => navigate('/squad')}>
                                                Find a Squad
                                            </Button>
                                        </Box>
                                    )}
                                </GlassCard>
                            </motion.div>
                        </Box>
                    </Grid>

                    {/* --- BOTTOM ROW: SOCIAL & RECENT --- */}
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <motion.div variants={itemReqs}>
                                    <Leaderboard />
                                </motion.div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <motion.div variants={itemReqs}>
                                    <RecentActivity />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </motion.div>
        </React.Fragment>
    );
};

export default Dashboard;
