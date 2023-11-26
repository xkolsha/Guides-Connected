import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1d3557",
      light: "#a8dadc",
      contrastText: "#f1faee",
    },
    secondary: {
      main: "#457b9d",
      dark: "#1d3557",
      light: "#a8dadc",
      contrastText: "#f1faee",
    },
    error: {
      main: "#e63946",
    },
    info: {
      main: "#2196f3",
    },
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 18,
    fontFamily: "Open Sans, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
