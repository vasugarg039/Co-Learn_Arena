
import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../context/GamificationContext';

const MicroReward = () => {
    const { rewardQueue, clearReward } = useGamification();

    useEffect(() => {
        if (rewardQueue.length > 0) {
            const timer = setTimeout(() => {
                clearReward(rewardQueue[0].id);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [rewardQueue, clearReward]);

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
        }}>
            <AnimatePresence>
                {rewardQueue.map((reward) => (
                    <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <Box sx={{
                            bgcolor: reward.type === 'levelup' ? '#F4B400' : '#4285F4',
                            color: 'white',
                            px: 3,
                            py: 1.5,
                            borderRadius: 8,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontWeight: 'bold',
                            border: '2px solid rgba(255,255,255,0.4)'
                        }}>
                            <Typography variant="body1" fontWeight="bold">
                                {reward.type === 'levelup' ? '🏆' : '✨'} {reward.message}
                            </Typography>
                        </Box>
                    </motion.div>
                ))}
            </AnimatePresence>
        </Box>
    );
};

export default MicroReward;
