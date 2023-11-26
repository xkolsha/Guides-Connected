import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import theme from "./theme";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import OurExperts from "./components/OurExperts";
import Categories from "./components/Categories";
import ExpertDetail from "./components/ExpertDetail";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ bgcolor: "background.default", minHeight: "100svh" }}>
          <Navigation />
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <>
                  <Box id="hero">
                    <Hero />
                  </Box>
                  <Box id="testimonials">
                    <Testimonials />
                  </Box>
                  <Box id="landing">
                    <Landing />
                  </Box>
                </>
              }
            />
            {/* About Route */}
            <Route path="/about" element={<About />} />
            <Route path="/experts" element={<OurExperts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/expert" element={<ExpertDetail />} />
            {/* Add more routes as needed */}
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
