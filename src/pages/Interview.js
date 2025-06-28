import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Button,
    Container,
    Typography,
    Box,
    Grid,
    IconButton,
    TextField,
    CircularProgress,
    Snackbar,
    Alert
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FlagIcon from "@mui/icons-material/Flag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CameraFeed from "../components/CameraFeed";
import config from "../config";

function Interview() {
    const navigate = useNavigate();
    const location = useLocation();
    const [session, setSession] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [status, setStatus] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isVideoActive, setIsVideoActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const videoRef = useRef(null);
    const [mediaBlobs, setMediaBlobs] = useState([]);
    const [recordingStatus, setRecordingStatus] = useState('idle'); // 'idle', 'recording', 'recorded'

    // Initialize session and questions
    useEffect(() => {
        const initializeSession = async () => {
            try {
                const savedSession = getSessionFromStorage();
                if (savedSession) {
                    if (!savedSession.sessionId || !savedSession.userId) {
                        throw new Error("Invalid session data in storage");
                    }
                    setSession(savedSession);
                    await fetchQuestions(savedSession);
                    return;
                }

                if (location.state?.responseData) {
                    const { status, sessionId, userId } = location.state.responseData;

                    if (status !== "Success") {
                        throw new Error("Session creation failed");
                    }

                    if (!sessionId || !userId) {
                        throw new Error("Missing session data");
                    }

                    const sessionData = {
                        sessionId,
                        userId,
                        startedAt: new Date().toISOString()
                    };

                    setSession(sessionData);
                    saveSessionToStorage(sessionData);
                    await fetchQuestions(sessionData);
                } else {
                    throw new Error("No active session found");
                }
            } catch (err) {
                console.error("Session initialization error:", err);
                setError(err.message);
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };

        const fetchQuestions = async (sessionData) => {
            try {
                const response = await fetch(`${config.BASE_URL}/Interview/GetList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        SessionId: sessionData.sessionId,
                        UserId: sessionData.userId
                    })
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch questions: HTTP ${response.status}`);
                }

                const data = await response.json();
                if (!data.questionsList || data.questionsList.length === 0) {
                    throw new Error("No questions received from server");
                }

                processQuestions(data.questionsList);
            } catch (err) {
                throw new Error(`Question fetch failed: ${err.message}`);
            }
        };

        initializeSession();
    }, [location.state]);

    // Clean up media streams on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Initialize mediaBlobs when questions change
    useEffect(() => {
        if (questions.length > 0) {
            setMediaBlobs(Array(questions.length).fill(null));
            setAnswers(Array(questions.length).fill(null));
            setStatus(Array(questions.length).fill("notAttempted"));
        }
    }, [questions]);

    // Recording functions
    const startRecording = async (type) => {
        try {
            // Stop any existing recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }

            // Get media stream based on type
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: type === 'video'
            });
            streamRef.current = stream;

            if (type === 'video' && videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            // Setup media recorder
            const mimeType = type === 'video' 
                ? (MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'video/mp4')
                : 'audio/webm';
            
            const recorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = recorder;

            const chunks = [];
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: mimeType });
                const newBlobs = [...mediaBlobs];
                newBlobs[currentQuestion] = blob;
                setMediaBlobs(newBlobs);

                const newAnswers = [...answers];
                newAnswers[currentQuestion] = "completed";
                setAnswers(newAnswers);

                // Update status to show recording is complete
                setRecordingStatus('recorded');
            };

            recorder.start();
            setRecordingStatus('recording');

            if (type === 'video') {
                setIsVideoActive(true);
            } else {
                setIsRecording(true);
            }
        } catch (err) {
            console.error("Recording failed:", err);
            setError(`Failed to start ${type} recording`);
            setSnackbarOpen(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            
            // Stop all tracks in the stream
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            setIsRecording(false);
            setIsVideoActive(false);
        }
    };

    const toggleRecording = (type) => {
        const isActive = type === 'video' ? isVideoActive : isRecording;
        
        if (isActive) {
            stopRecording();
        } else {
            startRecording(type);
        }
    };

    // Helper functions
    const blobToBase64 = (blob) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1];
                resolve(base64data);
            };
        });
    };

    const mapQuestionTypeToInt = (type) => {
        const typeMap = {
            "text": 0,
            "mcq": 1,
            "voice": 2,
            "video": 3
        };
        return typeMap[type] || 0;
    };

    const processQuestions = (apiQuestions) => {
        const mappedQuestions = apiQuestions.map(q => ({
            id: q.questionId,
            index: q.questionNo,
            question: q.questionDescription,
            type: mapQuestionType(q.questionType),
            ...(q.questionType === "mcq" && {
                choices: [
                    { key: "A", value: "Option A" },
                    { key: "B", value: "Option B" },
                    { key: "C", value: "Option C" },
                    { key: "D", value: "Option D" }
                ],
                correctAnswer: "A"
            })
        }));

        setQuestions(mappedQuestions);
    };

    const mapQuestionType = (apiType) => {
        // const typeMap = {
        //     "paragraph": "text",
        //     "voice": "voice",
        //     "video": "video",
        //     "mcq": "mcq"
        // };
        return apiType || ""; // Assuming the API returns the type directly
    };

    // Storage helpers
    const saveSessionToStorage = (sessionData) => {
        try {
            localStorage.setItem("interviewSession", JSON.stringify(sessionData));
        } catch (err) {
            console.error("Failed to save session:", err);
        }
    };

    const getSessionFromStorage = () => {
        try {
            const session = localStorage.getItem("interviewSession");
            return session ? JSON.parse(session) : null;
        } catch (err) {
            console.error("Failed to load session:", err);
            return null;
        }
    };

    const clearSessionFromStorage = () => {
        try {
            localStorage.removeItem("interviewSession");
        } catch (err) {
            console.error("Failed to clear session:", err);
        }
    };

    // Timer
    useEffect(() => {
        if (timeLeft > 0 && questions.length > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft, questions]);

    // Question handling
    const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);

        const newStatus = [...status];
        newStatus[currentQuestion] = "answered";
        setStatus(newStatus);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleFlagQuestion = () => {
        const newStatus = [...status];
        newStatus[currentQuestion] = "flagged";
        setStatus(newStatus);
    };

    const handleSubmit = async () => {
        if (!session) {
            setError("No active session");
            setSnackbarOpen(true);
            return;
        }
    
        try {
            // Prepare the payload
            const payload = {
                SessionId: session.sessionId,
                questionsList: questions.map(q => ({
                    questionId: q.id,
                    questionDescription: q.question,
                    questionType: q.type,
                    questionNo: q.index
                })),
                answerList: await Promise.all(questions.map(async (q, index) => {
                    const answer = {
                        SessionId: session.sessionId,
                        QuestionId: q.id,
                        UserAnswer: answers[index] || (q.type === 'voice' || q.type === 'video' ? 'completed' : ''),
                        AnswerNo: q.index,
                        AnswerType: q.type,
                        AudioVideo: null // Initialize as null
                    };
    
                    // Add binary data for audio/video answers with full data URL format
                    if ((q.type === 'voice' || q.type === 'video') && mediaBlobs[index]) {
                        const base64Data = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                // Get the full data URL with MIME type
                                resolve(reader.result);
                            };
                            reader.readAsDataURL(mediaBlobs[index]);
                        });
    
                        // Example result: "data:video/webm;base64,GkXfowE..."
                        answer.AudioVideo = base64Data; 
                    }
    
                    return answer;
                }))
            };
    
            // Submit to API
            const response = await fetch(`${config.BASE_URL}/Interview/EndSession`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error(`Submission failed: HTTP ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Submission successful:", result);
    
            clearSessionFromStorage();
            navigate("/results", { state: { submission: result } });
        } catch (err) {
            console.error("Submission error:", err);
            setError(err.message);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const answeredCount = status.filter(s => s === "answered").length;
    const flaggedCount = status.filter(s => s === "flagged").length;
    const notAttemptedCount = status.filter(s => s === "notAttempted").length;

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{
                mt: 5,
                textAlign: "center",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh'
            }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 3 }}>
                    Loading interview questions...
                </Typography>
            </Container>
        );
    }

    if (questions.length === 0) {
        return (
            <Container maxWidth="lg" sx={{
                mt: 5,
                textAlign: "center",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh'
            }}>
                <Typography variant="h5" color="error" gutterBottom>
                    {error ? "Error Loading Questions" : "No Questions Available"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    {error || "We couldn't generate any questions based on your resume."}
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/upload")}
                    sx={{ mt: 2, px: 4, py: 1.5 }}
                >
                    Upload Resume Again
                </Button>
            </Container>
        );
    }

    const currentQType = questions[currentQuestion].type;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 5, display: "flex", gap: 4 }}>
                {/* Main Question Area (Left Side) */}
                <Box sx={{
                    flex: 3,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: "10px",
                    bgcolor: "#fff",
                    height: "fit-content"
                }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
                        <span style={{ color: 'black', marginRight: '8px' }}>
                            Q{questions[currentQuestion].index}:
                        </span>
                        {questions[currentQuestion].question}
                    </Typography>

                    {currentQType === "paragraph" && (
                        <TextField
                            multiline
                            rows={6}
                            fullWidth
                            placeholder="Type your answer here..."
                            value={answers[currentQuestion] || ""}
                            onChange={(e) => {
                                const newAnswers = [...answers];
                                newAnswers[currentQuestion] = e.target.value;
                                setAnswers(newAnswers);
                            }}
                            sx={{ mb: 3 }}
                        />
                    )}

                    {currentQType === "mcq" && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {questions[currentQuestion].choices.map((choice) => (
                                <Button
                                    key={choice.key}
                                    variant={answers[currentQuestion] === choice.key ? "contained" : "outlined"}
                                    fullWidth
                                    onClick={() => handleAnswer(choice.key)}
                                    sx={{ py: 1.5, justifyContent: 'flex-start' }}
                                >
                                    {choice.key}. {choice.value}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {currentQType === "voice" && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
                            <IconButton
                                color={isRecording ? "error" : "primary"}
                                onClick={() => toggleRecording('audio')}
                                sx={{ fontSize: '3rem' }}
                            >
                                <MicIcon fontSize="inherit" />
                            </IconButton>
                            
                            {isRecording && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Box sx={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: 'red',
                                        marginRight: '8px',
                                        animation: 'pulse 1.5s infinite'
                                    }} />
                                    <Typography color="error">
                                        Recording...
                                    </Typography>
                                </Box>
                            )}
                            
                            {mediaBlobs[currentQuestion] && !isRecording && (
                                <audio 
                                    controls 
                                    src={URL.createObjectURL(mediaBlobs[currentQuestion])} 
                                    style={{ marginTop: '20px', width: '100%' }} 
                                />
                            )}
                        </Box>
                    )}

                    {currentQType === "video" && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
                            <IconButton
                                color={isVideoActive ? "error" : "primary"}
                                onClick={() => toggleRecording('video')}
                                sx={{ fontSize: '3rem' }}
                            >
                                <VideocamIcon fontSize="inherit" />
                            </IconButton>
                            
                            {isVideoActive ? (
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <Box sx={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            backgroundColor: 'red',
                                            marginRight: '8px',
                                            animation: 'pulse 1.5s infinite'
                                        }} />
                                        <Typography color="error">
                                            Recording...
                                        </Typography>
                                    </Box>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        style={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            marginTop: '20px',
                                            border: '2px solid #ccc',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </>
                            ) : (
                                mediaBlobs[currentQuestion] ? (
                                    <video
                                        controls
                                        src={URL.createObjectURL(mediaBlobs[currentQuestion])}
                                        style={{
                                            width: '100%',
                                            maxWidth: '500px',
                                            marginTop: '20px',
                                            border: '2px solid #ccc',
                                            borderRadius: '8px'
                                        }}
                                    />
                                ) : (
                                    <Typography sx={{ mt: 2 }}>
                                        Click to start video response
                                    </Typography>
                                )
                            )}
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleAnswer(answers[currentQuestion] || "completed")}
                            sx={{ px: 4, py: 1 }}
                        >
                            SAVE ANSWER
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleFlagQuestion}
                            sx={{ px: 4, py: 1 }}
                        >
                            MARK AS FLAG
                        </Button>
                    </Box>
                </Box>

                {/* Question Panel (Right Side) */}
                <Box sx={{
                    flex: 1,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: "10px",
                    bgcolor: "#f5f5f5",
                    textAlign: "center",
                    height: "fit-content",
                    position: "sticky",
                    top: "20px"
                }}>
                    <Typography variant="h6" sx={{ color: "red", fontWeight: "bold", mb: 1 }}>
                        <AccessTimeIcon /> Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                    </Typography>

                    <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                        Question Panel
                    </Typography>

                    <Grid container spacing={1} sx={{ justifyContent: 'center', mb: 2 }}>
                        {questions.map((q, index) => (
                            <Grid item key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="caption">{q.index}</Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => setCurrentQuestion(index)}
                                    sx={{
                                        color: status[index] === "answered" ? "green" :
                                            status[index] === "flagged" ? "orange" :
                                                "gray",
                                        border: currentQuestion === index ? "2px solid #1976d2" : "none"
                                    }}
                                >
                                    {status[index] === "answered" ? <CheckCircleIcon /> :
                                        status[index] === "flagged" ? <FlagIcon /> :
                                            <RadioButtonUncheckedIcon />}
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        mb: 2,
                        gap: 1,
                        flexWrap: 'wrap'
                    }}>
                        <Typography variant="body2" sx={{ color: "green" }}>✓ Answered {answeredCount}</Typography>
                        <Typography variant="body2" sx={{ color: "orange" }}>⚑ Flag {flaggedCount}</Typography>
                        <Typography variant="body2" sx={{ color: "red" }}>○ Not Attempt {notAttemptedCount}</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 2,
                        mt: 1
                    }}>
                        <Button
                            variant="contained"
                            disabled={currentQuestion === 0}
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            size="small"
                            sx={{ minWidth: 0, px: 1.5 }}
                        >
                            Prev
                        </Button>
                        <Button
                            variant="contained"
                            disabled={currentQuestion === questions.length - 1}
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            size="small"
                            sx={{ minWidth: 0, px: 1.5 }}
                        >
                            Next
                        </Button>
                    </Box>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleSubmit}
                        sx={{
                            width: '100%',
                            py: 1,
                            mt: 1
                        }}
                    >
                        SUBMIT INTERVIEW
                    </Button>

                    <CameraFeed />
                </Box>
            </Container>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <style>
                {`
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                `}
            </style>
        </>
    );
}

export default Interview;