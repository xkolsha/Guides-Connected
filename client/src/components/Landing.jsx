import { Typography, Button, Box, Grid, Paper, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Landing = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* First Section: Professional Learning */}
      {/* This Box has a full-width background color */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
        }}
      >
        {/* Container constrains the content width */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* Text and list content */}
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                Professional Learning
              </Typography>
              <Typography variant="body1" gutterBottom>
                Stay on top of your field and get real tools for the classroom
                without adding to your workload.
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">Top experts</Typography>
                </li>
                <li>
                  <Typography variant="body1">Any subject</Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Real people, real interactions
                  </Typography>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Placeholder for image */}
              <Paper elevation={3} sx={{ height: 360, width: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Second Section: Call to Action */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.light,
          color: theme.palette.primary.main,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
          <Grid container>
            <Grid item xs={12}>
              {/* Call to action text and buttons */}
              <Typography variant="h3" gutterBottom>
                Ready to get started?
              </Typography>
              <Button variant="contained" sx={{ marginRight: 2 }}>
                Contact Us
              </Button>
              <Button variant="outlined">Learn More</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Third Section: Classroom Enrichment */}
      <Box
        sx={{
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              {/* Placeholder for image */}
              <Paper elevation={3} sx={{ height: 360, width: "100%" }} />
            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
              {/* Classroom enrichment content */}
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                Classroom Enrichment
              </Typography>
              <Typography variant="body1">
                Bring experts into the classroom with the latest distance
                learning platforms.
              </Typography>
              <Button variant="outlined">Learn More</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Fourth Section: Driven by Values */}
      {/* Repeating the structure for consistency */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* Content describing values */}
              <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
                We are Driven by Values
              </Typography>
              <Typography variant="body1">
                We believe knowledge should be accessible to everyone.
              </Typography>
              <Button variant="outlined">Learn More</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Another placeholder for image */}
              <Paper elevation={3} sx={{ height: 360, width: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
