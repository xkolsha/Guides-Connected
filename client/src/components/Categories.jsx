// Categories.jsx

import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

// Example data - replace with actual categories and images
const categoriesData = [
  {
    id: 1,
    name: "Science",
    imageUrl: "/path/to/science.jpg",
    description: "Explore experts in Science.",
  },
  {
    id: 2,
    name: "Technology",
    imageUrl: "/path/to/technology.jpg",
    description: "Dive into the world of Technology.",
  },
  // ... more categories
];

const Categories = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {categoriesData.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <CardActionArea
              onClick={() => {
                /* Navigate to filtered experts view */
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.imageUrl}
                  alt={category.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
