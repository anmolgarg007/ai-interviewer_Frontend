import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, Box, Avatar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Psychology, RecordVoiceOver, BarChart, Face, Star, Feedback } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import FileUpload from "../components/FileUpload";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { fontStyle } from "@mui/system";
// At the top of your Home component


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

function Home() {
  const theme = useTheme();
  const lightGradient = "linear-gradient(to right, #f6f7ff, #f9f9ff)";
  // Color scheme variables
  const gradient = "linear-gradient(135deg, #1976d2 0%, #4facfe 100%)";
  const secondaryGradient = "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)";
  const lightBackground = "#f8fafc";
  const darkText = "#2d3748";
  const secondaryText = "#4a5568";
  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          background: gradient,
          height: "100vh",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "url('https://source.unsplash.com/1600x900/?technology,ai')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            zIndex: 0
          }
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              color=""
              sx={{
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "0 2px 10px rgba(0,0,0,0.2)"
              }}
            >
              Ace Your Next Interview with AI!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Typography
              variant="h5"
              sx={{
                mt: 2,
                mb: 4,
                maxWidth: "700px",
                mx: "auto",
                fontSize: { xs: "1.1rem", md: "1.3rem" }
              }}
            >
              Get real-time feedback on your communication, confidence, and technical skills from our advanced AI system.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            sx={{ display: "flex", justifyContent: "center", gap: 3 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                boxShadow: "0 4px 15px rgba(255, 117, 140, 0.4)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 20px rgba(199, 37, 64, 0.6)"
                },
                transition: "all 0.3s ease",
                background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)', // Pink gradient
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff6b7b 0%, #ff729d 100%)', // Slightly darker pink on hover
              }}}
              component={Link}
              to="/interview"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                borderWidth: "2px",
                marginLeft: 2,
                transition: "all 0.3s ease",
                background: 'white',
                border: '1px solid #1976d2',
                color: '#1976d2',
                '&:hover': {
                  background: 'rgba(25, 118, 210, 0.04)',
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)'
                }
              }
            }
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            sx={{ mt: 6 }}
          >
          </motion.div>
            <FileUpload />
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        component={motion.section}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={{ py: 10, backgroundColor: "#f9f9ff" }}
      >
        <Container>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}
            >
              Why Choose AI Interviewer?
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ mb: 6, color: theme.palette.text.secondary }} fontStyle={"italic"}
            >
              "Revolutionize your interview preparation with our cutting-edge technology"
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      p: 4,
                      height: "100%",
                      borderRadius: "16px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                        transform: "translateY(-5px)"
                      }
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          mx: "auto",
                          mb: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: secondaryGradient,
                          color: "white"
                        }}
                      >
                        {React.cloneElement(feature.icon, { fontSize: "large" })}
                      </Box>
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        component={motion.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{ py: 10, background: "linear-gradient(to right, #f6f7ff, #f9f9ff)" }}
      >
        <Container>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Trusted by Thousands
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ mb: 6, color: theme.palette.text.secondary }}
            >
              What our users say about their experience
            </Typography>
          </motion.div>

          <Box sx={{ position: "relative", py: 2 }}>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              effect="fade"
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              breakpoints={{
                600: { slidesPerView: 2 },
                900: { slidesPerView: 3 }
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        textAlign: "center",
                        p: 4,
                        height: "100%",
                        borderRadius: "16px",
                        boxShadow: "0 5px 20px rgba(118, 96, 179, 0.1)",
                        background: "white",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "5px",
                          height: "100%",
                          background: secondaryGradient
                        }
                      }}
                    >
                      <CardContent>
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            mx: "auto",
                            mb: 3,
                            border: "3px solid #fff",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            background: gradient
                          }}
                        >
                          <Feedback fontSize="large" />
                        </Avatar>
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 3,
                            fontStyle: "italic",
                            position: "relative",
                            "&::before, &::after": {
                              content: '"\\201C"',
                              fontSize: "3rem",
                              color: theme.palette.primary.light,
                              opacity: 0.3,
                              position: "absolute",
                              top: "-20px",
                              left: "-10px"
                            },
                            "&::after": {
                              content: '"\\201D"',
                              left: "auto",
                              right: "-10px",
                              top: "auto",
                              bottom: "-40px"
                            }
                          }}
                        >
                          {testimonial.feedback}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {testimonial.position}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        component={motion.section}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{
          py: 10,
          background: gradient,
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Container>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
              Ready to Transform Your Interview Skills?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}>
              Join thousands of professionals who have already improved their interview performance with our AI platform.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/interview"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: "50px",
                fontSize: "1.1rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.3)"
                },
                transition: "all 0.3s ease"
              }}
            >
              Get Started Now
            </Button>
          </motion.div>
        </Container>
      </Box>

 
    </Box>
  );
}

// Features Data
const features = [
  { 
    title: "AI-Powered Interviewing", 
    description: "Get dynamic, real-world interview questions tailored to your profile and experience level.", 
    icon: <Psychology /> 
  },
  { 
    title: "Voice & Video Analysis", 
    description: "Advanced analysis of your speech clarity, confidence levels, and facial expressions.", 
    icon: <RecordVoiceOver /> 
  },
  { 
    title: "Performance Scoring", 
    description: "Detailed scoring system evaluating fluency, technical accuracy, and body language.", 
    icon: <BarChart /> 
  },
  { 
    title: "Real-Time Coaching", 
    description: "Instant suggestions and improvements while you practice your answers.", 
    icon: <Face /> 
  },
  { 
    title: "Multiple Interview Types", 
    description: "HR, Technical, Behavioral, Case Study, and System Design interviews.", 
    icon: <Psychology /> 
  },
  { 
    title: "Multilingual Support", 
    description: "Practice in multiple languages with AI-powered grammar and pronunciation corrections.", 
    icon: <Star /> 
  }
];

// Testimonials Data
const testimonials = [
  { 
    name: "John Doe", 
    position: "Software Engineer at Google",
    feedback: "This AI interviewer helped me land my dream job at Google! The feedback was incredibly accurate and helped me improve areas I didn't even know needed work." 
  },
  { 
    name: "Alice Smith", 
    position: "Product Manager at Amazon",
    feedback: "I improved my confidence and interview skills tremendously. The behavioral questions were spot-on for PM interviews." 
  },
  { 
    name: "Rahul Mehta", 
    position: "Data Scientist at Microsoft",
    feedback: "A game-changer for job seekers. The technical interview simulations are incredibly realistic with great feedback." 
  },
  { 
    name: "Maria Garcia", 
    position: "UX Designer at Facebook",
    feedback: "The portfolio review feature helped me present my work more effectively. Got offers from 3 top companies!" 
  }
];

export default Home;