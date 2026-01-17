import React, { useState } from 'react';
import { Box, Typography, Button, Modal, Fade, Backdrop, IconButton, Chip, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'primary.main',
    borderRadius: 4,
    boxShadow: 24,
    p: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
};

const QuestTopicModal = ({ open, handleClose, node, onComplete }) => {
    const [copied, setCopied] = useState(false);

    if (!node) return null;

    const handleCopy = () => {
        if (node.content.codeSnippet) {
            navigator.clipboard.writeText(node.content.codeSnippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {/* Header */}
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'rgba(99, 102, 241, 0.05)' }}>
                        <Box>
                            <Chip label={`XP REWARD: ${node.xp}`} size="small" color="secondary" sx={{ fontWeight: 900, mb: 1 }} />
                            <Typography variant="h5" fontWeight="950">{node.title}</Typography>
                        </Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Scrollable Content */}
                    <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
                            {node.content.summary}
                        </Typography>

                        {/* Video / Visual */}
                        {node.type === 'video' && (
                            <Box sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                                <PlayArrowIcon sx={{ fontSize: 60, opacity: 0.5 }} />
                                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Video Placeholder</Typography>
                            </Box>
                        )}

                        {/* Code Snippet */}
                        {node.content.codeSnippet && (
                            <Paper sx={{ mb: 4, bgcolor: '#0f172a', p: 3, borderRadius: 3, position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                                    <IconButton size="small" onClick={handleCopy} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                                        {copied ? <CheckCircleIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
                                    </IconButton>
                                </Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1, fontFamily: 'monospace' }}>EXAMPLE.PY</Typography>
                                <Typography component="pre" sx={{ fontFamily: 'monospace', color: '#38bdf8', m: 0, fontSize: '0.9rem', overflowX: 'auto' }}>
                                    {node.content.codeSnippet}
                                </Typography>
                            </Paper>
                        )}

                        {/* Mission Task */}
                        <Box sx={{ p: 3, bgcolor: 'rgba(16, 185, 129, 0.1)', borderRadius: 3, border: '1px dashed #10b981' }}>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <CodeIcon color="success" />
                                <Typography variant="h6" fontWeight="bold" color="success.main">YOUR TASK</Typography>
                            </Box>
                            <Typography variant="body1">
                                {node.content.task}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Footer Actions */}
                    <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 2, bgcolor: 'background.default' }}>
                        <Button variant="outlined" onClick={handleClose} sx={{ borderRadius: 2 }}>
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { onComplete(node, 100); handleClose(); }}
                            startIcon={<CheckCircleIcon />}
                            sx={{ borderRadius: 2, px: 4, fontWeight: bold => 900 }}
                        >
                            Mark Complete (+{node.xp} XP)
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default QuestTopicModal;
