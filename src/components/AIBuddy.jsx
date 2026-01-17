import React, { useState, useRef, useEffect } from 'react';
import { Box, Fab, Paper, Typography, Fade, IconButton, TextField, Avatar, CircularProgress, Chip, Drawer, Switch, FormControlLabel } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import BoltIcon from '@mui/icons-material/Bolt';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { GeminiService } from '../services/GeminiService';

const AIBuddy = ({ level }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hey! I'm your Grid Guide. I'm here to help you crush your study goals and squads missions. Stuck on a concept or need a quest idea?" }
    ]);
    const [loading, setLoading] = useState(false);
    const [useGemini, setUseGemini] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            if (useGemini) {
                // Real AI Mode
                const responseText = await GeminiService.sendMessage(userMsg.content);
                setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
                setLoading(false);
            } else {
                // Standard (Mock) Mode
                setTimeout(() => {
                    const botMsg = { role: 'assistant', content: getMockResponse(userMsg.content) };
                    setMessages(prev => [...prev, botMsg]);
                    setLoading(false);
                }, 1000);
            }
        } catch (error) {
            console.error("Bot Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "System malfunction. Please try again." }]);
            setLoading(false);
        }
    };

    const getMockResponse = (text) => {
        const lower = text.toLowerCase();

        // Persona: Study Coach & Motivator
        if (lower.includes('quest') || lower.includes('mission')) return "I recommend 'The Archive Dive' (Level 5). It fits your current streak. Grab a squadmate for double XP. Want me to mark it on your map?";
        if (lower.includes('stuck') || lower.includes('help')) return "No worries. Break it down. What's the specific blocker? If it's code, share the snippet. If it's a concept, I'll simplify it.";
        if (lower.includes('level') || lower.includes('xp')) return `You're currently Level ${level}. You need about 450 XP for the next rank. Try the Daily Quiz for a quick boost!`;
        if (lower.includes('tired') || lower.includes('boring')) return "Take a breather. Even elite players need regen time. How about a 5-minute 'Focus Zone' session to reset?";
        if (lower.includes('stack') || lower.includes('heap')) return "Think of the Stack like a pile of books (LIFO - Last In, First Out). The Heap is like a messy laundry pile (random access). Which one do you think is faster?";

        return "Got it. I'm listening. We can tackle this together. What's the main goal right now?";
    };

    return (
        <>
            {/* Docked Trigger Button */}
            <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Fab
                        color="primary"
                        aria-label="ai-buddy"
                        onClick={() => setOpen(true)}
                        sx={{
                            width: 56,
                            height: 56,
                            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        }}
                    >
                        <SmartToyIcon />
                    </Fab>
                </motion.div>
            </Box>

            {/* Side Panel Drawer */}
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 400 },
                        bgcolor: 'background.default',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        backgroundImage: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.98))',
                        backdropFilter: 'blur(20px)'
                    }
                }}
            >
                {/* Header */}
                <Box sx={{
                    p: 3,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: useGemini ? 'secondary.main' : 'primary.main', width: 40, height: 40, boxShadow: useGemini ? '0 0 15px #f50057' : '0 0 15px rgba(99, 102, 241, 0.4)' }}>
                            <SmartToyIcon />
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="900">{useGemini ? "GEMINI AI" : "OMNIS AI"}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }} />
                                <Typography variant="caption" color="text.secondary" fontWeight="700">SYSTEM ONLINE</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                            control={<Switch size="small" checked={useGemini} onChange={(e) => setUseGemini(e.target.checked)} color="secondary" />}
                            label={<Typography variant="caption" sx={{ fontWeight: 'bold', color: useGemini ? 'secondary.main' : 'text.disabled' }}>GEMINI</Typography>}
                        />
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Chat Content */}
                <Box ref={scrollRef} sx={{
                    flexGrow: 1,
                    p: 3,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    {messages.map((msg, i) => (
                        <Box key={i} sx={{ alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
                            <Paper elevation={0} sx={{
                                p: 2,
                                borderRadius: 3,
                                borderTopLeftRadius: msg.role === 'assistant' ? 0 : 12,
                                borderTopRightRadius: msg.role === 'user' ? 0 : 12,
                                bgcolor: msg.role === 'assistant' ? 'rgba(255,255,255,0.05)' : 'primary.main',
                                color: msg.role === 'assistant' ? 'text.primary' : 'white',
                                border: '1px solid',
                                borderColor: msg.role === 'assistant' ? 'rgba(255,255,255,0.05)' : 'primary.main'
                            }}>
                                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{msg.content}</Typography>
                            </Paper>
                        </Box>
                    ))}
                    {loading && (
                        <Box sx={{ alignSelf: 'flex-start', ml: 1 }}>
                            <Typography variant="caption" color="text.secondary">Omnis is typing...</Typography>
                        </Box>
                    )}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <TextField
                        fullWidth
                        placeholder="Ask for guidance..."
                        variant="outlined"
                        size="small"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        InputProps={{
                            sx: { borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' },
                            endAdornment: (
                                <IconButton onClick={handleSend} disabled={!input.trim()} color="primary" size="small">
                                    <SendIcon />
                                </IconButton>
                            )
                        }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, '::-webkit-scrollbar': { display: 'none' } }}>
                        {['Where do I start?', 'Find me a quest', 'Explain this concept'].map((label) => (
                            <Chip
                                key={label}
                                label={label}
                                onClick={() => setInput(label)}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default AIBuddy;
