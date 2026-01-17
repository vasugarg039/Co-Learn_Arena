import React, { useState } from 'react';
import { Box, Typography, Button, Modal, Fade, Backdrop, Radio, RadioGroup, FormControlLabel, FormControl, LinearProgress } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'primary.main',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    outline: 'none'
};

const questions = [
    {
        id: 1,
        text: "How comfortable are you with variables and loops?",
        options: [
            { label: "What are those?", value: 1 }, // Beginner
            { label: "I use them sometimes.", value: 2 },
            { label: "I use them daily with ease.", value: 3 } // Intermediate
        ]
    },
    {
        id: 2,
        text: "Have you built any projects with Python before?",
        options: [
            { label: "No, this is my first time.", value: 1 },
            { label: "A few small scripts.", value: 2 },
            { label: "Yes, web apps or data analysis tools.", value: 3 }
        ]
    },
    {
        id: 3,
        text: "Do you know what a 'Decorator' or 'Generator' is?",
        options: [
            { label: "No idea.", value: 1 },
            { label: "Heard of them, never used.", value: 2 },
            { label: "Yes, I implement them regularly.", value: 3 } // Advanced
        ]
    }
];

const AssessmentModal = ({ open, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [analyzing, setAnalyzing] = useState(false);

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [currentStep]: parseInt(value) });
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            finishAssessment();
        }
    };

    const finishAssessment = () => {
        setAnalyzing(true);

        // Calculate Score
        let totalScore = 0;
        Object.values(answers).forEach(val => totalScore += val);

        // Determine Level
        let level = 'Beginner';
        if (totalScore >= 8) level = 'Advanced';
        else if (totalScore >= 5) level = 'Intermediate';

        // Simulate AI "Thinking"
        setTimeout(() => {
            onComplete(level);
        }, 2000);
    };

    const currentQ = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <Modal
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {analyzing ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <PsychologyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2, animation: 'pulse 1.5s infinite' }} />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>AI Architect is Analyzing...</Typography>
                            <Typography variant="body2" color="text.secondary">Designing your custom curriculum based on your responses.</Typography>
                            <LinearProgress color="secondary" sx={{ mt: 4, height: 6, borderRadius: 3 }} />
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="overline" color="primary" fontWeight="bold">
                                INITIAL SKILL ASSESSMENT
                            </Typography>
                            <Typography variant="h5" fontWeight="950" sx={{ mb: 4 }}>
                                Let's calibrate your path.
                            </Typography>

                            <LinearProgress variant="determinate" value={progress} sx={{ mb: 4, height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />

                            <Typography variant="h6" sx={{ mb: 3 }}>
                                {currentQ.text}
                            </Typography>

                            <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
                                <RadioGroup
                                    value={answers[currentStep] || ''}
                                    onChange={(e) => handleAnswer(e.target.value)}
                                >
                                    {currentQ.options.map((opt, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={opt.value}
                                            control={<Radio />}
                                            label={opt.label}
                                            sx={{
                                                mb: 1,
                                                bgcolor: answers[currentStep] === opt.value ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                                border: '1px solid',
                                                borderColor: answers[currentStep] === opt.value ? 'primary.main' : 'rgba(255,255,255,0.1)',
                                                borderRadius: 2,
                                                p: 1,
                                                pr: 2,
                                                width: '100%',
                                                m: 0
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleNext}
                                disabled={!answers[currentStep]}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)'
                                }}
                            >
                                {currentStep === questions.length - 1 ? 'Generate Roadmap' : 'Next Question'}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Fade>
        </Modal>
    );
};

export default AssessmentModal;
