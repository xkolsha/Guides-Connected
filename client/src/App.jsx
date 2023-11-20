import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, Box, Container } from "@mui/material";
import Hero from "./components/Hero";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            bgcolor: "background.default",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="lg">
            <Hero id="hero" />
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
