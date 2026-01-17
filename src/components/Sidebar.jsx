import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider, Switch, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';
import { useThemeMode } from '../theme/ThemeContext';
import { useExamMode } from '../context/ExamModeContext';
import { useSquad } from '../context/SquadContext';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const drawerWidth = 260;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mode, toggleTheme } = useThemeMode();
    const { examMode, toggleExamMode } = useExamMode();
    const { stats, user } = useGamification();
    const { squad } = useSquad();
    const theme = useTheme();

    const menuItems = [
        { text: 'Command Center', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Quest Board', icon: <ExploreIcon />, path: '/quests' },
        { text: 'My Squad', icon: <GroupsIcon />, path: '/squad', badge: squad ? true : false },
        { text: 'Journal', icon: <TimelineIcon />, path: '/journal' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const drawer = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider'
        }}>
            {/* Logo Area */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Premium gradient
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                }}>
                    <Typography variant="h5" fontWeight="900" sx={{ color: 'white' }}>C</Typography>
                </Box>
                <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: -0.5 }}>
                    CoLearn
                </Typography>
            </Box>

            <Box sx={{ px: 2, mb: 1 }}>
                <Typography variant="caption" sx={{ pl: 2, color: 'text.secondary', fontWeight: 700, letterSpacing: 1 }}>
                    MAIN MENU
                </Typography>
                <List>
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        borderRadius: 3,
                                        bgcolor: active ? 'primary.main' : 'transparent',
                                        color: active ? 'white' : 'text.secondary',
                                        '&:hover': {
                                            bgcolor: active ? 'primary.dark' : 'action.hover',
                                            color: active ? 'white' : 'text.primary',
                                            transform: 'translateX(4px)',
                                        },
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        minWidth: 40,
                                        color: active ? 'white' : 'inherit'
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: active ? 800 : 500,
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                    {item.badge && (
                                        <Box sx={{
                                            width: 8, height: 8,
                                            borderRadius: '50%',
                                            bgcolor: '#10b981',
                                            boxShadow: '0 0 8px #10b981'
                                        }} />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            {/* Exam Mode Toggle Section */}
            <Box sx={{ px: 2, mb: 1 }}>
                <Box sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: examMode ? 'primary.main' : 'rgba(255,255,255,0.03)',
                    border: '1px solid',
                    borderColor: examMode ? 'primary.main' : 'divider',
                    transition: 'all 0.3s ease'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SchoolIcon sx={{ color: examMode ? 'white' : 'text.secondary', fontSize: 20 }} />
                            <Typography variant="subtitle2" fontWeight="800" sx={{ color: examMode ? 'white' : 'text.primary' }}>
                                Exam Mode
                            </Typography>
                        </Box>
                        <Switch
                            size="small"
                            checked={examMode}
                            onChange={toggleExamMode}
                            color="default" // Use customization for color
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: 'white',
                                },
                                '& .MuiSwitch-track': {
                                    backgroundColor: examMode ? 'rgba(255,255,255,0.5) !important' : 'grey.400'
                                }
                            }}
                        />
                    </Box>
                    <Typography variant="caption" sx={{ color: examMode ? 'rgba(255,255,255,0.8)' : 'text.secondary', display: 'block', lineHeight: 1.2 }}>
                        {examMode ? "Distractions blocked. Good luck!" : "Toggle for focused study session."}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 1, mx: 3, borderColor: 'rgba(255,255,255,0.05)' }} />

            {/* Bottom Actions */}
            <Box sx={{ mt: 'auto', p: 3 }}>
                <List dense>
                    <ListItem disablePadding>
                        <ListItemButton onClick={toggleTheme} sx={{ borderRadius: 2 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                            </ListItemIcon>
                            <ListItemText primary={mode === 'light' ? "Dark Mode" : "Light Mode"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: 'error.main' }}>
                            <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 700 }} />
                        </ListItemButton>
                    </ListItem>
                </List>

                {/* Mini User Profile */}
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={user?.photoURL} sx={{ width: 36, height: 36, border: '2px solid', borderColor: 'primary.main' }} />
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="subtitle2" fontWeight="bold" noWrap>{user?.displayName || "Cadet"}</Typography>
                        <Typography variant="caption" color="text.secondary">Lvl {stats.level}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box component="nav">
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
