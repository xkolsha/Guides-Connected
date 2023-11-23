import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import theme from "./theme";
import Hero from "./components/Hero";
import Landing from "./components/Landing";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
          <Hero id="hero" />
          <Testimonials id="testimonials" />
          <Landing id="landing" />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
