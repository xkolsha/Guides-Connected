import { Box, Typography, Link, Container, Grid } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 8,
        bgcolor: "primary.main",
        color: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md="auto">
            <Typography variant="h6" color="inherit" textAlign="center">
              LOGO
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto" textAlign="center">
            <Link href="#" underline="none" color="inherit" sx={{ mx: 4 }}>
              About
            </Link>
            <Link href="#" underline="none" color="inherit" sx={{ mx: 4 }}>
              Experts
            </Link>
            <Link href="#" underline="none" color="inherit" sx={{ mx: 4 }}>
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} md="auto" textAlign="center">
            {Array.from({ length: 2 }, (_, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  p: 1,
                  display: "inline-block",
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: "background.paper",
                  mx: 1,
                }}
              />
            ))}
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="inherit"
          align="center"
          sx={{ pt: 4 }}
        >
          © {currentYear} — Privacy — Terms
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
