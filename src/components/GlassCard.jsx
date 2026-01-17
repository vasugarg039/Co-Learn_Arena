import React from 'react';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(motion(Paper))(({ theme, hover, intensity = 1 }) => ({
    background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, rgba(30, 27, 75, ${0.4 * intensity}) 0%, rgba(30, 27, 75, ${0.1 * intensity}) 100%)` // Deep transparent indigo
        : `linear-gradient(135deg, rgba(255,255,255,${0.6 * intensity}) 0%, rgba(255,255,255,${0.2 * intensity}) 100%)`,
    backdropFilter: `blur(${12 * intensity}px)`, // Reduced blur slightly to show bg blobs better
    WebkitBackdropFilter: `blur(${12 * intensity}px)`,
    border: theme.palette.mode === 'dark'
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid rgba(255,255,255,0.3)',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    transition: 'border 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)', // Glassmorphism shadow
    ...(hover && {
        '&:hover': {
            border: `1px solid ${theme.palette.primary.main}44`,
            boxShadow: '0 8px 32px 0 rgba(217, 70, 239, 0.15)', // Purple glow on hover
        }
    })
}));

const GlassCard = ({ children, sx, hover = true, intensity = 1, delay = 0, ...props }) => {
    return (
        <StyledPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            intensity={intensity}
            hover={hover}
            sx={sx}
            {...props}
        >
            {/* Subtle Inner Glow */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                pointerEvents: 'none'
            }} />
            {children}
        </StyledPaper>
    );
};

export default GlassCard;
