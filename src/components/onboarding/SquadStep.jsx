import React from 'react';
import { Box, Typography, Avatar, Button, Fade } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StepWizard from './StepWizard';

const SquadStep = ({ userData, currentSquad, rerollsLeft, handleReroll, handleNext, loading }) => {
    return (
        <StepWizard step={3}>
            <Fade in timeout={1000}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h1" fontWeight="950" sx={{
                        mb: 1,
                        background: 'linear-gradient(45deg, #10b981, #6366f1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        SQUAD ASSIGNMENT
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Neural matching successful. Prepare for briefing.</Typography>

                    <Box sx={{
                        p: 6,
                        borderRadius: 8,
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        bgcolor: 'rgba(16, 185, 129, 0.03)',
                        mb: 8,
                        width: '100%',
                        maxWidth: 600,
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', borderBottomLeftRadius: 10 }}>
                            <Typography variant="caption" fontWeight="900" color="#10b981">STABLE CONNECTION</Typography>
                        </Box>

                        <Typography variant="h3" fontWeight="950" gutterBottom sx={{ letterSpacing: '-0.02em' }}>{currentSquad.name}</Typography>
                        <Typography variant="subtitle2" sx={{ mb: 6, letterSpacing: 4, fontWeight: 900, color: 'text.secondary' }}>PRIMARY SECTOR: {currentSquad.genre.toUpperCase()}</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                            {currentSquad.members.map((m, i) => (
                                <Avatar
                                    key={m}
                                    sx={{
                                        width: 80, height: 80,
                                        border: '4px solid',
                                        borderColor: 'background.paper',
                                        ml: i === 0 ? 0 : -3,
                                        bgcolor: `hsl(${m * 100}, 60%, 40%)`,
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                                    }}
                                />
                            ))}
                            <Avatar
                                src={userData.avatar}
                                sx={{
                                    width: 90, height: 90,
                                    border: '4px solid',
                                    borderColor: 'primary.main',
                                    ml: -3,
                                    transform: 'scale(1.1) translateY(-10px)',
                                    zIndex: 10,
                                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)'
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<AutorenewIcon />}
                            onClick={handleReroll}
                            disabled={rerollsLeft === 0}
                            sx={{ borderRadius: 4, px: 6, py: 2, fontWeight: 900, border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            REROLL ({rerollsLeft})
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<CheckCircleIcon />}
                            onClick={handleNext}
                            disabled={loading}
                            sx={{
                                borderRadius: 4,
                                px: 8,
                                py: 2,
                                fontWeight: 900,
                                background: 'linear-gradient(45deg, #10b981, #6366f1)',
                                boxShadow: '0 15px 30px rgba(16, 185, 129, 0.4)'
                            }}
                        >
                            {loading ? 'SYNCING...' : 'ACCEPT MISSION'}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </StepWizard>
    );
};

export default SquadStep;
