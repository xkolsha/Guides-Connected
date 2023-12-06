import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXPERT_BY_ID } from "../queries/adminQueries.jsx";

const ExpertDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EXPERT_BY_ID, {
    variables: { id },
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const expertData = data.getExpertById;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom>
          {expertData.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {expertData.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {expertData.biography}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Areas of Expertise:</strong> {expertData.expertise}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Publications</Typography>
          {expertData.publications.map((publication, index) => (
            <Paper key={index} sx={{ p: 2, my: 1 }}>
              <Typography variant="body1">{publication.title}</Typography>
              <Button href={publication.link} target="_blank">
                Read More
              </Button>
            </Paper>
          ))}
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Contact</Typography>
          <Typography variant="body1">
            Email: {expertData.contactEmail}
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Introduction Video</Typography>
          <video width="100%" controls>
            <source src={expertData.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>

        <Button variant="contained" sx={{ mt: 2 }}>
          Schedule a Consultation
        </Button>
      </Box>
    </Container>
  );
};

export default ExpertDetail;
