// OurExperts.jsx
import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

// Example data - replace with actual data source
const expertsData = [
  {
    id: 1,
    name: "Expert 1",
    title: "Field 1",
    imageUrl: "/path/to/image1.jpg",
    bio: "Short bio...",
  },
  {
    id: 2,
    name: "Expert 2",
    title: "Field 2",
    imageUrl: "/path/to/image2.jpg",
    bio: "Short bio...",
  },
  // ... more experts
];

const OurExperts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter experts based on the search term
  const filteredExperts = expertsData.filter((expert) =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <TextField
        label="Search Experts"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filteredExperts.map((expert) => (
          <Grid item xs={12} sm={6} md={4} key={expert.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={expert.imageUrl}
                alt={expert.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {expert.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expert.title}
                </Typography>
                {/* Optional: Add more details or a button to open a modal/hover card */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Implement pagination or infinite scrolling */}
    </Box>
  );
};

export default OurExperts;
