import React, { useEffect, useRef, useState } from "react";
import { Paper, Slider, Button, Box, Typography, IconButton } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ContrastIcon from "@mui/icons-material/Contrast";
import MicIcon from "@mui/icons-material/Mic";

const CameraFeed = () => {
    const videoRef = useRef(null);
    const [voiceLevel, setVoiceLevel] = useState(20);
    const [effects, setEffects] = useState({
        blur: false,
        brightness: 50,
        contrast: 50
    });

    // Request Camera Access
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(() => alert("Camera access is required!"));
    }, []);

    // Handle voice level changes
    const handleVoiceChange = (e, newValue) => {
        setVoiceLevel(newValue);
        // Here you would typically send this to your audio processor
        console.log("Voice level adjusted to:", newValue);
    };

    // Toggle background blur
    const toggleBlur = () => {
        setEffects(prev => ({
            ...prev,
            blur: !prev.blur
        }));
        console.log("Background blur:", !effects.blur);
    };

    // Adjust brightness
    const handleBrightness = () => {
        const newBrightness = effects.brightness === 50 ? 70 : 50;
        setEffects(prev => ({
            ...prev,
            brightness: newBrightness
        }));
        console.log("Brightness set to:", newBrightness);
    };

    // Adjust contrast
    const handleContrast = () => {
        const newContrast = effects.contrast === 50 ? 70 : 50;
        setEffects(prev => ({
            ...prev,
            contrast: newContrast
        }));
        console.log("Contrast set to:", newContrast);
    };

    return (
        <Paper elevation={5} sx={{
            mt: 3,
            p: 2,
            textAlign: "center",
            borderRadius: "10px",
            border: "3px solid rgb(145, 139, 133)"
        }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Live Camera</Typography>
            
            <Box sx={{ 
                position: "relative", 
                display: "inline-block",
                filter: `
                    ${effects.blur ? 'blur(4px)' : 'blur(0)'}
                    brightness(${effects.brightness}%)
                    contrast(${effects.contrast}%)
                `,
                transition: 'filter 0.3s ease'
            }}>
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    style={{
                        width: "100%",
                        maxWidth: "600px",
                        borderRadius: "10px",
                        border: "2px solid white"
                    }} 
                />
            </Box>

            {/* Voice Activity Indicator with Mic Icon */}
            <Box sx={{ 
                mt: 2, 
                width: "100%", 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                px: 2
            }}>
                <MicIcon color="primary" fontSize="small" />
                <Typography variant="caption" sx={{ minWidth: '80px' }}>
                    Mic Level
                </Typography>
                <Slider
                    value={voiceLevel}
                    onChange={handleVoiceChange}
                    min={0}
                    max={100}
                    sx={{
                        color: voiceLevel > 70 ? "error.main" : 
                              voiceLevel > 40 ? "warning.main" : "success.main",
                        '& .MuiSlider-thumb': { 
                            width: 12,
                            height: 12,
                            display: voiceLevel > 0 ? 'block' : 'none' 
                        },
                        '& .MuiSlider-track': { height: 6 },
                        flexGrow: 1
                    }}
                />
            </Box>

            {/* Video Enhancement Options */}
            <Box sx={{ 
                mt: 2, 
                display: "flex", 
                justifyContent: "center", 
                gap: 1,
                flexWrap: 'wrap'
            }}>
                <Button 
                    variant={effects.blur ? "contained" : "outlined"}
                    color="secondary" 
                    size="small"
                    startIcon={<BlurOnIcon fontSize="small" />}
                    onClick={toggleBlur}
                    sx={{ 
                        px: 1,
                        fontSize: '0.75rem',
                        minWidth: 'unset'
                    }}
                >
                    Blur
                </Button>
                <Button 
                    variant="outlined"
                    color="info" 
                    size="small"
                    startIcon={<Brightness4Icon fontSize="small" />}
                    onClick={handleBrightness}
                    sx={{ 
                        px: 1,
                        fontSize: '0.75rem',
                        minWidth: 'unset',
                        backgroundColor: effects.brightness !== 50 ? 'action.selected' : undefined
                    }}
                >
                    {effects.brightness === 50 ? 'Bright+' : 'Normal'}
                </Button>
                <Button 
                    variant="outlined"
                    color="warning" 
                    size="small"
                    startIcon={<ContrastIcon fontSize="small" />}
                    onClick={handleContrast}
                    sx={{ 
                        px: 1,
                        fontSize: '0.75rem',
                        minWidth: 'unset',
                        backgroundColor: effects.contrast !== 50 ? 'action.selected' : undefined
                    }}
                >
                    {effects.contrast === 50 ? 'Contrast+' : 'Normal'}
                </Button>
            </Box>
        </Paper>
    );
};

export default CameraFeed;