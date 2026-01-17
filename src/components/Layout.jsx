import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery, CssBaseline, Button } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { useThemeMode } from '../theme/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';

// Components
import Sidebar from './Sidebar';
import AIBuddy from './AIBuddy';
import StreakCalendar from '../components/StreakCalendar';
import { Dialog, DialogContent, Slide } from '@mui/material';

// Icons
import WhatshotIcon from '@mui/icons-material/Whatshot';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const drawerWidth = 260;

const Layout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [streakOpen, setStreakOpen] = useState(false);
    const { user, stats } = useGamification();
    const navigate = useNavigate();
    const location = useLocation();

    // Top Navigation Items (Restored)
    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        { label: 'Quests', path: '/quests', icon: <ExploreIcon /> },
        { label: 'Squads', path: '/squad', icon: <GroupsIcon /> }, // Updated path to /squad
        { label: 'Journal', path: '/journal', icon: <TimelineIcon /> },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <CssBaseline />

            {/* Sidebar Navigation */}
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            {/* Main Content Wrapper */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>

                {/* Top App Bar */}
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        width: '100%',
                        bgcolor: 'background.glass',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        color: 'text.primary'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>



                        {/* Desktop Navigation (Restored) */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
                            {navItems.map((item, index) => (
                                <Button
                                    key={index}
                                    startIcon={item.icon}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                                        fontWeight: 700,
                                        px: 2,
                                        borderRadius: 3,
                                        bgcolor: location.pathname === item.path ? 'primary.light' : 'transparent',
                                        background: location.pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                        '&:hover': { bgcolor: 'action.hover', color: 'primary.main' }
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        {/* Mobile: Title takes center stage if Nav is hidden */}
                        <Typography variant="h6" noWrap component="div" fontWeight="800" sx={{ display: { xs: 'block', md: 'none' }, flexGrow: 1 }}>
                            Dashboard
                        </Typography>

                        {/* Top Right Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                            {/* Streak Button */}
                            <IconButton
                                onClick={() => setStreakOpen(true)}
                                sx={{
                                    color: 'orange',
                                    bgcolor: 'rgba(255, 165, 0, 0.1)',
                                    '&:hover': { bgcolor: 'rgba(255, 165, 0, 0.2)' }
                                }}
                            >
                                <WhatshotIcon />
                            </IconButton>

                            <IconButton color="inherit">
                                <NotificationsIcon />
                            </IconButton>

                            {/* Stats Summary (Compact for Top Bar) */}
                            <Box sx={{
                                display: { xs: 'none', sm: 'flex' },
                                alignItems: 'center',
                                gap: 1,
                                bgcolor: 'rgba(255,255,255,0.05)',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider'
                            }}>
                                <Typography variant="caption" fontWeight="bold">💎 {stats.coins}</Typography>
                                <Typography variant="caption" fontWeight="bold">⚡ {stats.energy}%</Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Main Content Area */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, md: 4 },
                        width: '100%',
                        overflowX: 'hidden'
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>

            {/* Global AI Assistant */}
            <AIBuddy level={stats.level} />

            {/* Streak Modal */}
            <Dialog
                open={streakOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setStreakOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible'
                    }
                }}
            >
                <DialogContent sx={{ p: 0, overflow: 'visible' }}>
                    <Box sx={{ position: 'relative' }}>
                        {/* Close Button or Click outside to close handled by Dialog */}
                        <StreakCalendar activityLog={user?.activityLog} />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Layout;
