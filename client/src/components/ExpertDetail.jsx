import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXPERT } from "../queries/adminQueries.jsx";

const ExpertDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EXPERT, { variables: { id } });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const expertData = data?.getExpert;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 8, sm: 10, md: 12 } }}>
        {/* Expert Name */}
        <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
          {expertData?.name}
          <span style={{ color: "#FF5733" }}>.</span>
        </Typography>

        {/* Image Section */}
        <Box sx={{ my: 2 }}>
          <img
            src={expertData?.image || "../assets/images/defaultProfileIMG.jpg"} // Use the URL from MongoDB
            alt={expertData?.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>

        {/* Expert Title */}
        <Typography variant="h4" color={"primary"} gutterBottom>
          {expertData?.title}
        </Typography>

        {/* Expert Biography */}
        <Typography variant="body1" color={"primary"} paragraph>
          {expertData?.biography}
        </Typography>

        {/* Categories Section */}
        {expertData?.categories && expertData.categories.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" color={"primary"}>
              Categories
            </Typography>
            {expertData.categories.map((category, index) => (
              <Paper key={index} sx={{ p: 2, my: 1 }}>
                <Typography variant="body1">{category.name}</Typography>
              </Paper>
            ))}
          </Box>
        )}

        {/* Introduction Video */}
        {expertData?.videoUrl && (
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Introduction Video</Typography>
            <video width="100%" controls>
              <source src={expertData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}

        {/* Consultation Button */}
        <Button variant="contained" sx={{ mt: 2 }}>
          Schedule a Consultation
        </Button>
      </Box>
    </Container>
  );
};

export default ExpertDetail;
