import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useMutation } from "@apollo/client";
import { ADMIN_LOGIN } from "../mutations/adminMutations.jsx";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const AdminLogin = () => {
  const navigate = useNavigate(); // Call useNavigate inside the component

  // State hooks for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Apollo Client mutation hook for admin login
  const [loginAdmin, { loading, error }] = useMutation(ADMIN_LOGIN);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Attempting to login with:", username, password); // Debugging

    try {
      // Execute the login mutation
      const { data } = await loginAdmin({ variables: { username, password } });

      // Check if token is received in response
      const token = data?.adminLogin?.token;
      if (token) {
        // Store the token in local storage for session management
        localStorage.setItem("authToken", token);
        console.log("Login successful!");

        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        // Handle case where login is unsuccessful
        console.error("Login unsuccessful: No token received.");
      }
    } catch (err) {
      // Handle errors during login process
      console.error("Login error:", err);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        my: 4,
        py: 12,
        maxHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {loading && <Typography>Loading...</Typography>}
          {error && (
            <Typography color="error">Error: {error.message}</Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
