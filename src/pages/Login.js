import React, { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  IconButton, 
  ToggleButton, 
  ToggleButtonGroup, 
  Divider,
  CircularProgress,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  GitHub, 
  LinkedIn, 
  Twitter, 
  Instagram,
  AutoAwesome,
  AccountCircle,
  Lock
} from "@mui/icons-material";
import { motion } from "framer-motion";
import CONFIG from "../config"; // Make sure to import your config

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ 
      email: "", 
      password: "" 
    });
    const [role, setRole] = useState("user"); // 'user' or 'admin'
    const [focusedField, setFocusedField] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError(null); // Clear error when user types
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            setRole(newRole);
        }
    };

    const handleLogin = async () => {
        // Basic validation
        if (!credentials.email || !credentials.password) {
            setError("Please enter both email and password");
            return;
        }
    
        setIsLoading(true);
        setError(null);
    
        try {
            const payload = {
                Email: credentials.email,
                Password: credentials.password,
                RoleType: role === "admin" ? 1 : 0
            };
    
            const response = await fetch(`${CONFIG.BASE_URL}/Login/Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Login response:", data); // Debug log
    
            if (data.returnMsg === "Success") {
                // Verify data exists before storing
                if (!data.userId) {
                    throw new Error("User ID not received from server");
                }
    
                // Store user data
                localStorage.setItem("UserId", data.userId);
                localStorage.setItem("UserRole", role);
                
                // Force state update if needed
                window.dispatchEvent(new Event("storage"));
                
                // Navigate to home
                navigate("/home", { replace: true }); // replace: true prevents going back
            } else {
                throw new Error(data.returnMsg2 || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message);
            // Show toast notification here if you have a toast system
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box 
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Container 
                    maxWidth="xs"
                    sx={{
                        p: 4,
                        bgcolor: "background.paper",
                        borderRadius: "20px",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.3)",
                        backdropFilter: "blur(10px)",
                        position: "relative",
                        overflow: "hidden",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            background: "linear-gradient(90deg, #1976d2 0%, #4facfe 100%)",
                        }
                    }}
                >
                    {/* Decorative elements */}
                    <AutoAwesome 
                        sx={{ 
                            position: "absolute", 
                            top: 20, 
                            right: 20, 
                            color: "rgba(25, 118, 210, 0.1)",
                            fontSize: "3rem"
                        }} 
                    />
                    
                    {/* Title */}
                    <Box sx={{ mb: 3 }}>
                        <Typography 
                            variant="h4" 
                            fontWeight="800" 
                            color="primary.main"
                            gutterBottom
                            sx={{
                                background: "linear-gradient(90deg, #1976d2 0%, #4facfe 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                letterSpacing: "-0.5px"
                            }}
                        >
                            AI Interview Pro
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            color="text.secondary" 
                            sx={{ 
                                mb: 1,
                                fontStyle: "italic"
                            }}
                        >
                            "Empowering your career with intelligent interviews"
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Login to continue your AI Interview journey
                        </Typography>
                    </Box>

                    {/* Role Selection Tabs */}
                    <ToggleButtonGroup
                        value={role}
                        exclusive
                        onChange={handleRoleChange}
                        sx={{ 
                            mb: 3, 
                            bgcolor: "rgba(25, 118, 210, 0.05)",
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: "1px solid rgba(25, 118, 210, 0.1)",
                            width: "100%"
                        }}
                    >
                      <ToggleButton 
    value="admin" 
    sx={{ 
        flex: 1,
        py: 1.5,
        fontWeight: 700,
        letterSpacing: 0.5,
        color: role === "admin" ? "white" : "#3a3a3a",
        bgcolor: role === "admin" ? "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" : "rgba(106, 17, 203, 0.08)",
        border: role === "admin" ? "none" : "1px solid rgba(106, 17, 203, 0.2)",
        "&.Mui-selected": {
            background: "linear-gradient(90deg, #1976d2 0%, #4facfe 100%)",
            boxShadow: "0 4px 12px rgba(106, 17, 203, 0.3)"
        },
        "&:hover": {
            bgcolor: role === "admin" ? "linear-gradient(135deg, #5a0db3 0%, #1a65e8 100%)" : "rgba(106, 17, 203, 0.15)"
        },
        transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        textTransform: "none",
        fontSize: "0.9rem"
    }}
>
    Admin
</ToggleButton>
<ToggleButton 
    value="user" 
    sx={{ 
        flex: 1,
        py: 1.5,
        fontWeight: 700,
        letterSpacing: 0.5,
        color: role === "user" ? "white" : "#3a3a3a",
        bgcolor: role === "user" ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" : "rgba(17, 153, 142, 0.08)",
        border: role === "user" ? "none" : "1px solid rgba(17, 153, 142, 0.2)",
        "&.Mui-selected": {
            background: "linear-gradient(90deg, #1976d2 0%, #4facfe 100%)",
            boxShadow: "0 4px 12px rgba(106, 17, 203, 0.3)"
        },
        "&:hover": {
            bgcolor: role === "admin" ? "linear-gradient(135deg, #5a0db3 0%, #1a65e8 100%)" : "rgba(106, 17, 203, 0.15)"
        },
        transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        textTransform: "none",
        fontSize: "0.9rem"
    }}
>
    User
</ToggleButton>
                    </ToggleButtonGroup>

                    {/* Error Message */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Input Fields */}
                    <Box sx={{ mb: 2, position: "relative" }}>
                        <AccountCircle 
                            sx={{ 
                                position: "absolute", 
                                left: 12, 
                                top: "50%", 
                                transform: "translateY(-50%)",
                                color: focusedField === "email" ? "primary.main" : "action.active",
                                transition: "color 0.3s ease"
                            }} 
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            sx={{ 
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    pl: 4.5,
                                    borderRadius: "12px",
                                    "& fieldset": {
                                        borderColor: "rgba(0, 0, 0, 0.1)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "primary.light",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "primary.main",
                                        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)"
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    left: "34px",
                                    "&.Mui-focused": {
                                        color: "primary.main",
                                        left: "34px"
                                    }
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ mb: 3, position: "relative" }}>
                        <Lock 
                            sx={{ 
                                position: "absolute", 
                                left: 12, 
                                top: "50%", 
                                transform: "translateY(-50%)",
                                color: focusedField === "password" ? "primary.main" : "action.active",
                                transition: "color 0.3s ease"
                            }} 
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            sx={{ 
                                "& .MuiOutlinedInput-root": {
                                    pl: 4.5,
                                    borderRadius: "12px",
                                    "& fieldset": {
                                        borderColor: "rgba(0, 0, 0, 0.1)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "primary.light",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "primary.main",
                                        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)"
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    left: "34px",
                                    "&.Mui-focused": {
                                        color: "primary.main",
                                        left: "34px"
                                    }
                                }
                            }}
                        />
                    </Box>

                    {/* Login Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                            variant="contained" 
                            fullWidth 
                            onClick={handleLogin}
                            disabled={isLoading}
                            sx={{
                                py: 1.5, 
                                fontSize: "16px", 
                                fontWeight: "bold",
                                borderRadius: "12px",
                                textTransform: "none",
                                letterSpacing: "0.5px",
                                background: "linear-gradient(90deg, #1976d2 0%, #4facfe 100%)",
                                boxShadow: "0 4px 6px rgba(25, 118, 210, 0.2)",
                                "&:hover": { 
                                    background: "linear-gradient(90deg, #1565c0 0%, #3a8df8 100%)",
                                    boxShadow: "0 6px 8px rgba(25, 118, 210, 0.3)"
                                },
                                "&.Mui-disabled": {
                                    background: "#e0e0e0",
                                    color: "#9e9e9e"
                                }
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </motion.div>

                    {/* Forgot Password */}
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mt: 2, 
                            textAlign: "right",
                            "& a": {
                                color: "text.secondary",
                                textDecoration: "none",
                                "&:hover": {
                                    color: "primary.main",
                                    textDecoration: "underline"
                                }
                            }
                        }}
                    >
                        <a href="/forgot-password">Forgot password?</a>
                    </Typography>

                    {/* Divider */}
                    <Divider sx={{ my: 3, color: "text.secondary" }}>
                        <Typography variant="caption" color="text.secondary">
                            or continue with
                        </Typography>
                    </Divider>

                    {/* Social Media Links */}
                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            gap: 1,
                            mb: 3
                        }}
                    >
                        {[
                            { icon: <GitHub />, color: "#333", name: "GitHub" },
                            { icon: <LinkedIn />, color: "#0077B5", name: "LinkedIn" },
                            { icon: <Twitter />, color: "#1DA1F2", name: "Twitter" },
                            { icon: <Instagram />, color: "#E4405F", name: "Instagram" }
                        ].map((social) => (
                            <motion.div 
                                key={social.name} 
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IconButton 
                                    aria-label={social.name}
                                    sx={{ 
                                        color: social.color,
                                        bgcolor: "rgba(0,0,0,0.02)",
                                        border: "1px solid rgba(0,0,0,0.05)",
                                        "&:hover": { 
                                            bgcolor: "rgba(0,0,0,0.05)",
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    {social.icon}
                                </IconButton>
                            </motion.div>
                        ))}
                    </Box>

                    {/* Sign-up Link */}
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Don't have an account?{" "}
                        <Button 
                            href="/signup" 
                            sx={{ 
                                color: "primary.main", 
                                fontWeight: "600",
                                textTransform: "none",
                                p: 0,
                                "&:hover": {
                                    bgcolor: "transparent",
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            Create one
                        </Button>
                    </Typography>
                </Container>
            </motion.div>
        </Box>
    );
};

export default Login;