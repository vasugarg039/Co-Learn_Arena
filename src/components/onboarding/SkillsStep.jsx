import React from 'react';
import { Typography, Box, Button, Slider, Chip } from '@mui/material';
import StepWizard from './StepWizard';

const interestsList = ['DSA', 'Web Dev', 'AI/ML', 'Cybersecurity', 'App Dev', 'Game Dev', 'Blockchain'];

const SkillsStep = ({ userData, setUserData }) => {
    const toggleInterest = (interest) => {
        const current = userData.interests;
        if (current.includes(interest)) {
            setUserData({ ...userData, interests: current.filter(i => i !== interest) });
        } else {
            if (current.length < 5) {
                setUserData({ ...userData, interests: [...current, interest] });
            }
        }
    };

    return (
        <StepWizard step={1}>
            <Typography variant="h2" fontWeight="950" sx={{ mb: 1, letterSpacing: '-0.04em' }}>Capability Map</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>Calibrating your initial power levels and focus domains.</Typography>

            <Box sx={{ mb: 6, display: 'flex', gap: 2, justifyContent: 'center' }}>
                {[2, 3, 4].map(y => (
                    <Button
                        key={y}
                        variant={userData.year === y ? "contained" : "outlined"}
                        onClick={() => setUserData({ ...userData, year: y })}
                        sx={{
                            px: 4, py: 1.5,
                            borderRadius: 3,
                            fontWeight: 900,
                            bgcolor: userData.year === y ? 'primary.main' : 'transparent',
                            borderColor: userData.year === y ? 'transparent' : 'rgba(255,255,255,0.1)'
                        }}
                    >
                        YEAR {y}
                    </Button>
                ))}
            </Box>

            <Box sx={{ width: '90%', mb: 8, p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="900">TECHNICAL PROFICIENCY</Typography>
                    <Typography color="primary.main" variant="h6" fontWeight="950">{userData.skillLevel}%</Typography>
                </Box>
                <Slider
                    value={userData.skillLevel}
                    onChange={(_, v) => setUserData({ ...userData, skillLevel: v })}
                    sx={{
                        height: 10,
                        '& .MuiSlider-track': { background: 'linear-gradient(90deg, #6366f1, #10b981)' },
                        '& .MuiSlider-rail': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                />
            </Box>

            <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 3, opacity: 0.7, letterSpacing: 2 }}>CORE DIRECTIVES (MAX 5)</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
                {interestsList.map(item => (
                    <Chip
                        key={item}
                        label={item.toUpperCase()}
                        onClick={() => toggleInterest(item)}
                        sx={{
                            borderRadius: 2,
                            px: 2, py: 2.5,
                            fontWeight: 900,
                            fontSize: '0.7rem',
                            bgcolor: userData.interests.includes(item) ? 'primary.main' : 'rgba(255,255,255,0.03)',
                            border: '1px solid',
                            borderColor: userData.interests.includes(item) ? 'transparent' : 'rgba(255,255,255,0.1)',
                            color: userData.interests.includes(item) ? 'white' : 'text.secondary',
                            transition: 'all 0.3s',
                            '&:hover': { transform: 'translateY(-3px)' }
                        }}
                    />
                ))}
            </Box>
        </StepWizard>
    );
};

export default SkillsStep;
