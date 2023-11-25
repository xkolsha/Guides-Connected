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
} from "@mui/material";

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
      <Box sx={{ bgcolor: "primary.main", color: "background.paper", py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom align="center">
            About Guides Connected
          </Typography>
          <Typography variant="h5" align="center">
            Connecting educators and students with experts worldwide
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          The founder of Guides Connected, Dr. Matthew Sears, started this
          company during the COVID-19 pandemic...
          {/* Add more content here */}
        </Typography>
        {/* Add images or additional content here */}
      </Container>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          How It Works
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
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
                  </div>
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

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Include sections for Professional Learning, Classroom Enrichment, Student Connect */}
        <Grid container spacing={4}>
          {/* Professional Learning */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              {/* Add Image or Icon here */}
              <Typography variant="h6">Professional Learning</Typography>
              <Typography variant="body2">
                Work with leading academics and researchers to stay on top of
                your field...
                {/* More content here */}
              </Typography>
            </Paper>
          </Grid>

          {/* Classroom Enrichment */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              {/* Add Image or Icon here */}
              <Typography variant="h6">Classroom Enrichment</Typography>
              <Typography variant="body2">
                Energize and inspire your students by engaging them in the
                latest research...
                {/* More content here */}
              </Typography>
            </Paper>
          </Grid>

          {/* Student Connect */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              {/* Add Image or Icon here */}
              <Typography variant="h6">Student Connect</Typography>
              <Typography variant="body2">
                Give students the chance to follow up with presenters from all
                over the world...
                {/* More content here */}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Meet Our Experts Section */}
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Meet Our Experts
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Browse our list of carefully vetted experts...
        </Typography>
        {/* Include CTA Button to Experts page */}
        <Button variant="contained" href="/experts" sx={{ mt: 2 }}>
          Meet Our Experts
        </Button>
      </Container>

      {/* Contact Us Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          We&apos;re here to help and answer any question you might have...
        </Typography>
        {/* Include CTA Button to Contact page */}
        <Button variant="contained" href="/contact" sx={{ mt: 2 }}>
          Contact Us
        </Button>
      </Container>

      {/* Footer (if separate component, import and place here) */}
    </Box>
  );
};

export default About;
