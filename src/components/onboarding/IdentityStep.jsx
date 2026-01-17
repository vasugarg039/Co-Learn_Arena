import React from 'react';
import { Typography, Grid, Box, Avatar, TextField } from '@mui/material';
import StepWizard from './StepWizard';

export const avatars = [
    { type: 'Explorer', src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
    { type: 'Visionary', src: 'https://api.dicebear.com/7.x/notionists/svg?seed=Aneka' },
    { type: 'Technoid', src: 'https://api.dicebear.com/7.x/bottts/svg?seed=Techie' },
    { type: 'PixelHero', src: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Retro' },
];

const IdentityStep = ({ userData, setUserData }) => {
    return (
        <StepWizard step={0}>
            <Typography variant="h2" fontWeight="950" sx={{ mb: 1, letterSpacing: '-0.04em' }}>Digital Identity</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Choose your representation in the neural network.</Typography>

            <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
                {avatars.map((ava, index) => (
                    <Grid item key={index}>
                        <Box
                            onClick={() => setUserData({ ...userData, avatar: ava.src })}
                            sx={{
                                p: 0.8,
                                cursor: 'pointer',
                                border: '4px solid',
                                borderColor: userData.avatar === ava.src ? 'primary.main' : 'transparent',
                                borderRadius: '50%',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                transform: userData.avatar === ava.src ? 'scale(1.15)' : 'scale(1)',
                                boxShadow: userData.avatar === ava.src ? '0 15px 30px rgba(99, 102, 241, 0.4)' : 'none',
                                '&:hover': { transform: 'scale(1.1)' }
                            }}
                        >
                            <Avatar src={ava.src} sx={{ width: 100, height: 100, bgcolor: 'background.default' }} />
                        </Box>
                        <Typography variant="caption" sx={{ mt: 2, fontWeight: 900, display: 'block', textAlign: 'center', color: userData.avatar === ava.src ? 'primary.main' : 'text.secondary' }}>
                            {ava.type.toUpperCase()}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            <TextField
                label="NEURAL CODENAME"
                variant="outlined"
                fullWidth
                autoFocus
                sx={{
                    maxWidth: 450,
                    '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'rgba(255,255,255,0.02)' }
                }}
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
        </StepWizard>
    );
};

export default IdentityStep;
