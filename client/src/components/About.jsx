import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Grid,
  Link,
} from "@mui/material";
import storyImg from "../assets/images/ImgOurStory.webp";

// Steps for the stepper
const steps = [
  {
    label: "Select a Subject",
    description: "Choose from a wide range of subjects and approaches.",
  },
  {
    label: "Pick a Service",
    description:
      "Select a service that elevates your educational goals to the next level.",
  },
  {
    label: "Choose an Expert",
    description:
      "Find an expert that aligns with your needs and teaching style.",
  },
  {
    label: "Start Collaborating",
    description: "Engage with experts using familiar communication tools.",
  },
];

const About = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          color: "primary.main",
          py: 6,
          mt: 12,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            fontWeight={"bold"}
          >
            About Us
          </Typography>
        </Container>
      </Box>
      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: "primary.main" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
              alt="Our Story"
              src={storyImg}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <Typography
              variant="h3"
              gutterBottom
              fontWeight={"bold"}
              color={"Background"}
            >
              Our Story
            </Typography>
            <Typography variant="h6" mt={6} paragraph color={"Background"}>
              The founder of Guides Connected, Dr. Matthew Sears, started this
              company during the COVID-19 pandemic. While teaching Classics and
              Ancient History to university students from home, he saw the
              potential of distance learning to connect experts in any subject
              with teachers and students in any place. Matthew is growing a
              network of scholars and teachers from around the world, all of
              whom share his passion for teaching and learning, and for making
              complex ideas accessible to everyone. Reach him at{" "}
              <Link
                href="mailto:matthewasears@guidesconnected.com"
                color="primary.light"
                fontWeight={"bold"}
              >
                matthewasears@guidesconnected.com
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Include sections for Professional Learning, Classroom Enrichment, Student Connect */}
        <Grid container spacing={4}>
          {/* Professional Learning */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "primary.contrastText",
                color: "primary.main",
              }}
            >
              {/* Add Image or Icon here */}
              <Typography variant="h5" fontWeight={"bold"} mb={2}>
                Professional Learning
              </Typography>
              <Typography variant="body1">
                Work with leading academics and researchers, one-on-one or as a
                group of colleagues, to stay on top of your field and get real
                ideas for the classroom. All without adding to your workload.
                {/* More content here */}
              </Typography>
            </Paper>
          </Grid>

          {/* Classroom Enrichment */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "primary.contrastText",
                color: "primary.main",
              }}
            >
              {/* Add Image or Icon here */}
              <Typography variant="h5" fontWeight={"bold"} mb={2}>
                Classroom Enrichment
              </Typography>
              <Typography variant="body1">
                Energize and inspire your students by engaging them in the
                latest research and the most exciting discoveries. Bring top
                scholars right into the classroom for interactive and customized
                lessons.
                {/* More content here */}
              </Typography>
            </Paper>
          </Grid>

          {/* Student Connect */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "primary.contrastText",
                color: "primary.main",
              }}
            >
              {/* Add Image or Icon here */}
              <Typography variant="h5" fontWeight={"bold"} mb={2}>
                Student Connect
              </Typography>
              <Typography variant="body1">
                Give students the chance to follow up with presenters from all
                over the world to get personalized help for independent
                projects. Help students see the places their subjects can take
                them.
                {/* More content here */}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: "background" }}>
        <Typography
          variant="h3"
          color={"primary"}
          gutterBottom
          fontWeight={"bold"}
          pb={4}
          align="center"
        >
          How It Works
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="h6" color="primary.main">
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" color={"primary.main"}>
                      {step.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* Replace with your desired image */}
                    <Box
                      component="img"
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                      alt="Your image description"
                      src={`path_to_your_image_for_${index}.jpg`} // Replace with your image path
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={index === steps.length - 1}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Container>

      {/* Meet Our Experts Section */}
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom fontWeight={"bold"}>
          Our Experts{" "}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Find Your Perfect Educator: Browse Our List of Highly Qualified
          Experts Today!{" "}
        </Typography>
        {/* Include CTA Button to Experts page */}
        <Button
          variant="contained"
          href="/experts"
          color="secondary"
          sx={{ mt: 2, mr: 3 }}
        >
          Meet Our Experts
        </Button>
        <Button
          variant="contained"
          href="/contact"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Contact Us
        </Button>
      </Container>
    </Box>
  );
};

export default About;
