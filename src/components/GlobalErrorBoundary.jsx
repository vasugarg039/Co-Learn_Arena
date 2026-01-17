import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#0f172a',
                    color: 'white',
                    p: 4,
                    textAlign: 'center'
                }}>
                    <Typography variant="h3" fontWeight="900" color="error" gutterBottom>
                        SYSTEM FAILURE
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, maxWidth: 600 }}>
                        A critical runtime error has occurred. The application layout has collapsed.
                    </Typography>

                    <Box sx={{
                        p: 3,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        borderRadius: 2,
                        border: '1px solid rgba(255,255,255,0.1)',
                        width: '100%',
                        maxWidth: 800,
                        overflow: 'auto',
                        mb: 4,
                        fontFamily: 'monospace',
                        textAlign: 'left'
                    }}>
                        <Typography color="error.light" fontWeight="bold">
                            {this.state.error && this.state.error.toString()}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => window.location.reload()}
                        sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
                    >
                        REBOOT SYSTEM
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
