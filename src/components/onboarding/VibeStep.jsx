import React from 'react';
import { Typography, Grid, Box, Button, Slider } from '@mui/material';
import StepWizard from './StepWizard';

const VibeStep = ({ userData, setUserData }) => {
    return (
        <StepWizard step={2}>
            <Typography variant="h2" fontWeight="950" sx={{ mb: 1, letterSpacing: '-0.04em' }}>Operational Vibe</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Optimizing your study synchronization.</Typography>

            <Grid container spacing={6} sx={{ maxWidth: 650 }}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="900" sx={{ mb: 3, letterSpacing: 1 }}>CIRCADIAN CYCLE</Typography>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Button
                            variant={userData.studyTime === 'Morning' ? "contained" : "outlined"}
                            onClick={() => setUserData({ ...userData, studyTime: 'Morning' })}
                            fullWidth
                            sx={{
                                height: 80,
                                borderRadius: 4,
                                fontSize: '1.1rem',
                                fontWeight: 900,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            }}
                        >
                            <Box sx={{ fontSize: '1.5rem' }}>☀️</Box>
                            DAWN RAIDER
                        </Button>
                        <Button
                            variant={userData.studyTime === 'Night' ? "contained" : "outlined"}
                            onClick={() => setUserData({ ...userData, studyTime: 'Night' })}
                            fullWidth
                            sx={{
                                height: 80,
                                borderRadius: 4,
                                fontSize: '1.1rem',
                                fontWeight: 900,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            }}
                        >
                            <Box sx={{ fontSize: '1.5rem' }}>🌙</Box>
                            NIGHT OWL
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="900" sx={{ mb: 3, letterSpacing: 1 }}>COLLABORATION RATIO</Typography>
                    <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Typography variant="caption" fontWeight="900" sx={{ opacity: 0.6 }}>LONE WOLF</Typography>
                            <Slider
                                value={userData.soloOrSquad}
                                onChange={(_, v) => setUserData({ ...userData, soloOrSquad: v })}
                                sx={{ flexGrow: 1 }}
                            />
                            <Typography variant="caption" fontWeight="900" sx={{ color: 'primary.light' }}>SQUAD ELITE</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </StepWizard>
    );
};

export default VibeStep;
