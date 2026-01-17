import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton, Avatar, Paper } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useGamification } from '../context/GamificationContext';
import SendIcon from '@mui/icons-material/Send';
import GlassCard from './GlassCard';

const SquadChat = ({ squadId, height = 500 }) => {
    const { user } = useGamification();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
        if (!squadId) return;

        const q = query(
            collection(db, 'squads', squadId, 'messages'),
            orderBy('createdAt', 'desc'),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs.reverse()); // Reverse to show oldest first (top to bottom)
        });

        return () => unsubscribe();
    }, [squadId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        await addDoc(collection(db, 'squads', squadId, 'messages'), {
            text: newMessage,
            uid: user.uid,
            displayName: user.displayName || 'Cadet',
            photoURL: user.photoURL,
            createdAt: serverTimestamp()
        });

        setNewMessage('');
    };

    return (
        <GlassCard sx={{ height: height, display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(255,255,255,0.05)' }}>
                <Typography variant="subtitle1" fontWeight="bold">Squad Comms</Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messages.map((msg) => {
                    const isMe = msg.uid === user.uid;
                    return (
                        <Box key={msg.id} sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', mb: 1 }}>
                            {!isMe && <Avatar src={msg.photoURL} sx={{ width: 32, height: 32, mr: 1, mt: 0.5 }} />}
                            <Paper sx={{
                                p: 1.5,
                                px: 2,
                                maxWidth: '70%',
                                borderRadius: 3,
                                bgcolor: isMe ? 'primary.main' : 'background.paper',
                                color: isMe ? 'white' : 'text.primary',
                                borderTopLeftRadius: !isMe ? 0 : 3,
                                borderTopRightRadius: isMe ? 0 : 3
                            }}>
                                {!isMe && <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.7rem' }}>{msg.displayName}</Typography>}
                                <Typography variant="body2">{msg.text}</Typography>
                            </Paper>
                        </Box>
                    );
                })}
                <div ref={scrollRef} />
            </Box>

            <Box component="form" onSubmit={handleSend} sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Message squad..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    variant="outlined"
                    sx={{ bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 1 }}
                />
                <IconButton type="submit" color="primary" disabled={!newMessage.trim()}>
                    <SendIcon />
                </IconButton>
            </Box>
        </GlassCard>
    );
};

export default SquadChat;
