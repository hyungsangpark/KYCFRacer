import { createTheme } from "@mui/material";
import { amber } from "@mui/material/colors";

/**
 * This file creates a theme object for the application using MUI's createTheme function
 */

const theme = createTheme({
  typography: {
    fontFamily: `"Dongle", "Roboto", "sans-serif", "Arial"`,
    fontSize: 24,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    button: {
      textTransform: "none",
    },
    h1: {
      fontWeight: "bold",
      fontSize: "5rem",
      marginBottom: "1rem",
      textAlign: "center",
    },
    h2: {
      fontWeight: "700",
      fontSize: "4rem",
      marginBottom: "1rem",
      textAlign: "center",
    },
    h3: {
      fontWeight: "300",
      fontSize: "3rem",
      textAlign: "center",
    },
  },
  palette: {
    primary: {
      // light: "#f8d48b",
      light: amber[100],
      main: "#F7CA6E",
      dark: "#2B1D0D",
      contrastText: "#000000",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#373535",
      dark: "#1F1F1F",
    },
  },
});

export default theme;
