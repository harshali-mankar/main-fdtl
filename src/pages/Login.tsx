import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { GetLoginCredentials } from "../services/auth";
import { useSnackbar } from "notistack";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string; tenantId: string }) => {
    const { email, password, tenantId } = values;
    try {
      const data = {
        tenantId: tenantId,
        userId: email,
        password: password,
      }
      const response = await GetLoginCredentials(data)
      if (response.user) {
        
        // Store session in sessionStorage (expires in 4 hours)
        const sessionExpiry = Date.now() + 4 * 60 * 60 * 1000; // 4 hours from now

        localStorage.setItem("session_expiry", sessionExpiry.toString());
        localStorage.setItem("session_token", response.accessToken)
        localStorage.setItem("expiry_time", response.expiresAt)
        localStorage.setItem("tenantId", tenantId);
        localStorage.setItem("name", response.user.crewName);
        localStorage.setItem("Id", response.user.id);
        localStorage.setItem("approvalFeature", response.user.approvalFeature)
        localStorage.setItem("operatorTypes", JSON.stringify(response.user.operatorType));
        localStorage.setItem("enableFinalSubmit", response.user.isSubmitForViolation)
        localStorage.setItem("menu", JSON.stringify(response.user.menuDetails || []))
        enqueueSnackbar('Login successful!', { variant: 'success' });
        navigate("/");
        setLoading(true);
      } else {
        enqueueSnackbar('Login failed. Please try again.', { variant: 'error' });
      }
    } catch (error) {

    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const tenantId = formData.get("tenantId") as string;

    if (!email || !password || !tenantId) {
      alert("Please fill all fields");
      return;
    }

    handleLogin({ email, password, tenantId });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, border: "2px solid grey" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="email"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Tenant"
              name="tenantId"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </Paper>
      </Container>

    </div>
  );
};


export { Login }