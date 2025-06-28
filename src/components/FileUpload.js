import React, { useState,useEffect } from "react";
import { Button, Typography, Box, Dialog, DialogTitle, DialogActions, DialogContent, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useNavigate } from "react-router-dom";
import CONFIG from "../config"; // Adjust the path as needed
import ErrorIcon from '@mui/icons-material/Error';
function FileUpload() {
    const [fileName, setFileName] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        // Clear previous messages
        setValidationError(null);
        setApiError(null);
        setSuccessMessage(null);
    
        // Validate file type
        const allowedFormats = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!allowedFormats.includes(file.type)) {
            setValidationError("Invalid file format! Please upload a PDF or DOCX file.");
            return;
        }
    
        // Validate UserId in localStorage
        const userId = localStorage.getItem("UserId");
        console.log(userId);
        if (!userId) {
            setValidationError("User session expired. Please login again.");
            return;
        }
    
        setIsLoading(true);
        setError(null);
    
        try {
            // Read file as base64
            const base64String = await readFileAsBase64(file);
            
            // Prepare payload
            const payload = {
                Type: 0,
                UploadFile: base64String,
                UserId: userId
            };
    
            // First API call to save resume
            const saveResponse = await fetch(`${CONFIG.BASE_URL}/Resume/SaveRecord`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
    
            const saveData = await saveResponse.json();
    
            if (saveData.returnMsg === "Success") {
                // Save to local storage
                localStorage.setItem("ResumeId", saveData.returnKey);
                localStorage.setItem("FilePath", saveData.returnKey2);
                
                setFileName(file.name);
                setOpenModal(true);
                setSuccessMessage("Resume uploaded successfully!");
            } else {
                throw new Error(saveData.returnMsg2 || "Failed to upload resume");
            }
        } catch (err) {
            setApiError(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Include the data type prefix in the base64 string
                const base64WithPrefix = `data:${file.type};base64,${reader.result.split(",")[1]}`;
                resolve(base64WithPrefix);
            };
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        const checkExistingSession = () => {
            try {
                const savedSession = localStorage.getItem("interviewSession");
                if (savedSession) {
                    const session = JSON.parse(savedSession);
                    navigate("/interview", { 
                        state: { 
                            resumeId: localStorage.getItem("ResumeId"),
                            filePath: localStorage.getItem("FilePath")
                        } 
                    });
                }
            } catch (error) {
                console.error("Error checking existing session:", error);
            }
        };

        checkExistingSession();
    }, []);

    const handleClose = () => {
        setOpenModal(false);
    }; const handleStartInterview = async () => {
        setIsLoading(true);
        setError(null);
        setApiError(null);
    
        try {
            const filePath = localStorage.getItem("FilePath");
            const userId = localStorage.getItem("UserId");
            const resumeId = localStorage.getItem("ResumeId");
            
            if (!filePath || !userId || !resumeId) {
                throw new Error("Required session data missing");
            }

            const analyzeResponse = await fetch(`${CONFIG.BASE_URL}/ResumeAI/analyze`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    FilePath: filePath, 
                    UserId: userId, 
                    ResumeId: resumeId 
                })
            });

            const responseData = await analyzeResponse.json();
            
            if (!analyzeResponse.ok) {
                throw new Error(responseData.message || "Failed to analyze resume");
            }

            // Store the complete response in session storage temporarily
            sessionStorage.setItem("tempAnalysis", JSON.stringify(responseData));
            
            setSuccessMessage("Resume analyzed successfully! Redirecting...");
            
            setTimeout(() => {
                navigate("/interview", { 
                    state: { 
                        responseData: responseData,
                        resumeId: resumeId,
                        userId: userId
                    } 
                });
            }, 1500);
            
        } catch (err) {
            setApiError(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
            setOpenModal(false);
        }
    };
    const ValidationMessages = () => (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          {validationError && (
            <Typography color="error" sx={{ 
              backgroundColor: '#FFEBEE', 
              padding: '10px', 
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ErrorIcon color="error" /> {validationError}
            </Typography>
          )}
          
          {apiError && (
            <Typography color="error" sx={{ 
              backgroundColor: '#FFEBEE', 
              padding: '10px', 
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ErrorIcon color="error" /> {apiError}
            </Typography>
          )}
          
          {successMessage && (
            <Typography color="success" sx={{ 
              backgroundColor: '#E8F5E9', 
              padding: '10px', 
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircleIcon color="success" /> {successMessage}
            </Typography>
          )}
        </Box>
      );
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box 
                sx={{ 
                    mt: 4,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    width: "100%"
                }}
            >
                <input
                    type="file"
                    accept=".pdf,.docx"
                    style={{ display: "none" }}
                    id="file-upload"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
                <label htmlFor="file-upload">
                    <Button 
                        variant="contained" 
                        component="span"
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <InsertDriveFileIcon />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: "8px",
                            textTransform: "none",
                            fontSize: "1rem",
                            boxShadow: "0 2px 10px rgba(118, 96, 179, 0.3)",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 15px rgba(118, 96, 179, 0.4)"
                            },
                            transition: "all 0.3s ease"
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Uploading..." : "Upload Resume"}
                    </Button>
                    {/* Add this right after your file upload button section */}
<ValidationMessages />
                </label>
                
                {fileName && (
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: "rgba(118, 96, 179, 0.1)",
                        px: 2,
                        py: 1,
                        borderRadius: "8px"
                    }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                fontWeight: "medium", 
                                color: "#2d3748",
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {fileName}
                        </Typography>
                    </Box>
                )}
            </Box>

            {error && (
                <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                    {error}
                </Typography>
            )}

            {/* Beautiful Confirmation Modal */}
            <Dialog
                open={openModal}
                onClose={handleClose}
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: "16px",
                        padding: "20px",
                        background: "linear-gradient(135deg, #ece9e6 0%, #ffffff 100%)",
                        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
                        textAlign: "center",
                        maxWidth: "400px",
                        width: "90%"
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#3b3b3b" }}>
                    <PlayCircleOutlineIcon sx={{ fontSize: "3rem", color: "#6A1B9A" }} />
                    <br />
                    Start Interview?
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ color: "#555", fontSize: "1rem", mb: 2 }}>
                        Your resume has been uploaded successfully. Would you like to proceed to the interview now?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
                    <Button 
                        onClick={handleStartInterview} 
                        variant="contained" 
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: "8px",
                            fontSize: "1rem",
                            backgroundColor: "#6A1B9A",
                            "&:hover": {
                                backgroundColor: "#4A148C"
                            }
                        }}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {isLoading ? "Processing..." : "Yes"}
                    </Button>
                    <Button 
                        onClick={handleClose} 
                        variant="outlined"
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: "8px",
                            fontSize: "1rem",
                            borderColor: "#6A1B9A",
                            color: "#6A1B9A",
                            "&:hover": {
                                borderColor: "#4A148C",
                                color: "#4A148C"
                            }
                        }}
                        disabled={isLoading}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </motion.div>
    );
}

export default FileUpload;