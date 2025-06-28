import React, { useState } from "react";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Link,
  Divider,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput
} from "@mui/material";
import { 
  AccountCircle, 
  Email, 
  Lock,
  GitHub,
  LinkedIn,
  Twitter,
  Google,
  CalendarToday,
  Public,
  Person,
  PersonOutline,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

import { 
    // ... other imports
    CircularProgress,
    // ... rest of your imports
  } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CONFIG from "../config";

const Signup = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({ 
      username: "", 
      email: "", 
      password: "",
      confirmPassword: "",
      region: "",
      gender: "",
      dateOfBirth: null,
      roleType: "user"
    });
    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const regions = [
        "North America", "South America", "Europe", 
        "Asia", "Africa", "Australia", "Middle East"
    ];

    const genders = [
        { value: 0, label: "Male" },
        { value: 1, label: "Female" },
        { value: 2, label: "Other" },
        { value: 3, label: "Prefer not to say" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleDateChange = (date) => {
        setUserDetails({ ...userDetails, dateOfBirth: date });
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            setUserDetails({ ...userDetails, roleType: newRole });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!userDetails.username.trim()) {
            newErrors.username = "Username is required";
        } else if (userDetails.username.length > 50) {
            newErrors.username = "Username must be less than 50 characters";
        }

        if (!userDetails.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
            newErrors.email = "Please enter a valid email";
        } else if (userDetails.email.length > 50) {
            newErrors.email = "Email must be less than 50 characters";
        }

        if (!userDetails.password) {
            newErrors.password = "Password is required";
        } else if (userDetails.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (userDetails.password !== userDetails.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!userDetails.region) {
            newErrors.region = "Region is required";
        }

        if (!userDetails.gender && userDetails.gender !== 0) {
            newErrors.gender = "Gender is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const payload = {
                Email: userDetails.email,
                UserName: userDetails.username,
                Password: userDetails.password,
                ConfirmPassword: userDetails.confirmPassword,
                Region: userDetails.region,
                Gender: parseInt(userDetails.gender),
                DateOfBirth: userDetails.dateOfBirth,
                RoleType: userDetails.roleType === "admin" ? 1 : 0
            };

            const response = await fetch(`${CONFIG.BASE_URL}/Login/Signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.returnMsg === "Success") {
                // Store user ID in localStorage if needed
                if (data.userId) {
                    localStorage.setItem("UserId", data.userId);
                }
                navigate("/", { state: { signupSuccess: true } });
            } else if (data.returnMsg === "Duplicate Email" && data.returnKey === "0"){
            
            {
                setErrors({ email: "Email already exists" });

            }
        }
            
            else {
                throw new Error(data.returnMsg2 || "Signup failed. Please try again.");
            }
        } catch (error) {
            setErrors({ ...errors, api: error.message });
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
                    maxWidth="sm"
                    sx={{
                        p: 4,
                        bgcolor: "#ffffff",
                        borderRadius: "20px",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                        textAlign: "center",
                        border: "1px solid rgba(25, 118, 210, 0.1)",
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
                    {/* Title Section */}
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
                            Join AI Interview Pro
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            fontSize={16}
                            color="text.secondary" 
                            sx={{ 
                                fontWeight: 800,
                                fontLanguageOverride: "normal",
                                fontVariantCaps: "normal",
                                fontVariantEastAsian: "normal",
                                fontVariantLigatures: "normal",
                                fontVariantNumeric: "normal",
                                fontSize: "1rem",
                                fontStyle: "italic",
                                textTransform: "uppercase",
                                mb: 1,
                                fontStyle: "italic"
                            }}
                        >
                            "Your future starts with the right preparation"
                        </Typography>
                    </Box>

                    {/* Role Selection */}
                    <Box sx={{ mb: 3 }}>
                        <ToggleButtonGroup
                            value={userDetails.roleType}
                            onChange={handleRoleChange}
                            exclusive
                            fullWidth
                            sx={{
                                mb: 2,
                                "& .MuiToggleButtonGroup-grouped": {
                                    border: "1px solid rgba(25, 118, 210, 0.5)",
                                    "&:not(:first-of-type)": {
                                        borderRadius: "12px",
                                        borderLeft: "1px solid rgba(25, 118, 210, 0.5)"
                                    },
                                    "&:first-of-type": {
                                        borderRadius: "12px"
                                    }
                                }
                            }}
                        >
                            <ToggleButton 
                                value="admin" 
                                sx={{ 
                                    flex: 1,
                                    py: 1.2,
                                    marginInlineEnd:2,
                                    fontWeight: 600,
                                    justifyContent: "center",
                                    "&.Mui-selected": {
                                        background: "linear-gradient(90deg, #1976d2 0%, #4facfe 100%)",
                                        boxShadow: "0 4px 12px rgba(17, 119, 203, 0.51)"
                                    },
                                    "&:hover": {
                                        bgcolor: userDetails.roleType === "admin" ? "linear-gradient(135deg, #5a0db3 0%, #1a65e8 100%)" : "rgba(106, 17, 203, 0.15)"
                                    },
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <Person sx={{ mr: 1 }} /> Admin
                            </ToggleButton>
                            <ToggleButton 
                                value="user" 
                                sx={{ 
                                    flex: 1,
                                    py: 1.2,
                                    fontWeight: 600,
                                    justifyContent: "center",
                                    "&.Mui-selected": {
                                        background: "l  inear-gradient(90deg, #1976d2 0%, #4facfe 100%)",
                                        boxShadow: "0 4px 12px rgba(17, 113, 203, 0.45)"
                                    },
                                    "&:hover": {
                                        bgcolor: userDetails.roleType === "user" ? "linear-gradient(135deg, #5a0db3 0%, #1a65e8 100%)" : "rgba(106, 17, 203, 0.15)"
                                    },
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <PersonOutline sx={{ mr: 1 }} /> User
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* Input Fields */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
                        {/* Username */}
                        <Box sx={{ position: "relative" }}>
                            <AccountCircle 
                                sx={{ 
                                    position: "absolute", 
                                    left: 12, 
                                    top: "50%", 
                                    transform: "translateY(-50%)",
                                    color: focusedField === "username" ? "primary.main" : "action.active",
                                    transition: "color 0.3s ease",
                                    zIndex: 1
                                }} 
                            />
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                name="username"
                                value={userDetails.username}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("username")}
                                onBlur={() => setFocusedField(null)}
                                error={!!errors.username}
                                helperText={errors.username}
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

                        {/* Email */}
                        <Box sx={{ position: "relative" }}>
                            <Email 
                                sx={{ 
                                    position: "absolute", 
                                    left: 12, 
                                    top: "50%", 
                                    transform: "translateY(-50%)",
                                    color: focusedField === "email" ? "primary.main" : "action.active",
                                    transition: "color 0.3s ease",
                                    zIndex: 1
                                }} 
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                error={!!errors.email}
                                helperText={errors.email}
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

                        {/* Password */}
                        <Box sx={{ position: "relative" }}>
                            <Lock 
                                sx={{ 
                                    position: "absolute", 
                                    left: 12, 
                                    top: "50%", 
                                    transform: "translateY(-50%)",
                                    color: focusedField === "password" ? "primary.main" : "action.active",
                                    transition: "color 0.3s ease",
                                    zIndex: 1
                                }} 
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                name="password"
                                value={userDetails.password}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
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

                        {/* Confirm Password */}
                        <Box sx={{ position: "relative" }}>
                            <Lock 
                                sx={{ 
                                    position: "absolute", 
                                    left: 12, 
                                    top: "50%", 
                                    transform: "translateY(-50%)",
                                    color: focusedField === "confirmPassword" ? "primary.main" : "action.active",
                                    transition: "color 0.3s ease",
                                    zIndex: 1
                                }} 
                            />
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                name="confirmPassword"
                                value={userDetails.confirmPassword}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("confirmPassword")}
                                onBlur={() => setFocusedField(null)}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
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

                        {/* Region */}
                        <Box sx={{ position: "relative" }}>
                            <Public 
                                sx={{ 
                                    position: "absolute", 
                                    left: 12, 
                                    top: "50%", 
                                    transform: "translateY(-50%)",
                                    color: focusedField === "region" ? "primary.main" : "action.active",
                                    transition: "color 0.3s ease",
                                    zIndex: 1
                                }} 
                            />
                            <FormControl fullWidth>
                                <InputLabel sx={{ left: "34px" }}>Region</InputLabel>
                                <Select
                                    name="region"
                                    value={userDetails.region}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("region")}
                                    onBlur={() => setFocusedField(null)}
                                    error={!!errors.region}
                                    input={
                                        <OutlinedInput 
                                            label="Region"
                                            sx={{ 
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
                                            }}
                                        />
                                    }
                                >
                                    {regions.map((region) => (
                                        <MenuItem key={region} value={region}>{region}</MenuItem>
                                    ))}
                                </Select>
                                {errors.region && (
                                    <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                                        {errors.region}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>

                        {/* Gender */}
                        <Box sx={{ position: "relative" }}>
                            <Person 
                                sx={{ 
                                    position: "absolute", 
                                    left: 12, 
                                    top: "50%", 
                                    transform: "translateY(-50%)",
                                    color: focusedField === "gender" ? "primary.main" : "action.active",
                                    transition: "color 0.3s ease",
                                    zIndex: 1
                                }} 
                            />
                            <FormControl fullWidth>
                                <InputLabel sx={{ left: "34px" }}>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={userDetails.gender}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("gender")}
                                    onBlur={() => setFocusedField(null)}
                                    error={!!errors.gender}
                                    input={
                                        <OutlinedInput 
                                            label="Gender"
                                            sx={{ 
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
                                            }}
                                        />
                                    }
                                >
                                    {genders.map((gender) => (
                                        <MenuItem key={gender.value} value={gender.value}>{gender.label}</MenuItem>
                                    ))}
                                </Select>
                                {errors.gender && (
                                    <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                                        {errors.gender}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>

                        {/* Date of Birth */}
                        <Box sx={{ position: "relative" }}>
                            <CalendarToday 
                                sx={{ 
                                    position: "absolute", 
                                    left: 12, 
                                    top: "50%", 
                                    transform: "translateY(-50%)",
                                    color: focusedField === "dateOfBirth" ? "primary.main" : "action.active",
                                    transition: "color 0.3s ease",
                                    zIndex: 1
                                }} 
                            />
                            <DatePicker
                                selected={userDetails.dateOfBirth}
                                onChange={handleDateChange}
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Date of Birth"
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                                customInput={
                                    <TextField
                                        fullWidth
                                        label="Date of Birth"
                                        variant="outlined"
                                        onFocus={() => setFocusedField("dateOfBirth")}
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
                                }
                            />
                        </Box>
                    </Box>

                    {/* API Error */}
                    {errors.api && (
                        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                            {errors.api}
                        </Typography>
                    )}

                    {/* Signup Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                            variant="contained" 
                            fullWidth 
                            onClick={handleSignup}
                            disabled={isLoading}
                            sx={{
                                py: 1.5, 
                                mt: 3,
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
                                "Create Account"
                            )}
                        </Button>
                    </motion.div>

                    {/* Divider */}
                    <Divider sx={{ my: 3, color: "text.secondary" }}>
                        <Typography variant="caption" color="text.secondary">
                            or sign up with
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
                            { icon: <Google />, color: "#DB4437", name: "Google" },
                            { icon: <GitHub />, color: "#333", name: "GitHub" },
                            { icon: <LinkedIn />, color: "#0077B5", name: "LinkedIn" },
                            { icon: <Twitter />, color: "#1DA1F2", name: "Twitter" }
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

                    {/* Login Link */}
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Already have an account?{" "}
                        <Link 
                            href="/login" 
                            sx={{ 
                                color: "primary.main", 
                                fontWeight: "600",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            Log in
                        </Link>
                    </Typography>
                </Container>
            </motion.div>
        </Box>
    );
};

export default Signup;