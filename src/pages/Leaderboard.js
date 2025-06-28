import React, { useEffect, useState } from "react";
import { 
    Container, Typography, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, Box, 
    Avatar, Chip, Tooltip 
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const Leaderboard = () => {
    const [showCelebration, setShowCelebration] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        
        window.addEventListener("resize", handleResize);
        setTimeout(() => setShowCelebration(false), 5000);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const leaderboardData = [
        { 
            rank: 1, 
            name: "Anmol Garg", 
            region: "India", 
            score: 95, 
            attempts: 12, 
            timeSpent: "42h 15m", 
            accuracy: "92%",
            skills: {
                personality: "Excellent",
                voice: "Clear",
                communication: "Fluent",
                writing: "Good"
            },
            avatar: "https://randomuser.me/api/portraits/men/32.jpg" 
        },
        { 
            rank: 2, 
            name: "Rohit Sharma", 
            region: "India", 
            score: 92, 
            attempts: 8, 
            timeSpent: "35h 20m", 
            accuracy: "89%",
            skills: {
                personality: "Good",
                voice: "Excellent",
                communication: "Good",
                writing: "Average"
            },
            avatar: "https://randomuser.me/api/portraits/men/44.jpg" 
        },
        { 
            rank: 3, 
            name: "Pooja Verma", 
            region: "USA", 
            score: 89, 
            attempts: 15, 
            timeSpent: "52h 40m", 
            accuracy: "85%",
            skills: {
                personality: "Excellent",
                voice: "Good",
                communication: "Excellent",
                writing: "Good"
            },
            avatar: "https://randomuser.me/api/portraits/women/63.jpg" 
        },
        { 
            rank: 4, 
            name: "Aryan Singh", 
            region: "UK", 
            score: 85, 
            attempts: 6, 
            timeSpent: "28h 10m", 
            accuracy: "82%",
            skills: {
                personality: "Average",
                voice: "Clear",
                communication: "Good",
                writing: "Excellent"
            },
            avatar: "https://randomuser.me/api/portraits/men/22.jpg" 
        },
        { 
            rank: 5, 
            name: "Neha Patel", 
            region: "Canada", 
            score: 82, 
            attempts: 9, 
            timeSpent: "31h 55m", 
            accuracy: "80%",
            skills: {
                personality: "Good",
                voice: "Good",
                communication: "Average",
                writing: "Good"
            },
            avatar: "https://randomuser.me/api/portraits/women/42.jpg" 
        }
    ];

    const getSkillColor = (skill) => {
        switch(skill) {
            case "Excellent": return "success";
            case "Good": return "primary";
            case "Clear": return "info";
            case "Fluent": return "secondary";
            default: return "default";
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, textAlign: "center", position: "relative" }}>
            {/* Celebration Animation */}
            {showCelebration && (
                <>
                    <Confetti 
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={false}
                        numberOfPieces={500}
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: "fixed",
                            top: "20%",
                            right: "20px",
                            zIndex: 1000
                        }}
                    >
                        <Box sx={{ 
                            bgcolor: "rgba(255, 235, 59, 0.9)",
                            p: 2,
                            borderRadius: "10px",
                            boxShadow: 3,
                            textAlign: "center",
                            backdropFilter: "blur(5px)"
                        }}>
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <CelebrationIcon fontSize="large" color="secondary" />
                            </motion.div>
                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                                🎉 Hooray! 🎉
                            </Typography>
                            <Typography variant="body2" fontStyle="italic">
                                "You're on the leaderboard!"
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                Keep up the great work!
                            </Typography>
                        </Box>
                    </motion.div>
                </>
            )}

            {/* Header */}
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#2c387e" }}>
                🏆 Performance Leaderboard
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, color: "#666" }}>
                Compare your performance with top candidates worldwide
            </Typography>

            {/* Leaderboard Table */}
            <TableContainer 
                component={Paper} 
                sx={{ 
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    overflowX: "auto"
                }}
            >
                <Table>
                    <TableHead sx={{ bgcolor: "#2c387e" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: "70px" }}>Rank</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: "180px" }}>Candidate</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Region</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Score</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Attempts</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time Spent</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Accuracy</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Skills</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardData.map((user) => (
                            <TableRow 
                                key={user.rank} 
                                sx={{ 
                                    '&:nth-of-type(odd)': { bgcolor: "#f9f9f9" },
                                    '&:hover': { bgcolor: "#f0f0f0" }
                                }}
                            >
                                <TableCell sx={{ fontWeight: "bold" }}>
                                    <Box sx={{ 
                                        display: "flex", 
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        {user.rank === 1 ? (
                                            <EmojiEventsIcon sx={{ color: "gold", fontSize: "28px" }} />
                                        ) : user.rank === 2 ? (
                                            <StarIcon sx={{ color: "silver", fontSize: "28px" }} />
                                        ) : user.rank === 3 ? (
                                            <StarIcon sx={{ color: "#cd7f32", fontSize: "28px" }} />
                                        ) : (
                                            user.rank
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Avatar 
                                            src={user.avatar} 
                                            sx={{ width: 40, height: 40, border: "2px solid #2c387e" }} 
                                        />
                                        <Typography fontWeight="medium">{user.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={user.region} 
                                        size="small" 
                                        sx={{ 
                                            bgcolor: "#e0e0e0",
                                            fontWeight: "medium"
                                        }} 
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#2c387e" }}>
                                    {user.score}
                                </TableCell>
                                <TableCell>{user.attempts}</TableCell>
                                <TableCell>{user.timeSpent}</TableCell>
                                <TableCell>
                                    <Box sx={{
                                        width: "100%",
                                        bgcolor: "#e0e0e0",
                                        borderRadius: "4px",
                                        height: "20px",
                                        position: "relative"
                                    }}>
                                        <Box sx={{
                                            width: user.accuracy,
                                            bgcolor: user.score > 90 ? "#4caf50" : 
                                                    user.score > 80 ? "#2196f3" : "#ff9800",
                                            height: "100%",
                                            borderRadius: "4px"
                                        }} />
                                        <Typography 
                                            variant="caption" 
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                color: "white",
                                                fontWeight: "bold",
                                                textShadow: "0 0 2px rgba(0,0,0,0.5)"
                                            }}
                                        >
                                            {user.accuracy}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ minWidth: "200px" }}>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {Object.entries(user.skills).map(([skill, value]) => (
                                            <Tooltip key={skill} title={`${skill}: ${value}`} arrow>
                                                <Chip
                                                    label={`${skill.charAt(0).toUpperCase() + skill.slice(1)}`}
                                                    size="small"
                                                    color={getSkillColor(value)}
                                                    variant="outlined"
                                                    sx={{ 
                                                        fontWeight: "medium",
                                                        fontSize: "0.65rem"
                                                    }}
                                                />
                                            </Tooltip>
                                        ))}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Key Metrics */}
            <Box sx={{ 
                mt: 3,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2
            }}>
                <Paper sx={{ p: 2, minWidth: "120px", textAlign: "center" }}>
                    <Typography variant="subtitle2" color="textSecondary">Avg. Score</Typography>
                    <Typography variant="h6" color="#2c387e">88.6</Typography>
                </Paper>
                <Paper sx={{ p: 2, minWidth: "120px", textAlign: "center" }}>
                    <Typography variant="subtitle2" color="textSecondary">Total Users</Typography>
                    <Typography variant="h6" color="#2c387e">5,842</Typography>
                </Paper>
                <Paper sx={{ p: 2, minWidth: "120px", textAlign: "center" }}>
                    <Typography variant="subtitle2" color="textSecondary">Avg. Attempts</Typography>
                    <Typography variant="h6" color="#2c387e">10</Typography>
                </Paper>
                <Paper sx={{ p: 2, minWidth: "120px", textAlign: "center" }}>
                    <Typography variant="subtitle2" color="textSecondary">Top Region</Typography>
                    <Typography variant="h6" color="#2c387e">India</Typography>
                </Paper>
            </Box>

            {/* Footer */}
            <Box sx={{ 
                mt: 4, 
                p: 2, 
                bgcolor: "#f5f5f5", 
                borderRadius: "8px",
                borderTop: "3px solid #2c387e"
            }}>
                <Typography variant="body2" color="textSecondary" align="center">
                    Data updated: {new Date().toLocaleString()} | © {new Date().getFullYear()} AI Interviewer
                </Typography>
            </Box>
        </Container>
    );
};

export default Leaderboard;