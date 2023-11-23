import { Typography, Button, Box, Grid } from "@mui/material";
import HeroPhoto from "../assets/images/Hero.svg";

const Hero = () => {
  return (
    <Box className="hero" sx={{ padding: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Typography variant="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Guides Connected
          </Typography>
          <Typography variant="h4" gutterBottom>
            Expert guides for any subject. Instant access customized for you
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" sx={{ mr: 3 }}>
              Work With Us{" "}
            </Button>
            <Button variant="outlined" color="primary">
              Learn More
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
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
    </Box>
  );
};

export default Hero;
