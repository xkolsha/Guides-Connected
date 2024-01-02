import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXPERT } from "../queries/adminQueries.jsx";
import { InlineWidget } from "react-calendly";

const ExpertDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EXPERT, { variables: { id } });

  const [showCalendly, setShowCalendly] = useState(false);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const expertData = data?.getExpert;

  const handleScheduleClick = () => {
    setShowCalendly(true);
  };

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
            style={{ maxWidth: "85%", height: "auto" }}
          />
        </Box>

        {/* Expert Title */}
        <Typography variant="h4" color={"primary"} gutterBottom>
          {expertData?.title}
        </Typography>

        {/* Expert Biography */}
        <Typography
          variant="body1"
          color={"primary"}
          marginBottom={6}
          paragraph
        >
          {expertData?.biography}
        </Typography>

        {/* Categories Section */}
        {expertData?.categories && expertData.categories.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Typography
              variant="h6"
              color={"primary"}
              sx={{
                color: theme.palette.text.primary,
                mb: 1,
              }}
            >
              Categories
            </Typography>
            {expertData.categories.map((category, index) => (
              <Chip
                key={index}
                label={category.name}
                sx={{
                  bgcolor: theme.palette.primary.contrastText,
                  color: theme.palette.text.primary,
                  mr: 0.5,
                }}
              >
                <Typography variant="body1" sx={{}}>
                  {category.name}
                </Typography>
              </Chip>
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

        {/* Show Calendly Widget */}
        {showCalendly && (
          <InlineWidget url="https://calendly.com/matthewasears" />
        )}

        {/* Consultation Button */}
        {!showCalendly && (
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleScheduleClick}
          >
            Schedule a Consultation
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ExpertDetail;
