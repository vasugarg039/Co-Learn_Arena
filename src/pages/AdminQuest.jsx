import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, Container, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AdminQuest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        type: 'Sprint Quest',
        xp: 500,
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        alert(`Quest "${formData.title}" created successfully! (Mock Action)`);
        navigate('/dashboard');
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back
            </Button>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Admin: Create Quest</Typography>

            <Paper sx={{ p: 4, borderRadius: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Quest Title"
                        name="title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        label="Quest Type"
                        name="type"
                        fullWidth
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <MenuItem value="Sprint Quest">Sprint Quest</MenuItem>
                        <MenuItem value="Explain Quest">Explain Quest</MenuItem>
                        <MenuItem value="Battle Quest">Battle Quest</MenuItem>
                        <MenuItem value="Fix-a-Friend">Fix-a-Friend</MenuItem>
                    </TextField>

                    <TextField
                        label="XP Reward"
                        name="xp"
                        type="number"
                        fullWidth
                        value={formData.xp}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <Button variant="contained" size="large" onClick={handleSubmit}>
                        Publish Quest
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdminQuest;
