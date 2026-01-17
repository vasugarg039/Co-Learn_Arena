import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Grid, Avatar, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useSquad } from '../context/SquadContext';
import { useGamification } from '../context/GamificationContext';
import { GameProvider } from '../context/GameContext'; // Import Provider
import GameArena from '../components/game/GameArena'; // Import Arena
import GlassCard from '../components/GlassCard';
import GroupsIcon from '@mui/icons-material/Groups';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CasinoIcon from '@mui/icons-material/Casino'; // Game Icon
import MeetingRoom from '../components/MeetingRoom';
import SquadChat from '../components/SquadChat';
import SquadQuests from '../components/SquadQuests';
import SquadAchievements from '../components/SquadAchievements';

const SquadHQ = () => {
    const { squad, createSquad, findSquad, leaveSquad, loading } = useSquad();
    const { user } = useGamification();
    const [openCreate, setOpenCreate] = useState(false);
    const [squadName, setSquadName] = useState('');
    const [meetingOpen, setMeetingOpen] = useState(false);
    const [gameMode, setGameMode] = useState(false); // Toggle Game Mode

    const handleCreate = async () => {
        if (!squadName.trim()) return;
        await createSquad(squadName, "General");
        setOpenCreate(false);
    };

    if (meetingOpen) {
        return <MeetingRoom onClose={() => setMeetingOpen(false)} />;
    }

    if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading HQ data...</Box>;

    if (!squad) {
        return (
            <Box maxWidth="lg" sx={{ mx: 'auto' }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" fontWeight="900" gutterBottom sx={{ background: 'linear-gradient(45deg, #6366f1, #a855f7)', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Squad Operations
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Join an elite unit or form your own to dominate the leaderboards.
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={5}>
                        <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 6 }}>
                            <SearchIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Find a Squad</Typography>
                            <Typography color="text.secondary" sx={{ mb: 4, px: 2 }}>
                                Match with other cadets based on your interests and skill level.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<SearchIcon />}
                                onClick={() => findSquad(user)}
                                sx={{ borderRadius: 4, px: 4, py: 1.5, background: 'linear-gradient(90deg, #10b981, #059669)' }}
                            >
                                Find Match
                            </Button>
                        </GlassCard>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 6 }}>
                            <AddCircleIcon sx={{ fontSize: 60, color: '#6366f1', mb: 2 }} />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Create Squad</Typography>
                            <Typography color="text.secondary" sx={{ mb: 4, px: 2 }}>
                                Start your own team. Recruit members and lead them to victory.
                            </Typography>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<AddCircleIcon />}
                                onClick={() => setOpenCreate(true)}
                                sx={{ borderRadius: 4, px: 4, py: 1.5, borderColor: '#6366f1', color: '#6366f1' }}
                            >
                                Create New
                            </Button>
                        </GlassCard>
                    </Grid>
                </Grid>

                {/* Create Modal */}
                <Dialog open={openCreate} onClose={() => setOpenCreate(false)} PaperProps={{ sx: { bgcolor: 'background.paper', borderRadius: 3 } }}>
                    <DialogTitle fontWeight="bold">Establish New Squad</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Squad Name"
                            fullWidth
                            variant="outlined"
                            value={squadName}
                            onChange={(e) => setSquadName(e.target.value)}
                            sx={{ mt: 1 }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleCreate} disabled={!squadName.trim()}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }

    return (
        <Box sx={{
            height: 'calc(100vh - 80px)', // Adjust for AppBar height
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            maxWidth: 'xl', // Use 'xl' to contain width
            mx: 'auto',     // Auto margins to center horizontally
            justifyContent: 'center' // Vertically center content if there's space
        }}>
            {/* Squad Header - Compact */}
            <GlassCard sx={{ mb: 2, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 60, height: 60, fontSize: 24, bgcolor: 'primary.main' }}>
                        {squad.name[0]}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" fontWeight="900" sx={{ mb: 0.5 }}>{squad.name}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip label={`${squad.memberCount}/5`} color="primary" size="small" variant="outlined" />
                            <Chip label={squad.genre || 'General'} color="secondary" size="small" variant="outlined" />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant={gameMode ? 'contained' : 'outlined'}
                            color="secondary"
                            size="small"
                            startIcon={<CasinoIcon />}
                            onClick={() => setGameMode(!gameMode)}
                        >
                            {gameMode ? 'Exit Game' : 'Play Game'}
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<VideoCallIcon />}
                            onClick={() => setMeetingOpen(true)}
                        >
                            Meet
                        </Button>
                        <Button variant="outlined" color="error" size="small" onClick={leaveSquad}>
                            Leave
                        </Button>
                    </Box>
                </Box>
            </GlassCard>

            {/* Main Content */}
            <GameProvider>
                {gameMode ? (
                    <Box sx={{ flexGrow: 1, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 4, overflow: 'hidden' }}>
                        <GameArena />
                    </Box>
                ) : (
                    <Grid container spacing={2} sx={{ flexGrow: 1, overflow: 'hidden' }}>
                        {/* Left Column: Roster (Compact) */}
                        <Grid item xs={12} md={2} sx={{ height: '100%' }}>
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Roster</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', flexGrow: 1, pr: 0.5 }}>
                                    {squad.members?.map((member, index) => (
                                        <GlassCard key={member.uid || index} sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                                            <Avatar src={member.avatar} sx={{ width: 32, height: 32 }} />
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography variant="body2" fontWeight="bold" noWrap>
                                                    {member.name.split(' ')[0]}
                                                </Typography>
                                            </Box>
                                        </GlassCard>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>

                        {/* Center Column: Squad Chat */}
                        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Comms</Typography>
                                <SquadChat squadId={squad.id} height="100%" />
                            </Box>
                        </Grid>

                        {/* Right Zone: Quests & Achievements */}
                        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                            <Grid container spacing={2} sx={{ height: '100%' }}>
                                <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Mission Log</Typography>
                                        <SquadQuests squad={squad} height="100%" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Trophies</Typography>
                                        <SquadAchievements squad={squad} height="100%" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </GameProvider>
        </Box>
    );
};

export default SquadHQ;
