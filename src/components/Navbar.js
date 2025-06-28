import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
  padding: theme.spacing(0.5, 0),
  color: theme.palette.text.primary,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 550,
  "&:hover": { color: theme.palette.primary.main },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(0.8, 2),
  textTransform: "none",
  fontWeight: 600,
  "&:hover": { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", transform: "translateY(-1px)" },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("UserId") || null);

  useEffect(() => {
    setUserId(localStorage.getItem("UserId"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("FilePath");
    localStorage.removeItem("ResumeId");
    localStorage.removeItem("UserRole");
    localStorage.removeItem("interviewSession");
    
    toast.info("Logged out successfully");
    navigate("/login");
    setUserId(null);
  };

  const handleInterviewClick = (e) => {
    if (!userId) {
      e.preventDefault();
      toast.warn("Please login to access the interview!");
    }
    const FilePath = localStorage.getItem("FilePath");
    if(!FilePath) {
      e.preventDefault();
      toast.warn("Please upload your resume to access the interview!");
    }
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", mr: 1.5 }}>
              <PsychologyIcon sx={{ color: "white", fontSize: "1.2rem" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
              <span style={{ background: "linear-gradient(90deg, #1976d2 0%, #4facfe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span> Interviewer
            </Typography>
          </Box>
        </motion.div>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <NavButton component={Link} to="/home">Home</NavButton>
          <NavButton component={Link} to="/interview" onClick={handleInterviewClick}>Interview</NavButton>
          <NavButton component={Link} to="/leaderboard" onClick={handleInterviewClick}> Leaderboard</NavButton>
          <NavButton component={Link} to="/about">About Us</NavButton>
        </Box>

        {/* Authentication Buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!userId ? (
            <>
              <AuthButton variant="outlined" component={Link} to="/login">Log in</AuthButton>
              <AuthButton variant="contained" component={Link} to="/signup" sx={{ ml: 1 }}>Sign up</AuthButton>
            </>
          ) : (
            <AuthButton variant="outlined" onClick={handleLogout}>Logout</AuthButton>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
