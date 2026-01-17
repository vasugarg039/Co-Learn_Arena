import React, { useMemo } from 'react';
import { Box, Typography, Tooltip, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const StreakCalendar = ({ activityLog = [] }) => {
    // Generate dates for the last 6 months
    const calendarData = useMemo(() => {
        const today = new Date();
        const dates = [];
        // Go back 150 days (approx 5 months)
        for (let i = 150; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            dates.push({
                date: d,
                dateStr,
                active: activityLog.includes(dateStr)
            });
        }
        return dates;
    }, [activityLog]);

    return (
        <Paper sx={{
            p: 3,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="900">Contribution Grid</Typography>
                <Typography variant="caption" color="text.secondary">Last 5 Months</Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                maxWidth: '100%',
                justifyContent: 'flex-start'
            }}>
                {calendarData.map((day, index) => (
                    <Tooltip
                        key={day.dateStr}
                        title={`${day.dateStr}: ${day.active ? 'Active' : 'No Activity'}`}
                        arrow
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.005 }}
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 3,
                                backgroundColor: day.active ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                boxShadow: day.active ? '0 0 5px rgba(16, 185, 129, 0.5)' : 'none'
                            }}
                            whileHover={{ scale: 1.5, zIndex: 10 }}
                        />
                    </Tooltip>
                ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
                <Typography variant="caption" color="text.secondary">Less</Typography>
                <Box sx={{ width: 10, height: 10, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }} />
                <Box sx={{ width: 10, height: 10, bgcolor: '#10b981', borderRadius: 2 }} />
                <Typography variant="caption" color="text.secondary">More</Typography>
            </Box>
        </Paper>
    );
};

export default StreakCalendar;
