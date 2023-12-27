import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WaveBackground from "../assets/images/WaveBackground.webp";
import contactImgage from "../assets/images/Hero.png";

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const ContactForm = () => (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { mb: 2, bgcolor: "white", borderRadius: 1 },
        "& .MuiButton-root": { mt: 3, py: 1.5 },
      }}
    >
      <TextField label="Name" variant="filled" fullWidth />
      <TextField label="Email" variant="filled" fullWidth />
      <TextField
        label="Message"
        variant="filled"
        fullWidth
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" size="large">
        Send Message
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex", // Use flex to center the content
        alignItems: "center", // Align items vertically
        justifyContent: "center", // Align items horizontally
        height: "100svh", // Fill the screen height
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
              Our Experts<span style={{ color: "#FF5733" }}>.</span>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <b>Phone:</b> +1 (506) 123 4567
            </Typography>
            <Typography sx={{ mb: 4 }}>
              <b>Email:</b> fowler-moon@fvl.com
            </Typography>
            <ContactForm />
          </Grid>
          {!isMobile && (
            <Grid
              item
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                component="img"
                src={contactImgage}
                alt="Contact"
                sx={{ maxWidth: "100%", height: "auto", borderRadius: "12px" }}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
