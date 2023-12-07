import { useState } from "react"; // Import useState hook
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import { useQuery } from "@apollo/client"; // Import useQuery hook
import { GET_EXPERTS } from "../queries/adminQueries.jsx"; // Import query
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// This component displays a list of experts
const OurExperts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(GET_EXPERTS);

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error: {error.message}</p>;
  }

  // Filter experts based on the search term
  const filteredExperts = data.getExperts.filter((expert) =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display experts
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
          <Grid item xs={12} sm={6} md={4} key={expert._id}>
            <Link
              to={`/experts/${expert._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                {" "}
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
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* Implement pagination or infinite scrolling */}
    </Box>
  );
};

export default OurExperts;
