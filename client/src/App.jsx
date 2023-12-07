import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; // Import the Apollo Client instance
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
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      {/* Wrap with ApolloProvider */}
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
              <Route path="/experts/:id" element={<ExpertDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              {/* Add more routes as needed */}
            </Routes>
          </Box>
          <Footer />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
