import React from "react";
import { Container, Grid, Typography, Box, IconButton, Divider } from "@mui/material";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
    return (
        <Box sx={{ 
            bgcolor: "#111", 
            color: "#fff", 
            pt: 5, pb: 3, 
            mt: 5, 
            textAlign: "center" 
        }}>
            <Container maxWidth="lg">
                {/* Top Section */}
                <Grid container spacing={3} justifyContent="center">
                    {/* Left: Company Info */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            AI Interviewer
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#bbb" }}>
                            "Empowering the Future of Interviews with AI."
                        </Typography>
                    </Grid>

                    {/* Center: Navigation */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Quick Links
                        </Typography>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#1DB954" } }}>
                                Home
                            </Typography>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#1DB954" } }}>
                                About Us
                            </Typography>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#1DB954" } }}>
                                Leaderboard
                            </Typography>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { color: "#1DB954" } }}>
                                Contact
                            </Typography>
                        </motion.div>
                    </Grid>

                    {/* Right: Contact Info */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Get in Touch
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                            <EmailIcon fontSize="small" />
                            <Typography variant="body2">contact@aiinterviewer.com</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                            <PhoneIcon fontSize="small" />
                            <Typography variant="body2">+91 98765 43210</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                            <LocationOnIcon fontSize="small" />
                            <Typography variant="body2">New Delhi, India</Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Divider */}
                <Divider sx={{ my: 3, bgcolor: "#444" }} />

                {/* Social Icons */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton href="#" sx={{ color: "#1DB954" }}>
                            <LinkedInIcon fontSize="large" />
                        </IconButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton href="#" sx={{ color: "#ccc" }}>
                            <GitHubIcon fontSize="large" />
                        </IconButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton href="#" sx={{ color: "#1DA1F2" }}>
                            <TwitterIcon fontSize="large" />
                        </IconButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton href="#" sx={{ color: "#E1306C" }}>
                            <InstagramIcon fontSize="large" />
                        </IconButton>
                    </motion.div>
                </Box>

                {/* Quote Section */}
                <Typography variant="h6" sx={{ mt: 3, fontStyle: "italic", color: "#bbb" }}>
                    "Success is where preparation and opportunity meet."
                </Typography>

                {/* Copyright */}
                <Typography variant="body2" sx={{ mt: 3, color: "#888" }}>
                    © {new Date().getFullYear()} AI Interviewer. All Rights Reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
