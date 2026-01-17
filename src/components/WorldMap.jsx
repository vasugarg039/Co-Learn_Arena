import React from 'react';
import { Box, Typography, Paper, Tooltip, IconButton, keyframes } from '@mui/material';
import { motion } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';
import ExploreIcon from '@mui/icons-material/Explore';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const WorldMap = () => {
    const navigate = useNavigate();
    const { stats } = useGamification();
    const currentLevel = stats.level || 1;

    const MAP_NODES = [
        { id: 'training', label: 'TRAINING GROUNDS', x: 20, y: 70, minLevel: 1, icon: <ExploreIcon />, path: '/quests?category=All' },
        { id: 'dsa-valley', label: 'ALGO VALLEY', x: 45, y: 40, minLevel: 2, icon: <SportsEsportsIcon />, path: '/quests?category=DSA' },
        { id: 'dev-city', label: 'DEV CITY', x: 70, y: 65, minLevel: 4, icon: <SportsEsportsIcon />, path: '/quests?category=Web%20Dev' },
        { id: 'boss-citadel', label: 'BOSS CITADEL', x: 85, y: 25, minLevel: 6, icon: <WorkspacePremiumIcon />, path: '/quests?category=Boss%20Raid' },
    ];

    return (
        <Box sx={{
            width: '100%',
            height: '600px',
            bgcolor: 'background.paper',
            borderRadius: 8,
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)',
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0)',
            backgroundSize: '30px 30px',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
        }}>
            {/* Map Connectivity Lines (Mock SVG) */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <path d="M 20% 70% Q 32% 55% 45% 40% T 70% 65% T 85% 25%"
                    fill="none"
                    stroke="rgba(99, 102, 241, 0.2)"
                    strokeWidth="4"
                    strokeDasharray="10,15"
                />
            </svg>

            <Typography variant="h4" sx={{
                position: 'absolute',
                top: 40,
                left: 40,
                fontWeight: 900,
                letterSpacing: 2,
                color: 'primary.light'
            }}>
                WORLD_MAP.V1
            </Typography>

            {MAP_NODES.map((node) => {
                const isLocked = currentLevel < node.minLevel;
                const isActive = currentLevel === node.minLevel;

                return (
                    <Box
                        key={node.id}
                        sx={{
                            position: 'absolute',
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2
                        }}
                    >
                        <Tooltip title={isLocked ? `Unlock at Level ${node.minLevel}` : node.label} arrow>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <motion.div
                                    whileHover={!isLocked ? { scale: 1.2 } : {}}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Paper
                                        onClick={() => !isLocked && navigate(node.path)}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: isLocked ? 'not-allowed' : 'pointer',
                                            bgcolor: isLocked ? 'rgba(255,255,255,0.05)' : 'background.glass',
                                            border: isLocked ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(99, 102, 241, 0.4)',
                                            backdropFilter: 'blur(10px)',
                                            animation: isActive ? `${pulse} 2s infinite` : node.id === 'training' ? `${float} 4s infinite` : 'none',
                                            transition: 'all 0.3s ease',
                                            position: 'relative'
                                        }}
                                    >
                                        {isLocked ? (
                                            <LockIcon sx={{ color: 'text.secondary', opacity: 0.5 }} />
                                        ) : (
                                            <Box sx={{ color: 'primary.main', fontSize: 32 }}>
                                                {node.icon}
                                            </Box>
                                        )}

                                        {!isLocked && (
                                            <Box sx={{
                                                position: 'absolute',
                                                top: -10,
                                                right: -10,
                                                bgcolor: 'secondary.main',
                                                borderRadius: '50%',
                                                width: 24,
                                                height: 24,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.7rem',
                                                fontWeight: 900,
                                                color: 'white',
                                                boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
                                            }}>
                                                !
                                            </Box>
                                        )}
                                    </Paper>
                                </motion.div>
                                <Typography variant="caption" sx={{
                                    fontWeight: 900,
                                    letterSpacing: 1.5,
                                    color: isLocked ? 'text.secondary' : 'white',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize: '0.65rem'
                                }}>
                                    {node.label}
                                </Typography>
                            </Box>
                        </Tooltip>
                    </Box>
                );
            })}

            {/* Cinematic Map Details */}
            <Box sx={{ position: 'absolute', bottom: 30, right: 30, opacity: 0.3 }}>
                <Typography variant="caption" sx={{ letterSpacing: 1 }}> COORDINATES: 34.0522° N, 118.2437° W</Typography>
            </Box>
        </Box>
    );
};

export default WorldMap;
