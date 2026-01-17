import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Avatar, Badge, Chip, TextField, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from "../../context/GameContext";
import { PistonService } from '../../services/PistonService';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Sub-components
const PlayerCircle = ({ players, currentPlayer }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
        {players.map((p, i) => (
            <motion.div
                key={p.id}
                animate={{
                    scale: currentPlayer?.id === p.id ? 1.2 : 1,
                    y: currentPlayer?.id === p.id ? -20 : 0
                }}
            >
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: currentPlayer?.id === p.id ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: currentPlayer?.id === p.id ? '0 0 20px #a855f7' : 'none',
                        position: 'relative'
                    }}
                >
                    <Badge badgeContent={p.score} color="secondary" max={9999}>
                        <Avatar src={p.avatar} sx={{ width: 64, height: 64, mb: 1 }} />
                    </Badge>
                    <Typography variant="subtitle2" fontWeight="bold">{p.name}</Typography>
                    {p.isBot && <Chip label="BOT" size="small" sx={{ fontSize: '0.6rem', height: 16 }} />}
                </Paper>
            </motion.div>
        ))}
    </Box>
);

const GameArena = () => {
    const { gameState, players, currentPlayer, challenge, roundLog, startGame, makeChoice, submitChallenge } = useGame();
    const [userVote, setUserVote] = useState(null);
    const [dareCode, setDareCode] = useState("");
    const [quizAnswer, setQuizAnswer] = useState(null);

    // Auto-resolve voting for user if they take too long
    useEffect(() => {
        if (gameState === 'VOTING' && userVote === null && !currentPlayer.isBot) {
            // We wait for user to vote for themselves or others
        }
    }, [gameState]);

    if (gameState === 'LOBBY') {
        return (
            <Box sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h2" fontWeight="950" sx={{ background: 'linear-gradient(45deg, #FF3CAC, #784BA0, #2B86C5)', backgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 2 }}>
                    CODE OR CONSEQUENCES
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
                    Truth or Dare re-imagined for coders. Play with your AI Squad.
                </Typography>
                <Button variant="contained" size="large" onClick={startGame} startIcon={<PlayCircleFilledIcon />} sx={{ px: 6, py: 2, borderRadius: 4, fontSize: '1.2rem', fontWeight: 'bold' }}>
                    ENTER ARENA
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>

            {/* Header / Log */}
            <Box sx={{ mb: 1, height: 100, overflow: 'hidden', position: 'relative' }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={roundLog.length}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Typography variant="h5" align="center" fontWeight="bold" color="primary.light">
                            {roundLog[roundLog.length - 1]}
                        </Typography>
                    </motion.div>
                </AnimatePresence>
            </Box>

            {/* Players */}
            <PlayerCircle players={players} currentPlayer={currentPlayer} />

            {/* Game State Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pt: 4, pb: 24 }}>

                {gameState === 'SPINNING' && (
                    <CircularProgressWithLabel />
                    // Visual placeholder, logic handles the delay
                )}

                {gameState === 'SELECTION' && (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight="900" sx={{ mb: 1, color: currentPlayer.isBot ? 'text.secondary' : 'primary.main' }}>
                            {currentPlayer.isBot ? `${currentPlayer.name} IS CHOOSING...` : "CHOOSE YOUR PATH"}
                        </Typography>
                        <Typography sx={{ mb: 6 }} color="text.secondary">
                            {currentPlayer.isBot ? "The bot is calculating optimal strategy." : "Will you face the Squad's interrogation or their code?"}
                        </Typography>

                        {!currentPlayer.isBot ? (
                            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="large"
                                    onClick={() => makeChoice('truth')}
                                    startIcon={<PsychologyIcon />}
                                    sx={{ p: 5, borderRadius: 5, fontSize: '1.5rem', width: 200 }}
                                >
                                    TRUTH
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={() => makeChoice('dare')}
                                    startIcon={<CodeIcon />}
                                    sx={{ p: 5, borderRadius: 5, fontSize: '1.5rem', width: 200 }}
                                >
                                    DARE
                                </Button>
                            </Box>
                        ) : (
                            <LinearProgress color="warning" sx={{ width: 300, mx: 'auto', mt: 4 }} />
                        )}
                    </Box>
                )}



                {gameState === 'REVEAL' && challenge && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Box sx={{ textAlign: 'center' }}>
                            {challenge.type === 'truth' ? (
                                <PsychologyIcon sx={{ fontSize: 120, color: '#29b6f6', mb: 2 }} />
                            ) : (
                                <CodeIcon sx={{ fontSize: 120, color: '#f50057', mb: 2 }} />
                            )}
                            <Typography variant="h2" fontWeight="900" sx={{ background: '-webkit-linear-gradient(45deg, #29b6f6 30%, #f50057 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {challenge.type.toUpperCase()}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                                {currentPlayer.name} accepted the challenge.
                            </Typography>
                        </Box>
                    </motion.div>
                )}

                {gameState === 'SHOWDOWN' && challenge && (
                    <ChallengeContent
                        challenge={challenge}
                        currentPlayer={currentPlayer}
                        submitChallenge={submitChallenge}
                    />
                )}
            </Box>
        </Box>
    );
};

const ChallengeContent = ({ challenge, currentPlayer, submitChallenge }) => {
    const [timeLeft, setTimeLeft] = useState(challenge.type === 'dare' ? 120 : 30);
    const [dareCode, setDareCode] = useState(challenge.starterCode);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState(null);

    useEffect(() => {
        if (currentPlayer.isBot) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    submitChallenge(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (val) => {
        setIsSubmitting(true);
        await submitChallenge(val);
        setIsSubmitting(false);
    };

    return (
        <Paper sx={{ p: 4, width: '100%', maxWidth: 800, borderRadius: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', position: 'relative', overflow: 'visible' }}>
            {/* Timer Bar */}
            {!currentPlayer.isBot && <LinearProgress variant="determinate" value={(timeLeft / (challenge.type === 'dare' ? 120 : 30)) * 100} sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, bgcolor: 'rgba(0,0,0,0.1)', '& .MuiLinearProgress-bar': { bgcolor: timeLeft < 10 ? 'error.main' : 'primary.main' } }} />}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 1 }}>
                <Chip label={challenge.type.toUpperCase()} color={challenge.type === 'truth' ? 'info' : 'secondary'} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {!currentPlayer.isBot && <Chip label={`${timeLeft}s`} color={timeLeft < 10 ? 'error' : 'default'} variant="filled" />}
                    <Chip label={`+${challenge.xp} XP`} icon={<EmojiEventsIcon />} variant="outlined" />
                </Box>
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: challenge.type === 'truth' ? 'info.main' : 'secondary.main' }}>
                {(challenge.challenger?.name || "THE SQUAD").toUpperCase()} {challenge.type === 'truth' ? "ASKS:" : "ISSUED PROTOCOL:"}
            </Typography>

            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium' }}>
                {challenge.topic}
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'background.default', borderLeft: '4px solid', borderColor: challenge.type === 'truth' ? 'info.main' : 'secondary.main' }}>
                <Typography fontStyle="italic" sx={{ fontFamily: challenge.type === 'dare' ? 'monospace' : 'inherit' }}>
                    "{challenge.type === 'truth' ? challenge.question : challenge.instruction}"
                </Typography>
            </Paper>

            {/* DEBUG: Temporary Diagnostic */}
            {/* <Typography variant="caption" color="error" display="block" sx={{ mb: 2 }}>
                DEBUG: Type={challenge.type} | Options={challenge.options?.length} | Bot={String(currentPlayer.isBot)}
            </Typography> */}

            {/* DEBUG: Temporary Diagnostic */}
            <Box sx={{ p: 2, bgcolor: '#000', borderRadius: 2, mb: 2 }}>
                <Typography variant="caption" color="error">DEBUG DATA:</Typography>
                <pre style={{ margin: 0, color: '#0f0', fontSize: '10px' }}>
                    {JSON.stringify({ type: challenge.type, optionsCount: challenge.options?.length, isBot: currentPlayer.isBot }, null, 2)}
                </pre>
            </Box>

            {/* Truth Interface (MCQ Style) */}
            {challenge.type.toLowerCase() === 'truth' && (
                <Box>
                    {currentPlayer.isBot ? (
                        <Typography fontStyle="italic" color="text.secondary">Bot is thinking...</Typography>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {challenge.options?.map((opt, i) => (
                                <Button
                                    key={i}
                                    variant={quizAnswer === i ? "contained" : "outlined"}
                                    color={quizAnswer === i ? "info" : "inherit"}
                                    onClick={() => setQuizAnswer(i)}
                                    disabled={isSubmitting}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        p: 2,
                                        textAlign: 'left',
                                        borderColor: quizAnswer === i ? 'info.main' : 'rgba(255,255,255,0.2)',
                                        '&:hover': { borderColor: 'info.light', bgcolor: 'rgba(255,255,255,0.05)' }
                                    }}
                                >
                                    <Box sx={{
                                        minWidth: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        bgcolor: quizAnswer === i ? 'white' : 'action.disabledBackground',
                                        color: quizAnswer === i ? 'info.main' : 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 2,
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem'
                                    }}>
                                        {String.fromCharCode(65 + i)}
                                    </Box>
                                    <Typography variant="body1">{opt}</Typography>
                                </Button>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    onClick={() => handleSubmit(quizAnswer)}
                                    disabled={isSubmitting || quizAnswer === null}
                                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
                                    sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
                                >
                                    {isSubmitting ? "Verifying Answer..." : "LOCK IN ANSWER"}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}

            {/* Dare Interface (Terminal Style) */}
            {challenge.type.toLowerCase() === 'dare' && (
                <Box>
                    {currentPlayer.isBot ? (
                        <Typography fontStyle="italic" color="text.secondary">Bot is writing code...</Typography>
                    ) : (
                        <Box component={Paper} elevation={6} sx={{ bgcolor: '#1e1e1e', borderRadius: 2, overflow: 'hidden', border: '1px solid #333' }}>
                            {/* Terminal Header */}
                            <Box sx={{ bgcolor: '#2d2d2d', px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                                <Typography variant="caption" sx={{ ml: 2, color: '#888', fontFamily: 'monospace' }}>piston-cli — python3</Typography>
                            </Box>

                            {/* Terminal Input */}
                            <TextField
                                multiline
                                rows={10}
                                fullWidth
                                value={dareCode}
                                onChange={(e) => setDareCode(e.target.value)}
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                sx={{
                                    p: 2,
                                    fontFamily: 'monospace',
                                    color: '#00ff00',
                                    '& .MuiInputBase-input': {
                                        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                                        color: '#00ff00',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.5
                                    }
                                }}
                            />

                            {/* Terminal Footer / Action */}
                            <Box sx={{ p: 2, borderTop: '1px solid #333', display: 'flex', justifyContent: 'flex-end', bgcolor: '#252526' }}>
                                <Button
                                    variant="contained"
                                    color="success" // Green for "Run"
                                    onClick={() => handleSubmit(dareCode)}
                                    disabled={isSubmitting}
                                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CodeIcon />}
                                    sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                                >
                                    {isSubmitting ? "EXECUTING..." : "RUN_CODE.py"}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}

            {/* Auto-play for Bot */}
            {currentPlayer.isBot && <BotPlayingEffect onFinish={() => submitChallenge(challenge.correctAnswer || "print('hello')")} />}
        </Paper>
    );
};

const BotPlayingEffect = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(onFinish, 3000);
        return () => clearTimeout(timer);
    }, []);
    return <LinearProgress color="success" />;
}

const CircularProgressWithLabel = () => <Box sx={{ position: 'relative', display: 'inline-flex' }}><Typography>Spinning...</Typography></Box>;

export default GameArena;
