import React, { useState } from 'react';
import { Box, Button, Typography, Container, Fade, CircularProgress, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { auth, db, googleProvider, isConfigValid } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import GlassCard from '../components/GlassCard';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        if (!isConfigValid || !auth || !db || !googleProvider) {
            setError('Firebase is not configured correctly. Check your .env values and restart the dev server.');
            setLoading(false);
            return;
        }

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await user.getIdToken();
            const userRef = doc(db, 'users', user.uid);
            const isNewUser = user.metadata?.creationTime === user.metadata?.lastSignInTime;

            const profile = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                lastLoginAt: new Date().toISOString(),
                ...(isNewUser ? {
                    xp: 0,
                    level: 1,
                    badges: [],
                    squadId: null,
                    createdAt: new Date().toISOString()
                } : {})
            };

            try {
                await setDoc(userRef, profile, { merge: true });
            } catch (writeError) {
                if (writeError?.code === 'permission-denied') {
                    console.warn('Firestore profile save denied. Continuing with local auth state.');
                    localStorage.setItem('colearnLocalProfile', JSON.stringify(profile));
                } else {
                    throw writeError;
                }
            }

            localStorage.setItem('isAuthenticated', 'true');
            navigate(isNewUser ? '/onboarding' : '/dashboard');
        } catch (error) {
            console.error("Login failed:", error);
            if (error?.code === 'auth/configuration-not-found' || error?.code === 'auth/unauthorized-domain') {
                setError("Firebase auth is blocked for this domain. Add localhost to authorized domains in Firebase.");
            } else if (error?.code === 'auth/popup-blocked') {
                setError('Google sign-in popup was blocked by the browser. Allow popups and try again.');
            } else if (error?.code === 'auth/popup-closed-by-user') {
                setError('Google sign-in was cancelled before completion.');
            } else if (error?.code === 'auth/invalid-api-key') {
                setError('Firebase API key is invalid or missing. Check your environment variables.');
            } else {
                setError(error?.message ? `Authentication failed: ${error.message}` : 'Authentication failed.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Immersive Animated Background */}
            <Box sx={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '60vw',
                height: '60vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                filter: 'blur(100px)',
                animation: 'float 15s infinite alternate ease-in-out'
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '50vw',
                height: '50vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                filter: 'blur(100px)',
                animation: 'float 20s infinite alternate-reverse ease-in-out'
            }} />

            <Fade in timeout={1200}>
                <Container maxWidth="xs">
                    <GlassCard intensity={2} sx={{
                        p: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 4,
                        boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Box>
                            <Typography variant="h1" sx={{
                                fontWeight: 950,
                                letterSpacing: '-0.06em',
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1,
                                fontSize: '4.5rem'
                            }}>
                                HQ
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                                Accessing CoLearn Network
                            </Typography>
                        </Box>

                        <Typography variant="body1" color="text.secondary" sx={{ px: 2, lineHeight: 1.7 }}>
                            Synchronize your identity to enter the elite learning collective.
                        </Typography>

                        {error && (
                            <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 2 }}>
                                <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 800 }}>{error}</Typography>
                            </Paper>
                        )}

                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading}
                                onClick={handleLogin}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
                                sx={{
                                    height: 64,
                                    borderRadius: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 900,
                                    bgcolor: '#ffffff',
                                    color: '#0f172a',
                                    '&:hover': {
                                        bgcolor: '#f8fafc',
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                                    },
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            >
                                {loading ? 'SIGNALING...' : 'INITIATE LINK'}
                            </Button>
                        </Box>

                        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, fontWeight: 600, opacity: 0.6 }}>
                            SECURE AUTHENTICATION VIA GOOGLE CLOUD
                        </Typography>
                    </GlassCard>
                </Container>
            </Fade>

            <style>
                {`
                    @keyframes float {
                        0% { transform: translate(0, 0) scale(1); }
                        100% { transform: translate(50px, 50px) scale(1.1); }
                    }
                `}
            </style>
        </Box>
    );
};

export default Login;
