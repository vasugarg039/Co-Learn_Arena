import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, IconButton, CircularProgress, Chip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import { motion } from 'framer-motion';
import QuestTopicModal from './QuestTopicModal';
import AssessmentModal from './AssessmentModal';
import { RoadmapGenerator } from '../services/RoadmapGenerator';
import { useGamification } from '../context/GamificationContext';
import ReactConfetti from 'react-confetti';

const QuestRoadmap = () => {
    const { awardXP } = useGamification();
    const [roadmapData, setRoadmapData] = useState(null);
    const [progress, setProgress] = useState({});
    const [selectedNode, setSelectedNode] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showAssessment, setShowAssessment] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initialize - Check for existing roadmap
    useEffect(() => {
        const savedRoadmap = JSON.parse(localStorage.getItem('userAdaptedRoadmap') || 'null');
        const savedProgress = JSON.parse(localStorage.getItem('pythonQuestProgress') || '{}');

        if (savedRoadmap) {
            setRoadmapData(savedRoadmap);
            setProgress(savedProgress);
            setLoading(false);
        } else {
            // No roadmap found, start assessment
            setShowAssessment(true);
            setLoading(false);
        }
    }, []);

    const handleAssessmentComplete = (level) => {
        try {
            console.log("Completing assessment with level:", level);
            const newRoadmap = RoadmapGenerator.generateRoadmap(level);

            if (!newRoadmap) {
                console.error("Failed to generate roadmap: Received null");
                // Fallback to basic
                setRoadmapData(RoadmapGenerator.generateRoadmap('Beginner'));
                return;
            }

            setRoadmapData(newRoadmap);

            // Initialize progress based on new roadmap status
            const initialProgress = {};
            if (newRoadmap.phases) {
                newRoadmap.phases.forEach(phase => {
                    if (phase.nodes) {
                        phase.nodes.forEach(node => {
                            initialProgress[node.id] = node.status;
                        });
                    }
                });
            }

            setProgress(initialProgress);
            localStorage.setItem('userAdaptedRoadmap', JSON.stringify(newRoadmap));
            localStorage.setItem('pythonQuestProgress', JSON.stringify(initialProgress));

            setShowAssessment(false);
        } catch (error) {
            console.error("Error in handleAssessmentComplete:", error);
            // Emergency fallback
            setShowAssessment(false);
        }
    };

    const handleNodeClick = (node) => {
        const status = progress[node.id];
        if (status === 'locked') return;
        setSelectedNode(node);
    };

    const handleComplete = async (node, score = 0) => {
        // 1. Update State & Storage
        let newProgress = { ...progress, [node.id]: 'completed' };

        // 2. Unlock Next Node logic & Adaptivity
        let foundCurrent = false;
        let nextNodeId = null;

        const allNodes = roadmapData.phases.flatMap(p => p.nodes);
        for (const n of allNodes) {
            if (foundCurrent) {
                nextNodeId = n.id;
                break;
            }
            if (n.id === node.id) foundCurrent = true;
        }

        if (nextNodeId) {
            newProgress[nextNodeId] = 'unlocked';
        }

        // --- ADAPTIVE LOGIC ---
        // High Performance (Score 100) triggers 'Elite' status or unlocks bonuses
        if (score >= 100) {
            console.log("Adaptive Engine: Elite Performance Detected.");
            // Future: Unlock hidden/bonus nodes here
            // For now, we simulate an 'Optimization' recommendation
            if (Math.random() > 0.5) {
                // Mock dynamic insertion (visual only for MVP)
                // alert("AI Insight: You mastered this topic! 'Advanced Generators' module recommended.");
            }
        }

        setProgress(newProgress);
        localStorage.setItem('pythonQuestProgress', JSON.stringify(newProgress));

        // 3. Award XP
        const xpMultiplier = score >= 100 ? 1.5 : 1;
        await awardXP(node.xp * xpMultiplier, `Completed Lesson: ${node.title} (${score >= 100 ? 'Elite' : 'Standard'})`);

        // 4. Celebration
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
    };

    const getNodeIcon = (type) => {
        if (type === 'video') return <PlayArrowIcon />;
        if (type === 'code') return <CodeIcon />;
        return <CodeIcon />;
    };

    if (loading) return <Box sx={{ p: 10, textAlign: 'center' }}><CircularProgress /></Box>;
    if (showAssessment) return <AssessmentModal open={true} onComplete={handleAssessmentComplete} />;
    if (!roadmapData) return null;

    return (
        <Box sx={{ position: 'relative', pb: 10 }}>
            {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}

            <Typography variant="h3" fontWeight="950" gutterBottom align="center" sx={{ mb: 1 }}>
                {roadmapData.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
                {roadmapData.description}
            </Typography>

            <Box sx={{ maxWidth: 900, mx: 'auto', position: 'relative' }}>
                {/* Central Line */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: { xs: 40, md: '50%' },
                    width: 4,
                    bgcolor: 'divider',
                    transform: { md: 'translateX(-50%)' },
                    zIndex: 0
                }} />

                {roadmapData.phases.map((phase, phaseIndex) => (
                    <Box key={phase.id} sx={{ mb: 8 }}>
                        {/* Phase Header */}
                        <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}>
                            <Chip
                                label={phase.title.toUpperCase()}
                                sx={{
                                    bgcolor: phase.color,
                                    color: 'white',
                                    fontWeight: 900,
                                    px: 3,
                                    py: 2.5,
                                    borderRadius: 4,
                                    fontSize: '1rem',
                                    boxShadow: `0 0 20px ${phase.color}66`
                                }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {phase.nodes.map((node, index) => {
                                const status = progress[node.id] || 'locked'; // locked, unlocked, completed
                                const isLeft = index % 2 === 0;

                                return (
                                    <Box
                                        key={node.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: { xs: 'flex-start', md: isLeft ? 'flex-end' : 'flex-start' },
                                            position: 'relative',
                                            pl: { xs: 10, md: 0 },
                                            pr: { xs: 0, md: isLeft ? 10 : 0 },
                                            pl: { xs: 10, md: isLeft ? 0 : 10 }
                                        }}
                                    >
                                        {/* Connector Dot */}
                                        <Box sx={{
                                            position: 'absolute',
                                            left: { xs: 26, md: '50%' },
                                            top: 24,
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            bgcolor: status === 'completed' ? '#10b981' : (status === 'unlocked' ? 'primary.main' : 'background.paper'),
                                            border: '4px solid',
                                            borderColor: 'background.default',
                                            transform: { md: 'translateX(-50%)' },
                                            zIndex: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: status !== 'locked' ? '0 0 15px rgba(99, 102, 241, 0.5)' : 'none'
                                        }}>
                                            {status === 'completed' ? <CheckCircleIcon sx={{ fontSize: 18, color: 'white' }} /> :
                                                status === 'unlocked' ? <LockOpenIcon sx={{ fontSize: 16, color: 'white' }} /> : <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                                        </Box>

                                        {/* Node Card */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            whileHover={status !== 'locked' ? { scale: 1.02 } : {}}
                                            onClick={() => handleNodeClick(node)}
                                            style={{ width: '100%', maxWidth: 400, cursor: status !== 'locked' ? 'pointer' : 'default' }}
                                        >
                                            <Paper sx={{
                                                p: 3,
                                                borderRadius: 4,
                                                bgcolor: status === 'locked' ? 'rgba(255,255,255,0.02)' : 'background.paper',
                                                border: '1px solid',
                                                borderColor: status === 'locked' ? 'divider' : (status === 'completed' ? '#10b981' : 'primary.main'),
                                                opacity: status === 'locked' ? 0.6 : 1,
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                {status === 'completed' && <Box sx={{ position: 'absolute', top: 0, right: 0, px: 2, py: 0.5, bgcolor: '#10b981', color: 'white', fontWeight: 'bold', fontSize: '0.7rem', borderBottomLeftRadius: 10 }}>COMPLETED</Box>}

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'background.default', display: 'flex' }}>
                                                        {getNodeIcon(node.type)}
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight="bold">{node.title}</Typography>
                                                        <Typography variant="caption" color="text.secondary">+{node.xp} XP</Typography>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </motion.div>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                ))}
            </Box>

            <QuestTopicModal
                open={!!selectedNode}
                handleClose={() => setSelectedNode(null)}
                node={selectedNode}
                onComplete={handleComplete}
            />
        </Box>
    );
};

export default QuestRoadmap;
