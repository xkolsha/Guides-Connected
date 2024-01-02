import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  Snackbar,
  Alert,
  Link as EmailLink,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WaveBackground from "../assets/images/WaveBackground.webp";
import contactImage from "../assets/images/Hero.png";

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!contact.name || !contact.email || !contact.message) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (!isValidEmail(contact.email)) {
      setSnackbarMessage("Invalid email address.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setContact({ name: "", email: "", message: "" }); // Clear the form
      setSnackbarMessage("Email sent successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error sending email:", error);
      setSnackbarMessage("Failed to send the message.");
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        color: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${WaveBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              color="primary.main"
              gutterBottom
              align="left"
              fontWeight="bold"
              mb={4}
            >
              Contact Us
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Phone:</b> +1 (506) 261 2532
            </Typography>
            <Typography sx={{ mb: 4 }}>
              <b>Email:</b>{" "}
              <EmailLink
                href="mailto:matthewasears@guidesconnected.com"
                color="error"
              >
                matthewasears@guidesconnected.com
              </EmailLink>
            </Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                "& .MuiTextField-root": {
                  mb: 2,
                  bgcolor: "background.main",
                  borderRadius: theme.shape.borderRadius,
                },
                "& .MuiButton-root": { mt: 3, py: 1.5 },
              }}
            >
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                name="name"
                value={contact.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                name="email"
                value={contact.email}
                onChange={handleChange}
              />
              <TextField
                label="Message"
                variant="filled"
                fullWidth
                multiline
                rows={4}
                name="message"
                value={contact.message}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Send Message
              </Button>
            </Box>
          </Grid>
          {!isMobile && (
            <Grid
              item
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                component="img"
                src={contactImage}
                alt="Contact"
                sx={{ maxWidth: "100%", height: "auto", borderRadius: "12px" }}
              />
            </Grid>
          )}
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
