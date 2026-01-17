import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Stepper, Step, StepLabel, TextField, Chip, Fade, Divider, StepConnector, stepConnectorClasses, styled } from '@mui/material';
import { QUESTS } from '../data/quests';
import Confetti from 'react-confetti';
import GlassCard from '../components/GlassCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useGamification } from '../context/GamificationContext';
import QuestRoadmap from '../components/QuestRoadmap';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg, #6366f1 0%, #a855f7 50%, #10b981 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient( 95deg, #6366f1 0%, #a855f7 50%, #10b981 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#eaeaf0',
        borderRadius: 1,
    },
}));

const steps = ['BRIEFING', 'OPERATION', 'DEBRIEF', 'SUCCESS'];

const QuestRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { awardXP, consumeEnergy } = useGamification();
    const quest = QUESTS.find(q => q.id === id);
    const [activeStep, setActiveStep] = useState(0);
    const [complete, setComplete] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    React.useEffect(() => {
        const detectSize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', detectSize);
        return () => window.removeEventListener('resize', detectSize);
    }, []);

    if (!quest) return <Typography>Quest not found</Typography>;

    // Special Rendering for Roadmap Quests
    if (quest.type === 'roadmap') {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
                <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 } }}>
                    <Box sx={{ mb: 4 }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/quests')}
                            sx={{ fontWeight: 900, borderRadius: 3 }}
                            variant="outlined"
                        >
                            Return to Terminal
                        </Button>
                    </Box>
                    <Fade in timeout={800}>
                        <Box>
                            <QuestRoadmap />
                        </Box>
                    </Fade>
                </Container>
            </Box>
        );
    }

    const handleNext = async () => {
        if (activeStep === 0) {
            const energySuccess = await consumeEnergy(20);
            if (!energySuccess) {
                alert("Insufficient Energy! Mission launch aborted. Refill energy to proceed.");
                return;
            }
        }

        if (activeStep === steps.length - 2) {
            setComplete(true);

            // Award Rewards
            const coinsReward = Math.floor(quest.xp / 10);
            await awardXP(quest.xp, `Completed ${quest.title}`, coinsReward);

            const history = JSON.parse(localStorage.getItem('questHistory') || '[]');
            if (!history.find(h => h.id === quest.id)) {
                history.push({
                    ...quest,
                    completedAt: new Date().toISOString(),
                    vibe: '🤩'
                });
                localStorage.setItem('questHistory', JSON.stringify(history));
            }
        }
        setActiveStep((prev) => prev + 1);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
            {complete && <Confetti width={windowDimension.width} height={windowDimension.height} recycle={false} numberOfPieces={800} gravity={0.1} />}

            <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 } }}>
                <Box sx={{ mb: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/quests')}
                        sx={{ fontWeight: 900, borderRadius: 3 }}
                        variant="outlined"
                        disabled={activeStep > 0 && activeStep < 3}
                    >
                        ABORT MISSION
                    </Button>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 2, color: 'primary.main' }}>MISSION PROTOCOL</Typography>
                        <Typography variant="h5" fontWeight="950">{quest.title.toUpperCase()}</Typography>
                    </Box>
                </Box>

                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} sx={{ mb: 10 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconProps={{ sx: { '&.Mui-active': { color: 'primary.main' } } }}>
                                <Typography variant="caption" fontWeight="900" sx={{ letterSpacing: 1.5, opacity: activeStep === steps.indexOf(label) ? 1 : 0.5 }}>
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Fade in key={activeStep} timeout={600}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <GlassCard sx={{ p: { xs: 4, md: 8 }, width: '100%', maxWidth: 800, textAlign: 'center', minHeight: 450, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            {activeStep === 0 && (
                                <Box>
                                    <Box sx={{ p: 2, bgcolor: 'rgba(99, 102, 241, 0.1)', borderRadius: 4, display: 'inline-flex', mb: 4 }}>
                                        <PsychologyIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                                    </Box>
                                    <Typography variant="h3" fontWeight="950" gutterBottom>Mission Briefing</Typography>
                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
                                        {quest.icebreaker || "Synchronize with your squad. What would be your ultimate coding superpower for this mission?"}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder="Transmit your response..."
                                        sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 4, '& fieldset': { borderRadius: 4 } }}
                                    />
                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box sx={{ textAlign: 'left' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}>
                                        <Box>
                                            <Chip label={quest.type.toUpperCase()} sx={{ borderRadius: 1.5, fontWeight: 900, fontSize: '0.65rem', mb: 2, bgcolor: 'primary.main' }} />
                                            <Typography variant="h3" fontWeight="950">{quest.title}</Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h3" fontWeight="950" color="primary.main">{quest.xp}</Typography>
                                            <Typography variant="caption" fontWeight="900" color="text.secondary">XP REWARD</Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="h6" fontWeight="900" sx={{ mb: 2, opacity: 0.7 }}>OBJECTIVE</Typography>
                                    <Typography variant="body1" sx={{ mb: 6, fontSize: '1.1rem', lineHeight: 1.7 }}>{quest.description}</Typography>

                                    {quest.questions && (
                                        <Box sx={{ mb: 6, p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 5, border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <Typography variant="h6" fontWeight="900" sx={{ mb: 3 }}>MISSION TASKS</Typography>
                                            {quest.questions.map(q => (
                                                <Box key={q.id} sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                                                    <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <Typography variant="caption" fontWeight="900" sx={{ color: 'white' }}>{q.id}</Typography>
                                                    </Box>
                                                    <Typography variant="body1" fontWeight="500">{q.text}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}

                                    <Box sx={{ p: 4, bgcolor: 'rgba(16, 185, 129, 0.05)', borderRadius: 5, border: '1px dashed rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: 3 }}>
                                        <GroupsIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="900" color="secondary.main">SQUAD SYNC ACTIVE</Typography>
                                            <Typography variant="body2" color="text.secondary">Initiate a Huddle call to collaborate on these tasks in real-time.</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box>
                                    <Typography variant="h3" fontWeight="950" gutterBottom>Mission Debrief</Typography>
                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
                                        {quest.reflection || "Reflect on the operation. What was the most critical bottleneck encountered?"}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder="Enter debrief notes..."
                                        sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 4, mb: 6 }}
                                    />
                                    <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 3, opacity: 0.6 }}>NETWORK VIBE CHECK</Typography>
                                    <Box sx={{ display: 'flex', gap: 2.5, justifyContent: 'center' }}>
                                        {['😤', '😕', '😐', '🙂', '🤩'].map(emoji => (
                                            <Button
                                                key={emoji}
                                                variant="outlined"
                                                sx={{
                                                    fontSize: '2rem',
                                                    minWidth: { xs: 60, sm: 80 },
                                                    height: { xs: 60, sm: 80 },
                                                    borderRadius: 4,
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    transition: 'all 0.3s',
                                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', transform: 'translateY(-5px)', borderColor: 'primary.main' }
                                                }}
                                            >
                                                {emoji}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {activeStep === 3 && (
                                <Box>
                                    <Box sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                                        borderRadius: '50%',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 4,
                                        boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)'
                                    }}>
                                        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'secondary.main' }} />
                                    </Box>
                                    <Typography variant="h2" fontWeight="950" gutterBottom>Mission Accomplished</Typography>
                                    <Typography variant="h4" color="secondary.main" fontWeight="950" sx={{ mb: 2 }}>
                                        + {quest.xp} XP ACCREDITED
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
                                        Operational streak maintained. Network influence increased.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/dashboard')}
                                        startIcon={<RocketLaunchIcon />}
                                        sx={{
                                            px: 8, py: 2,
                                            borderRadius: 4,
                                            fontWeight: 900,
                                            fontSize: '1.2rem',
                                            background: 'linear-gradient(45deg, #6366f1, #10b981)',
                                            boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)'
                                        }}
                                    >
                                        RETURN TO HQ
                                    </Button>
                                </Box>
                            )}

                            <Box sx={{ mt: 8 }}>
                                <Divider sx={{ mb: 4, opacity: 0.1 }} />
                                {activeStep < 3 && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleNext}
                                        sx={{
                                            px: 10, py: 2,
                                            borderRadius: 4,
                                            fontWeight: 900,
                                            fontSize: '1.1rem',
                                            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)'
                                        }}
                                    >
                                        {activeStep === 2 ? 'FINALIZE OPERATION' : 'PROCEED TO NEXT PHASE'}
                                    </Button>
                                )}
                            </Box>
                        </GlassCard>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default QuestRoom;
