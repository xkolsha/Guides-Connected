import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_EXPERTS, GET_CATEGORIES } from "../queries/adminQueries.jsx";

// purpose: display all experts
const OurExperts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const {
    loading: loadingExperts,
    error: errorExperts,
    data: dataExperts,
  } = useQuery(GET_EXPERTS);
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(GET_CATEGORIES);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Log data to console
  useEffect(() => {
    console.log("Experts:", dataExperts?.getExperts);
    console.log("Categories:", dataCategories?.getCategories);
  }, [dataExperts, dataCategories]);

  // Loading and error handling
  if (loadingExperts || loadingCategories) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }
  // if there is an error loading the data, display an error message
  if (errorExperts || errorCategories) {
    console.error("Error loading data:", errorExperts || errorCategories);
    return (
      <Typography variant="h6" align="center" color="error">
        Error loading data
      </Typography>
    );
  }

  // Filter experts based on search term and active category
  const filterExperts = (expert) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      expert.name.toLowerCase().includes(searchLower) ||
      expert.title.toLowerCase().includes(searchLower) ||
      expert.biography.toLowerCase().includes(searchLower);

    let matchesCategory = true;
    if (activeCategory) {
      matchesCategory = expert.categories.some(
        (category) => category._id === activeCategory
      );
    }

    return matchesSearch && matchesCategory;
  };

  // Filter experts based on search term and active category
  const filteredExperts = dataExperts.getExperts.filter(filterExperts);

  // Handle category button click
  const handleCategoryClick = (categoryId) => {
    console.log("Clicked Category:", categoryId);
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
    console.log("Active Category:", activeCategory);
  };

  return (
    <Box sx={{ py: { xs: 8, sm: 10, md: 12 }, px: isSmallScreen ? 2 : 8 }}>
      <Typography
        variant="h2"
        color="primary.main"
        gutterBottom
        align="center"
        fontWeight="bold"
        mb={4}
      >
        Our Experts<span style={{ color: "#FF5733" }}>.</span>
      </Typography>

      <Box sx={{ mb: 4, maxWidth: "500px", mx: "auto" }}>
        <TextField
          label="Search Experts"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        {dataCategories.getCategories.map((category) => (
          <Button
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            variant={activeCategory === category._id ? "contained" : "outlined"}
            sx={{ m: 1 }}
          >
            {category.name}
          </Button>
        ))}
        <Button
          onClick={() => setActiveCategory(null)}
          variant="outlined"
          sx={{ m: 1 }}
        >
          Clear Filter
        </Button>
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
