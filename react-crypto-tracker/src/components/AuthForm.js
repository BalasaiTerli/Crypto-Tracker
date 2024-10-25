import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const AuthForm = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth", {
        email,
        password,
        confirmPassword: isSignup ? confirmPassword : undefined,
        isSignup,
      });

      setMessage(response.data.message);
      setOpen(true);

      // Trigger the callback to update authentication status if signup/login is successful
      if (response.status === 201 || response.status === 200) {
        onAuthSuccess();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {isSignup ? "Sign Up" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignup && (
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={toggleMode}
            style={{
              color: "#1976d2",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </Typography>
      </Paper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuthForm;
