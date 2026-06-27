import React, { useState } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGamification } from '../context/GamificationContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import GlassCard from '../components/GlassCard';

// Component Imports
import IdentityStep, { avatars } from '../components/onboarding/IdentityStep';
import SkillsStep from '../components/onboarding/SkillsStep';
import VibeStep from '../components/onboarding/VibeStep';
import SquadStep from '../components/onboarding/SquadStep';

const Onboarding = () => {
    const navigate = useNavigate();
    const { user } = useGamification();
    const [step, setStep] = useState(0);
    const [rerollsLeft, setRerollsLeft] = useState(1);
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        name: user?.displayName || '',
        avatar: user?.photoURL || avatars[0].src,
        branch: 'CSE',
        year: 2,
        skillLevel: 50,
        interests: [],
        studyTime: 'Night',
        soloOrSquad: 50,
        difficulty: 'Competitive',
    });

    const [currentSquad, setCurrentSquad] = useState({
        name: "Nebula Raiders",
        genre: "Web Dev & DSA",
        members: [1, 2, 3]
    });

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(prev => prev + 1);
        } else {
            completeOnboarding();
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    const handleReroll = () => {
        if (rerollsLeft > 0) {
            setRerollsLeft(prev => prev - 1);
            setCurrentSquad({
                name: "Quantum Coders",
                genre: "AI/ML & Cyber",
                members: [4, 5, 6]
            });
        }
    };

    const completeOnboarding = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            const onboardingPayload = {
                ...userData,
                squad: currentSquad,
                onboarded: true,
                xp: 100
            };

            try {
                await updateDoc(userRef, onboardingPayload);
            } catch (updateError) {
                if (updateError?.code === 'permission-denied') {
                    console.warn('Firestore onboarding update denied. Continuing with local onboarding state.');
                    localStorage.setItem('colearnOnboardingDraft', JSON.stringify(onboardingPayload));
                } else {
                    throw updateError;
                }
            }

            setShowConfetti(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            console.error("Onboarding setup failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {showConfetti && <Confetti recycle={false} numberOfPieces={1000} gravity={0.15} colors={['#6366f1', '#10b981', '#f59e0b', '#ef4444']} />}

            {/* Background Decor */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 80%)',
                zIndex: 0
            }} />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton onClick={handleBack} disabled={step === 0} sx={{ color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.03)' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, mx: 6, height: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)' }}
                        />
                    </Box>
                    <Typography fontWeight="900" color="primary.main" sx={{ letterSpacing: 2 }}>PHASE 0{step + 1}</Typography>
                </Box>

                <GlassCard sx={{
                    p: { xs: 4, md: 8 },
                    minHeight: 650,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.08)'
                }}>
                    <AnimatePresence mode='wait'>
                        {/* STEP 1: IDENTITY */}
                        {step === 0 && (
                            <IdentityStep userData={userData} setUserData={setUserData} />
                        )}

                        {/* STEP 2: SKILLS */}
                        {step === 1 && (
                            <SkillsStep userData={userData} setUserData={setUserData} />
                        )}

                        {/* STEP 3: VIBE */}
                        {step === 2 && (
                            <VibeStep userData={userData} setUserData={setUserData} />
                        )}

                        {/* STEP 4: SQUAD */}
                        {step === 3 && (
                            <SquadStep
                                userData={userData}
                                currentSquad={currentSquad}
                                rerollsLeft={rerollsLeft}
                                handleReroll={handleReroll}
                                handleNext={handleNext}
                                loading={loading}
                            />
                        )}
                    </AnimatePresence>

                    {/* Footer Actions */}
                    {step < 3 && (
                        <Box sx={{ mt: 10, width: '100%', maxWidth: 500 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleNext}
                                disabled={step === 0 && !userData.name}
                                sx={{
                                    height: 72,
                                    borderRadius: 4,
                                    fontSize: '1.25rem',
                                    fontWeight: 950,
                                    background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                                    boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' },
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            >
                                CONTINUE TO PHASE 0{step + 2}
                            </Button>
                        </Box>
                    )}
                </GlassCard>
            </Container>
        </Box>
    );
};

export default Onboarding;
