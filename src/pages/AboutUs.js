import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box, Avatar, IconButton, Button } from "@mui/material";
import { motion } from "framer-motion";
import { LinkedIn, Instagram, Email, Telegram } from "@mui/icons-material";
import teamImage1 from "../assets/images/image_1.jpg";
import teamImage2 from "../assets/images/image_2.jpg";
import teamImage3 from "../assets/images/image_3.jpg";
import backgroundVideo from "../assets/videos/tech-background.mp4"; // Add your video file
import { fontWeight } from "@mui/system";

const teamMembers = [
    
    {
        name: "Varsha Gola",
        role: "UI/UX Designer & Frontend Lead",
        img: teamImage2,
        social: { linkedIn: "#", insta: "#", email: "#", telegram: "#" },
        bio: "As a UI/UX Designer and Frontend Lead, I excels in creating intuitive interfaces and leads frontend development, particularly in facial analysis and integration, contributing across the project.",
        justifyContent: "center",
        alignitems: "center"
      },
      {
        name: "Shivani Singh",
        role: "Backend Developer & Model Architect",
        img: teamImage1,
        social: { linkedIn: "#", insta: "#", email: "#", telegram: "#" },
        bio: "As a Backend Developer and Model Architect, I excels in building robust backend systems and crafting AI models, specifically in speech, language, and resume analysis, aiding team efforts.",
        justifyContent: "center",
        alignitems: "center"
      },
      {
        name: "Saud Zargar",
        role: "Research & Developement Specialist",
        img: teamImage3,
        social: { linkedIn: "#", insta: "#", email: "#", telegram: "#" },
        bio: "As a Data and Documentation Specialist, I excels in data handling and creates detailed project documentation, and is a key contributor to presentations and overall project clarity.",
        justifyContent: "center",
        alignitems: "center"
      },
];

const AboutUs = () => {
    return (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
            {/* Animated Background */}
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    //background: "linear-gradient(to bottom, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.9))",
                    zIndex: 1
                }
            }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 1
                    }}
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </Box>

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 8 }}>
                {/* Hero Section */}
                <Box sx={{ textAlign: "center", mb: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Typography variant="h2" fontWeight="bold" sx={{
                            mb: 3,
                            background: "white",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                            fontSize: { xs: "2.5rem", md: "3.5rem" }
                        }}>
                            Revolutionizing Interviews with AI
                        </Typography>
                        <Typography variant="h5" sx={{
                            color: "white",
                            maxWidth: "800px",
                            mx: "auto",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            fontWeight: 400
                        }}>
                            We're transforming how candidates prepare for interviews through intelligent, personalized simulations
                        </Typography>
                    </motion.div>
                </Box>

                {/* Project Highlights */}
                <Grid container spacing={4} sx={{ mb: 10 }}>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card sx={{
                                p: 4,
                                height: "100%",
                                background: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "16px",
                                border: "1px solid rgba(255,255,255,0.2)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
                            }}>
                                <Typography variant="h3" sx={{
                                    mb: 3,
                                    background: "linear-gradient(to right, #ffffff, #ff7eb3)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: "bold"
                                }}>
                                    Our Innovation
                                </Typography>
                                <Typography variant="body1" sx={{ color: "white", mb: 3 }} fontWeight="bold">
                                    We've developed proprietary AI models that analyze both verbal responses and non-verbal cues, providing comprehensive feedback that traditional methods can't match.
                                </Typography>
                                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            px: 4,
                                            borderRadius: "50px",
                                            boxShadow: "0 4px 15px rgba(255, 126, 179, 0.4)"
                                        }}
                                    >
                                        See Demo
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            px: 4,
                                            borderRadius: "50px",
                                            color: "white",
                                            borderColor: "white",
                                            "&:hover": { borderColor: "#ff7eb3" }
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card sx={{
                                p: 4,
                                height: "100%",
                                background: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "16px",
                                border: "1px solid rgba(255,255,255,0.2)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
                            }}>
                                <Typography variant="h3" sx={{
                                    mb: 3,
                                    background: "linear-gradient(to right, #ffffff, #667eea)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: "bold"
                                }}>
                                    Our Vision
                                </Typography>
                                <Box component="ul" sx={{ color: "white", pl: 1 }}>
                                    <li><Typography>Projected to help 10,000+ users</Typography></li>
                                    <li><Typography>Targeting a 78% job placement success rate</Typography></li>
                                    <li><Typography>Designed for 3x interview confidence improvement</Typography></li>
                                    <li><Typography>Building a platform for career success</Typography></li>
                                </Box>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Team Section */}
                <Box sx={{ textAlign: "center", mb: 10 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="h2" sx={{
                            mb: 6,
                            background: "white",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "bold",
                            fontSize: { xs: "2.5rem", md: "3rem" }
                        }}>
                            Meet The Minds Behind AI Interviewer
                        </Typography>
                    </motion.div>

                    <Grid container spacing={4} justifyContent="center">
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Card sx={{
                                        textAlign: "center",
                                        p: 3,
                                        borderRadius: "16px",
                                        background: "rgba(255,255,255,0.9)",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-10px)",
                                            boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
                                        }
                                    }}>
                                        <Avatar
                                            src={member.img}
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                mx: "auto",
                                                mb: 3,
                                                border: "3px solid #667eea",
                                                boxShadow: "0 5px 15px rgba(102, 126, 234, 0.4)"
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                                                {member.name}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{
                                                mb: 2,
                                                background: "linear-gradient(to right,rgb(30, 67, 231),rgb(167, 95, 240))",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                fontWeight: "bold"
                                            }}>
                                                {member.role}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    mb: 1,
                                                    textAlign: "justify",
                                                    letterSpacing: "0.1px",  // Reduce spacing between letters
                                                    lineHeight: "1.4",       // Adjust line spacing for better readability
                                                }}
                                            >
                                                {member.bio}
                                            </Typography>

                                            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                                                {Object.entries(member.social).map(([platform, url]) => {
                                                    const icons = {
                                                        linkedIn: <LinkedIn />,
                                                        insta: <Instagram />,
                                                        email: <Email />,
                                                        telegram: <Telegram />
                                                    };
                                                    return (
                                                        <IconButton
                                                            key={platform}
                                                            href={url}
                                                            sx={{
                                                                color: "#667eea",
                                                                backgroundColor: "rgba(102, 126, 234, 0.1)",
                                                                "&:hover": {
                                                                    backgroundColor: "#667eea",
                                                                    color: "white",
                                                                    transform: "scale(1.1)"
                                                                },
                                                                transition: "all 0.3s ease"
                                                            }}
                                                        >
                                                            {icons[platform]}
                                                        </IconButton>
                                                    );
                                                })}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Card sx={{
                        p: 6,
                        textAlign: "center",
                        borderRadius: "16px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 15px 40px rgba(102, 126, 234, 0.5)"
                    }}>
                        <Typography variant="h2" sx={{
                            mb: 3,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: { xs: "2rem", md: "2.5rem" }
                        }}>
                            Ready to Transform Your Interview Skills?
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 4, color: "rgba(255,255,255,0.9)" }}>
                            Join thousands who've already accelerated their career growth
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{
                                px: 6,
                                py: 1.5,
                                borderRadius: "50px",
                                fontSize: "1.1rem",
                                boxShadow: "0 5px 20px rgba(255, 126, 179, 0.5)",
                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: "0 8px 25px rgba(255, 126, 179, 0.7)"
                                },
                                transition: "all 0.3s ease"
                            }}
                        >
                            Start Free Trial
                        </Button>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default AboutUs;