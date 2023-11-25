import { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Slide,
  useScrollTrigger,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func,
};

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Our Experts", path: "/experts" },
    { label: "Categories", path: "/categories" },
  ];

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          color="primary"
          elevation={4}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold" }}
              >
                Guides Connected.
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                }}
              >
                {navItems.map((item, index) => (
                  <Button
                    component={Link}
                    to={item.path}
                    key={index}
                    sx={{
                      color: "background.paper",
                      "&:hover": { color: "primary.light" },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Button
                variant="outlined"
                component={Link}
                to="/contact"
                sx={{
                  color: "background.paper",
                  borderColor: "background.paper",
                  ml: 1,
                  "&:hover": {
                    color: "primary.light",
                    borderColor: "primary.light",
                  },
                  display: { xs: "none", md: "block" },
                }}
              >
                Contact Us
              </Button>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {navItems.map((item, index) => (
              <ListItemButton component={Link} to={item.path} key={index}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <ListItemButton component={Link} to="/contact">
              <Button sx={{ color: "primary.main", width: "100%" }}>
                Contact Us
              </Button>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
