import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_EXPERTS } from "../queries/adminQueries.jsx";
import { Link } from "react-router-dom";

const OurExperts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(GET_EXPERTS);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading)
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <Typography variant="h6" align="center" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  const filteredExperts = data.getExperts.filter((expert) =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        px: isSmallScreen ? 2 : 8,
      }}
    >
      <Typography
        variant="h2"
        color="primary.main"
        gutterBottom
        align="center"
        fontWeight="bold"
        mb={4}
      >
        Our Experts
        <span style={{ color: "#FF5733" }}>.</span>{" "}
      </Typography>
      <Typography
        variant="h6"
        color="primary.main"
        gutterBottom
        align="center"
        mb={4}
      >
        Our experts are top scholars and teachers in their fields, covering all
        subjects taught in schools.
      </Typography>
      <Box sx={{ mb: 4, maxWidth: "500px", mx: "auto" }}>
        <TextField
          label="Search Experts"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {filteredExperts.map((expert) => (
          <Grid item xs={12} sm={6} md={4} key={expert._id}>
            <Link
              to={`/experts/${expert._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                elevation={3}
                sx={{ borderRadius: theme.shape.borderRadius }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={expert.imageUrl}
                    alt={expert.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {expert.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expert.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurExperts;
