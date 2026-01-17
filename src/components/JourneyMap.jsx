import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MapIcon from '@mui/icons-material/Map';
import SchoolIcon from '@mui/icons-material/School';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Custom Connector for a "Path" look
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(66, 133, 244) 0%,rgb(0, 200, 83) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(66, 133, 244) 0%,rgb(0, 200, 83) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(66, 133, 244) 0%, rgb(0, 200, 83) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(66, 133, 244) 0%, rgb(0, 200, 83) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SchoolIcon />,
        2: <GroupAddIcon />,
        3: <VerifiedUserIcon />,
        4: <MapIcon />, // Mentor/Guide
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ['Novice', 'Squad Member', 'Helper', 'Mentor'];

const JourneyMap = ({ level }) => {
    // Determine active step based on Level (Mock logic: Level 1-2=0, 3-4=1, 5-6=2, 7+=3)
    const activeStep = level < 3 ? 0 : level < 5 ? 1 : level < 8 ? 2 : 3;

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="text.secondary">Current Chapter</Typography>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, borderLeft: '4px solid #4285F4' }}>
                <Typography variant="caption" fontWeight="bold" color="primary">NEXT UNLOCK</Typography>
                <Typography variant="body2" fontWeight="bold">
                    {activeStep === 0 ? "Unlock Squad messaging at Level 3" :
                        activeStep === 1 ? "Unlock 'Fix-a-Friend' Helper Badge" :
                            activeStep === 2 ? "Unlock Mentor Mode & Custom Themes" : "You are a Legend!"}
                </Typography>
            </Box>
        </Box>
    );
};

export default JourneyMap;
