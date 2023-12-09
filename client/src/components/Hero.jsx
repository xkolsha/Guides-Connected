import { Typography, Button, Box, Grid, Container } from "@mui/material";
import HeroPhoto from "../assets/images/Hero.svg";
import { useTheme } from "@mui/material/styles";
import WaveBackground from "../assets/images/WaveBackground.webp";

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 12,
        bgcolor: theme.palette.background.default,
        color: theme.palette.primary.main,
        position: "relative",
        backgroundImage: `url(${WaveBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      {/* Container to constrain the content width and center it */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={12} alignItems="center">
          {/* Text content */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "4rem", sm: "5rem", md: "7rem" }, // font sizes for different breakpoints
              }}
            >
              {" "}
              Guides Connected
            </Typography>
            <Typography variant="h4" gutterBottom>
              Expert guides for any subject. Instant access customized for you
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" sx={{ mr: 3 }}>
                Work With Us
              </Button>
              <Button variant="outlined" color="primary">
                Learn More
              </Button>
            </Box>
          </Grid>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                height: "auto",
                width: "100%",
                maxWidth: 1080,
              }}
              alt="Education Hero"
              src={HeroPhoto}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
